import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProtectedRouteGroup = () => {
  const toast = useToast();

  const auth = localStorage.getItem("user");
  const location = useLocation();
  const protectedRoutes = ["/student", "/educator"];

  if (
    !auth &&
    protectedRoutes.some((route) => location.pathname.startsWith(route))
  ) {
    toast({
      title: "Please login to continue",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRouteGroup;
