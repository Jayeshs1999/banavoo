import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      toast.success("Login Successfully");
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send this data to your backend to sync with MongoDB
      const data = await googleLogin({
        name: user.displayName,
        email: user.email,
        googleId: user.uid,
        profilePic: user.photoURL,
      }).unwrap();
      dispatch(setCredentials({ ...data }));
      navigate(redirect);

      console.log("User synced with backend:", data);
      // Save token or do redirection
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  return (
    <FormContainer comesfrom="true">
      <Card
        className="text-center shadow-lg p-4 rounded-4 border-0"
        // style={{ background: "#f0f4ff" }}
        style={{
          display: "flex",
          borderRadius: "10px",
        }}
      >
        <Card.Body>
          {/* <h1 className="text-center">Sign In</h1> */}
          {/* <Form onSubmit={submitHandler}>
            <FormGroup controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="mt-2 w-100"
              >
                Sign In
              </Button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "5px",
                }}
              >
                <Link to={"/forgetpassword"} className="text-end">
                  Forget Password
                </Link>
              </div>
            </div>

            {isLoading && <Loader />}
          </Form> */}
        </Card.Body>

        {/* <Row className="py-3">
          <Col className="text-center">
            New User?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row> */}
        <Card.Title className="fs-3 fw-bold text-primary">
          Your first order is just a click away ✨
        </Card.Title>
        <Card.Text className="fs-5 text-dark">
          Let’s bring your ideas to life with stunning custom creations!
        </Card.Text>
        {isLoading && <Loader />}

        <div className="px-3 pb-3">
          <Button
            onClick={handleGoogleLogin}
            variant="outline-dark"
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              color: "black",
              backgroundColor: "#e74c3c",
              transition: "all 0.3s ease",
            }}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              style={{ width: "20px", height: "20px" }}
            />
            Sign in with Google
          </Button>
        </div>
      </Card>
    </FormContainer>
  );
};

export default LoginScreen;
