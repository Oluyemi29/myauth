"use client";
import { Progress } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import React from "react";

interface passwordProps {
  passStr: string;
}
const PasswordStrength = ({ passStr }: passwordProps) => {
  const score = passwordStrength(passStr).id;
  const valurForProgress = () => {
    switch (score) {
      case 0:
        return 25;
      case 1:
        return 50;
      case 2:
        return 75;
      case 3:
        return 100;
      default:
        break;
    }
  };
  const valueForColor = () => {
    switch (score) {
      case 0:
        return "danger";
      case 1:
        return "warning";
      case 2:
        return "secondary";
      case 3:
        return "success";
      default:
        break;
    }
  };

  return (
    <Progress
      color={valueForColor()}
      size="sm"
      aria-label="Loading..."
      value={valurForProgress()}
    />
  );
};

export default PasswordStrength;
