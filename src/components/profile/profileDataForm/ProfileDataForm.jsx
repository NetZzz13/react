import React from "react";
import s from "../profileInfo/ProfileInfo.module.scss";
import { Field, reduxForm } from "redux-form";
import { Input, Textarea } from "../../common/FormsControls";
import {
  required,
  maxLengthCreator,
  minLengthCreator,
} from "../../../utils/validators/validator";
import styles from "../../login/Login.module.scss"


const ProfileDataForm = (props) => {
  const maxLength20 = maxLengthCreator(20);
  const minLength4 = minLengthCreator(4);

  return (
    <form onSubmit={props.handleSubmit}>
      {props.error && <div className={styles.formSummaryError}>{props.error}</div>}

     
      <div className={s.nickname}>
        <b>Full name: </b>
        <Field
          placeholder="FullName"
          name={"fullName"}
          component={Input}
          validate={[required, maxLength20, minLength4]}
        />
        
      </div>

      <div>
        <b>About me: </b>
        <Field
          placeholder="enter some text about you..."
          name={"aboutMe"}
          component={Textarea}
          /* validate={[required, maxLength20, minLength4]} */
        />
      </div>
      <div>
        <b>Looking for a job:</b>

        <Field
          placeholder="LookingForAJob"
          name={"lookingForAJob"}
          component={Input}
          type={"checkbox"}
          /* validate={[required, maxLength20, minLength4]} */
        />

        <div>
          <b>My professional skills:</b>
          <Field
            placeholder="my skills..."
            name={"lookingForAJobDescription"}
            component={Textarea}
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
                  /* validate={[required, maxLength20, minLength4]} */
                />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

export const ProfileReduxForm = reduxForm({
  form: "profileEditForm",
})(ProfileDataForm);

export default ProfileReduxForm;
