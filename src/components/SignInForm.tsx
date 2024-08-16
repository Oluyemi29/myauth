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

const SignInForm = () => {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email("This is not email format"),
    password: z
      .string()
      .min(5, "Password too short")
      .max(20, "Password too long"),
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
      const { email, password } = data;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("login successful");
        router.push("/profile");
      } else {
        toast.error("incorrect credentials or unverified email");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="text-center">
      <h1 className="text-sm font-semibold text-blue-700 my-2 md:my-10">
        Sign In
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
        <Input
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          type={seePassword ? "text" : "password"}
          placeholder="Enter Your Password"
          startContent={<CgPassword className="text-blue-700" />}
          className="rounded-xl my-5 border-blue-700 border-2"
          endContent={
            seePassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={() => setSeePassword(!seePassword)}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                onClick={() => setSeePassword(!seePassword)}
              />
            )
          }
        />
        <br />
        <Button className="mt-5 bg-blue-700 text-white px-5" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
