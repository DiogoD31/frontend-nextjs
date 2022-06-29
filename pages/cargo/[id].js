import React, { useState } from "react";
import { Router, useRouter } from "next/router";
import { BaseLayout } from "../../components/Layout/Base";
import { CargoRegisterForm } from "../../components/Layout/Cargo";
import { updateCargo } from "../../lib/auth";
import { whoAmI, cargoPorId } from "../../lib/auth";
import { getToken } from "../../lib/token";
import Link from "next/link";
import fontwhitecenter from '../../styles/font-white-center';
import fontwhite from '../../styles/font-white';

const styles = {
  marginTop: 30,
  textAlign: "center",
};

const CargoUpdate = () => {
  const [user, setUser] = useState({});
  const [cargo, setCargo] = useState({});

  const [descricao, setDescricao] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [salario, setSalario] = useState("");
  const [habilidadesDesejadas, setHabilidadesDesejadas] = useState("");
  const [competenciasDesejadas, setCompetenciasDesejadas] = useState("");
  const [msg, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dataResponse = await updateCargo(id, {
        descricao: descricao,
        experiencia: experiencia,
        areaAtuacao: areaAtuacao,
        beneficios: beneficios,
        salario: salario,
        habilidadesDesejadas: habilidadesDesejadas,
        competenciasDesejadas: competenciasDesejadas
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


  const router = useRouter();
  //const cargoId = router.query.id;
  //console.log("00cargo: ", cargoId);

  //const router = useRouter()

  const { id } = router.query

  console.log('Id Param -->: ' + id)

  React.useEffect(() => {
    if (!router.isReady) return;
    console.log('Id Param2 -->: ' + id)

    if (typeof window !== "undefined") {
      // const token = window.localStorage.getItem("token");
      //console.log("token dashboard: ", token);
      const token = getToken();

      if (!token) {
        redirectToLogin();
      } else {
        (async () => {
          try {

            const cargo = await cargoPorId(id);
            console.log('Data cargo: ' + cargo)
            setDescricao(cargo.descricao);
            setExperiencia(cargo.experiencia);
            setAreaAtuacao(cargo.areaAtuacao);
            setBeneficios(cargo.beneficios);
            setSalario(cargo.salario);
            setHabilidadesDesejadas(cargo.habilidadesDesejadas);
            setCompetenciasDesejadas(cargo.competenciasDesejadas);

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
              setCargo(cargo);
            }
          } catch (error) {
            console.log('Erro: ' + error);
            // If we receive any error, we should be redirected to the Login page
            //redirectToLogin();
          }
        })();
      }
    }
  }, [router.isReady]);

  function redirectToLogin() {
    Router.push("/login");
  }

  return (
    <div>
      <BaseLayout>
        <p style={fontwhitecenter}>{msg}</p>
        <table border={1} >
          <tbody>
            <tr><th colSpan={5}><Link href="/cargo-register">Add</Link></th></tr>
            <tr>
              <th>id</th>
              <th>descricao</th>
              <th>salario</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            <tr>
              <td>{cargo.id}</td>
              <td onClick={() => redirectToView(cargo.id)}>{cargo.descricao}</td>
              <td>{cargo.salario}</td>
              <td onClick={() => redirectToUpdate(cargo.id)}>Edit</td>
              <td onClick={() => handleDelete(cargo.id)}>Delete</td>
            </tr>
          </tbody>
        </table>
        <span>{cargo.id}</span>
        <div style={styles}>
          <Link href="/cargos">cargos</Link>
        </div>
      </BaseLayout>
      <style jsx>{`
        h3 {
          color: white;
          font-size: 30px;
        }

        table {
          color: white;
          font-size: 30px;
        }
      `}</style>
    </div>
  );
};

export default CargoUpdate;