import { useState } from "react";
import { registerPerfil } from "../../../lib/auth";
import Router from "next/router";
import fontwhitecenter from '../../../styles/font-white-center';
import fontwhite from '../../../styles/font-white';
import Link from "next/link";

//const CargoRegisterForm = ({ cargo }) => {
  
export default function PerfilRegisterForm({id}) {
  console.log('Perfil do Componente', id);

  const [endereco, setEndereco] = useState("");
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [curriculo, setCurriculo] = useState("");
  const [msg, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dataResponse = await registerPerfil({
        endereco: endereco,
        nome: nome,
        matricula: matricula,
        cpf: cpf,
        telefone: telefone,
        email: email,
        curriculo: curriculo
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
      <p>{msg}</p>
      <div className="body-cargos-registro">
        <div className="container-cargo-registro">
            <header>Meu Perfil</header>

          <form onSubmit={handleSubmit}>
              <div className="details personal">
                  <div className="fields">
                    <div className="input-field">
                      <label>Nome</label>
                      <input  className="input-field-descricao" 
                              type="text" 
                              placeholder="Digite a Nome"
                              onChange={(e) => setDescricao(e.target.value)}>
                      </input>
                    </div>
                    <div className="input-field">
                      <label>Endereço</label>
                      <input  type="text" 
                              placeholder="Digite a Endereço"
                              onChange={(e) => setExperiencia(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Matricula</label>
                      <input  type="text" 
                              placeholder="Digite a Matricula"
                              onChange={(e) => setAreaAtuacao(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>CPF</label>
                      <input  type="text" 
                              placeholder="Digite os CPF"
                              onChange={(e) => setBeneficios(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Telefone</label>
                      <input  type="text" 
                              placeholder="Digite o Telefone"
                              onChange={(e) => setSalario(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Email</label>
                      <input  type="text" 
                              placeholder="Digite as Email"
                              onChange={(e) => setHabilidadesDesejadas(e.target.value)}></input>
                    </div>
                    <div className="input-field">
                      <label>Curriculo</label>
                      <input  type="text" 
                              placeholder="Digite as Curriculo"
                              onChange={(e) => setCompetenciasDesejadas(e.target.value)}></input>
                    </div>
                  </div>
              </div>
              <button type="submit" className="btn-cargos">
                Salvar
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

//export default PerfilRegisterForm;