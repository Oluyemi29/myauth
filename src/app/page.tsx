import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen md:justify-center md:items-center">
      <div className="flex flex-col md:flex-row w-full md:w-[80%] justify-between">
        <div className="w-full ">
          <Image
            src={"/sec-bg.png"}
            width={100}
            height={100}
            alt="comfort"
            className="w-[50%] my-5 md:mx-0 mx-auto"
          />
        </div>
        <div className="w-full md:text-left text-center">
          <h1 className="text-blue-700 text-4xl font-extrabold">
            Welcome Real Developer
          </h1>
          <p className="text-sm my-5">
            Were excited to have you here. To access all the features and
            services we offer, please take a moment to sign up or sign in.
            Simply click on the button below to get started. Whether youre
            joining us for the first time or returning, were here to ensure a
            seamless experience. Thank you for choosing us, and we look forward
            to serving you!
          </p>
          <div className=" flex w-max md:mx-0 mx-auto gap-5 mt-10 ">
            <Link href={'/signup'}><Button className="text-sm px-5 hover:scale-110 font-semibold text-white bg-blue-700">
              Sign Up
            </Button></Link>
            <Link href={'/signin'}><Button className="text-sm px-5 hover:scale-110 font-semibold text-white bg-blue-700">
              SIgn In
            </Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
