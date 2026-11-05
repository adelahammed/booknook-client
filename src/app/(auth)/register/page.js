"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  UserPlus,
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword(formData.password);

    if (error) {
      setPasswordError(error);
      return;
    }

    const { data, error: signUpError } = await signUp.email({
      ...formData,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign UP successful! Please signin");
      redirect("/login");
    }

    if (signUpError) {
      toast.error("Something went wrong!");
    }
  };

  const handleGoogleRegister = () => {
    toast.success("Registering with Google account...");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-xl transition-all">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
            <UserPlus className="h-6 w-6" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
            Create an Account
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Join our book sharing and borrowing community today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span>Full Name *</span>
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>Email Address *</span>
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              <span>Image URL *</span>
            </label>

            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/avatar.jpg"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>Password *</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="At least 6 chars, uppercase & lowercase"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-4 pr-11 py-2.5 rounded-xl border bg-background text-foreground text-sm focus:outline-none focus:ring-2 transition-all ${
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

            {passwordError ? (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-1">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            ) : (
              <p className="text-[11px] text-muted-foreground pt-0.5">
                Must contain at least 6 characters, 1 uppercase, and 1 lowercase
                letter.
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Register Account
            </button>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-border w-full"></div>
            <span className="bg-card px-3 text-xs text-muted-foreground uppercase font-semibold">
              Or sign up with
            </span>
            <div className="border-t border-border w-full"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full py-2.5 px-4 rounded-xl border border-border bg-card text-foreground font-medium text-sm hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
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

            <span>Register with Google</span>
          </button>
        </form>

        <div className="pt-4 text-center border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
