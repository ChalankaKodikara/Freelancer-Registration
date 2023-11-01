import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import backgroundImage from "../assets/img/b1.jpg";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    contactNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const history = useHistory();

  const handleSignup = async () => {
    try {
      if (!validEmail) {
        setError("Invalid email address.");
        return;
      }

      const response = await axios.post(
        "https://backfreelance.tfdatamaster.com/api/auth/signup",
        formData
      );

      const token = response.data.token;

      Cookies.set("authToken", token, { expires: 7 });

      console.log("Signup successful:", response.data);

      history.push("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Signup failed.");
      } else {
        setError("An error occurred during signup. Please try again later.");
        console.error("Signup error:", error);
      }
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    setValidEmail(validateEmail(email));
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
                {/* Your logo goes here */}
                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
              </div>

              <p>Please sign up for an account</p>

              <div className="mb-4">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${validEmail ? "" : "is-invalid"}`}
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleEmailChange}
                />
                {!validEmail && (
                  <div className="invalid-feedback">Invalid email address.</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Enter your Country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contactNumber" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  placeholder="Enter your Contact Number"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumber: e.target.value })
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
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="text-center pt-1 mb-5 pb-1">
                <button
                  className="btn btn-primary mb-4 w-100 gradient-custom-2"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
                <Link className="text-muted" to="#!">
                  Forgot password?
                </Link>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Already have an account?</p>
                <Link to="/login" className="btn btn-outline-danger mx-2">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
