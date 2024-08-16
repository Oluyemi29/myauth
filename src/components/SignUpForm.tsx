"use client";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { CgPassword } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcContacts } from "react-icons/fc";
import { IoCall } from "react-icons/io5";
import { MdContacts, MdOutlineEmail } from "react-icons/md";
import PasswordStrength from "./PasswordStrength";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "module";
import { SignUp } from "./server/action";
import toast from "react-hot-toast";
import Verify from "./Verify";

const SignUpForm = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [Hided, setHides] = useState(true);

  const formSchema = z
    .object({
      firstName: z
        .string()
        .min(4, "Minimum of 4 chars")
        .max(20, "Maximum of 20 chars"),
      lastName: z
        .string()
        .min(4, "Minimum of 4 chars")
        .max(20, "Maximum of 20 chars"),
      email: z.string().email("This is not email format"),
      phone: z.string().min(5, "too short").max(25, "too long"),
      password: z
        .string()
        .min(5, "Password too short")
        .max(20, "Password too long"),
      confirmPassword: z
        .string()
        .min(5, "Password too short")
        .max(20, "Password too long"),
      condition: z.boolean().refine(
        (value) => {
          return value === true;
        },
        { message: "you must agreed to the terms and condition" }
      ),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      { message: "Password does not match", path: ["confirmPassword"] }
    );

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = (data: formSchemaType) => {
    try {
      const { confirmPassword, condition, ...others } = data;
      SignUp(others);
      toast.success("registration successfull");
      setHides(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="text-center">
      <h1 className="text-sm font-semibold text-blue-700 my-2">Sign Up</h1>
      <form action="" onSubmit={handleSubmit(submit)} method="post">
        <Input
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
          isInvalid={!!errors.firstName}
          type="text"
          placeholder="Enter Your First Name"
          startContent={<MdContacts className="text-blue-700" />}
          className="rounded-xl my-5 border-blue-700 border-2"
        />
        <Input
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          isInvalid={!!errors.lastName}
          type="text"
          placeholder="Enter Your Last Name"
          startContent={<MdContacts className="text-blue-700" />}
          className="rounded-xl my-5 border-blue-700 border-2"
        />
        <Input
          {...register("phone")}
          errorMessage={errors.phone?.message}
          isInvalid={!!errors.phone}
          type="text"
          placeholder="Enter Your Phone Number"
          startContent={<IoCall className="text-blue-700" />}
          className="rounded-xl my-5 border-blue-700 border-2"
        />
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
        <PasswordStrength passStr={watch().password} />
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
        <Checkbox
          {...register("condition")}
          type="checkbox"
          size="sm"
          className="text-blue-700 text-sm"
        >
          Agree to{" "}
        </Checkbox>
        <Link
          className="ml-2 text-sm text-blue-700 underline underline-offset-2"
          href={"/condition"}
        >
          Terms & Condition
        </Link>{" "}
        <br />
        {errors.condition && (
          <span className="text-red-700 text-[0.6rem]">
            {errors.condition.message}
          </span>
        )}
        <br />
        <Button className="mt-5 bg-blue-700 text-white px-5" type="submit">
          Sign Up
        </Button>
      </form>
      <Verify
        hides={Hided}
        image="/mail.png"
        texts="Check ur mail for verification"
      />
    </div>
  );
};

export default SignUpForm;
