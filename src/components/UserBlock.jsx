"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogIn, UserPlus, LogOut, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserBlocks({ setMobileMenuOpen }) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const usersignout = async () => {
    await signOut();
    toast.success("Logout successful!");
    router.push("/");
  };

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors outline-none cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.image || undefined}
                alt={user.name || "User Avatar"}
              />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user.name}</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <Link
                href="/my-profile"
                className="flex items-center gap-2 w-full"
              >
                <UserIcon className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={usersignout}
              className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2 w-full"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-row gap-2">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen?.(false)}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 transition-colors w-full"
          >
            <LogIn className="h-4 w-4 text-primary" />
            <span>Login</span>
          </Link>

          <Link
            href="/register"
            onClick={() => setMobileMenuOpen?.(false)}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 transition-colors w-full"
          >
            <UserPlus className="h-4 w-4" />
            <span>Register</span>
          </Link>
        </div>
      )}
    </div>
  );
}
