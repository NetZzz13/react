import React from "react";
import s from "./Login.module.scss";
import { reduxForm, Field } from "redux-form";
import { Input } from "../common/FormsControls";
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../utils/validators/validator";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.loginThunkCreator(
      formData.email,
      formData.password,
      formData.rememberMe
    );
    console.log(formData);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={s.loginBlock}>
      <div>Login</div>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const maxLength20 = maxLengthCreator(20);
const maxLength16 = maxLengthCreator(16);
const minLength4 = minLengthCreator(4);
const minLength8 = minLengthCreator(8);

export const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="email"
          name={"email"}
          component={Input}
          validate={[required, maxLength20, minLength4]}
        />
      </div>
      <div>
        <Field
          type="password"
          placeholder="password"
          name={"password"}
          component={Input}
          validate={[required, maxLength16, minLength8]}
        />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />{" "}
        Remember Me
      </div>
      {props.error && <div className={s.formSummaryError}>{props.error}</div>}
      <button>Push</button>
    </form>
  );
};

export const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { loginThunkCreator })(Login);
