import { useState } from "react";
import { registerUser } from "../../../lib/auth";
import Router from "next/router";
import fontwhitecenter from '../../../styles/font-white-center';
import fontwhite from '../../../styles/font-white';
import Link from "next/link";

export function RegisterForm() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dataResponse = await registerUser({
        nome: nome,
        senha: senha,
        email: email,
      });

      if (!dataResponse.ok) {
        setMessage('Erro ao registar dados!');
      } else {
        Router.push("/login");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="body-cadsatro sign-in-container">
      <p style={fontwhitecenter}>{msg}</p>
      <form className="form-cadastro" onSubmit={handleSubmit}>
          <h1 className="title-cadastro">Cadastro</h1>
          <input
              type="email"
              id="emailInput"
              className="inp-cadastro"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="text"
            id="nomeInput"
            className="inp-cadastro"
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />
          <input
              type="password"
              id="senhaInput"
              className="inp-cadastro"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          <button 
            type="submit" 
            className="btn-cadastro">
            Login
          </button>
          <div className="cadastro-login">
            <Link href="/login">
              <span>
                <span     className="text-color">Registrado antes?
                </span><br></br>
                Faça seu login agora mesmo!
              </span>
            </Link>
          </div>
      </form>
    </div>
  );
}
