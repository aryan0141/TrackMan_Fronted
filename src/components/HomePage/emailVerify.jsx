import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";
import { BACKEND_HOST_URL } from "../../config/default";
import axios from "axios";
import Alert from "@mui/material/Alert";

const EmailVerify = () => {
  const { token } = useParams();
  const [err, setErr] = useState([]);
  const [msg, setMsg] = useState(null);

  const verify = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await axios.get(
        `${BACKEND_HOST_URL}/auth/activate/${token}`,
        config
      );
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
