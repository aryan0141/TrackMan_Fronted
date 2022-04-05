import React, { Fragment, useEffect, useContext, useState } from "react";
import Navbar from "../navbar";
import { useParams, useHistory } from "react-router-dom";
import { BACKEND_HOST_URL } from "../../config/default";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { userContext } from "./../../userContext";

const EmailVerify = () => {
  const { token } = useParams();
  const [err, setErr] = useState([]);
  const [msg, setMsg] = useState(null);

  const history = useHistory();
  const user = Cookies.get("userInfo");

  const verify = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await axios.get(`${BACKEND_HOST_URL}/auth/activate/${token}`, config);
      console.log(JSON.parse(user));
      let res = JSON.parse(user);
      res["isActivated"] = true;
      console.log(res);
      Cookies.remove("userInfo");
      Cookies.set("userInfo", JSON.stringify(res), {
        expires: 1,
        path: "/",
      });
      // setUser(res);
      setMsg("Account Verified");
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 403 || e.response.status === 401) {
        setErr([...err, e.response.data.msg]);
      } else {
        setErr([...err, e.response.data.err]);
      }
    }
  };

  useEffect(async () => {
    if (user == null) {
      history.push("/");
      return;
    }
    await verify();
  }, []);

  return (
    <Fragment>
      <Navbar />
      {err.length
        ? err.map((e) => (
            <div style={{ margin: 10 }} key={e}>
              {" "}
              <Alert severity="error">{e}</Alert>
            </div>
          ))
        : null}

      {msg ? (
        <div style={{ margin: 10 }}>
          {" "}
          <Alert severity="success">{msg}</Alert>
        </div>
      ) : null}
    </Fragment>
  );
};

export default EmailVerify;
