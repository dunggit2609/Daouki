import { useAuthAction } from "hooks/useAuthAction";
import React from "react";
import LoginForm from "../LoginForm";

function Login(props) {
  const { OnSubmit } = useAuthAction("login");
  return (
    <div>
      <LoginForm OnSubmit={OnSubmit} />
    </div>
  );
}

export default Login;
