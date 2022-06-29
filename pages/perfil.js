import React, { useState } from "react";
import Router from "next/router";
import { BaseLayout } from "../components/Layout/Base";
import PerfilRegisterForm from "../components/Layout/Perfil";
import { whoAmI } from "../lib/auth";
import { getToken } from "../lib/token";
import Link from "next/link";
import Header from '../components/Header'

const styles = {
    marginTop: 30,
    textAlign: "center",
  };
  
const PerfilRegister = () => {
    const [user, setUser] = useState({});
  
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
              var username = JSON.stringify(data.nome);
              console.log('user: ' + username);
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
  
    return (
      <div>
        <Header />
        <BaseLayout>
          {user.username}
          <PerfilRegisterForm />
  
          <div style={styles}>
            <Link href="/cargos">Perfil</Link>
          </div>
        </BaseLayout>
      </div>
    );
  };
  
  export default PerfilRegister;
