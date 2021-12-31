import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormikStyle as style } from './FormikStyle';
import Fonts from '../common-style/Fonts';

class FormikRadio extends React.Component {
  render() {
    const { name, suggest, choices, handleChange, handleBlur } = this.props
    return (
      <div style={style.container}>
        <Field  name={name}>
          {({ field, form: { touched, errors }, meta }) =>
            (<div>
                {
                  choices.map(({label, value}, index) => 
                    <div style={style.radio} key={index+1}>
                      <input type="radio" name={name} onChange={field.onChange} value={value} />
                      <div className="ml-2" style={Fonts.normal}>{label}</div>
                    </div>
                  )
                }
              {suggest}
            </div>)}
        </Field>
      </div>
    )
  }
}

export default FormikRadio;