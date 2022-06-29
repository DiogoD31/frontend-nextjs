import { useState, useEffect } from "react";
import Router from "next/router";
import { loginUser } from "../../../lib/auth";
import { removeToken } from "../../../lib/token";
import fontwhite from '../../../styles/font-white';
import Link from "next/link";
import AsyncLocalStorage from '@createnextapp/async-local-storage';

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Remove the User's token which saved before.
    removeToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      // API call:
      const data = await loginUser(email, senha);
      if (data.data !== null) {
        //var token = JSON.stringify(data.token);
       // console.log("Token is :", token);
        //console.log("rememberMe:", rememberMe)
       // await AsyncLocalStorage.setItem('token', token)
       // if (typeof window !== 'undefined') {
       //   console.log("Window :", window);
        //  window.localStorage.setItem('token', token)
       // }
        setTimeout(() => {
          Router.push("/cargos");
        }, 1000);
      } else {
        var message = JSON.stringify(data.error.message);
        console.log("Error is :", message);
        setErrorMessage(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="body-login sign-in-container">
      <form className="form-login" onSubmit={handleSubmit}>
          <h1 className="title-login">Login</h1>
          <input
            type="text"
            id="emailInput"
            className="inp-login"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="senhaInput"
            className="inp-login"
            placeholder="Semha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button 
            type="submit" 
            className="btn-login" 
            disabled={isLoading}>
            Login
          </button>
          <div className="login-cadastro">
            <Link href="/register">
              <span>Cadastre-se agora!</span>
            </Link>
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert" style={fontwhite}>
              {errorMessage}
            </div>
          )}
      </form>
    </div>
  );
}