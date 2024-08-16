"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiStop } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import { HiXMark } from "react-icons/hi2";

type hidesProps = {
  hides: boolean;
  image: string;
  texts: string;
};
const Verify = ({ hides, image, texts }: hidesProps) => {
  const [off, setOff] = useState(false);

  return (
    <div
      hidden={hides || off}
      className="w-full h-screen z-10 bg-black fixed inset-0 justify-center items-center backdrop-blur-sm bg-opacity-25 "
    >
      <div className="w-full h-screen  flex flex-col justify-center items-center">
        <div className="bg-white text-center rounded-md py-5 px-14 w-max">
          <div className="w-full flex justify-center">
            <Image
              src={image}
              width={100}
              height={100}
              alt="mails-confirming"
              priority
              quality={95}
              className="md:w-48 w-24"
            />
          </div>
          <h1 className="my-10 text-center text-sm w-60">{texts}</h1>
          <Button
            className="bg-blue-500 px-6 text-white"
            onClick={() => setOff(true)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
