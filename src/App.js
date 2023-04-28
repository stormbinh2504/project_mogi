import React, { useEffect } from 'react'
import './App.scss';
import "../src/styles/styles.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter as Router } from 'connected-react-router';
import { useSelector, useDispatch } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Alert from "./components/alert/Alert";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import HomeBroker from './containers/HomeBroker/HomeBroker';
import { TYPE_USER } from './utils';
import HeaderBroker from './containers/Header/HeaderBroker';
import RechargeBroker from './containers/RechargeBroker/RechargeBroker';
import { history } from './redux/store'
import StripeCheckoutButton from './components/Broker/StripeCheckoutButton/StripeCheckoutButton';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import $ from 'jquery';
import FirebaseTestImage from './components/FirebaseTestImage/FirebaseTestImage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PrivateRouter from './customRouter/PrivateRouter';
import Profile from './containers/Profile/Profile';
import { initializeApp } from './redux/actions';
import PropertyManagement from './containers/PropertyManagement/PropertyManagement';
import PropertyManagementAdd from './containers/PropertyManagement/PropertyManagementAdd/PropertyManagementAdd';
import RegisterTypeAccount from './containers/RegisterTypeAccount/RegisterTypeAccount';

if (typeof window !== "undefined") {
  injectStyle();
}
let a = "Aer_YjXKNuOt1L4iknw2E298jO6dEOxMLI5UZdzEWStbbedIaYdqCr-eIFU_KSbK-kxGNI62T8aVsZtV"
let pathName = window.location.pathname
let isDashboard = pathName.includes("/dashboard")
function App() {
  const state = useSelector((state) => state);
  const { auth, app } = state
  const dispatch = useDispatch()
  console.log("render_app", state)
  const scrollTopAnimated = () => {
    $('#scrollToTop').on('click', function () {
      $("html, body").animate({ scrollTop: 0 }, 1200);
    })
  }

  useEffect(() => {
    dispatch(initializeApp())
    scrollTopAnimated()
  }, []);

  return (
    <PayPalScriptProvider
      // deferLoading={true}
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    // options={{ "client-id": a }}
    >
      <div className="App">
        <Router history={history}>
          <ErrorBoundary>

            <ScrollToTop />
            <Alert />
            {
              app.typeUser === TYPE_USER.CUSTOMER && < Header />
            }
            {
              app.typeUser === TYPE_USER.BROKER && < HeaderBroker />
            }
            <Switch>
              <div className="main">
                {/* <Route path='*' element={<Navigate to={route.error} />} /> */}
                {app.typeUser === TYPE_USER.CUSTOMER &&
                  < div id="container-page-content" className="container-page-content ">
                    <Route exact path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/firebase" component={FirebaseTestImage} />
                    {/* <Route exact render={(props) => (
                  <Redirect to="/login" />
                )} /> */}

                    {/* <Route exact path="/broker" component={HomeBroker} /> */}


                  </div>
                }
                {app.typeUser === TYPE_USER.BROKER &&
                  < div id="container-page-content-broker" className="container-page-content-broker">

                    <PrivateRouter exact path="/profile" component={Profile} />
                    <PrivateRouter exact path="/home-broker" component={HomeBroker} />
                    <PrivateRouter exact path="/recharge-broker" component={RechargeBroker} />
                    <PrivateRouter exact path="/property-management" component={PropertyManagement} />
                    <PrivateRouter exact path="/property-management-add" component={PropertyManagementAdd} />
                    <PrivateRouter exact path="/register-type-account" component={RegisterTypeAccount} />
                    {/* <Route exact path="/stripe" element={StripeCheckoutButton} /> */}
                  </div>}
                <div id="scrollToTop" className='item-center'>
                  <i class="fa fa-angle-double-up" aria-hidden="true">
                  </i>
                </div>
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
          </ErrorBoundary>
        </Router>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
