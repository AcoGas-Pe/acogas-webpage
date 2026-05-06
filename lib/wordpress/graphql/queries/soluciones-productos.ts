/**
 * Consulta para listado de soluciones/productos desde WPGraphQL.
 *
 * Paginación: WPGraphQL suele limitar `first` (p. ej. 100). Se piden varias páginas con `after`
 * hasta agotar resultados. Tamaño de cada petición:
 *   WORDPRESS_GRAPHQL_PRODUCTS_FIRST=100  (por defecto 100, máx. 500 por petición).
 *
 * Si tu esquema usa otro nombre de conexión:
 *   WORDPRESS_GRAPHQL_PRODUCTS_FIELD=solucionesProductos
 */

const GRAPHQL_NAME_SAFE = /^[a-zA-Z][a-zA-Z0-9_]*$/;

/** Campo RootQuery que devuelve la conexión de productos (post type soluciones). */
export function getWpProductsGraphqlRootField(): string {
  const raw = process.env.WORDPRESS_GRAPHQL_PRODUCTS_FIELD?.trim();
  if (raw && GRAPHQL_NAME_SAFE.test(raw)) return raw;
  return "solucionesProductos";
}

/** Registros por petición GraphQL (recomendado ≤100 si el servidor limita; subir si WP lo permite). */
export function getGraphqlProductsPageSize(): number {
  const raw = Number(process.env.WORDPRESS_GRAPHQL_PRODUCTS_FIRST);
  const n = Number.isFinite(raw) && raw >= 1 ? raw : 100;
  return Math.min(Math.max(Math.floor(n), 1), 500);
}

/** Campos de cada nodo (compartido por query paginada). */
const SOLUCION_PRODUCTO_NODE_FIELDS = /* GraphQL */ `
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
`;

/** Query con cursor; repetir hasta `hasNextPage === false`. */
export function buildSolucionesProductosPagedQuery(): string {
  const root = getWpProductsGraphqlRootField();
  return /* GraphQL */ `
  query SolucionesProductosPaged($first: Int!, $after: String) {
    ${root}(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
${SOLUCION_PRODUCTO_NODE_FIELDS}
      }
    }
  }
`;
}
