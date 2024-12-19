import useAuthstore from "../zustand/useAuthStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const {login,isLogin} = useAuthstore();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await login(data,navigate);
    setLoading(false)
    navigate("/")
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen" >
      <form onSubmit={handleSubmit(onSubmit)} className="flex px-4 w-xl flex-col gap-5">
        <h1 className="font-bold text-4xl text-center">Sign In</h1>
       
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <Input
            className="p-2  rounded-md focus:ring-2 focus:ring-cyan-700 outline-none"
            type="text"
            placeholder="Enter your name..."
            id="email"
            {
              ...register("email", {
                required: "Email is required",
                pattern: {
                  value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                }
              })
            }
          />
          {
            errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )
          }
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold">
            password:
          </label>
          <Input
            className="p-2 rounded-md focus:ring-2 focus:ring-cyan-700 outline-none"
            type="text"
            placeholder="Enter your name..."
            id="password"
            {
              ...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })
            }
          />
          {
            errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )
          }
        </div>
       
        <div>
        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-700">
            Sign Up
          </Link>
        </span>
        </div>
        <Button type="submit" >{isLogin ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
      </form>
    </div>
  );
};

export default LoginPage;
