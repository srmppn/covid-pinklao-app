import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Backgrounds from '../components/common-style/Background';
import Colors from '../components/common-style/Colors';
import Fonts from '../components/common-style/Fonts';
import Cartoon from "../assets/cartoon.png"

const feedbackForm = {
    URL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe6KFh5sz3RlzxuAOuOEUYzkcgwva6OJjpr-IuBvoifYnFWcQ/formResponse"
}

class ResultPage extends Component {

    constructor(){
        super();
        this.state = {
          score: -1,
          show: false
        }
    }

    passedComponent = (hasAppointment) => {
        return <div style={style.resultContainer}>
            <icon style={style.iconSuccess} className='fas fa-check-circle'/>
            <div style={style.textResult}>{`ท่านได้รับการตรวจสอบ\n คัดกรอง Covid-19 แล้ว`}</div>
            <div style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</div>
            <div>{`กรุณาแสดงหน้าจอนี้ให้กับเจ้าหน้าที่\n เพื่อเข้ารับบริการของโรงพยาบาล`}</div>
        </div>
    }

    nonPassedComponent = (hasAppointment) => {
        return <div style={style.resultContainer}>
            <icon style={style.iconDanger} className='exclamation-circle'/>
            <div style={style.textResult}>ท่านไม่ผ่านการคัดกรอง Covid-19</div>
            <div style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</div>
            <div>{`** กรุณาติดต่อเจ้าหน้าที่ **`}</div>
        </div>
    }

    feedbackComponent = () => {
        const feedbackChoices = [
            {name: "fas fa-frown-open", color: Colors.customRed, score: 0},
            {name: "fas fa-frown", color: Colors.customOrange, score: 1},
            {name: "fas fa-meh", color: Colors.customYellow,score: 2},
            {name: "fas fa-smile", color: Colors.customGreen, score: 3},
            {name: "fas fa-smile-wink", color: Colors.customDarkGreen, score: 4}
        ]
        const selectedStyle = {
            ...style.feedBackIcon,
            fontSize: 60
        }
        return <div style={style.feedbackContainer}>
            <div style={Fonts.normal}><b>ประเมินความพึงพอใจของท่านในการใช้งาน</b></div>
            <div style={style.feedbackIconContainer}>
                {
                    feedbackChoices
                        .map(({name, color, score}) =>
                            {
                                return <icon
                                    style={{color: color, ...(score == this.state.score ? selectedStyle : style.feedBackIcon)}} 
                                    className={name} 
                                    onClick={() => this.setState({score: score})}
                                    />
                            }
                        )
                }
            </div>
            {/* this.sendFeedback(this.state.score) */}
            <button className="btn btn-primary btn-block" onClick={() => this.setState({show: true})}>ยืนยัน</button>
        </div>
    }

    modalComponent = () => {
      return <Modal size="sm" show={this.state.show} onHide={() => this.setState({show: false})} centered>
        <Modal.Body>
          <div style={style.modalContainer}>
            <img style={style.cartoonPic} src={Cartoon}/>
            <div>ระบบได้ทำการบันทึกผลการประเมินของท่านเรียบร้อยแล้ว</div>
          </div>
        </Modal.Body>
      </Modal>
    }

    sendFeedback = (score) => {
        const params = {
          "entry.150406700": score
        }
        fetch(feedbackForm.URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(params).toString()
        })
        .then(r => {
        })
        .catch(e => console.log(e))
    }

    render() {
        const { state: {passed, hasAppointment} } = this.props.location
        console.log(passed)
        const background = {
          border: `1px (${passed ? Colors.darkGreen: Colors.darkRed})`,
          backgroundColor: (passed ? Colors.lightGreen: Colors.lightRed)
        }
        return (
            <div style={style.container}>
                <div style={{...style.card, ...background}}>
                    {
                        passed ?
                            this.passedComponent(hasAppointment)
                            :
                            this.nonPassedComponent(hasAppointment)
                    }
                </div>
                {this.feedbackComponent()}
                {this.modalComponent()}
            </div>
        );
    }
}

const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      ...Backgrounds.background1
    },
    card: {
      borderWidth: 1,
      width: 300,
      height: 300,
      borderRadius: 3
    },
    resultContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: 20
    },
    textResult: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 10,
      fontWeight: "bold",
    },
    iconSuccess: {
      fontSize: 60,
      color: Colors.success
    },
    iconDanger: {
      fontSize: 60,
      color: Colors.warning
    },   
    feedbackContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: 30,
      width: 300
    },
    feedbackIconContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 10
    },
    feedBackIcon: {
      fontSize: 30,
      marginLeft: 5,
      marginRight: 5
    },
    modalContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center"
    },
    cartoonPic: {
      width: 150,
      height: 150
    }
}

export default withRouter(ResultPage);