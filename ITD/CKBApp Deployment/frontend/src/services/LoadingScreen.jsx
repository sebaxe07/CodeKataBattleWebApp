import React from "react";

import { Spinner } from "@chakra-ui/react";

export const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(35, 30, 81, 0.5)",
        zIndex: 9999,
      }}
    >
      <Spinner boxSize={20} color="#ff55d7" thickness="6px" />
    </div>
  );
};

export default LoadingScreen;
