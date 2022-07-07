import { useState } from "react";
import { registerCargo } from "../../../lib/auth";
import Router from "next/router";
import Header from "../../Header";

//const CargoRegisterForm = ({ cargo }) => {
  
export function CargoRegisterForm({}) {

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
      <Header />
      <div className="body-cargos-registro">
        <div className="container-cargo-registro">
            <header>Adicionar Vaga</header>

          <form onSubmit={handleSubmit}>
              <div className="details personal">
                  <div className="fields">
                    <div className="input-field">
                      <label>Descrição</label>
                      <input  className="input-field-descricao" 
                              type="text" 
                              placeholder="Digite a Descrição"
                              onChange={(e) => setDescricao(e.target.value)}>
                      </input>
                    </div>
                    <div className="input-field">
                      <label>Experiência</label>
                      <input  type="text" 
                              placeholder="Digite a Experiência"
                              onChange={(e) => setExperiencia(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Area Atuação</label>
                      <input  type="text" 
                              placeholder="Digite a Area Atuação"
                              onChange={(e) => setAreaAtuacao(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Benefícios</label>
                      <input  type="text" 
                              placeholder="Digite os Benefícios"
                              onChange={(e) => setBeneficios(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Salário</label><span className="salario-aviso">*Exemplo: 1200.00*</span>
                      <input  type="text" 
                              placeholder="Digite o Salário"
                              onChange={(e) => setSalario(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Habilidades Desejadas</label>
                      <input  type="text" 
                              placeholder="Digite as Habilidades Desejadas"
                              onChange={(e) => setHabilidadesDesejadas(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Competências Desejadas</label>
                      <input  type="text" 
                              placeholder="Digite as Competências Desejadas"
                              onChange={(e) => setCompetenciasDesejadas(e.target.value)}></input>
                    </div>
                  </div>
              </div>
              <button type="submit" className="btn-cargos">
                Enviar
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

//export default CargoRegisterForm;