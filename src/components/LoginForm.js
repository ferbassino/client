import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsername,
  handlePassword,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={handleUsername}
        />
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
