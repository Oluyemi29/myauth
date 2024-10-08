"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
}

export default AppProvider;
