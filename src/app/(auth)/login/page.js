"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pass) => {
    if (pass.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    toast.error("Forget Password option is not available");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign In successfull!");
    }

    if (error) {
      toast.error("Something went error!");
      console.log("error is", error);
    }
  };

  const signInGoogle = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    return data;
  };

  const signInGithub = async () => {
    const data = await signIn.social({
      provider: "github",
    });
    return data;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-xl transition-all">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
            Account Login
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Sign in to continue borrowing and managing your books
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>Email Address *</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Password *</span>
              </label>
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Forget Password?
              </button>
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className={`w-full pl-4 pr-11 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500/30"
                    : "border-border focus:ring-primary/40 focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {passwordError && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-1">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            Login
          </button>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-border w-[200px] "></div>
            <span className=" bg-card px-3 w-full text-center text-xs text-muted-foreground uppercase font-semibold mx-auto">
              Or continue with
            </span>
            <div className="border-t border-border w-[200px]"></div>
          </div>

          <button
            type="button"
            onClick={signInGoogle}
            className="w-full py-3 px-4 rounded-xl border border-border bg-card text-foreground font-medium text-sm hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Login with Google</span>
          </button>
        </form>

        <div className="pt-4 text-center border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-primary hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
