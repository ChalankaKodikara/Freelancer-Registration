import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import backgroundImage from "../assets/img/b1.jpg";

function Login() {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://backfreelance.tfdatamaster.com/api/auth/login",
        credentials
      );
      const token = response.data.token;
      const useremail = response.data.useremail;
      // Store the token in a cookie with an expiration time (e.g., 7 days)
      Cookies.set("authToken", token, { expires: 7 });
      Cookies.set("useremail", useremail, { expires: 7 });
      console.log("Login successful:", response.data);

      // Redirect to "/userdashbord"
      if (useremail === "talentfort@gmail.com") {
        history.push("/admin/dashboard");
      } else {
        history.push("/Userdashbord/dashboard");
      }
    } catch (err) {
      setError(err.message || "An error occurred while logging in.");
      console.error("Login error:", err);
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="https://swiztech.ai/wp-content/uploads/2023/08/SwizTech-Logo-new.png"
                  style={{ width: "185px" }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1">
                  We are Looking For Freelancers
                </h4>
              </div>

              <p>Please login to your account</p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="text-center pt-1 mb-5 pb-1">
                <button
                  className="btn btn-primary mb-4 w-100 gradient-custom-2"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
                <Link className="text-muted" to="#!">
                  Forgot password?
                </Link>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <Link to="/signup" className="btn btn-outline-danger mx-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  SwizTech is a next-generation organization well-equipped to
                  provide innovative solutions, powering the success of our
                  clients globally. Our solutions are packaged together to add
                  value to the strategic utilization of this lifeline to
                  accomplish organizational goals and objectives effectively and
                  productively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
