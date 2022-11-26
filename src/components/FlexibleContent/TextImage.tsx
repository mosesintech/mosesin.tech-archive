import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Parser from "html-react-parser"

import { TextImageProps } from "../../interfaces"
import Edges from "../Layout/Edges"

const TextImage: React.FC<TextImageProps> = props => {
  const {
    textImageTitle,
    textImageSubtitle,
    textImageText,
    textImagePosition,
    textImageButton,
    textImage,
    altImage,
  } = props

  const image = textImage?.localFile && getImage(textImage.localFile)
  const alternativeImage = altImage?.localFile && getImage(altImage.localFile)
  const aboveTitle = textImagePosition === "Above Title"
  const belowTitle = textImagePosition === "Below Title"
  const belowText = textImagePosition === "Below Text"

  return (
    <>
      <Edges size="lg" className="py-16 bg-gray-100/75">
        {/* 
            Ternary checks Left of Text first, then Right of Text.
            If neither, then returns default layout.
        */}
        {textImagePosition === "Left of Text" ? (
          <div className="flex flex-row items-start px-12">

            {image && (
                <GatsbyImage image={image} alt={textImage?.altText || ""} className="w-1/2 mr-4 rounded-lg shadow-lg object-cover object-center" />
            )}

            <span className="w-1/2 ml-4">
                {textImageTitle && <h2 children={textImageTitle} className="text-4xl" />}
                <hr className="w-1/3 my-2.5 border-purple-700" />

                {textImageSubtitle && <h3 children={textImageSubtitle} />}

                <div className="text-base">{textImageText && Parser(textImageText)}</div>
                
                {textImageButton && (
                <a href={textImageButton.url} children={textImageButton.title} />
                )}
            </span>
          </div>
        ) : textImagePosition === "Right of Text" ? (
          <div className="flex flex-row items-start px-12">
            <span className="w-1/2 mr-4">
                {textImageTitle && <h2 children={textImageTitle} className="text-4xl" />}
                <hr className="w-1/3 my-2.5 border-purple-700" />

                {textImageSubtitle && <h3 children={textImageSubtitle} />}

                <div className="text-base">{textImageText && Parser(textImageText)}</div>
                
                {textImageButton && (
                <a href={textImageButton.url} children={textImageButton.title} />
                )}
            </span>

            {image && (
              <GatsbyImage image={image} alt={textImage?.altText || ""} className="w-1/2 ml-4 rounded-lg shadow-lg object-cover object-center" />
            )}

          </div>
        ) : (
          <>
            {/* Above Title, Below Title, Below Text options */}
            {aboveTitle && (
              <>
                <figure>
                  {alternativeImage && (
                    <GatsbyImage
                      image={alternativeImage}
                      alt={altImage?.altText || ""}
                    />
                  )}
                </figure>
              </>
            )}

            {textImageTitle && <h2 children={textImageTitle} />}

            {textImageSubtitle && <h3 children={textImageSubtitle} />}

            {belowTitle && (
              <>
                {alternativeImage && (
                  <GatsbyImage
                    image={alternativeImage}
                    alt={altImage?.altText || ""}
                  />
                )}
              </>
            )}

            <div>{textImageText && Parser(textImageText)}</div>

            {textImageButton && (
              <a href={textImageButton.url} children={textImageButton.title} />
            )}

            {belowText && (
              <>
                {alternativeImage && (
                  <GatsbyImage
                    image={alternativeImage}
                    alt={altImage?.altText || ""}
                  />
                )}
              </>
            )}
          </>
        )}
      </Edges>
    </>
  )
}

export default TextImage

export const fragment = graphql`
  fragment TextImage on WpDefaultTemplate_Flexiblecontentmodules_ContentModule {
    ... on WpDefaultTemplate_Flexiblecontentmodules_ContentModule_TextImage {
      fieldGroupName
      textImageTitle
      textImageText
      textImagePosition
      textImageBackgroundColor
      textImageButton {
        target
        title
        url
      }
      textImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1184, height: 1376, placeholder: BLURRED)
          }
        }
      }
      altImage: textImage {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1310, height: 873, placeholder: BLURRED)
          }
        }
      }
    }
  }
`