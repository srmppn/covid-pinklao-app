import { Field, Formik } from 'formik';
import React, { Component } from 'react';
import Colors from '../components/common-style/Colors';
import Logo from "../assets/logo.png";
import FormikRadio from '../components/formik/FormikRadio';
import { withRouter } from 'react-router';
import Backgrounds from '../components/common-style/Background';
import Fonts from '../components/common-style/Fonts';
import correct from "../assets/correct.png"
import wrong from "../assets/wrong.png"
import UserType from './UserType';
import { TesterSchema } from '../validation/TesterSchema';

const covidTestForm = {
    URL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScJRlNftFZhJb8qptgvgJwSnNBD-hdCE49DBPI0bW11bMT0sw/formResponse"
}

class TesterPage extends Component {
    constructor(){
        super()
        this.state = {
            questions: [
                {question: "ท่านมีอาการหวัด เช่น ไอ มีน้ำมูก เจ็บคอ หรือจมูกไม่ได้กลิ่น ลิ้นไม่รับรส ภายใน 14 วันที่ผ่านมา", result: -1},
                {question: "ท่านมีประวัติเดินทางมาจากต่างประเทศ หรือพักอาศัยอยู๋ในต่างประเทศในช่วง 1 เดือนที่ผ่านมา", result: -1},
                {question: "ท่านมีประวัติสัมผัสกับผู้ป่วยยืนยัน โรคติดเชื้อ COVID-19", result: -1},
                {question: "ในสถานที่ท่านไปประจำ คนที่สนิทใกล้ชิดกับท่าน มีอาการไข้ ไอ น้ำมูก เสมหะมากกว่า 5 คน พร้อมๆ กัน ในช่วงเวลาภายในสัปดาห์หรือไม่", result: -1},
                {question: "ท่านเดินทางในยานพาหนะ (เครื่องบิน รถยนต์ รถไฟ เรือ หรือยานพาหนะอื่นๆ) เดียวกันและในช่วงเวลาเดียวกันกับผู้ป่วยยืนยัน COVID-19 ที่ทางราชการประกาศให้เข้ารับการสอบสวนโรค", result: -1},
                {question: "ท่านมีผลยืนยันการตรวจ ATK ด้วยตนเองเป็นบวก", result: -1},
                {question: "ท่านเคยมีประวัติติดเชื้อ COVID-19 น้อยกว่า 3 สัปดาห์ที่ผ่านมา", result: -1},
                {question: "วันนี้ท่านมีนัดพบแพทย์หรือไม่", result: -1},
            ],
            choices: [{label: "ใช่", value: "yes"}, {label: "ไม่ใช่", value: "no"}]
        }
    }

    componentDidMount = () => {
      const { state } = this.props.location
      if(!state){
        this.props.history.push("/")
      }
    }

    diagnoseResult = (state) => {
        const answers = Object.keys(state)
        const hasAppointment = state[answers.pop()]
        return { passed: answers.every(key => state[key] === "no"), hasAppointment: hasAppointment === "yes" };
    }

    convertJson = () => {
        return this.state.questions.map((_, index) => `covid-test-${index+1}`)
            .reduce((prev, curr) => { prev[curr] = ""; return prev}, {})
    }

    submitHandler = (values) => {
        const { state } = this.props.location
        const { passed, hasAppointment } = this.diagnoseResult(values)
        const params = {
          "entry.1944288684": state.prefix,
          "entry.38573224": state.firstname,
          "entry.1843805990": state.lastname,
          "entry.120237875": state.phone,
          "entry.1265149401": state.branch,
          "entry.1618681556": (passed ? "ผ่าน": "ไม่ผ่าน")
        }

        if(state.userType == UserType.STAFF){
          console.log("staff")
          this.props.history.push(
            "/covid-result", 
            {
              fullname: `${state.prefix} ${state.firstname} ${state.lastname}`,
              passed: passed, 
              hasAppointment: hasAppointment
            }
          )
        }
        else {
          fetch(covidTestForm.URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(params).toString()
          })
          .then(r => {
              this.props.history.push(
                  "/covid-result", 
                  {
                    fullname: `${state.prefix} ${state.firstname} ${state.lastname}`,
                    passed: passed, 
                    hasAppointment: hasAppointment
                  }
              )
          })
          .catch(e => console.log(e));
        }
    }

    setStateResult = (index, result) => {
      this.setState(prev => {
          let nextQuestion = prev.questions
            .map((q, idx) => 
              (index==idx ? { question: q.question, result: result } : q))
          return {
            questions: [...nextQuestion]
          }
        })
    }

    setSelectedButtonClass = (result, target) => {
      if(result == 1 && target == 1){
        return  "btn btn-success"
      }
      else if(result == 2 && target == 2){
        return  "btn btn-danger"
      }
      else {
        return "btn btn-outline-secondary"
      }
    }

    render() {
        return (
            <div style={style.container}>
                <div style={style.headerContainer}>
                    <img style={style.logo} src={Logo}/>
                    <div style={style.textHeader}>โรงพยาบาลสมเด็จพระปิ่นเกล้า กรมแพทย์ทหารเรือ</div>
                    <div style={style.textTitle}>แบบคัดกรองความเสี่ยงต่อการติดเชื้อ COVID-19</div>
                </div>
                <Formik 
                    initialValues={this.convertJson()}
                    validationSchema={TesterSchema}
                    enableReinitialize={true}
                    onSubmit={this.submitHandler}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => 
                        <div className="form-group">
                            {
                                this.state.questions
                                    .map(({question, result}, index) =>
                                        <div style={style.questionContainer} key={index}>
                                          <div>{`${index+1}. ${question}`}</div>
                                          <Field name={`covid-test-${index+1}`}>
                                            {({ field, form: { touched, errors }, meta }) =>
                                              (
                                                <div>
                                                  <div style={style.buttonContainer}>
                                                    <button style={style.choiceBtn} className={this.setSelectedButtonClass(result, 1)} onClick={() => {
                                                      this.setStateResult(index, 1)
                                                      setFieldValue(`covid-test-${index+1}`, "yes")
                                                    }}>
                                                      <img style={style.iconBtn} src={correct}/>
                                                      <span>ใช่</span>
                                                    </button>
                                                    <button type="submit" style={style.choiceBtn} className={this.setSelectedButtonClass(result, 2)} onClick={() => {
                                                      this.setStateResult(index, 2)
                                                      setFieldValue(`covid-test-${index+1}`, "no")
                                                    }}>
                                                      <img style={style.iconBtn} src={wrong}/>
                                                      <span>ไม่ใช่</span>
                                                    </button>
                                                  </div>
                                                  {meta.touched && meta.error && <small className="text-danger">{meta.error}</small>}
                                                </div>
                                              )}
                                          </Field>
                                      </div>
                                  )
                              }
                            <div style={style.submitContainer}>
                              <div className="mb-2">** โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน **</div>
                              <button className="btn btn-primary btn-block mb-3" onClick={handleSubmit}>ยืนยัน</button>
                            </div>
                        </div>
                    }
                </Formik>
            </div>
        );
    }
}

const style = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      ...Backgrounds.background2
    },
    headerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      textAlign: "center",
      marginBottom: 20
    },
    logo: {
      width: 120,
      height: 120,
      padding: 3,
      alignItems: "center"
    },
    textHeader: {
      color: Colors.hospitalGreen,
      fontSize: 18,
      fontWeight: "bold"
    },
    textTitle: {
      fontSize: 16
    },
    warning: {
      color: Colors.secondary,
      marginBottom: 10
    },
    questionContainer: {
      backgroundColor: "#fff",
      border: "1px solid",
      borderRadius: 3,
      padding: 10,
      marginBottom: 10
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "10px"
    },
    choiceBtn: {
      width: "145px",
      textAlign: "left",
      marginRight: 5,
      marginLeft: 5
    },
    iconBtn: {
      with: "30px",
      height: "30px"
    },
    submitContainer: {
      padding: 3,
      paddingBottom: 20,
      ...Fonts.normal
    }
}


export default withRouter(TesterPage);