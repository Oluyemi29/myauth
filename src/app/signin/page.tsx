import SignInForm from "@/components/SignInForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-center my-4 font-semibold ">
        Kindly fill ur Sign In details here
      </h1>
      <div className="border-2 border-blue-700 flex md:flex-row flex-col gap-5 justify-center items-center rounded-md p-5 md:w-[80%] w-full mx-auto">
        <div className="w-full">
          <Image
            src={"/authlap.png"}
            width={100}
            height={100}
            alt="authlap"
            priority
            className="md:flex md:w-[50%] mx-auto w-full hidden"
          />
          <Image
            src={"/authphone.png"}
            width={100}
            height={100}
            alt="authlap"
            className="md:hidden md:w-[50%] w-[70%] mx-auto flex"
          />
        </div>
        <div className="w-full">
          <SignInForm />
        </div>
      </div>
      <h1 className="text-center my-4 font-semibold ">
        Forget Password <Link className="text-blue-700 text-sm" href={'/forgetpassword'}>Click here</Link>
      </h1>
    </div>
  );
};

export default page;
