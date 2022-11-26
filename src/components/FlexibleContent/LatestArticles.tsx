import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Parser from "html-react-parser"

import { LatestArticlesProps, ArticleItem } from "../../interfaces"
import Edges from "../Layout/Edges"
import usePostData from "../../hooks/usePostData"

interface ArticlesProps {
  title?: string
  text?: string
  button?: {
    target?: string
    title?: string
    url?: string
  }
  items?: any
}

const LatestArticles: React.FC<LatestArticlesProps> = props => {
  const {
    latestArticlesTitle,
    latestArticlesText,
    latestArticlesPostType,
    latestArticlesPostLimit,
    latestArticlesButton,
  } = props

  const { allWpPost } = usePostData()
  const posts = allWpPost.nodes.slice(0, latestArticlesPostLimit)

  if (
    !!latestArticlesPostType &&
    latestArticlesPostType.toLowerCase() === "post"
  ) {
    return (
      <>
        <Articles
          title={latestArticlesTitle}
          text={latestArticlesText}
          button={latestArticlesButton}
          items={posts}
        />
      </>
    )
  }

  return (
    <>
      <h1>LATEST ARTICLES</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}

const Articles: React.FC<ArticlesProps> = props => {
  const { title, text, items, button } = props

  return (
    <>
      <Edges size="lg" className="py-16 bg-gray-100/75">
        <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            {title && (
              <div className="text-center">
                <h2
                  className="text-3xl tracking-tight font-extrabold sm:text-4xl"
                  children={title}
                />
                {text && (
                  <p
                    className="mt-3 max-w-2xl mx-auto text-xl sm:mt-4"
                    children={text}
                  />
                )}
              </div>
            )}

            {items && (
              <>
                <span className="flex flex-col justify-center items-center">
                  <div
                    className={`grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-12`}
                    >
                    {items.map((item: ArticleItem) => {
                      const image =
                        item?.thumbnail?.node?.localFile &&
                        getImage(item.thumbnail.node.localFile)

                      return (
                        <>
                          <div
                            key={item.title || item.excerpt}
                            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                          >
                            <div className="flex-shrink-0">
                              {image && (
                                <Link to={item.uri}>
                                  <GatsbyImage
                                    image={image}
                                    alt={item?.thumbnail?.node?.altText || ""}
                                    className="h-48 w-full object-cover"
                                  />
                                </Link>
                              )}
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                              <div className="flex flex-1 flex-col justify-between">
                                <span className="flex-1">
                                  <p className="text-sm font-medium">
                                    {item.categories &&
                                      item.categories.nodes.map(
                                        (
                                          cat: { name: string; uri: string },
                                          i: number
                                        ) => {
                                          return (
                                            <Link
                                              to={cat.uri}
                                              className={`${
                                                i === 0 ? "" : "ml-[3px]"
                                              } text-purple-700 hover:text-purple-700`}
                                              children={cat.name}
                                            />
                                          )
                                        }
                                      )}
                                  </p>
                                  {item.title && (
                                    <p className="text-xl font-semibold text-gray-900">
                                      <Link
                                        to={item.uri}
                                        children={item.title}
                                      />
                                    </p>
                                  )}
                                  {item.excerpt && (
                                    <p className="mt-3 text-base text-gray-500">
                                      {Parser(item.excerpt)}
                                    </p>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
                  {button?.url && (
                    <span className="mt-[25px]">
                        <Link
                            className="text-lg inline-block mt-6 border rounded-lg border-purple-700 px-3 py-2"
                            to={button.url}
                            target={button.target}
                        >
                            {button.title}
                        </Link>
                    </span>
                  )}
                </span>
              </>
            )}
          </div>
        </div>
      </Edges>
    </>
  )
}

export default LatestArticles

export const fragment = graphql`
  fragment LatestArticles on WpDefaultTemplate_Flexiblecontentmodules_ContentModule {
    ... on WpDefaultTemplate_Flexiblecontentmodules_ContentModule_LatestArticles {
      fieldGroupName
      latestArticlesTitle
      latestArticlesText
      latestArticlesPostType
      latestArticlesPostLimit
      latestArticlesBackgroundColor
      latestArticlesButton {
        target
        title
        url
      }
    }
  }
`