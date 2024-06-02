import React from "react";
import { signUpAPI } from "../../../libs/api/call/auth";

const useSignUp = () => {
  const [formSignUp, setFormSignUp] = React.useState<{
    fullname: string;
    phone: string;
    address: string;
    email: string;
    password: string;
  }>({
    fullname: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormSignUp({ ...formSignUp, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async ({
    e,
    onClose,
    onOpenLogin,
  }: {
    e: React.FormEvent;
    onClose: () => void;
    onOpenLogin: () => void;
  }) => {
    e.preventDefault();
    try {
      const response = await signUpAPI(formSignUp);
      console.log(response);
      alert("Sign Up Success");
      onClose();
      onOpenLogin();
    } catch (error) {
      console.log(error);
      alert("Sign Up Failed");
    }
  };

  return {
    formSignUp,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useSignUp;
