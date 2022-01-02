import background1 from '../../assets/background1.png'
import background2 from '../../assets/background2.png'
import background3 from '../../assets/background3.png'

const Backgrounds = {
  background1: {
    backgroundImage: `url(${background1})`,
    backgroundSize: "cover",
    height: "100vh",
  },
  background2: {
    backgroundImage: `url(${background2})`,
    backgroundSize: "auto 100%",
    backgroundPosition: "center center",
    height: "100vh",
    height: "100%"
  },
  background3: {
    backgroundImage: `url(${background3})`,
    backgroundSize: "auto 100%",
    backgroundPosition: "center center",
    height: "100vh"
  }
}

export default Backgrounds