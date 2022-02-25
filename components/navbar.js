import {
  DISCORD_URL,
  OPENSEA_URL,
  TWITTER_URL,
  WHITEPAPER_URL,
} from "../constants";
import { Nav, Navbar } from "react-bootstrap";

import Link from "next/link";
import React from "react";
import ScrollSpy from "../vendor/react-scrollspy-main/src/ScrollSpy";
import styles from "../styles/Navbar.module.css";
import useScrollPosition from "@react-hook/window-scroll";
import useWindowDimensions from "../hooks/useWindowDimensions";

const navItems = [
  {
    name: "HOME",
    href: "#hero",
  },
  { name: "ABOUT", href: "#about" },
  { name: "ROADMAP", href: "#roadmap" },
  { name: "TEAM", href: "#team" },
];

const iconNavs = [
  {
    expandedName: "DISCORD",
    iconClass: "bi-discord",
    href: DISCORD_URL,
  },
  {
    expandedName: "TWITTER",
    iconClass: "bi-twitter",
    href: TWITTER_URL,
  },
  {
    expandedName: "OPENSEA",
    iconClass: "icon-opensea",
    href: OPENSEA_URL,
  },
];

const MEDIUM_SCREEN_SIZE = 991.98;

export default function CustomNavbar() {
  const scrollY = useScrollPosition();
  const windowDimensions = useWindowDimensions();

  React.useEffect(() => {
    scrollY;
  });

  const isCollapsedNavbar = React.useCallback(() => {
    return windowDimensions?.width < MEDIUM_SCREEN_SIZE;
  }, [windowDimensions]);

  const navbarTheme = React.useMemo(() => {
    return scrollY !== 0 || windowDimensions?.width < MEDIUM_SCREEN_SIZE
      ? "navbar-dark bg-dark"
      : "navbar-light";
  }, [scrollY, windowDimensions]);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className={`${styles.nav} ${navbarTheme}`}
      collapseOnSelect={true}
    >
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={styles.navToggle}
      />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-between"
      >
        <Nav className={`justify-content-end iceberg flex-grow-1`}>
          <Nav>
            <ScrollSpy offsetTop={70} duration={100}>
              {[
                ...navItems.map(({ name, href }) => (
                  <Nav.Link
                    href={href}
                    aria-current="page"
                    className={styles.navLink}
                    key={href}
                    ref={React.createRef()}
                  >
                    {name}
                  </Nav.Link>
                )),
              ]}
            </ScrollSpy>
            <Nav.Link
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
            >
              WHITEPAPER
            </Nav.Link>
            <Link href="/claim" passHref>
              <Nav.Link className={styles.navLink}>CLAIMING</Nav.Link>
            </Link>
            {iconNavs.map((props, i) => (
              <IconNavLink
                key={i}
                isCollapsedNavbar={isCollapsedNavbar()}
                {...props}
              />
            ))}
            <Nav.Link
              className={styles.navLink}
              href="https://www.mintable.app/store/--/0x8399d6351fd0ddb33f77bfc627e3264d74500d22"
              target="_blank"
              rel="noreferrer"
            >
              {isCollapsedNavbar() ? (
                "MINTABLE"
              ) : (
                <img src="/mintable.svg" style={{ height: "1.5rem" }} />
              )}
            </Nav.Link>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function IconNavLink({ isCollapsedNavbar, expandedName, iconClass, href }) {
  return (
    <Nav.Link
      className={styles.navLink}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {isCollapsedNavbar ? (
        expandedName
      ) : (
        <span className={`bi ${iconClass} ${styles.icon}`}></span>
      )}
    </Nav.Link>
  );
}
