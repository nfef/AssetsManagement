import React from 'react'
import ContentLoader from 'react-content-loader'

const ListLoader = () => {
  return (
    <div >
      <FadingLoaderCard1 />
      <FadingLoaderCard2 />
      <FadingLoaderCard3 />
      <FadingLoaderCard4 />
      <FadingLoaderCard5 />
    </div>
  )
}

const FadingLoaderCard1 = () => {
  return (
    <ContentLoader
      width={"100%"}
      height={40}
      backgroundColor="#ababab"
      foregroundColor="#fafafa"
    >
      <rect x="250" y="15" rx="5" ry="5" width="63%" height="15" />
      <rect x="250" y="39" rx="5" ry="5" width="45%" height="9" />
      <rect x="150" y="10" rx="0" ry="0" width="8%" height="40" />
    </ContentLoader>
  )
}

const FadingLoaderCard2 = () => {
  return (
    <ContentLoader
      width={"100%"}
      height={40}
      backgroundColor="#bfbfbf"
      foregroundColor="#fafafa"
    >
      <rect x="250" y="15" rx="5" ry="5" width="63%" height="15" />
      <rect x="250" y="39" rx="5" ry="5" width="45%" height="9" />
      <rect x="150" y="10" rx="0" ry="0" width="8%" height="40" />
    </ContentLoader>
  )
}

const FadingLoaderCard3 = () => {
  return (
    <ContentLoader
      width={"100%"}
      height={40}
      backgroundColor="#dadada"
      foregroundColor="#fafafa"
    >
      <rect x="250" y="15" rx="5" ry="5" width="63%" height="15" />
      <rect x="250" y="39" rx="5" ry="5" width="45%" height="9" />
      <rect x="150" y="10" rx="0" ry="0" width="8%" height="40" />
    </ContentLoader>
  )
}

const FadingLoaderCard4 = () => {
  return (
    <ContentLoader
      width={"100%"}
      height={40}
      backgroundColor="#ececec"
      foregroundColor="#fafafa"
    >
      <rect x="250" y="15" rx="5" ry="5" width="63%" height="15" />
      <rect x="250" y="39" rx="5" ry="5" width="45%" height="9" />
      <rect x="150" y="10" rx="0" ry="0" width="8%" height="40" />
    </ContentLoader>
  )
}

const FadingLoaderCard5 = () => {
  return (
    <ContentLoader
      width={"100%"}
      height={40}
      backgroundColor="#f7f7f7"
      foregroundColor="#fafafa"
    >
      <rect x="250" y="15" rx="5" ry="5" width="63%" height="15" />
      <rect x="250" y="39" rx="5" ry="5" width="45%" height="9" />
      <rect x="150" y="10" rx="0" ry="0" width="8%" height="40" />
    </ContentLoader>
  )
}

export default ListLoader