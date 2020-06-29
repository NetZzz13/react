import React from "react";
import s from "./Login.module.scss";
import { reduxForm, Field } from "redux-form";

const Login = (props) => {
  
  const onSubmit = (formData) => {
    console.log(formData)
  }
  return (
    <div className={s.loginBlock}>
      <div>Login</div>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};

export const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="login" name={"login"} component="input" />
      </div>
      <div>
        <Field placeholder="password" name={"password"} component="input" />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component="input" />{" "}
        Remember Me
      </div>
      <button>Push</button>
    </form>
  );
};

export const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

export default Login;
