import { Formik } from 'formik';
import React, { Component } from 'react';
import Colors from '../components/common-style/Colors';
import FormikRadio from '../components/formik/FormikRadio';
import Logo from "../assets/logo.png";
import { withRouter } from 'react-router';
import Fonts from '../components/common-style/Fonts';
import Backgrounds from '../components/common-style/Background';
import UserType from './UserType';


class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            choices: [
                {label: "บุคลากรในรพ.สมเด็จพระปิ่นเกล้า", value: UserType.STAFF},
                {label: "ผู้รับบริการ", value: UserType.GUESS}
            ]
        }
    }

    submitHandler = (values) => {
        switch(values.userType){
            case UserType.GUESS:
                this.props.history.push("/user-info", values)
                break;
            case UserType.STAFF:
                this.props.history.push("/covid-test", values)
                break;
            default:
                console.log(values)
                break;
        }
    }

    render() {
        return (
            <div style={style.container}>
                <div style={style.headerContainer}>
                    <img style={style.logo} src={Logo}/>
                    <div style={style.textHeader}>แบบทดสอบคัดกรองความเสี่ยงต่อการติดเชื้อ COVID-19</div>
                    <div style={style.textTitle}>{`กรุณาทำแบบคัดกรองล่วงหน้าในวันที่ท่านเข้ารับบริการ\n เพิ่อลดการสัมผัสและลดระยะเวลารอคอยในการคัดกรอง`}</div>
                </div>
                <Formik 
                    initialValues={{userType: ""}}
                    enableReinitialize={true}
                    onSubmit={this.submitHandler}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => 
                        <div style={style.typeContainer}>
                            <div style={style.card}>
                                <div className="mb-2" style={Fonts.normal}>** กรุณาระบุประเภท</div>
                                <FormikRadio name="userType" choices={this.state.choices}/>
                            </div>
                            <button className="btn btn-primary btn-block" onClick={handleSubmit}>ดำเนินการต่อ</button>
                        </div>
                    }
                </Formik>
            </div>
        );
    }
}

const style = {
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
      textAlign: "center",
      marginBottom: 20,
      alignItems: 'center',
      textAlign: "center",
    },
    logo: {
      width: 120,
      height: 120,
      padding: 3,
      alignItems: "center"
    },
    textHeader: {
      fontSize: "14px",
      fontWeight: "bold"
    },
    textTitle: {
      fontSize: "14px",
      color: Colors.secondary
    },
    typeContainer: {
      flex: 1,
      textAlign: "left"
    },
    card: {
      marginBottom: 10,
      padding: 10,
      border: "1px solid",
      borderRadius: 3,
      backgroundColor: "#fff"
    }
}

export default withRouter(HomePage);