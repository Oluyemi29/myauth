"use client"
import SignUpForm from "@/components/SignUpForm";
import Verify from "@/components/Verify";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  
  return (
    <div>
      <h1 className="text-center my-4 font-semibold ">
        Kindly fill ur Sign Up details here
      </h1>
      <div className="border-2 border-blue-700 flex md:flex-row flex-col gap-5 rounded-md p-5 md:w-[80%] w-full mx-auto">
        <div className="w-full">
          <Image
            src={"/authlap.png"}
            width={100}
            height={100}
            alt="authlap"
            priority
            className="md:flex w-full hidden"
          />
          <Image
            src={"/authphone.png"}
            width={100}
            height={100}
            alt="authlap"
            className="md:hidden mx-auto flex"
          />
        </div>
        <div className="w-full">
          <SignUpForm />
        </div>
      </div>
      <h1 className="text-center my-4 font-semibold ">
        Already have an Acount?{" "}
        <Link className="text-blue-700 text-sm" href={"/signin"}>
          SIgn In
        </Link>
      </h1>
      
    </div>
  );
};

export default page;
