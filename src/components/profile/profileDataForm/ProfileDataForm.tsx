import React from "react";
import s from "../profileDataForm/ProfileDataForm.module.scss";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { Input, Textarea } from "../../common/FormsControls";
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../../utils/validators/validator";
import styles from "../../login/Login.module.scss";
import { ProfileType } from "../../../types/types";

type PropsType = {
  profile: ProfileType;
};

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = (props) => {
  const maxLength20 = maxLengthCreator(20);
  const minLength4 = minLengthCreator(4);

  return (
    <form onSubmit={props.handleSubmit} className={s.profileEditMode}>
      {props.error && (
        <div className={styles.formSummaryError}>{props.error}</div>
      )}

      <div>
        <b>Full name: </b>
        <Field
          placeholder="FullName"
          name={"fullName"}
          component={Input}
          validate={[required, maxLength20, minLength4]}
          className={s.inputsEditForm}
        />
      </div>

      <div>
        <b>About me: </b>
        <Field
          placeholder="enter some text about you..."
          name={"aboutMe"}
          component={Textarea}
          className={s.textareaEditForm}
          /* validate={[required, maxLength20, minLength4]} */
        />
      </div>
      <div>
        <div className={s.lookingForAJob}>
          <b>Looking for a job:</b>

          <Field
            placeholder="LookingForAJob"
            name={"lookingForAJob"}
            component={Input}
            type={"checkbox"}
            className={s.lookingForAJobInput}
            /* validate={[required, maxLength20, minLength4]} */
          />
        </div>

        <div>
          <b>My professional skills:</b>
          <Field
            placeholder="my skills..."
            name={"lookingForAJobDescription"}
            component={Textarea}
            className={s.textareaEditForm}
            /* validate={[required, maxLength20, minLength4]} */
          />
        </div>
      </div>

      <div>
        <b>Contacts:</b>
        <div className={s.contacts}>
          {Object.keys(props.profile.contacts).map((elem) => {
            return (
              <div className={s.contact} key={elem}>
                <b>{elem}:</b>
                <Field
                  placeholder={elem}
                  //contacts is an object, so we have to indicate elem of this object for right sending to server
                  name={"contacts." + elem}
                  component={Input}
                  className={s.inputsEditForm}
                  /* validate={[required, maxLength20, minLength4]} */
                />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button className={s.saveEditMode}>Save</button>
      </div>
    </form>
  );
};

export const ProfileReduxForm = reduxForm<ProfileType, PropsType>({
  form: "profileEditForm",
})(ProfileDataForm);

export default ProfileReduxForm;
