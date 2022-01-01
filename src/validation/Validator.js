import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validator = {
    strOnly: yup.string()
        .required('กรุณากรอกข้อมูล'),
    phone: yup.string()
        .matches(phoneRegExp, 'เบอร์โทรศัพท์ไม่ถูกต้อง')
}

