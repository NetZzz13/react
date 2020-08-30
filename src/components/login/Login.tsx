import React from "react";
import s from "./Login.module.scss";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { Input } from "../common/FormsControls";
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../utils/validators/validator";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/reduxStore";

type MapStatePropsType = {
  captchaUrl: string | null | undefined;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  loginThunkCreator: (
    email: string,
    password: string,
    rememderMe: boolean,
    captcha: string
  ) => void;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormOwnProps = {
  captchaUrl: string | null | undefined;
};

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.loginThunkCreator(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
    /* console.log(formData); */
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={s.loginBlock}>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const maxLength20 = maxLengthCreator(20);
const maxLength16 = maxLengthCreator(16);
const minLength4 = minLengthCreator(4);
const minLength8 = minLengthCreator(8);

export const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.loginForm}>
      <div className={s.login}>Login</div>
      <div className={s.inputField}>
        <Field
          placeholder="Your email"
          name={"email"}
          component={Input}
          validate={[required, maxLength20, minLength4]}
          className={s.inputBlock}
        />
      </div>
      <div className={s.inputField}>
        <Field
          type="password"
          placeholder="Your password"
          name={"password"}
          component={Input}
          validate={[required, maxLength16, minLength8]}
          className={s.inputBlock}
        />
      </div>

      <div className={s.rememberMe}>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />
        <label>Remember me</label>
      </div>

      {props.captchaUrl ? (
        <div>
          <img src={props.captchaUrl} alt="captcha" />
          <Field
            placeholder="Enter captcha symbols"
            name={"captcha"}
            component={Input}
            validate={[required]}
          />
        </div>
      ) : null}

      {props.error && <div className={s.formSummaryError}>{props.error}</div>}
      <button className={s.buttonBlock}>Sign in</button>
    </form>
  );
};

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>(
  {
    form: "login",
  }
)(LoginForm);

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { loginThunkCreator })(Login);
