"use server";
import ToastSuccess from "../ToastSuccess";
import ToastError from "../ToastError";
import { PrismaClient } from "@prisma/client";
import Handlebars from "handlebars";
import mailTemplate from "@/lib/mailTemplate";
import sendEMail from "@/lib/sendEMail";
import bcrypt from "bcrypt";
import resetPasswordTemplate from "@/lib/resetPasswordTemplate";
import { redirect } from "next/navigation";
import resetPasswordMail from "@/lib/resetPasswordMail";
const prisma = new PrismaClient();

type formSchemaType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};
export const SignUp = async (data: formSchemaType) => {
  try {
    const { email, firstName, lastName, password, phone } = data;
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existUser) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        firstName,
        lastName,
        password: hashedPassword,
        phone,
        email,
      },
    });
    const name = result.firstName;
    const myEmail = result.email;
    const url = `${process.env.NEXTAUTH_URL}/authenticated/${result.id}`;
    const template = Handlebars.compile(mailTemplate);
    const body = template({
      name,
      url,
    });
    sendEMail({ myEmail, body });
    // console.log(body);
  } catch (error) {
    console.log(error);
  }
};

export const verifiedEmail = async (id: string) => {
  // console.log(id);
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};

export const ForgetPass = async (email: string) => {
  const checkMail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (checkMail) {
    const name = checkMail.firstName;
    const myMail = checkMail.email;
    const url = `${process.env.NEXTAUTH_URL}/resetpassword/${checkMail.id}`;
    const template = Handlebars.compile(resetPasswordTemplate);
    const body = template({
      name,
      url,
    });
    resetPasswordMail({myMail,body})
  }
};

type resetProps = {
  password: string;
  id: string;
};

export const ResetPass = async ({ password, id }: resetProps) => {
  const getDetails = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  const hashedPassword = await bcrypt.hash(password, 10);
  if (getDetails) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    redirect("/signin");
  }
};
