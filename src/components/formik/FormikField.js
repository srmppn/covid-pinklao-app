import React from 'react';
import { Field } from 'formik';
import { FormikStyle as style } from './FormikStyle';
import Fonts from '../common-style/Fonts';

class FormikField extends React.Component {
  render() {
    const { label, name, suggest, placeholder, handleChange, handleBlur } = this.props
    return (
      <div style={style.container}>
        <div>{label}</div>
        <Field name={name}>
          {({ field, form: { touched, errors }, meta }) =>
            (<div style={Fonts.normal}>
              <input
                className="form-control"
                name={name}
                style={style.input}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={placeholder}
                value={field.value} />
              {meta.touched && meta.error && <small className="text-danger">{meta.error}</small>}
            </div>)}
        </Field>
      </div>
    )
  }
}

export default FormikField;