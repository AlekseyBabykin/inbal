import React, { useEffect, useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { BUSINESSPAGE_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveOTP,
  fetchSignIn,
  fetchSignUp,
} from "../features/Users/apiSlice";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpPassword, setOtpPassword] = useState("");
  const location = useLocation();
  const isLogin = location.pathname === SIGNIN_ROUTE;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isActivate = useSelector((state) => state.auth.isActivate);

  const click = async () => {
    try {
      let response;
      if (isLogin) {
        response = await dispatch(fetchSignIn({ email, password }));
      } else {
        response = await dispatch(fetchSignUp({ email, password }));
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };
  const clickActiveOtp = async () => {
    try {
      await dispatch(ActiveOTP({ email, password, otpPassword }));
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };
  useEffect(() => {
    console.log(isLogin);
    console.log(isActivate);
    if (isActivate) {
      navigate(BUSINESSPAGE_ROUTE);
    }
  }, [isActivate]);

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54, backgroundColor: "grey" }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-4"
            type="email"
            placeholder="write your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-4"
            type="password"
            placeholder="write your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex  justify-content-between mt-4">
            {isLogin ? (
              <div>
                no account? <NavLink to={SIGNUP_ROUTE}>Registration</NavLink>
              </div>
            ) : (
              <div>
                <div>
                  account exist? <NavLink to={SIGNIN_ROUTE}>apply</NavLink>
                </div>
              </div>
            )}
            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Apply" : "Registration"}
            </Button>
          </div>
          {!isLogin
            ? isAuth && (
                <div className="d-flex mt-4">
                  <Form.Control
                    type="otpPassword"
                    placeholder="write your Number from email..."
                    value={otpPassword}
                    onChange={(e) => setOtpPassword(e.target.value)}
                  />
                  <Button variant={"outline-success"} onClick={clickActiveOtp}>
                    "Apply"
                  </Button>
                </div>
              )
            : !isActivate && (
                <div className="d-flex mt-4">
                  <Form.Control
                    type="otpPassword"
                    placeholder="write your Number from email..."
                    value={otpPassword}
                    onChange={(e) => setOtpPassword(e.target.value)}
                  />
                  <Button variant={"outline-success"} onClick={clickActiveOtp}>
                    "Apply"
                  </Button>
                </div>
              )}
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
