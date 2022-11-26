import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../Seo"
import Header from "./Header"
import Footer from "./Footer"
import "../../styles/global.css"
import useLayoutItems from "../../hooks/useLayoutItems"

interface LayoutProps {
  children: React.ReactNode
  title?: string
  archivePath?: string // for Breadcrumbs
  isCategory?: boolean // for Breadcrumbs
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const header = useLayoutItems({ location: "header" })

  return (
    <>
      <Seo title={title} />
      <Header headerInfo={header} />
      <div className="grow">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
