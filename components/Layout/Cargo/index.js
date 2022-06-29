import { useState } from "react";
import { registerCargo } from "../../../lib/auth";
import Router from "next/router";
import fontwhitecenter from '../../../styles/font-white-center';
import fontwhite from '../../../styles/font-white';

//const CargoRegisterForm = ({ cargo }) => {
  
export function CargoRegisterForm({id, descricaoa, experienciaa}) { // areaAtuacaoa, beneficiosa, salarioa, habilidadesDesejadasa, competenciasDesejadasa}) {
  console.log('Cargo do Componente', id + descricaoa + experienciaa); //+ areaAtuacaoa + beneficiosa + salarioa + habilidadesDesejadasa + competenciasDesejadasa);

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
      const dataResponse = await registerCargo({
        descricao: descricao,
        experiencia: experiencia,
        areaAtuacao: areaAtuacao,
        beneficios: beneficios,
        salario: salario,
        habilidadesDesejadas: habilidadesDesejadas,
        competenciasDesejadas: competenciasDesejadas
      });

      console.log("Resposta" + dataResponse);
      if (!dataResponse.status === 201) {
        setMessage('Erro ao registar dados!');
      } else if (dataResponse.status === 201) {
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

  function reload() {
    window.location.reload();
  }

  return (
    <div>
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
              onChange={(e) => setCompetenciasDesejadas(e.target.value)}
            ></textarea>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

//export default CargoRegisterForm;