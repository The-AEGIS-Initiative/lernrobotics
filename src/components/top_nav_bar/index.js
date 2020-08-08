import React, { useState, useRef, useContext } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";

import cookie from "react-cookies";

import {
  ArrowLeftOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { AppContext } from "contexts/AppContext";
import LoginRegisterModal from "../login_register_modal";
import LogoName from "../LogoName";

import { Auth } from "aws-amplify";

import styles from "style.module.css";

import "./index.css";

/**
 * Main navigation bar
 * theme: dark or light
 */
function TopNavBar({ type, theme, backgroundColor, title }) {
  const [currentTab, setCurrentTab] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const appContext = useContext(AppContext);

  const history = useHistory();

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
      // Auth.federatedSignIn();
      setLoginVisible(true);
    } else if (click.key === "logout") {
      // Clicking logout button
      logout();
    } else if (click.key === "admin") {
      history.push("/admin");
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
    <div style={{ zIndex: 100 }}>
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
            setMenuOpen(!menuOpen);
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
            <Menu.Item
              key="back"
              style={{ marginRight: "auto" }}
              data-cy="dashboard-link"
            >
              <Link to={"/"} className={`${styles.ui_font}`}>
                <LogoName />
              </Link>
            </Menu.Item>
          )}

          {!(type === "main") && (
            <Menu.Item key="back" style={{}}>
              <Link to={"/practice"} className={`${styles.ui_font}`}>
                <ArrowLeftOutlined style={{ width: "10px" }} />
              </Link>
            </Menu.Item>
          )}

          {!(type === "main") && (
            <div className={`${styles.ui_font}`} style={{ margin: "auto" }}>
              {title}
            </div>
          )}

          {!appContext.isAuth && (
            <SubMenu
              style={{ marginTop: "5px" }}
              title={
                <div>
                  <UserOutlined className="user-icon" data-cy="nav-bar-menu" />
                  {menuOpen == null && <DownOutlined className="menu-arrow" />}
                  {menuOpen && (
                    <DownOutlined
                      className="menu-arrow"
                      style={{
                        animation: "spin 0.25s linear forwards",
                      }}
                    />
                  )}
                  {!menuOpen && menuOpen != null && (
                    <DownOutlined
                      className="menu-arrow"
                      style={{
                        animation: "reverse-spin 0.25s linear forwards",
                      }}
                    />
                  )}
                </div>
              }
            >
              <Menu.Item
                key="login/register"
                data-cy="login-register-link"
                style={{ marginBottom: "3px" }}
              >
                Login / Register
              </Menu.Item>
            </SubMenu>
          )}

          {appContext.isAuth && (
            <SubMenu
              style={{ marginTop: `${type === "main" ? "7px" : "8px"}` }}
              title={
                <div>
                  <UserOutlined className="user-icon" data-cy="nav-bar-menu" />
                  {menuOpen == null && <DownOutlined className="menu-arrow" />}
                  {menuOpen && (
                    <DownOutlined
                      className="menu-arrow"
                      style={{
                        animation: "spin 0.25s linear forwards",
                      }}
                    />
                  )}
                  {!menuOpen && menuOpen != null && (
                    <DownOutlined
                      className="menu-arrow"
                      style={{
                        animation: "reverse-spin 0.25s linear forwards",
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
              <div className="top-nav-bar-divider" />
              {appContext.user_group === "admin" && (
                <Menu.Item key="admin" data-cy="admin-console-link">
                  Admin Console
                </Menu.Item>
              )}
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
