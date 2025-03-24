import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import BanavooButton from "./BanavooButton";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
function Header() {
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
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/our-services")}>
                Our Services
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/placed-order")}>
                Placed Order
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/about-us")}>
                About Us
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/help")}>Help</Nav.Link>
            </Nav>
            {!userInfo && (
              <BanavooButton
                text="Login/Signup"
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
                onClick={() => {
                  navigate("/login");
                }}
              />
            )}
            {userInfo && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Nav>
                  <Nav.Link style={{ fontWeight: "bold" }}>
                    {userInfo.name}
                  </Nav.Link>
                </Nav>
                <FaSignOutAlt
                  onClick={logoutHandler}
                  size={20}
                  color="#551717"
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
