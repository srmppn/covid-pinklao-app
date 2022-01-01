import React, { Component } from 'react';
import FormikField from '../components/formik/FormikField';
import FormikSelect from '../components/formik/FormikSelect';
import Colors from '../components/common-style/Colors';
import Logo from "../assets/logo.png";
import { Formik } from 'formik';
import { withRouter } from 'react-router';
import Backgrounds from '../components/common-style/Background';
import { UserSchema } from '../validation/UserSchema';

class UserPage extends Component {

    constructor(){
        super()
        this.state = {
            branchOptions: [
            { label: "-- เลือกหน่วยบริการ --", value: "default" },
            { label: "หน่วยที่ 1", value: "branch1" },
            { label: "หน่วยที่ 2", value: "branch2" }
          ]
        }
    }

    submitHandler = (values) => {
      this.props.history.push("/covid-test", values)
    }

    render() {
        return (
        <div style={styles.container}>
            <div>
                <img style={styles.logo} src={Logo}/>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>แบบคัดกรองความเสี่ยงต่อการติดเชื้อ COVID-19</div>
                <div style={styles.title}>โรงพยาบาลสมเด็จพระปิ่นเกล้า กรมแพทย์ทหารเรือ</div>
            </div>
            <div style={styles.form}>
                <Formik 
                  initialValues={{prefix: "", firstname: "", lastname: "", phone: "", branch: ""}}
                  validationSchema={UserSchema}
                  onSubmit={this.submitHandler}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                    <div className="form-group">
                        <FormikField name="prefix" placeholder="คำนำหน้า" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikField name="firstname" placeholder="ชื่อจริง" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikField name="lastname" placeholder="นามสกุล" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikField name="phone" placeholder="เบอร์โทรศัพท์" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikSelect name="branch" options={this.state.branchOptions} setFieldValue={setFieldValue} />
                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit} style={styles.button}>ดำเนินการต่อ</button>
                    </div>
                    )}
                </Formik>
            </div>
        </div>
      );
    }
}

const styles = {
    container: {
      display: "flex",
      padding: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "column",
      ...Backgrounds.background1
    },
    headerContainer: {
      textAlign: 'center',
      marginBottom: 20
    },
    logo: {
      width: 120,
      height: 120,
      padding: 3,
      alignItems: "center"
    },
    header: {
      color: Colors.hospitalGreen,
      fontSize: 18,
      fontWeight: "bold"
    },
    title: {
      fontSize: 15,
      color: Colors.secondary
    },
    form: {
      padding: 20
    }
}

export default withRouter(UserPage);
