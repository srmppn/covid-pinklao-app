import * as Yup from 'yup';
import { validator } from './Validator';

const range = [...Array(8).keys()];

export const TesterSchema = Yup.object().shape(
    range.map((_, index) => `covid-test-${index+1}`)
            .reduce((prev, curr) => { prev[curr] = validator.strOnly; return prev}, {})
);