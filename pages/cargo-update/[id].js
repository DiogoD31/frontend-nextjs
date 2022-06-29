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

      console.log("Resposta" + dataResponse);
      if (!dataResponse.status === 200) {
        setMessage('Erro ao registar dados!');
      } else if (dataResponse.status === 200) {
        setMessage("Dados Cadastrados")
        console.log("Dados Cadastrados")

        let intervalId = setTimeout(reload, 3000);
        console.log('Interval: ' + intervalId);

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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="h1" style={fontwhite}>Register</legend>
            <div className="mb-3">
              <label htmlFor="descricaoInput" className="form-label" style={fontwhite}>
                Descrição:&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="descricaoInput"
                className="form-control"
                placeholder="Descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="experienciaInput" className="form-label" style={fontwhite}>
                Experiência:&nbsp;&nbsp;
              </label>
              <textarea
                type="text"
                id="experienciaInput"
                className="form-control"
                placeholder="Experiencia"
                value={salario}
                onChange={(e) => setExperiencia(e.target.value)}
              ></textarea>
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="areaAtuacaoInput" className="form-label" style={fontwhite}>
                Area Atuação:&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="areaAtuacaoInput"
                className="form-control"
                placeholder="Area Atuação"
                value={areaAtuacao}
                onChange={(e) => setAreaAtuacao(e.target.value)}
              />
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="beneficiosInput" className="form-label" style={fontwhite}>
                Benefícios:&nbsp;&nbsp;
              </label>
              <textarea
                type="text"
                id="beneficiosInput"
                className="form-control"
                placeholder="Benefícios"
                value={beneficios}
                onChange={(e) => setBeneficios(e.target.value)}
              ></textarea>
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="salarioInput" className="form-label" style={fontwhite}>
                Salário:&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="salarioInput"
                className="form-control"
                placeholder="Salário"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
              />
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="habilidadesDesejadasInput" className="form-label" style={fontwhite}>
                Habilidades Desejadas:&nbsp;&nbsp;
              </label>
              <textarea
                type="text"
                id="habilidadesDesejadasInput"
                className="form-control"
                placeholder="Habilidades Desejadas"
                value={habilidadesDesejadas}
                onChange={(e) => setHabilidadesDesejadas(e.target.value)}
              ></textarea>
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="competenciasDesejadasInput" className="form-label" style={fontwhite}>
                Competências Desejadas:&nbsp;&nbsp;
              </label>
              <textarea
                type="text"
                id="competenciasDesejadasInput"
                className="form-control"
                placeholder="Habilidades Desejadas"
                value={competenciasDesejadas}
                onChange={(e) => setCompetenciasDesejadas(e.target.value)}
              ></textarea>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </fieldset>
        </form>
        <span>{cargo.id}</span>
        <div style={styles}>
          <Link href="/cargos">cargos</Link>
        </div>
      </BaseLayout>
    </div>
  );
};

export default CargoUpdate;