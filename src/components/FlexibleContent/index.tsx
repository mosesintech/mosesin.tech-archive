import React, { lazy } from "react"

import { FlexibleContentModules } from "../../interfaces"

const Banner = lazy(() => import("./Banner"))
const FeatureLinks = lazy(() => import("./FeatureLinks"))
const Hero = lazy(() => import("./Hero"))
const LatestArticles = lazy(() => import("./LatestArticles"))
const TextImage = lazy(() => import("./TextImage"))

interface Props {
  modules?: any
  data?: {
    title?: string
    uri?: string
    slug?: string
  }
}

const components: FlexibleContentModules = {
  Banner,
  FeatureLinks,
  Hero,
  LatestArticles,
  TextImage,
}

const FlexibleContent: React.FC<Props> = props => {
  const { modules, data } = props

  if (!!modules) {
    return modules
      .filter((module: any) => !!module)
      .map((module: any, index: any) => {
        const { fieldGroupName } = module
        if (!fieldGroupName) {
          return null
        }

        const type: keyof FlexibleContentModules = fieldGroupName
          .split("_")
          .slice(-1)[0]

        const Component = components[type]

        return (
          Component && (
            <div key={index}>
              <Component {...module} {...data} />
            </div>
          )
        )
      })
  }
}

export default FlexibleContent
