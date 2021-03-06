import React, { createContext } from "react";

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
      loadingAuth: true,
      setLoadingAuth: this.setLoadingAuth,
      isAuth: false,
      setAuth: this.setAuth,
      checkAuth: this.setAuth,
      username: "",
      backENDURL: "",
      user: null,
      user_group: null,
    };
  }

  checkAuthStatusCache() {
    const userCookie = localStorage.getItem("user");
    if (userCookie == null || userCookie == false) {
      this.setState({
        isAuth: false,
        username: "",
        user: null,
        user_group: null,
      });
      return false;
    }
    this.setState({
      isAuth: true,
      username: userCookie.username,
      user_group: userCookie.user_group,
    });
    return true;
  }

  async setAuth() {
    // checkAuthStatusCache();

    await Auth.currentAuthenticatedUser()
      .then((user) => {
        // console.log(user);
        const access_token = user.signInUserSession.accessToken;
        let user_group = "user";
        if (access_token.payload["cognito:groups"] != null) {
          user_group = access_token.payload["cognito:groups"][0];
        }
        // console.log(access_token.payload["cognito:groups"]);
        // console.log(user_group)
        this.setState({
          isAuth: true,
          username: user.username,
          user,
          user_group,
          isLoadingAuth: false,
          authModalVisible: false,
        });
        // this.setAuthModalVisible(false);
        localStorage.setItem("user", {
          username: user.username,
          user_group,
        });
      })
      .catch((err) => {
        console.log("User Not logged in");
        console.log(err);
        this.setState({
          isAuth: false,
          username: "",
          user: null,
          user_group: null,
          isLoadingAuth: false,
          authModalVisible: false,
        });
        localStorage.setItem("user", null);
      });
  }

  componentDidMount() {
    // Check for authentication status
    Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        this.setAuth();
      }
      if (payload.event === "signOut") {
        console.log("a user has signed out!");
        this.setAuth();
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
