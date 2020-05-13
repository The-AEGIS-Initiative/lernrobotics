import React, { useState } from "react";

import { Button } from "antd";
import { useHistory } from "react-router-dom";

import { Auth } from "aws-amplify";

/**
 * NOT SECURE
 * For use in testing only! Do not use in production.
 */
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleSignIn() {
    await Auth.signIn(username, password);
    setUsername("");
    setPassword("");
    history.push("/");
  }

  return (
    <div>
      <input
        className="username-input"
        onChange={({ target }) => setUsername(target.value)}
        placeholder="Username"
        value={username}
      />
      <input
        type="password"
        className="password-input"
        onChange={({ target }) => setPassword(target.value)}
        placeholder="*****"
        value={password}
      />
      <Button className="sign-in-button" onClick={handleSignIn}>
        Sign in
      </Button>
    </div>
  );
}

export default LoginPage;
