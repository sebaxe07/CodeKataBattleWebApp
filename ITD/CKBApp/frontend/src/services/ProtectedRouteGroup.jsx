import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProtectedRouteGroup = () => {
  const toast = useToast();

  let auth = localStorage.getItem("user") ? true : false;
  console.log(auth);
  if (!auth) {
    toast({
      title: "Please login to continue",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRouteGroup;
