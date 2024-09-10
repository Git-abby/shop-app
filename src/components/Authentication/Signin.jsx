import React, { useEffect, useState } from "react";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
// import { auth } from "../../firebase/firebase";

function Signin() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);

  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();

    if (!isLoggedin) {
    }
    const { name, value } = e.target;
    // console.log(name, value);

    setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    // console.log(formValues);
  };
  const { username, password } = formValues;

  useEffect(() => {
    console.log("UF>>", loading)
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("sub>>", loading)

    if (username === "" || password === "") {
      setStatus(404); //required para not found
      setMessage("username and password required!");
      setIsLoggedin(false);
      return;
    }
    try {
      const results = await doSignInWithEmailAndPassword(username, password);
      console.log(results.user);
      setUser(results.user);
    //   setLoading(true);
      setIsLoggedin(true);
      setMessage("Sign In Successfull");
      setStatus(200);
      console.log("Success");
    } catch (error) {
      setMessage(error.message);
      setIsLoggedin(false);
      setStatus(404);
    } finally {
        setFormValues("");
      console.info("Submitted");
    }
  };
  return (
    <>
      {loading ? (
        <h1> Loading.. </h1>
      ) : (
        <form onSubmit={handleSubmit}>
          {message && (
            <div
              className={`alert role-alert ${
                status === 200 ? `alert-success` : `alert-danger`
              }`}
              role="alert">
              {message}
            </div>
          )}
          <h1 className="h1 display-3">SIGN IN</h1>
          <div className="">
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                name="username"
                placeholder="name@example.com"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
          <div>
            {user && <>{user.email}</>}
          </div>
        </form>
        
      )}
    </>
  );
}

export default Signin;
