import React, { useEffect, useState, createContext } from "react";
import { getData } from "../components/HttpController";

import { Auth, Hub } from "aws-amplify";

export const AppContext = createContext();

// Holds global app wide information
// Contains:
// isAuth: current client authentication status
// setAuth: Queries backend server to update authentication status
export class AppContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.setAuth = this.setAuth.bind(this);
    this.state = {
      isAuth: false,
      setAuth: this.setAuth,
      checkAuth: this.setAuth,
      username: "",
      backENDURL: "",
    };
  }

  setAuth() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user);
        this.setState({ isAuth: true, username: user.username });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isAuth: false, username: "" });
      });
  }

  componentDidMount() {
    // Check for authentication status
    Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        this.setState({ isAuth: true });
      }
      if (payload.event === "signOut") {
        console.log("a user has signed out!");
        this.setState({ isAuth: false });
      }
    });
    this.setAuth();

    if (process.env.REACT_APP_BACKEND_URL == null) {
      this.setState({ backEndURL: "http://localhost:8000" });
    } else {
      this.setState({ backEndURL: process.env.REACT_APP_BACKEND_URL });
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
