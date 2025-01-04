import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Lock, Compass, Flag } from "lucide-react";
import { PiMountainsDuotone } from "react-icons/pi";
import authService from "@/services/auth";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-5">
      {[...Array(20)].map((_, i) => (
        <React.Fragment key={i}>
          <PiMountainsDuotone
            className="absolute animate-float opacity-20 text-blue-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random() * 0.5}) rotate(${
                Math.random() * 30 - 15
              }deg)`,
            }}
          />
          <Compass
            className="absolute animate-float opacity-20 text-sky-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.3 + Math.random() * 0.3})`,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  </div>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    try {
      const createdUser = await authService.createUser(data);
      const userData = {
        _id: createdUser.data.loggedInUser._id,
        fullName: createdUser.data.loggedInUser.fullName,
        email: createdUser.data.loggedInUser.email,
      };
      if (createdUser) {
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 flex items-center justify-center p-4 relative overflow-hidden">
      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/90 border-2 border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <PiMountainsDuotone className="h-16 w-16 text-sky-400 animate-bounce" />
        </div>

        <CardHeader className="space-y-1 pt-8">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">
            Reach New Heights
          </CardTitle>
          <p className="text-sm text-center text-gray-600">
            Begin your ascent to the summit
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(create)} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-4 h-4 w-4 text-sky-400" />
                <Input
                  id="name"
                  placeholder="Name"
                  className="pl-10 h-12 border-slate-200 focus:border-sky-400 focus:ring-sky-400"
                  {...register("fullName", { required: "Name is required" })}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-4 h-4 w-4 text-sky-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 h-12 border-slate-200 focus:border-sky-400 focus:ring-sky-400"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Please select your gender" }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-sky-400">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {gender.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {error && (
                      <p className="text-sm text-red-500">{error.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-4 w-4 text-sky-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 h-12 border-slate-200 focus:border-sky-400 focus:ring-sky-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-sky-400 to-blue-300 hover:from-sky-500 hover:to-blue-400 text-white font-medium rounded-lg transition-all duration-300"
            >
              Begin Your Ascent
              <Flag className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              Already part of the expedition?{" "}
            </span>
            <br />
            <button
              onClick={() => navigate("/login")}
              className="text-sky-500 hover:text-sky-600 font-medium transition-colors duration-300"
            >
              Return to Base Camp (Login)
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
