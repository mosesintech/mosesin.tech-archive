import React from "react"
import { Link } from "gatsby"

import useMenu from "../../../hooks/useMenu"

export default function HeaderMenu() {
  const menuItems = useMenu({ slug: "header-menu" })

  return (
    <div className="flex flex-row items-start justify-end w-full my-[15px]">
      {menuItems &&
        menuItems.map((item: any) => {
          return (
            <Link
              to={item.uri}
              activeStyle={{
                fontWeight: 700,
                color: "rgb(126, 34, 206)",
                textDecoration: "underline",
              }}
              className="mr-[15px] hover:underline decoration-purple-700"
            >
              {item.label}
            </Link>
          )
        })}
    </div>
  )
}
