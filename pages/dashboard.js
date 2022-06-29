import React, { useState } from "react";
import Router from "next/router";
import { whoAmI } from "../lib/auth";
import { removeToken, getToken, setToken } from "../lib/token";
import Link from "next/link";
import Header from "../components/Header";
import Cargo from "./cargos";

const styles = {
  marginTop: 30,
  textAlign: "left",
};

export default function Dashboard() {
  const [user, setUser] = useState({});

  // Watchers
  React.useEffect(() => {

    if (typeof window !== "undefined") {
      // const token = window.localStorage.getItem("token");
      //console.log("token dashboard: ", token);
      const token = getToken();
      if (!token) {
        redirectToLogin();
      } else {
        (async () => {
          try {
            console.log("token dashboard1: ", token);
            const data = await whoAmI();
            console.log('Data: ' + data)
            //console.log('Data: ' + data.token);
            var email = JSON.stringify(data.email);
            console.log('user: ' + email);
            if (data.error === "Unauthorized") {
              // User is unauthorized and there is no way to support the User, it should be redirected to the Login page and try to logIn again.
              redirectToLogin();
            } else {
              setUser(data);
            }
          } catch (error) {
            console.log('Erro: ' + error);
            // If we receive any error, we should be redirected to the Login page
            //redirectToLogin();
          }
        })();
      }
    }
  }, []);

  function redirectToLogin() {
    Router.push("/login");
  }

  function handleLogout(e) {
    e.preventDefault();

    removeToken();
    redirectToLogin();
  }

  if (user.hasOwnProperty("email")) {
    return (
      <>
        <Header />
        <h3>{user.email}'s Profile</h3>
        <button
              className="btn btn-info"
              type="button"
              style={{ color: "white", backgroundColor: "#0d6efd" }}
              onClick={handleLogout}
            >
              &nbsp; Logout
        </button>
        
       <div style={styles}>
          <Link href="/cargos"><span>Gerenciar cargos</span></Link>
        </div>
      </>
    );
  }
  return(
    <>
    </>
  ) 
}