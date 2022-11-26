import { useStaticQuery, graphql } from "gatsby"

const usePostData = () => {
  const { allWpPost } = useStaticQuery(
    graphql`
      query PostQuery {
        allWpPost {
          nodes {
            ...PostFragment
          }
        }
      }
    `
  )
  return { allWpPost }
}

export default usePostData