import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if(json.success){
      // save the jwt authtoken sent from the server to the localStorage
      // everytime that we try to login, a different auth token is generated and persists till we logout or it hits its expiry date(whichever happens sooner)
      // this authtoken is stored in localstorage and is sent to the server to validate everytime we try to access our logged in app, if the authtoken is correct (which is checked using the secret key that only the server has (which was used to generate this authtoken in the first place), then the user is allowed access)
      // Remember : this whole concept of jwt token is only used to check authorization(whether the user who is trying to access the already logged in app is the real user or someone else, if he is the real user then he is allowed access, if not thenhe is not allowed access)
      // this should not be confused with authentication, which is used to check whether the password is correct or not(we are doing this using bcrypt module)

      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(json.authToken);
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlfor="exampleInputEmail1" className="form-label">
              Email address
            </label>

            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn bg-teal-darken-4">
            Submit
          </button>

          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm a New User
          </Link>
        </form>
      </div>
    </div>
  );
}
