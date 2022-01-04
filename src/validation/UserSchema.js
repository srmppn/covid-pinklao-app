import * as Yup from 'yup';
import { validator } from './Validator';

export const UserSchema = Yup.object().shape({
    prefix: validator.strOnly,
    firstname: validator.strOnly,
    lastname: validator.strOnly,
    phone: validator.phone
});