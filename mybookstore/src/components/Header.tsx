import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import BanavooButton from "./BanavooButton";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Header() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") ? localStorage.getItem("language") : "en"
  );
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutApiCall("").unwrap();
      dispatch(logout(""));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const changeLanguage = (lng: string) => {
    localStorage.setItem("language", lng);
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <header className="sticky-header">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
        }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              width={150}
              src={logo}
              alt="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>{t("home")}</Nav.Link>
              <Nav.Link onClick={() => navigate("/our-services")}>
                {t("ourServices")}
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/placed-order")}>
                {t("orderPlaced")}
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/about-us")}>
                {t("aboutUs")}
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/help")}>{t("help")}</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center gap-3">
              <NavDropdown
                title={t("language")}
                id="language"
                className="me-3"
                style={{ color: "#333" }}
              >
                <NavDropdown.Item
                  active={selectedLanguage === "en"}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </NavDropdown.Item>
                <NavDropdown.Item
                  active={selectedLanguage === "mr"}
                  onClick={() => changeLanguage("es")}
                >
                  मराठी
                </NavDropdown.Item>
                {/* <NavDropdown.Item
                  active={selectedLanguage === "hi"}
                  onClick={() => changeLanguage("hi")}
                >
                  हिंदी
                </NavDropdown.Item> */}
              </NavDropdown>

              {!userInfo ? (
                <BanavooButton
                  text={t("Login/Signup")}
                  buttonAnimation={{
                    boxShadow: [
                      "0px 0px 10px rgba(115, 136, 230, 0.6)",
                      "0px 5px 20px rgba(115, 136, 230, 0.8)",
                      "0px 0px 10px rgba(115, 136, 230, 0.6)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  bgColor="#c8f7bd"
                  buttonAlign={{ marginBottom: "0px" }}
                  onClick={() => navigate("/login")}
                />
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <Nav.Link
                    style={{ fontWeight: "bold", margin: 0, color: "#333" }}
                    // onClick={() => navigate("/profile")}
                  >
                    {userInfo.name}
                  </Nav.Link>
                  <FaSignOutAlt
                    onClick={logoutHandler}
                    size={20}
                    color="#551717"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
