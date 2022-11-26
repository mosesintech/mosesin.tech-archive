import { graphql } from "gatsby"

export const defaultFragment = graphql`
  fragment DefaultTemplateFragment on WpDefaultTemplate {
    templateName
    flexibleContentModules {
      contentModule {
        ...Banner
        # ...CallToAction
        # ...Carousel
        # ...DataTable
        # ...Faq
        ...FeatureLinks
        # ...Form
        # ...Gallery
        ...Hero
        ...LatestArticles
        # ...LinkBoxes
        # ...List
        # ...Location
        # ...Logos
        # ...NavBlock
        # ...SupportTiers
        # ...TextArea
        # ...TextBlock
        ...TextImage
        # ...Videos
      }
    }
  }
`
