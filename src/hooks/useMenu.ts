import { graphql, useStaticQuery } from "gatsby"

interface UseMenuItemsProps {
  location?: string
  slug?: string
}

const useMenu = ({ location, slug }: UseMenuItemsProps) => {
  const {
    allWpMenu: { nodes },
  } = useStaticQuery(graphql`
    {
      allWpMenu {
        nodes {
          slug
          locations
          menuItems {
            nodes {
              connectedNode {
                node {
                  uri
                }
              }
              url
              uri
              label
              target
              parentDatabaseId
              cssClasses
            }
          }
        }
      }
    }
  `)

  if (location) {
    const menu =
      nodes && nodes.find((node: any) => node.locations.includes(location))
    return menu?.menuItems?.nodes
  }

  if (slug) {
    const menu = nodes.find((node: any) => node.slug === slug)
    return menu?.menuItems?.nodes
  }
}

export default useMenu
