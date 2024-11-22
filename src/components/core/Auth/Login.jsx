import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = ({ setDefaultPage }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>
            Welcome back! Please login to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="example@xyz.com" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="*****************"
            />
          </div>
          <CardDescription>
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => setDefaultPage("register")}
            >
              register
            </span>
            .
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
