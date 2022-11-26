import { PageProps } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

type Button = {
  target?: string
  title?: string
  url?: string
}

type Image = {
  altText?: string
  localFile?: IGatsbyImageData
}

export interface FlexibleContentProps extends PageProps {
  title?: string
  slug?: string
}

export interface BannerProps extends FlexibleContentProps {
  bannerTitle?: string
  bannerContent?: string
  bannerBackgroundColor?: string
  bannerLink?: Button
}

interface FeatureLink {
  title?: string
  text?: string
  image?: Image
  button?: Button
}

export interface FeatureLinksProps extends FlexibleContentProps {
  featureLinksTitle?: string
  featureLinksText?: string
  featureLinksBackgroundColor?: string
  featureLinksButton?: Button
  featureLinks?: FeatureLink[]
}

export interface HeroProps extends FlexibleContentProps {
  heroTitle?: string
  //   heroSubtitle?: string
  heroText?: string
  heroImage?: Image
  heroBackgroundColor?: string
  heroBackgroundVideo?: string
  heroBackgroundImage?: Image
  heroSingleImage?: {
    image: Image
  }
  heroGallery?: []
  heroPrimaryButton?: Button
  heroSecondaryButton?: Button
}

export interface LatestArticlesProps extends FlexibleContentProps {
  latestArticlesTitle?: string
  latestArticlesText?: string
  latestArticlesPostType?: string
  latestArticlesPostLimit?: string
  latestArticlesBackgroundColor?: string
  latestArticlesButton?: Button
}

export interface TextImageProps extends FlexibleContentProps {
  textImageTitle?: string
  textImageSubtitle?: string
  textImageText?: string
  textImagePosition?: string
  textImageBackgroundColor?: string
  textImageButton?: Button
  textImage?: Image
  altImage?: Image
}

export interface ArticleItem {
  title: string
  excerpt: string
  uri: string
  categories: { nodes: any }
  thumbnail: {
    node: Image
  }
  archiveThumbnail: {
    node: Image
  }
}

export interface FlexibleContentModules {
  Banner: React.FC<BannerProps>
  FeatureLinks: React.FC<FeatureLinksProps>
  Hero: React.FC<HeroProps>
  LatestArticles: React.FC<LatestArticlesProps>
  TextImage: React.FC<TextImageProps>
}

export interface TemplatePageProps extends PageProps {
  data: {
    page: {
      title?: string
      uri?: string
      slug?: string
      template?: any
    }
  }
}
