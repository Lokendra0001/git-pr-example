"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { Sparkles, ArrowRight, PenLine, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";

export default function CreatePostPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Sentry.metrics.count("test-metric", 1);
    // throw new Error("This is my new Error!");
    // return;
    const startTime = performance.now();
    try {
      const res = await axios.post("http://localhost:3002/api/post", data);

      const endtime = performance.now() - startTime;
      Sentry.metrics.distribution("api_time_takes", endtime, {
        unit: "milliseconds",
      });
      if (res.data.success) {
        alert("Post Created Successfully!");
        router.push("/");
      }
    } catch (error) {
      // Sentry.captureException(`Error: ${error?.response?.data?.msg || error}`);
      const eventId = Sentry.captureException(error, {
        extra: {
          backendMsg: error?.response?.data?.msg,
          status: error?.response?.data?.success,
        },
      });

      Sentry.showReportDialog({ eventId });
      console.log(error);
      console.log("Error +", error?.response?.data?.msg || error);
      // console.error("Error creating post:", error);
      // alert("Failed to create post. See console.");
    }
  };

  const handleClick = () => {
    Sentry.metrics.count("api_hit", 1);
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-400";

  // return (
  //   <button
  //     className="bg-indigo-500 m-15 p-5 rounded-3xl cursor-pointer text-white"
  //     onClick={handleClick}
  //   >
  //     Hit Api
  //   </button>
  // );
  // return (
  //   <button
  //     className="m-15 p-10 bg-blue-300"
  //     onClick={() => Sentry.captureException(new Error("This is Test Error!"))}
  //   >
  //     Throw New Error
  //   </button>
  // );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 w-full max-w-xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Link
              href="/"
              className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200"
            >
              <PenLine className="w-6 h-6 text-white" />
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create New Post
          </h1>
          <p className="text-slate-500 mt-2 font-medium italic">
            Share your thoughts with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative group">
            <PenLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              {...register("title", { required: "Title is required" })}
              className={inputClass}
              placeholder="Post Title"
            />
            {errors.title && (
              <p className="text-[10px] font-bold text-rose-500 absolute -bottom-4 left-4 uppercase tracking-widest">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="relative group">
            <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`${inputClass} min-h-[150px] pt-4 resize-none`}
              placeholder="Write your story..."
            />
            {errors.description && (
              <p className="text-[10px] font-bold text-rose-500 absolute -bottom-4 left-4 uppercase tracking-widest">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-4 rounded-[1.25rem] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:shadow-indigo-200 mt-6 flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-slate-300"
          >
            {isSubmitting ? "Generating..." : "Publish Post"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-10 font-bold">
          <Link href="/" className="text-indigo-600 hover:underline">
            &larr; Back to Feed
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
