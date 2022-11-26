import React from "react"

type Meta = {
  name?: string
  property?: string
  content?: string
}

interface HeadProps {
  title?: string
  titleTemplate?: string
  meta?: Meta[]
}

const Head: React.FC<HeadProps> = props => {
  const { title, titleTemplate, meta } = props

  return (
    <>
      <title>
        {title}
        {titleTemplate}
      </title>
      {meta &&
        meta.map(m => (
          <meta name={m.name} content={m.content} property={m.property} />
        ))}
    </>
  )
}

export default Head
