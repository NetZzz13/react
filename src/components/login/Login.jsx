import React from "react";
import s from "./Login.module.scss";
import { reduxForm, Field } from "redux-form";
import { Input } from "../common/FormsControls";
import { required, maxLengthCreator, minLengthCreator } from "../../utils/validators/validator";

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


const maxLength10 = maxLengthCreator(10);
const maxLength16 = maxLengthCreator(16);
const minLength4 = minLengthCreator(4);
const minLength8 = minLengthCreator(8);



export const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="login" name={"login"} component={Input} validate={[required, maxLength10, minLength4]}/>
      </div>
      <div>
        <Field placeholder="password" name={"password"} component={Input} validate={[required, maxLength16, minLength8]} />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />{" "}
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
