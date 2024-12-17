import axiosInstance from "../lib/axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthstore from "../zustand/useAuthStore";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const {isSignUp,Signup} = useAuthstore();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Signup(data);
    reset();
    navigate("/login")
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center h-screen" >
      <form onSubmit={handleSubmit(onSubmit)} className="flex px-4 w-96 flex-col text-wrap gap-5">
        <h1 className="font-bold text-4xl text-center">Sign Up</h1>
        <div className="flex flex-col gap-1  ">
          <label htmlFor="name" className="font-semibold">
            Name:
          </label>
          <Input
            className="p-2 rounded-md focus:ring-2 focus:ring-cyan-700 outline-none"
            type="text"
            placeholder="Enter your name..."
            id="name"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Name must only contain letters and spaces",
              },
              minLength: {
                value: 8,
                message: "Name must be at least 8 characters",
              },
            })}
          />
          {
            errors.name && (
              <p className="text-red-500 text-wrap text-sm">{errors.name.message}</p>
            )
          }
        </div>
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
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold">
            Confirm password:
          </label>
          <Input
            className="p-2  rounded-md focus:ring-2 focus:ring-cyan-700 outline-none"
            type="text"
            placeholder="Enter your name..."
            id="confirmPassword"
            {
              ...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === password || "Passwords do not match",
              })
            }
          />
          {
            errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )
          }
        </div>
        <div>
        <span>
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-700">
            Login
          </Link>
        </span>
        </div>
        <Button type="submit" >{isSignUp ? <Loader2 className="animate-spin"/> : "Submit"}</Button>
      </form>
    </div>
  );
};

export default Signup;
