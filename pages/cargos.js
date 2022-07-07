import React, { useState } from "react";
import Router from "next/router";
import { cargoList, cargoDelete, whoAmI } from "../lib/auth";
import { removeToken, getToken } from "../lib/token";
import Link from "next/link";
import fontwhitecenter from '../styles/font-white-center';
import Header from "../components/Header";
import { BiPencil, BiX} from "react-icons/bi";

const styles = {
  marginTop: 30,
  textAlign: "left",
  marginLeft: 220
};

export default function Cargo() {
  const [user, setUser] = useState({});
  const [cargos, setCargo] = useState([]);
  const [msg, setMessage] = useState("");

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
            //console.log("token dashboard1: ", token);
            const userData = await whoAmI();

            if (userData !== null) {
              //console.log('Data: ' + JSON.stringify(userData))
              setUser(userData);
            }

            var email = JSON.stringify(userData.email);
            //console.log('email: ' + email);

            const cargos = await cargoList();
            if (cargos != null) {
              //console.log('Data CArgos: ' + JSON.stringify(cargos));
              setCargo(cargos);
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

  function redirectToUpdate(id) {
    Router.push("/cargo-update/" + id);
  }

  function redirectToView(id) {
    Router.push("/cargo/" + id);
  }

  function handleLogout(e) {
    e.preventDefault();

    removeToken();
    redirectToLogin();
  }

  function handleDelete(id) {
    console.log('delete id:', id);
    (async () => {
      const status = await cargoDelete(id);
      if (status == 204) {
        setMessage("dados deletados")

        let intervalId = setTimeout(reload, 3000);
        console.log('Interval: ' + intervalId);

      }
    })();
  };

  function reload() {
    window.location.reload();
  }


  if (user.hasOwnProperty("email")) {
    return (
      <>
        <Header />
        <div className="view-user">
          <h1 className="view-user-title">Bem vindo(a) {user.nome}</h1>
          <button className="view-user-btn">Configurar Curriulo</button>
        </div>

        <p style={fontwhitecenter}>{msg}</p>
        <div className="table-data">
          {cargos && cargos.length ? (
            <table className="home-cargos">
              <thead>
                <tr className="home-cargos-title">
                  <th>Descricao</th>
                  <th>Salario</th>
                  <th>Beneficios</th>
                  <th>Experiencia</th>
                  <th>Competencias</th> 
                  <th>Hab. Desejadas</th> 
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {cargos.map((cargo, index) => (
                  <tr className="home-cargos-item" key={index}>
                    <td onClick={() => redirectToView(cargo.id)} className='cargos-status'>{cargo.descricao}</td> 
                    <td className='cargos-status'>{cargo.salario}</td>
                    <td className='cargos-status'>{cargo.beneficios}</td>
                    <td className='cargos-status'>{cargo.experiencia}</td>
                    <td className='cargos-status'>{cargo.competenciasDesejadas}</td>
                    <td className='cargos-status'>{cargo.habilidadesDesejadas}</td>
                    <td onClick={() => redirectToUpdate(cargo.id)} ><BiPencil className='cargos-edit'/></td>
                    <td onClick={() => handleDelete(cargo.id)} ><BiX className='cargos-delete'/></td>
                  </tr>
                ))}
                <tr>
                  <Link href="/cargo-register">
                    <th className="cargo-add">Adicionar</th>
                  </Link>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={styles}>
              Lista Vazia
              <Link href="/cargo-register">Add</Link>
            </div>
          )}
        </div>
        
        <style jsx>{`
        h3 {
          color: black;
          font-size: 30px;
        }

        table {
          color: black;
          font-size: 30px;
        }
      `}</style>
      </>
    );
  }
  return <div><p>Welcome back soldier. <br /><br />Welcome to your empty profile.</p>
    <style jsx>{`
        p {
          color: black;
          font-size: 30px;
        }
      `}</style>
  </div>;
}