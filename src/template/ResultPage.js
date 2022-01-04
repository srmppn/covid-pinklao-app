import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Backgrounds from '../components/common-style/Background';
import Colors from '../components/common-style/Colors';
import Fonts from '../components/common-style/Fonts';
import Cartoon from "../assets/cartoon.png"
import Passed from "../assets/passed.png"
import Unpassed from "../assets/unpassed.png"
import { date } from 'yup';

const feedbackForm = {
    URL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe6KFh5sz3RlzxuAOuOEUYzkcgwva6OJjpr-IuBvoifYnFWcQ/formResponse"
}

class ResultPage extends Component {

    constructor(){
        super();
        this.state = {
          score: -1,
          hasSendFeedback: false,
          showUnselected: false,
          showSuccess: false,
          showDuplicate: false,
          showConfirmRedirect: false
        }
    }

    componentDidMount = () => {
      const { state } = this.props.location
      if(!state){
        this.props.history.push("/")
      }
    }

    passedComponent = (fullname, hasAppointment, datetime) => {
        return <div style={style.resultContainer}>
            <div style={style.resultPicContainer}>
              <img style={style.resultPic} src={Passed}/>
            </div>
            <div style={{...style.card, ...{backgroundColor: Colors.lightGreen, border: `1px solid ${Colors.darkGreen}`}}}>
                <div style={style.resultTextContainer}>
                  <div style={style.textFullname}>{fullname}</div>
                  <div style={style.textResult}>{`ท่านได้รับการตรวจสอบ\n คัดกรอง Covid-19 แล้ว`}</div>
                  <div style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</div>
                  <div style={style.textResult}>{datetime}</div>
                <div>{`กรุณาแสดงหน้าจอนี้ให้กับเจ้าหน้าที่\n เพื่อเข้ารับบริการของโรงพยาบาล`}</div>
            </div>
          </div>
        </div>
    }

    nonPassedComponent = (fullname, hasAppointment, datetime) => {
        return <div style={style.resultContainer}>
          <div style={style.resultPicContainer}>
            <img style={style.resultPic} src={Unpassed}/>
          </div>
          <div style={{...style.card, ...{backgroundColor: Colors.lightRed, border: `1px solid ${Colors.darkRed}`}}}>
            <div style={style.resultTextContainer}>
              <div style={style.textFullname}>{fullname}</div>
              <div style={style.textResult}>ท่านไม่ผ่านการคัดกรอง Covid-19</div>
              <div style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</div>
              <div style={style.textResult}>{datetime}</div>
              <div>{`** กรุณาติดต่อเจ้าหน้าที่ **`}</div>
            </div>
          </div>
        </div>
    }

    feedbackComponent = () => {
        const feedbackChoices = [
            {name: "fas fa-frown-open", color: Colors.customRed, score: 1},
            {name: "fas fa-frown", color: Colors.customOrange, score: 2},
            {name: "fas fa-meh", color: Colors.customYellow,score: 3},
            {name: "fas fa-smile", color: Colors.customGreen, score: 4},
            {name: "fas fa-smile-wink", color: Colors.customDarkGreen, score: 5}
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
                        .map(({name, color, score}, index) =>
                            {
                                return <i
                                    key={index}
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

    feedBackUnselectedComponent = () => {
      return <Modal size="sm" show={this.state.showUnselected} onHide={() => this.setState({showUnselected: false})} centered>
        <Modal.Body>
          <div style={style.modalContainer}>
            <div>กรุณาระบุระดับความพึงพอใจ</div>
          </div>
        </Modal.Body>
      </Modal>
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

    feedbackSuccessModalComponent = () => {
      return <Modal size="sm" show={this.state.showSuccess} onHide={() => this.setState({showSuccess: false})} centered>
        <Modal.Body>
          <div style={style.modalContainer}>
            <img style={style.cartoonPic} src={Cartoon}/>
            <div>ระบบได้ทำการบันทึกผลการประเมินของท่านเรียบร้อยแล้ว</div>
          </div>
        </Modal.Body>
      </Modal>
    }

    redirectModalComponent = () => {
      return <Modal size="sm" show={this.state.showConfirmRedirect} onHide={() => this.setState({showConfirmRedirect: false})} centered>
        <Modal.Body>
          <div style={style.modalContainer}>
            <div>ท่านต้องการทำแบบทดสอบประเมินความเสี่ยง Covid-19 อีกครั้งใช่หรือไม่ ?</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() =>this.props.history.push("/")}>ใช่</button>
          <button className="btn btn-outline-danger" onClick={() => this.setState({showConfirmRedirect: false})}>ไม่ใช่</button>
        </Modal.Footer>
      </Modal>
    }

    sendFeedback = (score) => {
        if(this.state.score <= 0){
          this.setState({showUnselected: true})
          return
        }
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
        const { state: {passed, fullname, hasAppointment, datetime} } = this.props.location
        return (
            <div style={style.container}>
                <div>
                    {
                        passed ?
                            this.passedComponent(fullname, hasAppointment, datetime)
                            :
                            this.nonPassedComponent(fullname, hasAppointment, datetime)
                    }
                </div>
                <div className="bg-light" style={style.redirectContainer}>
                  <div>หากท่านต้องการทำแบบทดสอบมากกว่า 1 ท่าน กรุณาแคปหน้าจอนี้ไว้เป็นหลักฐาน</div>
                  <div style={style.textRedirect} onClick={() => this.setState({showConfirmRedirect: true})}>ทำแบบทดสอบอีกครั้ง</div>
                </div>
                {this.feedbackComponent()}
                {this.feedBackUnselectedComponent()}
                {this.feedbackSuccessModalComponent()}
                {this.feedBackDuplicateModalComponent()}
                {this.redirectModalComponent()}
            </div>
        );
    }
}

const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      ...Backgrounds.background3
    },
    resultContainer: {
      paddingTop: 120
    },
    resultTextContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: 20,
    },
    card: {
      borderWidth: 1,
      width: 300,
      height: "fit-content",
      borderRadius: 3
    },
    textFullname: {
      fontSize: 18,
      fontWeight: "bold"
    },
    textResult: {
      fontSize: 16,
      marginTop: 3,
      marginBottom: 3,
      fontWeight: "bold",
    },
    redirectContainer: {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      flexDirection: "column",
      border: "1px solid",
      borderRadius: 3,
      width: 300,
      margin: 10,
      padding: 10
    },
    textRedirect: {
      marginTop: 5,
      fontSize: 16,
      color: Colors.primary,
      textDecoration: "underline",
      cursor: "pointer"
    },
    feedbackContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: 10,
      paddingBottom: 30,
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