import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setDefaultPage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submitRegisterForm = async (formData) => {
    const toastId = toast.loading("Please Wait...");
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signup`, formData);
      setLoading(false);
      toast.dismiss(toastId);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setDefaultPage("login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit(submitRegisterForm)}>
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
                <Input
                  id="firstName"
                  placeholder="Pedro "
                  {...register("firstName", { required: true })}
                />
                {errors.firstname && (
                  <span className="-mt-1 text-[12px] text-red-600">
                    Please enter your first name.
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Duarte"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="-mt-1 text-[12px] text-red-600">
                    Please enter your first name.
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="example@xyz.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-red-600">
                  Please enter your Email address.
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="*****************"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              {errors.password && (
                <span className="-mt-1 text-[12px] text-red-600">
                  {errors.password.message}
                </span>
              )}
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
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
