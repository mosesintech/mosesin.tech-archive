import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Head from "./Head"

function Seo(props: any) {
  const { description, lang, meta, title } = props
  const { allWp } = useStaticQuery(
    graphql`
      query {
        allWp {
          nodes {
            generalSettings {
              title
              description
            }
          }
        }
      }
    `
  )

  const metaDescription =
    description || allWp?.nodes[0]?.generalSettings?.description
  const defaultTitle = allWp?.nodes[0]?.generalSettings?.title

  return (
    <Head
      title={title}
      titleTemplate={` | ${defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        // {
        //   name: `twitter:creator`,
        //   content: site.siteMetadata?.author || ``,
        // },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default Seo
