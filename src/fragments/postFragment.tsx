import { graphql } from "gatsby"

export const PostCategory = graphql`
  fragment PostCategory on WpCategory {
    name
    uri
  }
`

export const PostFragment = graphql`
  fragment PostFragment on WpPost {
    id
    uri
    date
    title
    content
    excerpt
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 90, layout: FULL_WIDTH)
          }
        }
      }
    }
    thumbnail: featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(
              quality: 90
              layout: CONSTRAINED
              width: 280
              height: 200
            )
          }
        }
      }
    }
    archiveThumbnail: featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(
              quality: 90
              layout: CONSTRAINED
              width: 1440
              height: 1440
            )
          }
        }
      }
    }
    categories {
      nodes {
        id
        uri
        name
        description
      }
    }
  }
`
