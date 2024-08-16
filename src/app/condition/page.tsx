import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-center underline underline-offset-2 my-5 font-bold">Terms and Conditions</h1>
      <p className="text-sm font-semibold">
        <span className="font-extrabold">Account Security:</span> Users are
        responsible for maintaining the confidentiality of their login
        credentials. Please use a strong password and do not share your account
        details with others.
      </p>
      <p className="text-sm font-semibold">
        <span className="font-extrabold">Account Usage:</span> Your account is
        personal to you. Please do not use it to impersonate others or engage in
        any activity that is harmful or unlawful.
      </p>
      <p className="text-sm font-semibold">
        <span className="font-extrabold">Data Privacy:</span> We respect your
        privacy and will not share your personal information with third parties
        without your consent, except as required by law.
      </p>
      <p className="text-sm font-semibold">
        <span className="font-extrabold">Account Termination:</span> We reserve
        the right to suspend or terminate accounts that violate these terms.
        However, we aim to be reasonable and will notify you of any issues
        before taking action.
      </p>
      <p className="text-sm font-semibold">
        <span className="font-extrabold">Service Availability:</span> While we
        strive to provide uninterrupted access, there may be times when the
        service is temporarily unavailable due to maintenance or unforeseen
        issues.
      </p>
      <p className="text-sm font-semibold">
        <span className="font-extrabold">Feedback and Suggestions:</span> We
        welcome your feedback and suggestions to improve the service. However,
        any contributions you make become the property of the service.
      </p>
      <p className="text-sm font-semibold">
        <span className="font-extrabold">Changes to Terms:</span> These terms
        may be updated occasionally. We will notify you of any significant
        changes.
      </p>
      <Link href={"/signup"} className="flex flex-row justify-center md:justify-start">
        <Button className="px-5 bg-blue-700 text-white my-5">
          Back to Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default page;
