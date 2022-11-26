import { graphql, useStaticQuery } from "gatsby"

interface useLayoutItemsProps {
  location?: string
}

const useLayoutItems = ({ location }: useLayoutItemsProps) => {
  const {
    allWpLayout: { nodes },
  } = useStaticQuery(graphql`
    query {
      allWpLayout {
        nodes {
          title
          flexibleContentModules {
            fieldGroupName
            contentModule {
              ... on WpLayout_Flexiblecontentmodules_ContentModule_Hero {
                fieldGroupName
                heroTitle
                heroText
                heroBackgroundImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  if (location) {
    const header = nodes.find(
      (node: any) => node.title.toLowerCase() === location.toLowerCase()
    )
    return header
  }
}

export default useLayoutItems
