<?php
/**
 * Importador «soluciones» desde wp-import-acf-payload.json (ACF update_field).
 *
 * USO EN EL TEMA HIJO / TEMA ACTIVO
 * ─────────────────────────────────
 * 1) Sube ESTE archivo y wp-import-products-lib.php (mismo directorio, p. ej. inc/) — la lib enlaza PDFs del disco a ACF.
 * 2) Sube wp-import-acf-payload.json a:  wp-content/uploads/acogas-import/
 * 3) PDFs e imágenes: carpeta plana (nombres = nombre_visible / imagen_filename); ruta en la pantalla de import o IMPORT_MEDIA_DIR en CLI.
 * 4) En functions.php del tema hijo, UNA línea:
 *
 *    require_once get_stylesheet_directory() . '/inc/acogas-products-import-tools.php';
 *
 * (Ajusta la ruta si el archivo está en otro directorio dentro del tema.)
 *
 * Después del import puedes borrar ese require y borrar este archivo del servidor por limpieza.
 *
 * Requisitos: ACF activo; CPT «soluciones»; mismo esquema de campos que el JSON exportado.
 *
 * @package ACOGAS
 */

defined( 'ABSPATH' ) || exit;

$_acogas_wp_import_products_lib = dirname( __FILE__ ) . '/wp-import-products-lib.php';
if ( is_readable( $_acogas_wp_import_products_lib ) ) {
	require_once $_acogas_wp_import_products_lib;
}

/**
 * Coincide con el nombre final en la biblioteca de medios: misma lógica que al subir (basename + sanitize_file_name).
 * Acepta URL, ruta relativa o solo el nombre de archivo.
 */
function acogas_normalize_wp_upload_filename( string $ref ): string {
	$ref = trim( $ref );
	if ( $ref === '' ) {
		return '';
	}
	$path = $ref;
	if ( preg_match( '#^https?://#i', $ref ) ) {
		$p = wp_parse_url( $ref, PHP_URL_PATH );
		if ( is_string( $p ) && $p !== '' ) {
			$path = $p;
		}
	}
	$path = str_replace( '\\', '/', $path );
	$base = basename( $path );

	return sanitize_file_name( $base );
}

/**
 * Recorre arrays ACF y normaliza cadenas que parecen archivos de imagen/PDF (por extensión).
 */
function acogas_sanitize_media_filename_refs_in_payload( $data ) {
	if ( is_array( $data ) ) {
		$out = array();
		foreach ( $data as $key => $val ) {
			$out[ $key ] = acogas_sanitize_media_filename_refs_in_payload( $val );
		}
		return $out;
	}
	if ( ! is_string( $data ) ) {
		return $data;
	}
	$s   = trim( $data );
	$ext = strtolower( pathinfo( $s, PATHINFO_EXTENSION ) );
	$ok  = array( 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif' );
	if ( ! in_array( $ext, $ok, true ) ) {
		return $data;
	}

	return acogas_normalize_wp_upload_filename( $s );
}

if ( ! function_exists( 'acogas_import_post_ids_for_slug' ) ) {
	/**
	 * IDs de todos los posts de un tipo con el mismo post_name (slug), más antiguos primero.
	 *
	 * @return int[]
	 */
	function acogas_import_post_ids_for_slug( string $post_type, string $slug ): array {
		$ids = get_posts(
			array(
				'name'           => $slug,
				'post_type'      => $post_type,
				'post_status'    => 'any',
				'posts_per_page' => -1,
				'fields'         => 'ids',
				'orderby'        => 'ID',
				'order'          => 'ASC',
			)
		);
		if ( ! is_array( $ids ) ) {
			return array();
		}

		return array_values( array_map( 'intval', $ids ) );
	}
}

/** Ruta RELATIVA bajo wp-content/uploads donde estará el JSON (por defecto). */
function acogas_import_default_json_relative_path(): string {
	return 'acogas-import/wp-import-acf-payload.json';
}

if ( ! function_exists( 'acogas_run_product_import' ) ) {
	/** Lógica de importación (idéntica a scripts/wp-import-products-lib.php del repo). */
	function acogas_run_product_import( array $decode, array $options = array() ) {
		$defaults      = array(
			'limit'             => 0,
			'status'            => 'draft',
			'skip_existing'     => true,
			'replace_existing'   => false,
			'logger'             => null,
			'media_dir'          => '',
		);
		$o             = array_merge( $defaults, $options );
		$log_lines     = array();
		$user_log      = is_callable( $o['logger'] ) ? $o['logger'] : null;
		$logger        = static function ( $msg, $warn = false ) use ( &$log_lines, $user_log ) {
			$prefix      = $warn ? '[aviso] ' : '';
			$line        = $prefix . $msg;
			$log_lines[] = $line;
			if ( $user_log ) {
				call_user_func( $user_log, $msg, $warn );
			} elseif ( class_exists( 'WP_CLI' ) ) {
				if ( $warn ) {
					\WP_CLI::warning( $msg );
				} else {
					\WP_CLI::log( $msg );
				}
			}
		};

		if ( empty( $decode['posts'] ) || ! is_array( $decode['posts'] ) ) {
			return array(
				'imported' => 0,
				'log'      => array( 'ERROR: falta posts en el JSON' ),
			);
		}

		if ( ! function_exists( 'update_field' ) ) {
			return array(
				'imported' => 0,
				'log'      => array( 'ERROR: ACF update_field no disponible' ),
			);
		}

		$post_type     = isset( $decode['postType'] ) ? (string) $decode['postType'] : 'soluciones';
		$status_in     = strtolower( (string) ( $o['status'] ?: 'draft' ) );
		$status        = in_array(
			$status_in,
			array( 'draft', 'publish', 'pending', 'private' ),
			true
		) ? $status_in : 'draft';
		$limit            = isset( $o['limit'] ) ? max( 0, (int) $o['limit'] ) : 0;
		$skip_existing    = ! empty( $o['skip_existing'] );
		$replace_existing = ! empty( $o['replace_existing'] );

		$media_dir  = isset( $o['media_dir'] ) ? trim( (string) $o['media_dir'] ) : '';
		$use_media  = $media_dir !== '' && is_dir( $media_dir ) && is_readable( $media_dir );
		if ( $media_dir !== '' && ! $use_media ) {
			$logger( 'La carpeta de medios no es legible; se omiten PDFs/imágenes del disco.', true );
		}

		$file_cache = array();

		$marcas_whitelist = array(
			'Corken',
			'Fisher',
			'Kunkle',
			'Spence',
			'Tartarini',
			'Cash',
			'Anderson Greenwood',
			'Crosby',
			'Marston',
			'Enardo',
			'Varec',
			'Liquid Controls',
			'Cavagna',
		);
		$marcas_lc = array();
		foreach ( $marcas_whitelist as $m ) {
			$marcas_lc[ mb_strtolower( $m ) ] = $m;
		}

		$n = 0;
		foreach ( $decode['posts'] as $row ) {
			if ( $limit && $n >= $limit ) {
				break;
			}
			$slug = isset( $row['slug'] ) ? sanitize_title( (string) $row['slug'] ) : '';
			if ( $slug === '' ) {
				$logger( 'Entrada sin slug, omitida.', true );
				continue;
			}
			$existing_ids = array();
			if ( $replace_existing || $skip_existing ) {
				$existing_ids = acogas_import_post_ids_for_slug( $post_type, $slug );
			}

			$title_raw = isset( $row['title'] ) ? (string) $row['title'] : '';
			$title     = $title_raw !== '' ? wp_strip_all_tags( $title_raw ) : $slug;

			$updated_existing = false;
			$post_id          = 0;

			if ( $replace_existing && ! empty( $existing_ids ) ) {
				$post_id = (int) $existing_ids[0];
				foreach ( array_slice( $existing_ids, 1 ) as $dup_id ) {
					if ( wp_trash_post( (int) $dup_id ) ) {
						$logger( 'Duplicado (papelera) #' . (int) $dup_id . " — {$slug}" );
					}
				}
				$upd = wp_update_post(
					array(
						'ID'            => $post_id,
						'post_title'    => $title,
						'post_status'   => $status,
						'post_name'     => $slug,
						'post_content'  => '',
						'post_excerpt'  => '',
					),
					true
				);
				if ( is_wp_error( $upd ) ) {
					$logger( $upd->get_error_message() . " (slug: {$slug})", true );
					continue;
				}
				$updated_existing = true;
			} elseif ( $skip_existing && ! empty( $existing_ids ) ) {
				$logger( "Omitido (ya existe): {$slug}" );
				continue;
			} else {
				$post_id = wp_insert_post(
					array(
						'post_title'   => $title,
						'post_name'    => $slug,
						'post_status'  => $status,
						'post_type'    => $post_type,
						'post_content' => '',
						'post_excerpt' => '',
					),
					true
				);
				if ( is_wp_error( $post_id ) ) {
					$logger( $post_id->get_error_message() . " (slug: {$slug})", true );
					continue;
				}
			}

			$acf = isset( $row['acf'] ) && is_array( $row['acf'] ) ? $row['acf'] : array();
			if ( ! empty( $acf['clasificacion'] ) && is_array( $acf['clasificacion'] ) ) {
				update_field( 'clasificacion', $acf['clasificacion'], $post_id );
			}
			$prod = isset( $acf['producto'] ) && is_array( $acf['producto'] ) ? $acf['producto'] : array();
			$prod = acogas_sanitize_media_filename_refs_in_payload( $prod );
			if ( isset( $prod['marcas'] ) && $prod['marcas'] !== '' && $prod['marcas'] !== null && false !== $prod['marcas'] ) {
				$candidato = trim( (string) $prod['marcas'] );
				$clave     = mb_strtolower( $candidato );
				if ( isset( $marcas_lc[ $clave ] ) ) {
					$prod['marcas'] = $marcas_lc[ $clave ];
				} elseif ( in_array( $candidato, $marcas_whitelist, true ) ) {
					$prod['marcas'] = $candidato;
				} else {
					$logger( "Marca no reconocida (se omite campo): {$candidato} — {$slug}", true );
					unset( $prod['marcas'] );
				}
			}
			update_field( 'producto', $prod, $post_id );
			if ( ! empty( $acf['detalles'] ) && is_array( $acf['detalles'] ) ) {
				$detalles = acogas_sanitize_media_filename_refs_in_payload( $acf['detalles'] );
				update_field( 'detalles', $detalles, $post_id );
			}
			if ( ! empty( $acf['catalogo'] ) && is_array( $acf['catalogo'] ) ) {
				$catalogo = $acf['catalogo'];
				if ( $use_media && function_exists( 'acogas_import_enrich_catalog_with_files' ) ) {
					$catalogo = acogas_import_enrich_catalog_with_files(
						$catalogo,
						$media_dir,
						$post_id,
						$file_cache,
						$logger,
						$slug
					);
				}
				$catalogo = acogas_sanitize_media_filename_refs_in_payload( $catalogo );
				update_field( 'catalogo', $catalogo, $post_id );
			}
			if ( ! empty( $row['imagen_filename'] ) ) {
				update_post_meta(
					$post_id,
					'_acogas_imagen_filename_ref',
					acogas_normalize_wp_upload_filename( (string) $row['imagen_filename'] )
				);
			}
			$logger(
				$updated_existing
					? "Actualizado #{$post_id} — {$slug}"
					: "Importado #{$post_id} — {$slug}"
			);
			++$n;
		}
		$logger( "Listo: {$n} entrada(s)." );

		return array(
			'imported' => $n,
			'log'      => $log_lines,
		);
	}
}

add_action(
	'admin_menu',
	static function (): void {
		add_management_page(
			__( 'Importar productos', 'acogas' ),
			__( 'Importar productos ACOGAS', 'acogas' ),
			'manage_options',
			'acogas-import-products',
			'acogas_render_products_import_tools_page'
		);
	}
);

/**
 * Pantalla Herramientas → Importar productos ACOGAS
 */
function acogas_render_products_import_tools_page(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( '' );
	}

	$uploads = wp_get_upload_dir();
	$default = isset( $uploads['basedir'] )
		? trailingslashit( $uploads['basedir'] ) . acogas_import_default_json_relative_path()
		: '';

	$suggested_media = isset( $uploads['basedir'] )
		? trailingslashit( $uploads['basedir'] ) . 'acogas-import/medios'
		: '';

	$result_log = null;
	$err        = null;

	if ( isset( $_POST['acogas_import_submit'] )
		&& check_admin_referer( 'acogas_products_import_nonce', '_acnonce' )
	) {
		$path = isset( $_POST['acogas_json_path'] ) ? wp_unslash( (string) $_POST['acogas_json_path'] ) : '';
		$path = trim( $path );

		if ( strpos( $path, '..' ) !== false ) {
			$path = '';
		}

		if ( '' === $path ) {
			$path = $default;
		}

		if ( ! $path || ! is_readable( $path ) ) {
			/* translators: %s ruta al JSON */
			$err = sprintf( __( 'No se puede leer el archivo: %s', 'acogas' ), '<code>' . esc_html( $path ) . '</code>' );
		} elseif ( empty( $_POST['acogas_confirm'] ) ) {
			$err = __( 'Marca «Confirmar importación» antes de ejecutar.', 'acogas' );
		} else {
			set_time_limit( 0 );
			if ( function_exists( 'wp_raise_memory_limit' ) ) {
				wp_raise_memory_limit( 'admin' );
			} elseif ( function_exists( 'ini_set' ) ) {
				@ini_set( 'memory_limit', '512M' );
			}

			$decode = json_decode( (string) file_get_contents( $path ), true );
			if ( ! is_array( $decode ) ) {
				$err = __( 'JSON inválido.', 'acogas' );
			} else {
				$limit     = isset( $_POST['acogas_limit'] ) ? max( 0, absint( $_POST['acogas_limit'] ) ) : 0;
				$status    = ( isset( $_POST['acogas_publish'] ) && '1' === $_POST['acogas_publish'] ) ? 'publish' : 'draft';
				$replace_ex = ! empty( $_POST['acogas_replace_existing'] );
				$skip_ex    = ! empty( $_POST['acogas_skip_existing'] );

				$media_raw = isset( $_POST['acogas_media_dir'] ) ? wp_unslash( (string) $_POST['acogas_media_dir'] ) : '';
				$media_raw = trim( $media_raw );
				if ( strpos( $media_raw, '..' ) !== false ) {
					$media_raw = '';
				}
				if ( '' !== $media_raw && ! function_exists( 'acogas_import_enrich_catalog_with_files' ) ) {
					$media_raw = '';
				}

				$result_log = acogas_run_product_import(
					$decode,
					array(
						'limit'             => $limit,
						'status'            => $status,
						'skip_existing'     => $skip_ex,
						'replace_existing'  => $replace_ex,
						'media_dir'         => $media_raw,
						'logger'            => static function () {
							// Sin salida durante request admin (solo log interno devuelto)
						},
					)
				);
			}
		}
	}

	echo '<div class="wrap">';
	echo '<h1>' . esc_html__( 'Importar productos ACOGAS', 'acogas' ) . '</h1>';
	echo '<p>' . esc_html__( 'Usa JSON generado con npm run export:wp-import-json (wp-import-acf-payload.json). súbelo al servidor dentro de cargas («uploads») y ejecuta desde aquí.', 'acogas' ) . '</p>';

	if ( null !== $err ) {
		echo '<div class="notice notice-error"><p>' . wp_kses_post( $err ) . '</p></div>';
	}

	if ( is_array( $result_log ) ) {
		echo '<div class="notice notice-success"><p>'
			. esc_html( sprintf(
				/* translators: %d cantidad importada */
				__( 'Procesadas en esta ejecución: %d entrada(s).', 'acogas' ),
				(int) ( $result_log['imported'] ?? 0 )
			))
			. '</p></div>';
		echo '<h2>' . esc_html__( 'Registro', 'acogas' ) . '</h2>';
		echo '<textarea readonly rows="22" cols="120" style="width:98%;font-family:monospace;">';
		echo esc_textarea( implode( "\n", $result_log['log'] ?? array() ) );
		echo '</textarea>';
	}

	if ( ! function_exists( 'update_field' ) ) {
		echo '<div class="notice notice-warning"><p>' . esc_html__( 'Advanced Custom Fields (update_field) no está disponible.', 'acogas' ) . '</p></div>';
	}

	if ( ! function_exists( 'acogas_import_enrich_catalog_with_files' ) ) {
		echo '<div class="notice notice-warning"><p>'
			. esc_html__( 'Para que el campo «archivo» del catálogo reciba PDFs desde el disco, copia el archivo', 'acogas' )
			. ' <code>wp-import-products-lib.php</code> '
			. esc_html__( 'en el mismo directorio que esta herramienta y vuelve a cargar la página.', 'acogas' )
			. '</p></div>';
	}

	echo '<h2>' . esc_html__( 'Ejecutar', 'acogas' ) . '</h2>';
	echo '<form method="post">';
	wp_nonce_field( 'acogas_products_import_nonce', '_acnonce' );

	echo '<table class="form-table" role="presentation">';
	echo '<tr><th scope="row"><label for="acogas_json_path">' . esc_html__( 'Ruta absoluta al JSON', 'acogas' ) . '</label></th>';
	echo '<td><input type="text" name="acogas_json_path" id="acogas_json_path" class="regular-text large-text" placeholder="' . esc_attr( $default ) . '" value="' . esc_attr( $default ) . '">';
	echo '<p class="description">' . esc_html__( 'Ej.: /var/www/site/wp-content/uploads/acogas-import/wp-import-acf-payload.json', 'acogas' ) . '</p></td></tr>';

	echo '<tr><th scope="row"><label for="acogas_media_dir">' . esc_html__( 'Carpeta de PDFs e imágenes (opcional)', 'acogas' ) . '</label></th>';
	echo '<td><input type="text" name="acogas_media_dir" id="acogas_media_dir" class="regular-text large-text" placeholder="' . esc_attr( $suggested_media ) . '" value="">';
	echo '<p class="description">' . esc_html__( 'Ruta absoluta a una carpeta plana: nombres de archivo deben coincidir con «nombre_visible» de cada PDF en el JSON (e imagen principal con imagen_filename). Equivale a IMPORT_MEDIA_DIR en WP-CLI.', 'acogas' ) . '</p></td></tr>';

	echo '<tr><th scope="row">' . esc_html__( 'Límite (prueba)', 'acogas' ) . '</th>';
	echo '<td><input type="number" name="acogas_limit" value="0" min="0"> ';
	echo '<span class="description">' . esc_html__( '0 = sin límite (todos)', 'acogas' ) . '</span></td></tr>';

	echo '<tr><th scope="row">' . esc_html__( 'Estado', 'acogas' ) . '</th>';
	echo '<td><label><input type="checkbox" name="acogas_publish" value="1"> ' . esc_html__( 'Publicar (si no, quedan borradores)', 'acogas' ) . '</label></td></tr>';

	echo '<tr><th scope="row">' . esc_html__( 'Slugs que ya existen', 'acogas' ) . '</th>';
	echo '<td><p><label><input type="checkbox" name="acogas_replace_existing" value="1" id="acogas_replace_existing"> ';
	echo esc_html__( 'Reemplazar: actualizar el post con el mismo slug y enviar otros duplicados del mismo slug a la papelera', 'acogas' ) . '</label></p>';
	echo '<p><label><input type="checkbox" name="acogas_skip_existing" value="1" id="acogas_skip_existing" checked> ';
	echo esc_html__( 'Si no se reemplaza: omitir importación cuando ya exista ese slug', 'acogas' ) . '</label></p>';
	echo '<p class="description">' . esc_html__( 'Si «Reemplazar» está marcado, se ignora «omitir» para entradas que coincidan por slug.', 'acogas' ) . '</p></td></tr>';

	echo '<tr><th scope="row">' . esc_html__( 'Confirmación', 'acogas' ) . '</th>';
	echo '<td><label><input type="checkbox" name="acogas_confirm" value="1" required> ' . esc_html__( 'Confirmar importación', 'acogas' ) . '</label></td></tr>';

	echo '</table>';
	submit_button( __( 'Ejecutar importación', 'acogas' ), 'primary large', 'acogas_import_submit' );

	echo '</form>';
	echo '</div>';
}