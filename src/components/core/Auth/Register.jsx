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

const Register = ({ setDefaultPage }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            New to this site? Please Register yourself.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1 flex flex-col md:flex-row md:items-center md:gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Pedro " />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Duarte" />
            </div>
          </div>
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
            Already regitered?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => setDefaultPage("login")}
            >
              login
            </span>
            .
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
