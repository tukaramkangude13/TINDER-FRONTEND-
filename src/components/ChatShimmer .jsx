import React from "react";
import ContentLoader from "react-content-loader";
import { useSelector } from "react-redux";

const ChatShimmer = () => (
  <ContentLoader
    width="100%"
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Chat bubble loader */}
    <rect x="10" y="20" rx="10" ry="10" width="250" height="20" />
    <rect x="10" y="50" rx="10" ry="10" width="180" height="20" />
    <rect x="10" y="80" rx="10" ry="10" width="220" height="20" />
  </ContentLoader>
);


export default ChatShimmer;
