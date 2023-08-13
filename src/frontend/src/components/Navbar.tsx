import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../services/auth.service";

export function Navbar() {
  
  const navigate = useNavigate()
  const handleClick = () => navigate('/cart')
  const user = getCurrentUser()
  console.log(user);
  const token = localStorage.getItem("token")

    const handleLogout = () => {
      logout();
      navigate("/login");
    };

  return (
    
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        {user && token ? (
          user.roles.includes("ADMIN") ? (
            <>
              <Nav className="me-auto">
                <Nav.Link to="/add" as={NavLink}>
                  Add Products
                </Nav.Link>
              </Nav>
              <Nav className="me-auto">
                <Nav.Link to="/products" as={NavLink}>
                  Manage Products
                </Nav.Link>
              </Nav>
            </>
          ) : null
        ) : null}
        <Button
          onClick={handleClick}
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <svg
            width="17"
            height="21"
            viewBox="0 0 17 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Bag">
              <path
                id="Vector"
                d="M13.6212 5.89001H14.6812L15.7412 19.43C15.7612 19.72 15.5312 19.97 15.2412 19.97L1.50121 20.01C1.21121 20.01 0.981212 19.76 1.00121 19.47L1.98121 5.93002H3.08121"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M9.62119 6.95996H7.09119"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_3"
                d="M11.6212 8.61V4.34C11.6212 2.49 10.1612 1 8.36119 1C6.56119 1 5.1012 2.5 5.1012 4.34V8.61"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </Button>
        {user && token ? (
          <Button onClick={handleLogout} variant="outline-primary">
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="outline-primary"
          >
            Login
          </Button>
        )}
        <Button
          onClick={() => {
            navigate("/registration");
          }}
          variant="outline-info"
        >
          Sign Up
        </Button>{" "}
      </Container>
    </NavbarBs>
  );
}
