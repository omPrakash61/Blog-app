import { useState } from "react";
import authService from "../../appwrite/auth_service";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../../Auth-Slice/authSlice";
import { Button, Container, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e.type);
      setError("Invalid : Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 sm:p-10 border border-gray-400">

        <div className="flex justify-center mb-6">
          <div className="w-24">
            {/* <Logo /> */}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm text-center py-4 px-4 rounded mt-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              className={`mb-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none bg-white ${errors.email ? "border-red-500 shadow shadow-red-200" : ""}`}
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="py-2">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className={`mb-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none ${errors.password ? "border-red-500 shadow shadow-red-200" : ""}`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
