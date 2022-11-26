import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { FeatureLinksProps } from "../../interfaces"
import Edges from "../Layout/Edges"

const FeatureLinks: React.FC<FeatureLinksProps> = props => {
  const {
    featureLinksTitle,
    featureLinksText,
    featureLinksButton,
    featureLinks,
  } = props

  return (
    <>
      <Edges size="lg" className="py-16 text-center bg-gray-100/75">
        {featureLinksTitle && <h2 className="text-4xl">{featureLinksTitle}</h2>}
        {featureLinksText && <p>{featureLinksText}</p>}

        <span className="flex flex-row items-center justify-center my-4">
          {featureLinks &&
            featureLinks.map(link => {
              const image =
                link?.image?.localFile && getImage(link?.image?.localFile)

              return (
                <div className="flex flex-col items-center justify-end px-12 my-6 w-1/3 border border-purple-700 first:border-l-0 border-y-0 last:border-r-0">
                  {link.title && <h4 className="text-lg">{link.title}</h4>}
                  <hr className="w-1/3 mx-auto mb-4 border-purple-700" />

                  {image && (
                    <GatsbyImage
                      image={image}
                      className="w-full rounded-lg shadow-lg object-cover object-center"
                      alt={link?.image?.altText || ""}
                    />
                  )}

                  {link.text && <h4 className="text-sm mt-4">{link.text}</h4>}

                  {link?.button?.url && (
                    <Link
                      className="text-sm inline-block mt-6 border rounded-lg border-purple-700 px-1.5 py-1"
                      to={link?.button.url}
                      target={link?.button.target}
                    >
                      {link?.button.title}
                    </Link>
                  )}
                </div>
              )
            })}
        </span>

        {featureLinksButton?.url && (
          <Link
            className="text-lg inline-block mt-6 border rounded-lg border-purple-700 px-3 py-2"
            to={featureLinksButton.url}
            target={featureLinksButton.target}
          >
            {featureLinksButton.title}
          </Link>
        )}
      </Edges>
    </>
  )
}

export default FeatureLinks

export const fragment = graphql`
  fragment FeatureLinks on WpDefaultTemplate_Flexiblecontentmodules_ContentModule {
    ... on WpDefaultTemplate_Flexiblecontentmodules_ContentModule_FeatureLinks {
      fieldGroupName
      featureLinksTitle
      featureLinksText
      featureLinksButton {
        target
        title
        url
      }
      featureLinks {
        title
        text
        image {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 90, width: 300, height: 300)
            }
          }
        }
        button {
          target
          title
          url
        }
      }
    }
  }
`
