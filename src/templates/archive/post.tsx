import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Parser from "html-react-parser"

import { ArticleItem } from "../../interfaces"
import Layout from "../../components/Layout/Layout"
import Edges from "../../components/Layout/Edges"

const PostArchive = (props: any) => {
  const {
    data: {
      page: { title },
      posts: { nodes: allPosts },
    },
  } = props

  return (
    <>
      <Layout title={title}>
        <Edges size="lg">
          {allPosts &&
            allPosts.map((post: ArticleItem) => {
              const image =
                post?.archiveThumbnail?.node?.localFile &&
                getImage(post.archiveThumbnail.node.localFile)

              return (
                <>
                  {image && (
                    <GatsbyImage
                      image={image}
                      alt={post?.archiveThumbnail?.node?.altText || ""}
                    />
                  )}

                  {post.title && (
                    <Link to={`${post.uri}`}>
                      <h2 children={post.title} />
                    </Link>
                  )}

                  {post.categories && (
                    <p>
                      {post.categories &&
                        post.categories.nodes.map(
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

                  {post.excerpt && <div children={Parser(post.excerpt)} />}
                </>
              )
            })}
        </Edges>
      </Layout>
    </>
  )
}

export default PostArchive

export const pageQuery = graphql`
  query WordPressPostsArchive(
    $id: String!
    $postsPerPage: Int!
    $offset: Int!
  ) {
    page: wpPage(id: { eq: $id }) {
      title
      content
      uri
      template {
        ... on WpDefaultTemplate {
          ...DefaultTemplateFragment
        }
      }
    }
    posts: allWpPost(
      sort: { date: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        ...PostFragment
      }
    }
    categories: allWpCategory {
      nodes {
        ...PostCategory
      }
    }
  }
`
