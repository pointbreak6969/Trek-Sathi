// src/LoginPage.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "@/services/auth";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const login = async (data) => {
    try {
      const session = await authService.login(data);
      const userData = {
        _id: session.data.loggedInUser._id,
        fullName: session.data.loggedInUser.fullName,
        email: session.data.loggedInUser.email,
      };
      if (session?.data) {
        dispatch(authLogin(userData));

        navigate("/classroom");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full"
              {...register("password", { required: true })}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
