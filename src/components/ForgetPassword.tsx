"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { CgPassword } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Verify from "./Verify";
import { ForgetPass } from "./server/action";

const ForgetPassword = () => {
  const [Hided, setHides] = useState(true);
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email("This is not email format"),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (data: formSchemaType) => {
    try {
      const { email } = data;
      ForgetPass(email);
      setHides(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="text-center">
      <h1 className="text-sm font-semibold text-blue-700 my-2 md:my-10">
        Forget Password
      </h1>
      <form action="" onSubmit={handleSubmit(submit)} method="post">
        <Input
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          type="email"
          placeholder="Enter Your Email"
          startContent={<MdOutlineEmail className="text-blue-700" />}
          className="rounded-xl my-5 border-blue-700 border-2"
        />
        <br />
        <Button className="mt-5 bg-blue-700 text-white px-5" type="submit">
          Submit
        </Button>
      </form>
      <Verify
        hides={Hided}
        image="/mail.png"
        texts="if ur email is correctly found in the database, a password reset button will be sent to your email shortly"
      />
    </div>
  );
};

export default ForgetPassword;
