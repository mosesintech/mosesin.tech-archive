import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Parser from "html-react-parser"

import Edges from "../../components/Layout/Edges"
import Layout from "../../components/Layout/Layout"

export default function DefaultPostTemplate(props: any) {
  const {
    data: {
      wpPost: { title, content, featuredImage, categories },
    },
    pageContext: { archivePath },
  } = props
  const image =
    featuredImage?.node?.localFile && getImage(featuredImage.node.localFile)

  return (
    <>
      <Layout title={title} archivePath={archivePath}>
        <Edges size="lg">
          <h1 children={title} />
          {image && (
            <GatsbyImage
              image={image}
              alt={featuredImage?.node?.altText || ""}
            />
          )}
          {categories && (
            <p>
              {categories &&
                categories.nodes.map(
                  (cat: { name: string; uri: string }, i: number) => {
                    return (
                      <Link
                        to={cat.uri}
                        className={`${i === 0 ? "" : "ml-[5px]"}`}
                        children={cat.name}
                      />
                    )
                  }
                )}
            </p>
          )}
          <div children={Parser(content)} />
        </Edges>
      </Layout>
    </>
  )
}

export const PostSingleQuery = graphql`
  query Post($id: String!) {
    wpPost(id: { eq: $id }) {
      ...PostFragment
    }
    posts: allWpPost {
      nodes {
        ...PostFragment
      }
    }
  }
`
