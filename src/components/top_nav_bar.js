import React, { useState, useRef, useContext } from "react";
import { Menu, Divider } from "antd";
import { Link } from "react-router-dom";

import cookie from "react-cookies";

import {
  ArrowLeftOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { AppContext } from "../contexts/AppContext";
import LoginRegisterModal from "./login_register_modal";

import { Auth } from "aws-amplify";

import styles from "../style.module.css";

import "./top_nav_bar.css";

/**
 * Main navigation bar
 * theme: dark or light
 */
function TopNavBar({ type, theme, backgroundColor, title }) {
  const [currentTab, setCurrentTab] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const appContext = useContext(AppContext);

  const { SubMenu } = Menu;

  var lineHeight = "4vh";
  if (type == "main") {
    lineHeight = "60px";
  } else {
    lineHeight = "45px";
  }

  // Handle nav bar clicks
  const handleClick = (click) => {
    console.log("click ", click);
    if (click.key == "login/register") {
      // Clicking login/register button
      // LoginRegisterModalRef.current.openModal()
      //Auth.federatedSignIn();
      setLoginVisible(true);
    } else if (click.key === "logout") {
      // Clicking logout button
      logout();
    }
  };

  // Logout
  const logout = () => {
    Auth.signOut()
      .then((data) => {
        console.log(data);
        appContext.checkAuth();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <LoginRegisterModal
        visible={loginVisible}
        handleCancel={() => setLoginVisible(false)}
      />
      <div
        className="top-nav-bar"
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-start",
          height: lineHeight,
        }}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={[currentTab]}
          mode="horizontal"
          theme={theme}
          triggerSubMenuAction="click"
          onOpenChange={() => {
            setMenuOpen(menuOpen ? false : true);
          }}
          style={{
            width: "100vw",
            display: "flex",
            flex: 1,
            alignContent: "center",
            justifyContent: "flex-end",
            backgroundColor: backgroundColor,
            lineHeight: lineHeight,
          }}
        >
          {type === "main" && (
            <Menu.Item key="back" style={{ marginRight: "auto" }}>
              <Link to={"/"} className={`${styles.ui_font}`}>
                <div style={{ fontSize: "24px" }}> Robobot </div>
              </Link>
            </Menu.Item>
          )}

          {!(type === "main") && (
            <Menu.Item key="back" style={{}}>
              <Link to={"/"} className={`${styles.ui_font}`}>
                Back
              </Link>
            </Menu.Item>
          )}

          {!(type === "main") && (
            <div className={`${styles.ui_font}`} style={{ margin: "auto" }}>
              {title}
            </div>
          )}

          {!appContext.isAuth && (
            <Menu.Item key="login/register" data-cy="login-register-link">
              <p className={`${styles.ui_font}`}>Login / Register</p>
            </Menu.Item>
          )}

          {appContext.isAuth && appContext.user_group === "admin" && (
            <Menu.Item key="admin" data-cy="admin-console-link">
              <Link to={"/admin"} className={`${styles.ui_font}`}>
                Admin Console
              </Link>
            </Menu.Item>
          )}

          {appContext.isAuth && (
            <SubMenu
              title={
                <div>
                  <UserOutlined className="user-icon" data-cy="nav-bar-menu" />
                  {menuOpen == null && <DownOutlined className="menu-arrow" />}
                  {menuOpen && (
                    <DownOutlined
                      className="menu-arrow"
                      style={{
                        animation: `spin 0.25s linear forwards`,
                      }}
                    />
                  )}
                  {!menuOpen && menuOpen != null && (
                    <DownOutlined
                      className="menu-arrow"
                      style={{
                        animation: `reverse-spin 0.25s linear forwards`,
                      }}
                    />
                  )}
                </div>
              }
            >
              <div className="top-nav-bar-username">
                <UserOutlined className="top-nav-bar-submenu-profile-icon" />
                {appContext.username}
              </div>
              <Divider className="top-nav-bar-divider" />
              <Menu.Item
                key="logout"
                data-cy="logout-link"
                style={{ marginBottom: "20px" }}
              >
                Logout
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </div>
    </div>
  );
}

export default TopNavBar;
