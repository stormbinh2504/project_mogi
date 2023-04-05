import logo from './logo.svg';
import './App.scss';
import "../src/styles/styles.scss";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import CompareFace from './containers/CompareFace/CompareFace';
import CompareFaceNew from './containers/CompareFace/CompareFaceNew';
// import CompateFaceApi from './containers/CompareFaceApi/CompateFaceApi';
import Alert from "./components/alert/Alert";
import PrivateCompareFaceRouter from './containers/customRouter/PrivateCompareFaceRouter';
import Loading from './components/alert/Loading';
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import DashBoard from './containers/DashBoard/DashBoard';
import PrivateRouter from './containers/customRouter/PrivateRouter';
import Header from './containers/Header/Header';
import PrivateRouterLogin from './containers/customRouter/PrivateRouterLogin';
import Sidebar from './containers/Sidebar/Sidebar';
import Routes from './routes/Routes';
import CompareOTP from './containers/CompareOTP/CompareOTP';
import Home from './containers/Home/Home';
import HomeBroker from './containers/HomeBroker/HomeBroker';
import { TYPE_USER } from './utils';
import HeaderBroker from './containers/Header/HeaderBroker';
import RechargeBroker from './containers/RechargeBroker/RechargeBroker';
import StripeCheckoutButton from './components/Broker/StripeCheckoutButton/StripeCheckoutButton';

if (typeof window !== "undefined") {
  injectStyle();
}
let a = "Aer_YjXKNuOt1L4iknw2E298jO6dEOxMLI5UZdzEWStbbedIaYdqCr-eIFU_KSbK-kxGNI62T8aVsZtV"
let pathName = window.location.pathname
let isDashboard = pathName.includes("/dashboard")
function App() {
  const state = useSelector((state) => state);
  const { auth, app } = state
  console.log("binh_state", state)
  console.log("binh_app", process.env)
  return (
    <PayPalScriptProvider
      // deferLoading={true}
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    // options={{ "client-id": a }}
    >
      <div className="App">
        <Router>
          <Alert />
          {
            app.typeUser === TYPE_USER.CUSTOMER && < Header />
          }
          {
            app.typeUser === TYPE_USER.BROKER && < HeaderBroker />
          }
          <Switch>
            <div className="main">
              {app.typeUser === TYPE_USER.CUSTOMER &&
                < div id="container-page-content" className="container-page-content ">
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/compare-face" component={CompareFace} />
                  <Route exact path="/compare-otp" component={CompareOTP} />
                  <Route exact path="/mogi" component={CompareOTP} />
                  {/* <Route exact render={(props) => (
                  <Redirect to="/login" />
                )} /> */}

                  <Route exact path="/broker" component={HomeBroker} />


                </div>
              }
              {app.typeUser === TYPE_USER.BROKER &&
                < div id="container-page-content-broker" className="container-page-content-broker">

                  <Route exact path="/home-broker" component={HomeBroker} />
                  <Route exact path="/recharge-broker" component={RechargeBroker} />
                  {/* <Route exact path="/stripe" element={StripeCheckoutButton} /> */}
                </div>}
            </div>
          </Switch>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
