import { useAuthAction } from "hooks/useAuthAction";
import React from "react";
import RegisterForm from "../RegisterForm";

function Register(props) {
  const {OnSubmit} = useAuthAction("register");
  return (
    <div>
      <RegisterForm OnSubmit={OnSubmit} />
    </div>
  );
}

export default Register;
