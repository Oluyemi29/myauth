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
import { ResetPass } from "@/components/server/action";

type idProps ={
  id : string
}

const PasswordReseting = ({id} : idProps) => {
  const [seePassword, setSeePassword] = useState(false);

  const formSchema = z.object({
    password: z
      .string()
      .min(5, "Password too short")
      .max(20, "Password too long"),
    confirmPassword: z
      .string()
      .min(5, "Password too short")
      .max(20, "Password too long"),
  }).refine((values)=>{
    return values.password === values.confirmPassword
  },{
    message: "Password does not match",
    path : ["confirmPassword"]
  })

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
      const { password,confirmPassword } = data;
      ResetPass({password,id});
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
        <Input
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
          isInvalid={!!errors.confirmPassword}
          type={seePassword ? "text" : "password"}
          placeholder="Confirm Your Password"
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
        <Button className="mt-5 bg-blue-700 text-white px-5" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PasswordReseting;
