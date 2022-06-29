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
        <div className='body-profile-container'>
        <div className='profile-container'>
            <div className='profile-container-form' onSubmit={handleSubmit}>
                <h1 className='container-form-title'>Meu Perfil</h1>
                <form action='profile-form-header'>
                    <div className='profile-header-group'>
                        <div className='profile-group-box'>
                            <h1>Nome Completo</h1>
                            <input
                                    className='profile-box-name'
                                    type="text"
                                    placeholder='Digite seu nome completo'
                                    onChange={(e) => setNome(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>CPF</h1>
                            <input
                                    className='profile-box-cpf'
                                    type="text"
                                    placeholder='Digite seu CPF'
                                    onChange={(e) => setCpf(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Endereço</h1>
                            <input
                                    className='profile-box-endereco'
                                    type="text"
                                    placeholder='Digite seu Endereço'
                                    onChange={(e) => setEndereco(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Matricula faculdade</h1>
                            <input
                                    className='profile-box-numero'
                                    type="text"
                                    placeholder='Digite seu Numero'
                                    onChange={(e) => setMatricula(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Telefone</h1>
                            <input
                                    className='profile-box-cidade'
                                    type="text"
                                    placeholder='Digite seu Cidade'
                                    onChange={(e) => setTelefone(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>E-mail</h1>
                            <input
                                    className='profile-box-estado'
                                    type="text"
                                    placeholder='Digite seu Estado'
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Curriculo</h1>
                            <input
                                    className='profile-box-cep'
                                    type="text"
                                    placeholder='Digite seu CEP'
                                    onChange={(e) => setCurriculo(e.target.value)}
                                    />
                        </div>
                    </div>

                    <div className='profile-header-gender'>
                        <div className='profile-gender-title'>
                            <h6>Gênero</h6>
                        </div>
                        <div className='profile-gender-group'>
                            <div className='gender-group-input'>
                                <input  type="radio"
                                        id='female'
                                        name='gender'
                                />
                                <label htmlFor='female'>Feminino</label>
                            </div>
                            <div className='gender-group-input'>
                                <input  type="radio"
                                        id='male'
                                        name='gender'
                                />
                                <label htmlFor='male'>Masculino</label>
                            </div>
                            <div className='gender-group-input'>
                                <input  type="radio"
                                        id='others'
                                        name='gender'
                                />
                                <label htmlFor='male'>Prefiro não dizer</label>
                            </div>
                        </div>
                    </div>

                    <div className='profile-header-continueBtn'>
                        <Link href="#">
                            <button>Salvar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

//export default PerfilRegisterForm;