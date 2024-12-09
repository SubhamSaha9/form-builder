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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "@/slice/authSlice";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setDefaultPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submitLoginForm = async (formData) => {
    const toastId = toast.loading("Please Wait...");
    console.log(formData);
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signin`, formData, {
        withCredentials: true,
      });
      toast.dismiss(toastId);
      setLoading(false);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard/forms");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.response?.data.message || error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit(submitLoginForm)}>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Welcome back! Please login to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
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
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
