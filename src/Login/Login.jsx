import React, { useState, useEffect, useContext } from "react";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const { loading, error, dispatch } = useContext(AuthContext);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();

      setUserList(response);
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    const fetchLogin = async () => {
      const body = JSON.stringify({
        email,
        password,
      });
      const response = await UserAPI.login(body);
      console.log(response);
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("email", response.user.email);

      // setIsLogin(response.isLogin);
      if (typeof response !== undefined) setUserList(response.user);
      if (response.isLogin === true) {
        console.log(response.user.email);

        window.location.href = "/";
      } else {
        if (response.invalidPassword == true) alert("Email or password wrong!");
        else alert(response.message);
      }
    };

    fetchLogin();
  };

  return (
    <div className="page-wrapper" style={{ display: "block" }}>
      <div className="page-breadcrumb">
        <div className="row">
          <div class="login">
            <div class="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
