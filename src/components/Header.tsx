"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Navbar className="shadow-md bg-slate-100 rounded-md">
      <NavbarBrand>
        <p className="font-bold text-blue-700">AUTH</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {status === "authenticated" ? (
          <>
            <NavbarItem>
              <Link href="/profile">
                <Button className="text-sm px-5 hover:scale-110 font-semibold text-white bg-blue-700">
                  {session?.user?.firstName}
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => {
                  signOut();
                  // router.push("/signin");
                }}
                className="text-sm px-5 hover:scale-110 font-semibold text-white bg-blue-700"
              >
                Sign Out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="lg:flex">
              <Link
                className="hover:scale-110 hover:text-blue-600 text-blue-700"
                href="/signin"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/signup">
                <Button className="text-sm px-5 hover:scale-110 font-semibold text-white bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
