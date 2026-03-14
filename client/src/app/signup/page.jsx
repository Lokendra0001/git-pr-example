"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Signup Payload:", data);

    try {
      const res = await axios.post("http://localhost:3002/api/auth", data, {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log("Error Malik Error : ", error);
    }
  };

  const inputStyle =
    "w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 block mb-2"
          >
            DevBlog
          </Link>
          <h1 className="text-xl font-bold text-slate-900">
            Create your account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className={inputStyle}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className={inputStyle}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className={inputStyle}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Mobile Number
            </label>
            <input
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: { value: /^[0-9]+$/, message: "Numbers only" },
              })}
              className={inputStyle}
              placeholder="+91 9876543210"
            />
            {errors.mobile && (
              <p className="text-xs text-red-500 mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                City
              </label>
              <input
                {...register("city")}
                className={inputStyle}
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Country
              </label>
              <input
                {...register("country")}
                className={inputStyle}
                placeholder="Country"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors mt-4"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-indigo-600 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
