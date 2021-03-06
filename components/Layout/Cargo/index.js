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
                      <label>Descri????o</label>
                      <input  className="input-field-descricao" 
                              type="text" 
                              placeholder="Digite a Descri????o"
                              onChange={(e) => setDescricao(e.target.value)}>
                      </input>
                    </div>
                    <div className="input-field">
                      <label>Experi??ncia</label>
                      <input  type="text" 
                              placeholder="Digite a Experi??ncia"
                              onChange={(e) => setExperiencia(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Area Atua????o</label>
                      <input  type="text" 
                              placeholder="Digite a Area Atua????o"
                              onChange={(e) => setAreaAtuacao(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Benef??cios</label>
                      <input  type="text" 
                              placeholder="Digite os Benef??cios"
                              onChange={(e) => setBeneficios(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Sal??rio</label><span className="salario-aviso">*Exemplo: 1200.00*</span>
                      <input  type="text" 
                              placeholder="Digite o Sal??rio"
                              onChange={(e) => setSalario(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Habilidades Desejadas</label>
                      <input  type="text" 
                              placeholder="Digite as Habilidades Desejadas"
                              onChange={(e) => setHabilidadesDesejadas(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Compet??ncias Desejadas</label>
                      <input  type="text" 
                              placeholder="Digite as Compet??ncias Desejadas"
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