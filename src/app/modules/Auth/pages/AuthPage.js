// eslint-disable react-hooks/exhaustive-deps
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useContext } from "react";
import { Link, Switch, Redirect, Route, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import styled from "styled-components";
import toAbsoluteUrl from "../../../../helpers/assetsHelpers";
import Login from "./Login";
import PatientInformation from "./PatientInformation";
import { ToastContext } from "../../../../components/ToastContextProvider";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.div`
  min-height: 100vh;
`;

const LeftAside = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 450px;
  background-image: url(${toAbsoluteUrl("/media/bg/bg-5.jpg")});
`;

const ContentAside = styled.div`
  min-width: 60vw;
`;

const ContentLeftAside = styled.div`
  text-shadow: 2px 2px 5px white;

  a {
    color: black;
  }
`;

const WrapperSignUp = styled.div`
  display: block;
`;

const WrapperLogin = styled.div`
  width: 100vw;
  height: 100%;
`;

const AuthPage = () => {
  const dispatch = useDispatch();
  const { notifyError } = useContext(ToastContext);
  const location = useLocation();
  return (
    <>
      <Wrapper className="d-flex flex-column">
        <MainContent className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row">
          <LeftAside className="d-flex">
            <ContentLeftAside className="d-flex flex-column flex-sm-column flex-md-column flex-lg-column justify-content-between">
              <div className="d-flex flex-column m-3">
                <h3>HOSPITAL EL ORO</h3>

                <p>
                  <br />
                  GENERANDO CONFIANZA A NUESTROS CLIENTES
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between m-3">
                <div>&copy; HOSPITAL EL ORO App</div>
                <div>
                  <Link to="/terms">Contact</Link>
                </div>
              </div>
            </ContentLeftAside>
          </LeftAside>

          <ContentAside className="d-flex flex-column overflow-hidden">
            {location.pathname === "/auth/login" ? (
              <WrapperSignUp className="d-flex flex-row justify-content-end pr-5 pt-5">
                <span>Eres paciente?</span>
                <Link
                  to="/auth/registration"
                  id="kt_login_signup"
                  className="pl-3"
                >
                  Registrarse en linea!
                </Link>
              </WrapperSignUp>
            ) : (
              <WrapperSignUp className="d-flex flex-row justify-content-end pr-5 pt-5">
                <span>I&lsquo;m already registered!</span>
                <Link to="/auth/login" id="kt_login_signup" className="pl-3">
                  Login
                </Link>
              </WrapperSignUp>
            )}

            <WrapperLogin className="d-flex align-items-center">
              <Switch>
                <Route path="/auth/login">
                  <Login />
                </Route>
                <Route path="/auth/registration">
                  <PatientInformation />
                </Route>
                <Redirect from="/auth" exact to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </WrapperLogin>
            <div className="d-flex d-lg-none flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; Hospital El Oro App
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
          </ContentAside>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default AuthPage;
