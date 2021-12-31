import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Backgrounds from '../components/common-style/Background';
import Colors from '../components/common-style/Colors';
import Fonts from '../components/common-style/Fonts';
import Cartoon from "../assets/cartoon.png"
import Passed from "../assets/passed.png"
import Unpassed from "../assets/unpassed.png"

const feedbackForm = {
    URL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe6KFh5sz3RlzxuAOuOEUYzkcgwva6OJjpr-IuBvoifYnFWcQ/formResponse"
}

class ResultPage extends Component {

    constructor(){
        super();
        this.state = {
          score: -1,
          hasSendFeedback: false,
          showSuccess: false,
          showDuplicate: false
        }
    }

    passedComponent = (hasAppointment) => {
        return <div>
            <div style={style.resultPicContainer}>
              <img style={style.resultPic} src={Passed}/>
            </div>
            <div style={{...style.card, ...{backgroundColor: Colors.lightGreen, border: `1px solid ${Colors.darkGreen}`}}}>
                <div style={style.resultContainer}>
                  <div style={style.textResult}>{`ท่านได้รับการตรวจสอบ\n คัดกรอง Covid-19 แล้ว`}</div>
                  <div style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</div>
                <div>{`กรุณาแสดงหน้าจอนี้ให้กับเจ้าหน้าที่\n เพื่อเข้ารับบริการของโรงพยาบาล`}</div>
            </div>
          </div>
        </div>
    }

    nonPassedComponent = (hasAppointment) => {
        return <div>
          <div style={style.resultPicContainer}>
            <img style={style.resultPic} src={Unpassed}/>
          </div>
          <div style={{...style.card, ...{backgroundColor: Colors.lightRed, border: `1px solid ${Colors.darkRed}`}}}>
            <div style={style.resultContainer}>
              <icon style={style.iconDanger} className='exclamation-circle'/>
              <div style={style.textResult}>ท่านไม่ผ่านการคัดกรอง Covid-19</div>
              <div style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</div>
              <div>{`** กรุณาติดต่อเจ้าหน้าที่ **`}</div>
            </div>
          </div>
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
            <button className="btn btn-primary btn-block" onClick={() => this.sendFeedback(this.state.score)}>ยืนยัน</button>
        </div>
    }

    feedBackDuplicateModalComponent = () => {
      return <Modal size="sm" show={this.state.showDuplicate} onHide={() => this.setState({showDuplicate: false})} centered>
        <Modal.Body>
          <div style={style.modalContainer}>
            <div>ขออภัยท่านได้เคยประเมินความพึงพอใจไปแล้ว</div>
          </div>
        </Modal.Body>
      </Modal>
    }

    feedbackModalComponent = () => {
      return <Modal size="sm" show={this.state.showSuccess} onHide={() => this.setState({showSuccess: false})} centered>
        <Modal.Body>
          <div style={style.modalContainer}>
            <img style={style.cartoonPic} src={Cartoon}/>
            <div>ระบบได้ทำการบันทึกผลการประเมินของท่านเรียบร้อยแล้ว</div>
          </div>
        </Modal.Body>
      </Modal>
    }

    sendFeedback = (score) => {
        if(this.state.hasSendFeedback){
          this.setState({showDuplicate: true})
          return
        }
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
          this.setState({hasSendFeedback: true})
          this.setState({showSuccess: true})
        })
        .catch(e => console.log(e))
    }

    render() {
        const { state: {passed, hasAppointment} } = this.props.location
        return (
            <div style={style.container}>
                <div>
                    {
                        passed ?
                            this.passedComponent(hasAppointment)
                            :
                            this.nonPassedComponent(hasAppointment)
                    }
                </div>
                {this.feedbackComponent()}
                {this.feedbackModalComponent()}
                {this.feedBackDuplicateModalComponent()}
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
      ...Backgrounds.backgroundResult
    },
    card: {
      borderWidth: 1,
      width: 300,
      height: 200,
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
    },
    resultPicContainer: {
      display: "flex",
      justifyContent: "center"
    },
    resultPic: {
      width: 300
    }
}

export default withRouter(ResultPage);