import React, { useState } from "react";
import authService from "../../appwrite/auth_service.js";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../index.js";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit,formState: { errors }, } = useForm();

  const create = async (data) => {
    // console.log(data);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        navigate("/login");
      }
      // console.log(userData);
    } catch (error) {
      setError("User already exists with same Email");
      // console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-9">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 sm:p-10 border border-gray-400">
        <div className="flex justify-center mb-6">
          <div className="w-24">
            {/* <Logo width="100%" /> */}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign up to create an account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 bold text-sm text-center py-4 px-4 rounded mt-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          <div>
            <Input
              className={`mb-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none ${errors.name ? "border-red-500 shadow shadow-red-200" : ""}`}
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-600 ms-2">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Input
            className={`mb-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none ${errors.email ? "border-red-500 shadow shadow-red-200" : ""}`}
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm ms-2 text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Input
              className={`mb-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none ${errors.password ? "border-red-500 shadow shadow-red-200" : ""}`}
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm ms-2 text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
