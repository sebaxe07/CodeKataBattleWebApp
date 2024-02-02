import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProtectedRouteGroup = () => {
  const toast = useToast();

  const auth = localStorage.getItem("user");
  const location = useLocation();
  const protectedRoutes = ["/student", "/educator"];

  console.log("Protected Route");
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
    console.log("auth " + auth);
    console.log("location.pathname " + location.pathname);
    console.log("OUTLET");
    return <Outlet />;
  }
};

export default ProtectedRouteGroup;
