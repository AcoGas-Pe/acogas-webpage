/**
 * Consulta para listado de soluciones/productos desde WPGraphQL.
 *
 * - El nombre en RootQuery lo define el tema (`graphql_plural_name`). En acogas.pe es
 *   `solucionesProductos`. Otros sitios pueden usar `soluciones` u otro; ajusta env.
 * - Muchas versiones exigen `first` (o `last`) en la conexión; sin eso, `nodes` puede ir vacío.
 *
 * Si tu esquema usa otro nombre, define en .env.local:
 *   WORDPRESS_GRAPHQL_PRODUCTS_FIELD=solucionesProductos
 *
 * Valida nombres reales en GraphiQL: esquema → RootQuery.
 *
 * Logs en la terminal de `next dev`: prefijo [WP productos]. Más detalle:
 *   WORDPRESS_PRODUCTS_DEBUG=1
 *
 * En `detalles`, el campo de texto largo de aplicaciones puede ser `applicaciones` (GraphQL)
 * si el name ACF fue registrado con doble p; el mapper acepta ambas formas.
 */

const GRAPHQL_NAME_SAFE = /^[a-zA-Z][a-zA-Z0-9_]*$/;

/** Campo RootQuery que devuelve la conexión de productos (post type soluciones). */
export function getWpProductsGraphqlRootField(): string {
  const raw = process.env.WORDPRESS_GRAPHQL_PRODUCTS_FIELD?.trim();
  if (raw && GRAPHQL_NAME_SAFE.test(raw)) return raw;
  return "solucionesProductos";
}

/** Construye la query en runtime (respeta env al importar el módulo en el servidor). */
export function buildSolucionesProductosQuery(): string {
  const root = getWpProductsGraphqlRootField();
  const first = Math.min(
    Math.max(Number(process.env.WORDPRESS_GRAPHQL_PRODUCTS_FIRST) || 500, 1),
    500,
  );
  return /* GraphQL */ `
  query SolucionesProductos {
    ${root}(first: ${first}) {
      nodes {
        databaseId
        slug
        title
        datosProducto {
          clasificacion {
            macroCategoria
            categoriaProducto
          }
          producto {
            modelo
            submodelo
            grupoEmpresarial
            marcas
          }
          imagen {
            node {
              mediaItemUrl
            }
          }
          detalles {
            applicaciones
            beneficiosEconomicos
            controles
            caracteristicas
            combustiblesRefinadosGlp
            conectividadES
            datosDeRendimiento
            entradaVisualizacionUsuario
            especificaciones
            exactitud
            fluidosYGases
            materiales
            mercados
            nuevasFunciones
            opcionesAccesorios
            regulador
            versatilidad
          }
          catalogo {
            catalogoPdf1 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf2 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf3 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf4 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf5 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf6 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf7 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf8 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf9 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf10 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf11 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf12 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf13 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf14 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf15 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf16 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf17 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
            catalogoPdf18 {
              archivo {
                node {
                  mediaItemUrl
                }
              }
              categoria
              nombreVisible
              paginas
            }
          }
        }
      }
    }
  }
`;
}
