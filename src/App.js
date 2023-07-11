import React, { useState, useEffect } from 'react'
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
import { fetchUserInfoFromSavedSession, initializeApp } from './redux/actions';
import PropertyManagement from './containers/PropertyManagement/PropertyManagement';
import PropertyManagementAdd from './containers/PropertyManagement/PropertyManagementAdd/PropertyManagementAdd';
import RegisterTypeAccount from './containers/RegisterTypeAccount/RegisterTypeAccount';
import NewsManagement from './containers/NewsManagement/NewsManagement';
import Footer from './containers/Footer/Footer';
import ChangePassword from './containers/ChangePassword/ChangePassword';
import PageContentContainer from './containers/PageContentContainer/PageContentContainer';
import PageDetailNews from './containers/PageContentContainer/PageDetailNews';
import ModalFirstLogin from './containers/ModalFirstLogin/ModalFirstLogin';
import _ from 'lodash';
import PageNotFound from './containers/PageNotFound/PageNotFound';
import NotFound from './containers/PageNotFound/NotFound';
import NewsStatistics from './containers/NewsStatistics/NewsStatistics';
import NewsManagementAdmin from './containers/NewsManagement/NewsManagementAdmin';
import Recommend from './containers/Recommend/Recommend';
import Contact from './containers/Contact/Contact';
import ToolPhoneZaloChat from './containers/Common/ToolPhoneZaloChat/ToolPhoneZaloChat';
import AccountManagement from './containers/AccountManagement/AccountManagement';
import BrokerManagement from './containers/BrokerManagement/BrokerManagement';

if (typeof window !== "undefined") {
  injectStyle();
}
let a = "Aer_YjXKNuOt1L4iknw2E298jO6dEOxMLI5UZdzEWStbbedIaYdqCr-eIFU_KSbK-kxGNI62T8aVsZtV"
let pathName = window.location.pathname
let isDashboard = pathName.includes("/dashboard")
function App() {
  const state = useSelector((state) => state);
  const { auth, app, user } = state
  const { userInfo } = user
  const dispatch = useDispatch()

  const [isOpenModalFirstLogin, setIsOpenModalFirstLogin] = useState(false);

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


  useEffect(() => {
    console.log("binh_app", { userInfo }, _.isEmpty(userInfo.phone))
    if (userInfo && _.isEmpty(userInfo.phone)) {
      setIsOpenModalFirstLogin(true)
    } else {
      setIsOpenModalFirstLogin(false)
    }
  }, [userInfo]);

  // console.log("binh_app", { userInfo }, _.isEmpty(userInfo.phone))
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
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/recommend" component={Recommend} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/firebase" component={FirebaseTestImage} />
                    <Route exact path="/thue-nha-dat" component={PageContentContainer} />
                    <Route exact path="/thue-nha-dat/:id" component={PageDetailNews} />
                    {/* <Route exact path="/page/404" component={PageNotFound} /> */}
                    {/* <Route path="/*" component={NotFound} /> */}

                    {/* <Route path="*">
                      <NoMatch />
                    </Route> */}

                    {/* <Route exact path="/thue-nha-dat" component={PageContentContainer} /> */}
                    {/* <Route exact render={(props) => (
                  <Redirect to="/login" />
                )} /> */}

                    {/* <Route exact path="/broker" component={HomeBroker} /> */}


                  </div>
                }
                {app.typeUser === TYPE_USER.BROKER && userInfo && userInfo.codeClient &&
                  < div id="container-page-content-broker" className="container-page-content-broker">
                    {isOpenModalFirstLogin && <ModalFirstLogin
                      isOpen={isOpenModalFirstLogin}
                      onClose={() => { setIsOpenModalFirstLogin(false) }}
                    />}
                    <PrivateRouter exact path="/profile" component={Profile} />
                    <PrivateRouter exact path="/home-broker" component={HomeBroker} />
                    <PrivateRouter exact path="/recharge-broker" component={RechargeBroker} />
                    <PrivateRouter exact path="/property-management" component={PropertyManagement} />
                    <PrivateRouter exact path="/news-management" component={NewsManagement} />
                    <PrivateRouter exact path="/property-management-add" component={PropertyManagementAdd} />
                    <PrivateRouter exact path="/register-type-account" component={RegisterTypeAccount} />
                    <PrivateRouter exact path="/change-password" component={ChangePassword} />
                    <PrivateRouter exact path="/report" component={NewsStatistics} />
                    <PrivateRouter exact path="/account-management" component={AccountManagement} />
                    <PrivateRouter exact path="/broker-management" component={BrokerManagement} />


                    {/* admin */}
                    <PrivateRouter exact path="/news-management-admin" component={NewsManagementAdmin} />
                    {/* <Route exact path="/stripe" element={StripeCheckoutButton} /> */}
                  </div>}

                {app.typeUser === TYPE_USER.CUSTOMER && <ToolPhoneZaloChat />}
                <div id="scrollToTop" className='item-center'>
                  <i class="fa fa-angle-double-up" aria-hidden="true">
                  </i>
                </div>
              </div>
            </Switch>
            {
              app.typeUser === TYPE_USER.CUSTOMER && <Footer />
            }
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
    </PayPalScriptProvider >
  );
}

export default App;
