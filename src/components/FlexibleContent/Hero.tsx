import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { HeroProps } from "../../interfaces"
import Edges from "../Layout/Edges"

const Hero: React.FC<HeroProps> = props => {
  const {
    heroTitle,
    heroText,
    heroBackgroundImage,
    heroPrimaryButton,
    heroSecondaryButton,
  } = props

  const image =
    heroBackgroundImage?.localFile && getImage(heroBackgroundImage.localFile)

  return (
    <div className="relative">
      <div className={`h-40 -z-10`}>
        {image && (
          <GatsbyImage
            image={image}
            className="h-full"
            alt={heroBackgroundImage?.altText || ""}
          />
        )}
      </div>
      <Edges size="lg" className="absolute text-white inset-7">
        {heroTitle && <h1>{heroTitle}</h1>}
        {heroText && <p children={heroText} />}

        {heroPrimaryButton && (
          <Link to={`${heroPrimaryButton.url}`}>{heroPrimaryButton.title}</Link>
        )}

        {heroSecondaryButton && (
          <Link to={`${heroSecondaryButton.url}`}>
            {heroSecondaryButton.title}
          </Link>
        )}
      </Edges>
    </div>
  )
}

export default Hero

export const fragment = graphql`
  fragment Hero on WpDefaultTemplate_Flexiblecontentmodules_ContentModule {
    ... on WpDefaultTemplate_Flexiblecontentmodules_ContentModule_Hero {
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
      heroPrimaryButton {
        target
        title
        url
      }
      heroSecondaryButton {
        target
        title
        url
      }
    }
  }
`
