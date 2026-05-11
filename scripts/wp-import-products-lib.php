<?php
/**
 * Lógica compartida para importar soluciones / ACF.
 * Usado por wp-import-products.php (WP-CLI) y wp-import-products-browser.php (HTTP).
 *
 * Medios locales (IMPORT_MEDIA_DIR): carpeta con PDFs e imágenes; nombres = imagen_filename (JSON)
 * y el primer renglón de cada bloque de catálogo (nombre_visible, típico nombre.pdf).
 */

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

if ( ! function_exists( 'acogas_import_media_reference_basename' ) ) {
	/**
	 * Nombre de archivo para buscar en disco / biblioteca. Evita que basename() tritere títulos con «/»
	 * (p. ej. «Repair/Rebuild …») como si fueran carpetas. Rutas «AAAA/archivo» o «AAAA/MM/archivo» se recortan.
	 * Con 3+ segmentos que no son año/mes WP: «/» se sustituye por «_» (títulos tipo Water/Air/Light…).
	 *
	 * @param string $filename Referencia del JSON (nombre_visible, imagen_filename, etc.).
	 * @return string
	 */
	function acogas_import_media_reference_basename( string $filename ): string {
		$p = str_replace( '\\', '/', trim( $filename ) );
		if ( $p === '' ) {
			return '';
		}

		$parts = explode( '/', $p );
		if ( 1 === count( $parts ) ) {
			return $p;
		}

		if ( 2 === count( $parts ) && preg_match( '/^\d{4}$/', $parts[0] ) ) {
			return $parts[1];
		}

		if ( 2 === count( $parts ) ) {
			return $p;
		}

		if ( preg_match( '#^\d{4}/\d{2}/#', $p ) ) {
			return basename( $p );
		}

		return str_replace( '/', '_', $p );
	}
}

if ( ! function_exists( 'acogas_import_resolve_media_path' ) ) {
	/**
	 * @return string Ruta absoluta legible o cadena vacía.
	 */
	function acogas_import_resolve_media_path( $media_dir, $filename ) {
		$media_dir = rtrim( (string) $media_dir, "/\\" );
		$filename  = trim( (string) $filename );
		if ( $filename === '' || $media_dir === '' || ! is_dir( $media_dir ) ) {
			return '';
		}
		$base_raw = acogas_import_media_reference_basename( $filename );
		if ( $base_raw === '' ) {
			return '';
		}

		$raw_variants = array( $base_raw );
		if ( false !== strpos( $base_raw, '/' ) ) {
			$raw_variants[] = str_replace( '/', '_', $base_raw );
		}

		$bases_seek = array();
		foreach ( array_unique( $raw_variants ) as $r ) {
			$bases_seek[] = $r;
			$bases_seek[] = sanitize_file_name( $r );
		}
		$bases_seek = array_values( array_unique( array_filter( $bases_seek ) ) );

		$norm_targets = array();
		foreach ( $bases_seek as $b ) {
			$norm_targets[] = strtolower( sanitize_file_name( $b ) );
		}
		$norm_targets = array_values( array_unique( array_filter( $norm_targets ) ) );

		foreach ( $bases_seek as $base ) {
			$direct = $media_dir . DIRECTORY_SEPARATOR . $base;
			if ( is_readable( $direct ) && ! is_dir( $direct ) ) {
				return $direct;
			}
		}

		foreach ( scandir( $media_dir ) ?: array() as $f ) {
			if ( '.' === $f || '..' === $f ) {
				continue;
			}
			$full = $media_dir . DIRECTORY_SEPARATOR . $f;
			if ( ! is_readable( $full ) || is_dir( $full ) ) {
				continue;
			}
			foreach ( $bases_seek as $base ) {
				if ( strcasecmp( $f, $base ) === 0 ) {
					return $full;
				}
			}
			$f_norm = strtolower( sanitize_file_name( $f ) );
			foreach ( $norm_targets as $nt ) {
				if ( $f_norm === $nt ) {
					return $full;
				}
			}
		}

		return '';
	}
}

if ( ! function_exists( 'acogas_import_attachment_slug_candidates_from_stems' ) ) {
	/**
	 * @param string[] $stems_basenames Stems sin extensión (p. ej. «Repair/Rebuild» y «Repair_Rebuild»).
	 * @param string   $extension       Extensión real del archivo (.pdf / .png) para acercar resultado a sanitize_file_name.
	 * @return string[]
	 */
	function acogas_import_attachment_slug_candidates_from_stems( array $stems_basenames, string $extension = '' ): array {
		$extension = strtolower( ltrim( (string) $extension, '.' ) );
		if ( '' === $extension ) {
			$extension = 'pdf';
		}

		if ( empty( $stems_basenames ) ) {
			return array();
		}

		$out = array();

		foreach ( array_unique( array_map( 'strval', $stems_basenames ) ) as $stem ) {
			if ( '' === trim( $stem ) ) {
				continue;
			}

			$lc = strtolower( $stem );
			$lc = preg_replace( '/\s*\(\d+\)\s*$/u', '', $lc );
			$lc = trim( preg_replace( '/\s+/u', ' ', $lc ) );

			if ( '' === $lc ) {
				continue;
			}

			$candidates_src = array(
				preg_replace( '/\bnuevo\b/iu', ' ', $lc ),
				$lc,
			);

			foreach ( array_unique( $candidates_src ) as $variant ) {
				$variant = trim( preg_replace( '/\s+/u', ' ', (string) $variant ) );
				if ( '' === $variant ) {
					continue;
				}
				$slug = sanitize_title( $variant );
				if ( $slug !== '' ) {
					$out[] = $slug;
				}
				$faux      = sanitize_file_name( $variant . '.' . $extension );
				$faux_stem = pathinfo( $faux, PATHINFO_FILENAME );
				if ( is_string( $faux_stem ) && $faux_stem !== '' ) {
					$out[] = strtolower( $faux_stem );
				}
			}
		}

		return array_values( array_unique( array_filter( $out ) ) );
	}
}

if ( ! function_exists( 'acogas_import_attachment_slug_candidates_from_basename' ) ) {
	/**
	 * Genera uno o más slugs posibles para un nombre de archivo (sin ruta).
	 * Prioriza quitar «nuevo» como palabra completa; prueba también «/» → «_», alineado con muchos uploads.
	 *
	 * @return string[]
	 */
	function acogas_import_attachment_slug_candidates_from_basename( string $base_raw ): array {
		$stem = pathinfo( $base_raw, PATHINFO_FILENAME );
		if ( ! is_string( $stem ) || '' === trim( $stem ) ) {
			return array();
		}

		$stems_try = array( $stem );
		if ( false !== strpos( $stem, '/' ) ) {
			$stems_try[] = str_replace( '/', '_', $stem );
		}

		return acogas_import_attachment_slug_candidates_from_stems(
			array_unique( $stems_try ),
			(string) pathinfo( $base_raw, PATHINFO_EXTENSION )
		);
	}
}

if ( ! function_exists( 'acogas_import_find_attachment_id_by_filename' ) ) {
	/**
	 * Intenta encontrar un adjunto existente por nombre de archivo.
	 * Primero busca por ruta parcial en _wp_attached_file; si falla, usa post_name (exacto y LIKE)
	 * con candidatos inferidos desde el nombre (sin ruta), p. ej. sin la palabra «nuevo».
	 *
	 * @return int ID del adjunto o 0 si no se encuentra.
	 */
	function acogas_import_find_attachment_id_by_filename( string $filename ): int {
		$filename = trim( $filename );
		if ( $filename === '' ) {
			return 0;
		}

		$base_raw = acogas_import_media_reference_basename( $filename );
		if ( $base_raw === '' ) {
			return 0;
		}

		$meta_raw_sources = array( $base_raw );
		if ( false !== strpos( $base_raw, '/' ) ) {
			$meta_raw_sources[] = str_replace( '/', '_', $base_raw );
		}

		$candidates = array();

		foreach ( array_unique( $meta_raw_sources ) as $br ) {
			$candidates[] = $br;
			$candidates[] = sanitize_file_name( $br );

			if ( ! preg_match( '/\.[a-z0-9]{2,5}$/i', $br ) ) {
				$candidates[] = $br . '.pdf';
				$candidates[] = sanitize_file_name( $br ) . '.pdf';
			}

			$with_dashes = preg_replace( '/\s+/', '-', $br );
			if ( is_string( $with_dashes ) && $with_dashes !== $br ) {
				$candidates[] = $with_dashes;
				$candidates[] = sanitize_file_name( $with_dashes );
				if ( ! preg_match( '/\.[a-z0-9]{2,5}$/i', $with_dashes ) ) {
					$candidates[] = $with_dashes . '.pdf';
					$candidates[] = sanitize_file_name( $with_dashes ) . '.pdf';
				}
			}
		}

		$candidates = array_values( array_unique( array_filter( $candidates ) ) );

		foreach ( $candidates as $cand ) {
			$posts = get_posts(
				array(
					'post_type'      => 'attachment',
					'post_status'    => 'inherit',
					'posts_per_page' => 1,
					'fields'         => 'ids',
					'meta_query'     => array(
						array(
							'key'     => '_wp_attached_file',
							'value'   => '/' . ltrim( $cand, '/' ),
							'compare' => 'LIKE',
						),
					),
				)
			);

			if ( ! empty( $posts ) ) {
				return (int) $posts[0];
			}
		}

		$slugs = acogas_import_attachment_slug_candidates_from_basename( $base_raw );
		if ( empty( $slugs ) ) {
			return 0;
		}

		global $wpdb;

		foreach ( $slugs as $slug ) {
			// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- {$wpdb->posts} es tabla fija.
			$attach_id = $wpdb->get_var(
				$wpdb->prepare(
					"SELECT ID FROM {$wpdb->posts}
					 WHERE post_type = %s
					 AND post_status = %s
					 AND post_name = %s
					 LIMIT 1",
					'attachment',
					'inherit',
					$slug
				)
			);
			if ( $attach_id ) {
				return (int) $attach_id;
			}
		}

		foreach ( $slugs as $slug ) {
			// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
			$attach_id = $wpdb->get_var(
				$wpdb->prepare(
					"SELECT ID FROM {$wpdb->posts}
					 WHERE post_type = %s
					 AND post_status = %s
					 AND post_name LIKE %s
					 ORDER BY CHAR_LENGTH(post_name) ASC, ID ASC
					 LIMIT 1",
					'attachment',
					'inherit',
					'%' . $wpdb->esc_like( $slug ) . '%'
				)
			);
			if ( $attach_id ) {
				return (int) $attach_id;
			}
		}

		return 0;
	}
}

if ( ! function_exists( 'acogas_import_attachment_from_path' ) ) {
	/**
	 * Sube un archivo local a la biblioteca de medios y devuelve el ID del adjunto.
	 * Reutiliza adjuntos por nombre de archivo (misma corrida).
	 *
	 * @param callable $logger function ( string $msg, bool $warn ): void
	 * @return int 0 si error
	 */
	function acogas_import_attachment_from_path( $abs_path, $post_parent_id, array &$file_cache, $logger ) {
		$key = strtolower( basename( $abs_path ) );
		if ( isset( $file_cache[ $key ] ) ) {
			return (int) $file_cache[ $key ];
		}
		if ( ! is_readable( $abs_path ) ) {
			return 0;
		}

		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		$data = file_get_contents( $abs_path );
		if ( false === $data ) {
			call_user_func( $logger, 'No se pudo leer el archivo: ' . basename( $abs_path ), true );
			return 0;
		}

		$filename    = basename( $abs_path );
		$wp_filetype = wp_check_filetype( $filename, null );
		if ( empty( $wp_filetype['type'] ) ) {
			call_user_func( $logger, 'Tipo de archivo no reconocido: ' . $filename, true );
			return 0;
		}

		$upload_dir = wp_upload_dir();
		$new_name   = wp_unique_filename( $upload_dir['path'], sanitize_file_name( $filename ) );
		$upload     = wp_upload_bits( $new_name, null, $data );

		if ( ! empty( $upload['error'] ) ) {
			call_user_func( $logger, 'Error al subir: ' . $upload['error'], true );
			return 0;
		}

		$attach_id = wp_insert_attachment(
			array(
				'post_mime_type' => $wp_filetype['type'],
				'post_title'     => preg_replace( '/\.[^.]+$/', '', $new_name ),
				'post_content'   => '',
				'post_status'    => 'inherit',
				'post_parent'    => (int) $post_parent_id,
			),
			$upload['file'],
			$post_parent_id
		);

		if ( is_wp_error( $attach_id ) ) {
			call_user_func( $logger, 'No se creó adjunto: ' . $attach_id->get_error_message() . ' — ' . $filename, true );
			return 0;
		}
		if ( ! $attach_id ) {
			call_user_func( $logger, 'No se creó adjunto para: ' . $filename, true );
			return 0;
		}

		$meta = wp_generate_attachment_metadata( (int) $attach_id, $upload['file'] );
		if ( is_array( $meta ) && ! empty( $meta ) ) {
			wp_update_attachment_metadata( (int) $attach_id, $meta );
		}

		$file_cache[ $key ] = (int) $attach_id;
		return (int) $attach_id;
	}
}

if ( ! function_exists( 'acogas_import_enrich_catalog_with_files' ) ) {
	/**
	 * @param callable $logger function ( string $msg, bool $warn ): void
	 * @return array Catálogo con archivo => ID de adjunto donde exista el fichero en disco.
	 */
	function acogas_import_enrich_catalog_with_files( array $catalog, $media_dir, $post_id, array &$file_cache, $logger, $slug = '' ) {
		$ctx = $slug !== '' ? " — {$slug}" : '';
		foreach ( $catalog as $slot_key => &$slot ) {
			if ( ! is_array( $slot ) || 0 !== strpos( (string) $slot_key, 'documento_pdf_' ) ) {
				continue;
			}
			$nom = isset( $slot['nombre_visible'] ) ? trim( (string) $slot['nombre_visible'] ) : '';
			if ( '' === $nom ) {
				call_user_func( $logger, "Catálogo [{$slot_key}]: sin nombre_visible (referencia de archivo omitida){$ctx}", true );
				continue;
			}

			$lbl = "[{$slot_key}] referencia «{$nom}»";

			// Si ya existe un adjunto en WP para este nombre, reutilízalo.
			$existing_attach = acogas_import_find_attachment_id_by_filename( $nom );
			if ( $existing_attach > 0 ) {
				$slot['archivo'] = $existing_attach;
				call_user_func( $logger, "Catálogo {$lbl}: ✓ enlazado adjunto ya existente en biblioteca #{$existing_attach}{$ctx}" );
				continue;
			}

			$path = acogas_import_resolve_media_path( $media_dir, $nom );
			if ( '' === $path ) {
				$hay_dir = $media_dir !== '' && is_dir( $media_dir );
				call_user_func(
					$logger,
					$hay_dir
						? "Catálogo {$lbl}: ✗ sin coincidencia en biblioteca ni archivo en carpeta IMPORT_MEDIA{$ctx}"
						: "Catálogo {$lbl}: ✗ sin coincidencia en biblioteca y sin IMPORT_MEDIA_DIR (solo búsqueda en medios no intentada por disco){$ctx}",
					true
				);
				continue;
			}
			call_user_func( $logger, "Catálogo {$lbl}: archivo local encontrado «" . basename( $path ) . "»{$ctx}" );
			$id = acogas_import_attachment_from_path( $path, $post_id, $file_cache, $logger );
			if ( $id > 0 ) {
				$slot['archivo'] = $id;
				call_user_func( $logger, "Catálogo {$lbl}: ✓ registrado adjunto #{$id}{$ctx}" );
			} else {
				call_user_func( $logger, "Catálogo {$lbl}: ✗ error al crear adjunto desde «" . basename( $path ) . "»{$ctx}", true );
			}
		}
		unset( $slot );
		return $catalog;
	}
}

if ( ! function_exists( 'acogas_run_product_import' ) ) {

	/**
	 * @param array $decode Resultado json_decode(..., true) del payload (con ['posts'=>...])
	 * @param array $options [
	 *   'limit'=>int, 'status'=>string, 'skip_existing'=>bool,
	 *   'replace_existing'=>bool Si true: actualiza el post con el mismo slug, envía otros duplicados a la papelera (ignora skip_existing para ese slug).
	 *   'logger'=>callable|null,
	 *   'media_dir'=>string Ruta absoluta a carpeta con PDFs e imágenes (nombres como en JSON).
	 * ]
	 * @return array{ imported: int, log: string[] }
	 */
	function acogas_run_product_import( array $decode, array $options = array() ) {
		$defaults = array(
			'limit'             => 0,
			'status'            => 'draft',
			'skip_existing'     => true,
			'replace_existing' => false,
			'logger'            => null,
			'media_dir'         => '',
		);
		$o        = array_merge( $defaults, $options );

		$log_lines = array();
		$user_log  = is_callable( $o['logger'] ) ? $o['logger'] : null;

		$logger = static function ( $msg, $warn = false ) use ( &$log_lines, $user_log ) {
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
			} else {
				echo $line . "\n";
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

		$post_type = isset( $decode['postType'] ) ? (string) $decode['postType'] : 'soluciones';
		$status_in = strtolower( (string) ( $o['status'] ?: 'draft' ) );
		$status    = in_array(
			$status_in,
			array( 'draft', 'publish', 'pending', 'private' ),
			true
		) ? $status_in : 'draft';

		$limit             = isset( $o['limit'] ) ? max( 0, (int) $o['limit'] ) : 0;
		$skip_existing     = ! empty( $o['skip_existing'] );
		$replace_existing = ! empty( $o['replace_existing'] );

		$media_dir  = isset( $o['media_dir'] ) ? trim( (string) $o['media_dir'] ) : '';
		$use_media  = $media_dir !== '' && is_dir( $media_dir ) && is_readable( $media_dir );
		if ( $media_dir !== '' && ! $use_media ) {
			$logger( 'IMPORT_MEDIA_DIR no es una carpeta legible; se omite sideload de medios.', true );
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
				update_field( 'detalles', $acf['detalles'], $post_id );
			}

			$catalog = isset( $acf['catalogo'] ) && is_array( $acf['catalogo'] ) ? $acf['catalogo'] : array();
			if ( ! empty( $catalog ) ) {
				$catalog = acogas_import_enrich_catalog_with_files(
					$catalog,
					$use_media ? $media_dir : '',
					$post_id,
					$file_cache,
					$logger,
					$slug
				);
			}
			if ( ! empty( $catalog ) ) {
				update_field( 'catalogo', $catalog, $post_id );
			}

			if ( ! empty( $row['imagen_filename'] ) ) {
				$img_raw = trim( (string) $row['imagen_filename'] );
				$img_nom = sanitize_file_name( $img_raw );
				$img_id  = 0;
				$img_src = '';

				if ( $use_media ) {
					$img_path = acogas_import_resolve_media_path( $media_dir, $img_nom );
					if ( '' !== $img_path ) {
						call_user_func( $logger, "Imagen referencia «{$img_raw}»: archivo local «" . basename( $img_path ) . "» — {$slug}" );
						$img_id = acogas_import_attachment_from_path( $img_path, $post_id, $file_cache, $logger );
						if ( $img_id > 0 ) {
							$img_src = 'desde disco';
						}
					}
				}

				if ( $img_id <= 0 ) {
					$img_id = acogas_import_find_attachment_id_by_filename( $img_raw );
					if ( $img_id <= 0 && $img_nom !== $img_raw ) {
						$img_id = acogas_import_find_attachment_id_by_filename( $img_nom );
					}
					if ( $img_id > 0 ) {
						$img_src = 'adjunto ya existente en biblioteca';
					}
				}

				if ( $img_id > 0 ) {
					update_field( 'imagen', $img_id, $post_id );
					$logger( "Imagen «{$img_raw}»: ✓ campo imagen → adjunto #{$img_id} ({$img_src}) — {$slug}" );
				} else {
					$logger(
						$use_media
							? "Imagen «{$img_raw}» (nombre buscado «{$img_nom}»): ✗ no en disco ni biblioteca — {$slug}"
							: "Imagen «{$img_raw}»: ✗ sin adjunto coincidente (solo se busca en biblioteca si no hay IMPORT_MEDIA_DIR) — {$slug}",
						true
					);
				}
			}

			if ( ! empty( $row['imagen_filename'] ) ) {
				update_post_meta( $post_id, '_acogas_imagen_filename_ref', sanitize_file_name( (string) $row['imagen_filename'] ) );
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

if ( ! function_exists( 'acogas_run_product_media_attach' ) ) {

	/**
	 * Segunda pasada: enlaza PDFs e imagen ACF usando el mismo JSON + carpeta media (posts ya existentes).
	 *
	 * @return array{ updated: int, log: string[] }
	 */
	function acogas_run_product_media_attach( array $decode, array $options = array() ) {
		$defaults = array(
			'limit'     => 0,
			'logger'    => null,
			'media_dir' => '',
		);
		$o        = array_merge( $defaults, $options );

		$log_lines = array();
		$user_log  = is_callable( $o['logger'] ) ? $o['logger'] : null;

		$logger = static function ( $msg, $warn = false ) use ( &$log_lines, $user_log ) {
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
			} else {
				echo $line . "\n";
			}
		};

		if ( empty( $decode['posts'] ) || ! is_array( $decode['posts'] ) ) {
			return array( 'updated' => 0, 'log' => array( 'ERROR: falta posts en el JSON' ) );
		}
		if ( ! function_exists( 'update_field' ) ) {
			return array( 'updated' => 0, 'log' => array( 'ERROR: ACF update_field no disponible' ) );
		}

		$media_dir = isset( $o['media_dir'] ) ? trim( (string) $o['media_dir'] ) : '';
		if ( $media_dir === '' || ! is_dir( $media_dir ) || ! is_readable( $media_dir ) ) {
			return array(
				'updated' => 0,
				'log'     => array( 'ERROR: media_dir debe ser una carpeta absoluta legible' ),
			);
		}

		$post_type  = isset( $decode['postType'] ) ? (string) $decode['postType'] : 'soluciones';
		$limit      = isset( $o['limit'] ) ? max( 0, (int) $o['limit'] ) : 0;
		$file_cache = array();
		$updated    = 0;
		$seen       = 0;

		foreach ( $decode['posts'] as $row ) {
			if ( $limit && $seen >= $limit ) {
				break;
			}
			++$seen;

			$slug = isset( $row['slug'] ) ? sanitize_title( (string) $row['slug'] ) : '';
			if ( $slug === '' ) {
				continue;
			}

			$posts = get_posts(
				array(
					'name'           => $slug,
					'post_type'      => $post_type,
					'post_status'    => 'any',
					'posts_per_page' => 1,
					'fields'         => 'ids',
				)
			);
			if ( empty( $posts ) ) {
				$logger( "Sin post para slug: {$slug}", true );
				continue;
			}

			$post_id = (int) $posts[0];
			$acf     = isset( $row['acf'] ) && is_array( $row['acf'] ) ? $row['acf'] : array();
			$catalog = isset( $acf['catalogo'] ) && is_array( $acf['catalogo'] ) ? $acf['catalogo'] : array();

			if ( ! empty( $catalog ) ) {
				$catalog = acogas_import_enrich_catalog_with_files( $catalog, $media_dir, $post_id, $file_cache, $logger, $slug );
				update_field( 'catalogo', $catalog, $post_id );
			}

			if ( ! empty( $row['imagen_filename'] ) ) {
				$img_raw = trim( (string) $row['imagen_filename'] );
				$img_nom = sanitize_file_name( $img_raw );
				$img_id  = 0;
				$img_src = '';

				$img_path = acogas_import_resolve_media_path( $media_dir, $img_nom );
				if ( '' !== $img_path ) {
					call_user_func( $logger, "Imagen referencia «{$img_raw}»: archivo local «" . basename( $img_path ) . "» — {$slug}" );
					$img_id = acogas_import_attachment_from_path( $img_path, $post_id, $file_cache, $logger );
					if ( $img_id > 0 ) {
						$img_src = 'desde disco';
					}
				}

				if ( $img_id <= 0 ) {
					$img_id = acogas_import_find_attachment_id_by_filename( $img_raw );
					if ( $img_id <= 0 && $img_nom !== $img_raw ) {
						$img_id = acogas_import_find_attachment_id_by_filename( $img_nom );
					}
					if ( $img_id > 0 ) {
						$img_src = 'adjunto ya existente en biblioteca';
					}
				}

				if ( $img_id > 0 ) {
					update_field( 'imagen', $img_id, $post_id );
					$logger( "Imagen «{$img_raw}»: ✓ campo imagen → adjunto #{$img_id} ({$img_src}) — {$slug}" );
				} else {
					$logger( "Imagen «{$img_raw}» (nombre buscado «{$img_nom}»): ✗ no en disco ni biblioteca — {$slug}", true );
				}

				update_post_meta( $post_id, '_acogas_imagen_filename_ref', $img_nom );
			}

			$logger( "Medios actualizados #{$post_id} — {$slug}" );
			++$updated;
		}

		$logger( "Listo: {$updated} entrada(s) con medios procesados." );

		return array(
			'updated' => $updated,
			'log'     => $log_lines,
		);
	}
}
