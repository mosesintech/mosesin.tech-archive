import React from "react"

interface EdgesProps {
  children: React.ReactNode
  size: "sm" | "md" | "hr" | "lg"
  fullWidth?: boolean
  [x: string]: any
}

const Edges = (props: EdgesProps) => {
  const { size, fullWidth, sx, ...rest } = props

  return (
    <div
      style={{
        margin: "0 auto",
        width: fullWidth ? "100%" : "90%",
        maxWidth:
          (size === "sm" && "600px") ||
          (size === "md" && "1024px") ||
          (size === "hr" && "1155px") ||
          (size === "lg" && "1280px"),
        ...sx,
      }}
      {...rest}
    />
  )
}

export default Edges
