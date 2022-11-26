import React from "react"
import { Link, graphql } from "gatsby"

import { BannerProps } from "../../interfaces"
import Edges from "../Layout/Edges"

const Banner: React.FC<BannerProps> = props => {
  const { bannerTitle, bannerContent, bannerLink } = props

  return (
    <>
      <Edges size="lg" className="py-16 text-center bg-gray-100/75">
        {bannerTitle && <h1 className="text-5xl">{bannerTitle}</h1>}
        <hr className="w-1/3 mx-auto my-2.5 border-purple-700" />

        {bannerContent && (
          <p className="text-base pt-6 px-12">{bannerContent}</p>
        )}

        {bannerLink?.url && (
          <Link
            className="text-lg inline-block mt-6 border rounded-lg border-purple-700 px-3 py-2"
            to={bannerLink.url}
            target={bannerLink.target}
          >
            {bannerLink.title}
          </Link>
        )}
      </Edges>
    </>
  )
}

export default Banner

export const fragment = graphql`
  fragment Banner on WpDefaultTemplate_Flexiblecontentmodules_ContentModule {
    ... on WpDefaultTemplate_Flexiblecontentmodules_ContentModule_Banner {
      fieldGroupName
      bannerTitle
      bannerContent
      bannerBackgroundColor
      bannerLink {
        target
        title
        url
      }
    }
  }
`
