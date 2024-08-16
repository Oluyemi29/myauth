import { verifiedEmail } from "@/components/server/action";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type paramsProps = {
  params: {
    id: string;
  };
};
const page = ({ params: { id } }: paramsProps) => {
  //   console.log(id);
  verifiedEmail(id);
  return (
    <div className="flex flex-col justify-center mt-10 items-center w-full">
      <Image
        src={"/verified.png"}
        width={100}
        height={100}
        alt="verified"
        priority
        quality={95}
        className=" md:w-[20%] w-[50%] h-[50%] md:h-[20%] animate-pulse"
      />
      <h1 className="text-blue-700 font-bold">You have been Authenticated</h1>
      <Link href={"/signin"}>
        <Button className="bg-blue-700 px-6 text-white mt-5">Login</Button>
      </Link>
    </div>
  );
};

export default page;
