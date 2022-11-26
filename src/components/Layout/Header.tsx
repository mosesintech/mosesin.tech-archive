import * as React from "react"

import Edges from "./Edges"
import HeaderMenu from "./Menus/HeaderMenu"
import FlexibleContent from "../../components/FlexibleContent"

interface HeaderProps {
  headerInfo: any
}

const Header: React.FC<HeaderProps> = ({ headerInfo }) => (
  <>
    {!!headerInfo && (
      <FlexibleContent
        modules={headerInfo.flexibleContentModules.contentModule}
      />
    )}
    <Edges size="lg">
      <HeaderMenu />
    </Edges>
  </>
)

export default Header
