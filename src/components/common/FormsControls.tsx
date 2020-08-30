import React from "react";
import s from "./FormsControls.module.scss";
import { WrappedFieldMetaProps, WrappedFieldInputProps, WrappedFieldProps } from "redux-form";

/* type FormsControlType = {
  meta: WrappedFieldMetaProps;
  input: WrappedFieldInputProps
 } */



export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  
  return (
    <div className={s.formControl + " " + (hasError ? s.error : '')}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};


export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={s.formControl + " " + (hasError ? s.error : '')}>
      <div>
        <input {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};