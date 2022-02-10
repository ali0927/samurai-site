import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function HomeNav() {
  return (
    <Navbar
      className="navbar-light d-flex justify-content-end"
      style={{ width: "100%", minHeight: "70px" }}
    >
      <Nav style={{ padding: "0.5rem 1rem" }}>
        <Link href="/" passHref>
          <Nav.Link className="iceberg" style={{ fontSize: "16pt" }}>
            HOME
          </Nav.Link>
        </Link>
      </Nav>
    </Navbar>
  );
}
