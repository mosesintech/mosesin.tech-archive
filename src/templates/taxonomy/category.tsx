import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Parser from "html-react-parser"

import { ArticleItem } from "../../interfaces"
import Layout from "../../components/Layout/Layout"
import Edges from "../../components/Layout/Edges"

const Category = (props: any) => {
  const {
    data: { wpCategory, posts },
  } = props

  return (
    <>
      <Layout title={wpCategory.name} isCategory={true}>
        <Edges size="lg">
          {wpCategory.name && <h1 children={wpCategory.name} />}

          {wpCategory.description && <p children={wpCategory.description} />}

          {posts &&
            posts.nodes.map((post: ArticleItem) => {
              const image =
                post?.archiveThumbnail?.node?.localFile &&
                getImage(post.archiveThumbnail.node.localFile)

              return (
                <>
                  {image && (
                    <GatsbyImage
                      image={image}
                      alt={post?.archiveThumbnail?.node?.altText || ""}
                      className="rounded-lg shadow-lg object-cover object-center"
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

export default Category

export const categoryQuery = graphql`
  query Category($id: String!, $postsPerPage: Int!, $offset: Int!) {
    wpCategory(id: { eq: $id }) {
      description
      name
      id
      uri
    }

    categories: allWpCategory {
      nodes {
        ...PostCategory
      }
    }

    posts: allWpPost(
      sort: { date: DESC }
      limit: $postsPerPage
      skip: $offset
      filter: { categories: { nodes: { elemMatch: { id: { eq: $id } } } } }
    ) {
      nodes {
        ...PostFragment
      }
    }
  }
`
