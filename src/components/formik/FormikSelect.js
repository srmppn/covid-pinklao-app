import React, { Component } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormikStyle as style } from './FormikStyle';

export default class FormikSelect extends Component {
  constructor(){
    super();
    this.state = {
      default: "default"
    }
  }

  render() {
    const { label, name, suggest, options } = this.props
    return (
      <div style={style.container}>
        <div>{label}</div>
        <Field name={name}>
          {({ field, form: { touched, errors }, meta }) =>
            (
            <select className="form-control" style={style.select} defaultValue={field.value} name={name}>
              { options.map(
                  (option, index) => <option key={index} style={style.input} label={option.label} value={option.value} />) }
            </select>
          )}
        </Field>
      </div>
    )
  }
}
