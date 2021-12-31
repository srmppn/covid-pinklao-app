import background1 from '../../assets/background1.png'
import background2 from '../../assets/background2.png'
import background3 from '../../assets/background3.png'
import backgroundResult from '../../assets/background4.png'

const Backgrounds = {
  background1: {
    backgroundImage: `url(${background3})`,
    backgroundSize: "cover",
    height: "100%",
    height: "100vh",
    minHeight: "100%"
  },
  background2: {
    backgroundImage: `url(${background2})`,
    backgroundSize: "auto 100%",
    height: "100vh"
  },
  background3: {
    backgroundImage: `url(${background3})`,
    backgroundSize: "auto 100%",
    height: "100vh"
  },
  backgroundResult: {
    backgroundImage: `url(${backgroundResult})`,
    backgroundSize: "auto 100%",
    height: "100vh"
  }
}

export default Backgrounds