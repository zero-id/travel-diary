import React from "react";
import { useAppDispatch } from "../../../store";
import { signInAPI } from "../../../libs/api/call/auth";
import { getUser } from "../../../libs/api/call/user";
import { SET_LOGIN } from "../../../store/slice/auth";

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const [formSignIn, setFormSignIn] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormSignIn({ ...formSignIn, [e.target.name]: e.target.value });
  };

  const handleSubmit = async ({
    e,
    onClose,
  }: {
    e: React.FormEvent;
    onClose: () => void;
  }) => {
    e.preventDefault();
    try {
      const response = await signInAPI(formSignIn);
      const token = response.data.access_token;

      localStorage.setItem("token", token);
      const resUser = await getUser(token);

      dispatch(SET_LOGIN({ user: resUser.data.data, token }));

      onClose();
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const resUser = await getUser(token);
        dispatch(SET_LOGIN({ user: resUser.data.data, token }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formSignIn,
    handleChange,
    handleSubmit,
    checkAuth,
  };
};

export default useSignIn;
