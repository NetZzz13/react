import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FilterType } from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/user-selectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
  term: string;
  friend: "true" | "false" | "null";
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);

  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    //преобразование "true" | "false" | "null"
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
          ? true
          : false,
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
      enableReinitialize={true}
        initialValues={{ term: filter.term, friend: String(filter.friend) as "true" | "false" | "null"}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field as="select" name="friend">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <ErrorMessage name="email" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
