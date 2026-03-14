"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ArrowRight,
  Sparkles,
  Clock,
  User,
  ChevronRight,
  Monitor,
  Database,
  ShieldCheck,
  Heart,
  PlusCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/auth", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log("No user session found");
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/post");
        if (res.data.success) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await axios.patch("http://localhost:3002/api/post", {
        postId,
      });
      console.log(res)
      if (res.data.success) {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? { ...post, likes: res.data.updatedLikes }
              : post,
          ),
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              Dev<span className="text-indigo-600">Flow</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/create-post"
              className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Create Post
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900 italic">
                  Hello, {user.name}
                </span>
                <button
                  onClick={() => setUser(null)}
                  className="btn-ghost text-sm rounded-full px-4 py-2 border border-slate-200 hover:bg-slate-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/signin" className="btn-ghost text-sm">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary text-sm">
                  <span>Join Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Version 2.0 is now live</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Write faster. Scale <br />
              <span className="text-gradient">smarter than ever.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Global infrastructure, managed caching, and edge-native
              authentication built for the next generation of web developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create-post"
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3"
              >
                Create Post
                <PlusCircle className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Real Feed
            </h2>
            <h3 className="text-4xl font-bold text-slate-900 leading-tight">
              Latest post from <br /> our database.
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest anim-pulse">
            Loading Posts...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="blog-card group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                      <Database className="w-5 h-5 text-indigo-500" />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h4>

                  <p className="text-slate-500 text-sm leading-relaxed mb-auto pb-8">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        Anonymous
                      </span>
                    </div>

                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all active:scale-90"
                    >
                      <Heart className="w-4 h-4 fill-rose-600" />
                      <span className="text-sm font-bold">{post.likes}</span>
                    </button>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">
                  No posts found. Be the first to create one!
                </p>
                <Link
                  href="/create-post"
                  className="text-indigo-600 font-bold hover:underline mt-2 inline-block"
                >
                  Create Post &rarr;
                </Link>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          &copy; 2026 DevFlow Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
