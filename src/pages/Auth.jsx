import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/core/Auth/Login";
import Register from "@/components/core/Auth/Register";
import Logo from "../assets/logo.svg";
const Auth = () => {
  const [defaultPage, setDefaultPage] = useState("login");
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center">
      <div className="w-full h-20 md:w-[50%] md:h-[100vh] bg-purple-500 text-white flex flex-col items-center justify-center">
        <img src={Logo} alt="logo" className="h-10 md:h-48 text-white" />
        <h1 className="text-xl md:text-5xl font-bold">
          Subham.io Form Builder
        </h1>
      </div>
      <div className="flex items-center justify-center w-[90%] md:w-[50%] h-[74vh] md:h-[100vh]">
        <Tabs
          defaultValue="login"
          value={defaultPage}
          onValueChange={setDefaultPage}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login setDefaultPage={setDefaultPage} />
          </TabsContent>
          <TabsContent value="register">
            <Register setDefaultPage={setDefaultPage} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
