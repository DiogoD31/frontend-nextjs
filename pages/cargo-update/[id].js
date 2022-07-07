import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { BaseLayout } from "../../components/Layout/Base";
import { CargoRegisterForm } from "../../components/Layout/Cargo";
import { updateCargo } from "../../lib/auth";
import { whoAmI, cargoPorId } from "../../lib/auth";
import { getToken } from "../../lib/token";
import Link from "next/link";
import Header from "../../components/Header";


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
        redirectToCargo()
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
  function redirectToCargo() {
    Router.push("/cargos");
  }
  return (
    <div>
      <BaseLayout>
      <Header/>
      <div className="body-cargos-registro">
        <div className="container-cargo-registro">
            <header>Editar Vaga</header>

          <form onSubmit={handleSubmit}>
              <div className="details personal">
                  <div className="fields">
                    <div className="input-field">
                      <label>Descrição</label>
                      <input
                            type="text"
                            id="descricaoInput"
                            placeholder="Descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Experiência</label>
                      <input
                        type="text"
                        id="experienciaInput"
                        placeholder="Experiencia"
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Area Atuação</label>
                      <input
                        type="text"
                        id="areaAtuacaoInput"
                        placeholder="Area Atuação"
                        value={areaAtuacao}
                        onChange={(e) => setAreaAtuacao(e.target.value)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Benefícios</label>
                      <input
                        type="text"
                        id="beneficiosInput"
                        placeholder="Benefícios"
                        value={beneficios}
                        onChange={(e) => setBeneficios(e.target.value)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Salário</label><span className="salario-aviso">*Exemplo: 1200.00*</span>
                      <input
                        type="text"
                        id="salarioInput"
                        placeholder="Salário"
                        value={salario}
                        onChange={(e) => setSalario(e.target.value)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Habilidades Desejadas</label>
                      <input
                        type="text"
                        id="habilidadesDesejadasInput"
                        placeholder="Habilidades Desejadas"
                        value={habilidadesDesejadas}
                        onChange={(e) => setHabilidadesDesejadas(e.target.value)}
                      />
                    </div>
                    <div className="input-field">
                      <label>Competências Desejadas</label>
                      <input
                        type="text"
                        id="competenciasDesejadasInput"
                        placeholder="Habilidades Desejadas"
                        value={competenciasDesejadas}
                        onChange={(e) => setCompetenciasDesejadas(e.target.value)}
                      />
                    </div>
                  </div>
              </div>
              <button type="submit" className="btn-cargos">
                Editar
              </button>
          </form>
        </div>
      </div>
      </BaseLayout>
    </div>
  );
};

export default CargoUpdate;