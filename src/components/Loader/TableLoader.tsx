import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props:any) => {
  const random = 0.5;
  let width = window.innerWidth - 250;
  return (
    <ContentLoader
      height={40}
      width={"100%"}
      speed={2}
      foregroundColor="#d9d9d9"
      {...props}
    >
      <rect x={30*width/1060} y="15" rx="4" ry="4" width="6" height="6.4" />
      <rect x={64*width/1060} y="13" rx="6" ry="6" width={200 * random} height="12" />
      <rect x={643*width/1060} y="13" rx="6" ry="6" width={23 * random} height="12" />
      <rect x={683*width/1060} y="13" rx="6" ry="6" width={78 * random} height="12" />
      <rect x={785*width/1060} y="13" rx="6" ry="6" width={117 * random} height="12" />
      <rect x={968*width/1060} y="13" rx="6" ry="6" width={83 * random} height="12" />

      <rect x="0" y="39" rx="6" ry="6" width={width} height=".3" />
    </ContentLoader>
  );
};

const TableLoader = () => {
  return (
    <React.Fragment>
      {Array(7)
        .fill("")
        .map((e, i) => (
          <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
        ))}
    </React.Fragment>
  );
}

export default TableLoader;
