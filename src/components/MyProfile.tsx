"use client";
import { useSession } from "next-auth/react";
import React from "react";

const MyProfile = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated")
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        {" "}
        <h1 className="animate-pulse text-4xl text-center font-bold text-red-600">
          UNAUTHORIZED ACCESS
        </h1>
      </div>
    );

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex text-center flex-col justify-center items-center">
        {" "}
        <h1 className="animate-pulse text-4xl font-bold text-yellow-500">
          Loading
        </h1>
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <div className="w-full md:w-[50%] flex flex-col gap-5 mt-5 border-2 rounded-lg mx-auto border-blue-700 p-5">
        <div className="flex items-center w-full gap-2">
          <h1 className="w-52 font-semibold text-blue-700">First name :</h1>
          <input
            readOnly
            className="bg-slate-300 w-full h-12 px-4 text-black font-bold rounded-xl"
            value={session?.user?.firstName}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <h1 className="w-52 font-semibold text-blue-700">Last name :</h1>
          <input
            readOnly
            className="bg-slate-300 w-full h-12 px-4 text-black font-bold rounded-xl"
            value={session?.user?.lastName}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <h1 className="w-52 font-semibold text-blue-700">Email :</h1>
          <input
            readOnly
            className="bg-slate-300 w-full h-12 px-4 text-black font-bold rounded-xl"
            value={session?.user?.email as string}
            type="email"
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <h1 className="w-52 font-semibold text-blue-700">Email Verified:</h1>
          <input
            readOnly
            className="bg-slate-300 w-full h-12 px-4 text-black font-bold rounded-xl"
            value={session?.user?.emailVerified as any}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <h1 className="w-52 font-semibold text-blue-700">Phone Number :</h1>
          <input
            readOnly
            className="bg-slate-300 w-full h-12 px-4 text-black font-bold rounded-xl"
            value={session?.user?.phone}
          />
        </div>
        <div className="flex items-center w-full gap-2">
          <h1 className="w-52 font-semibold text-blue-700">Created At :</h1>
          <input
            readOnly
            className="bg-slate-300 w-full h-12 px-4 text-black font-bold rounded-xl"
            value={session?.user?.createdAt as any}
          />
        </div>
      </div>
    );
  }
};

export default MyProfile;
