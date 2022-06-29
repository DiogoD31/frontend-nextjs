import React, { useState } from "react";
import { Router, useRouter } from "next/router";
import { BaseLayout } from "../../components/Layout/Base";
import PerfilRegisterForm from "../../components/Layout/Perfil";
import { updatePerfil } from "../../lib/auth";
import { whoAmI, perfilPorId } from "../../lib/auth";
import { getToken } from "../../lib/token";
import Link from "next/link";

const styles = {
  marginTop: 30,
  textAlign: "center",
};

const PerfilUpdate = () => {
  const [user, setUser] = useState({});
  const [perfil, setPerfil] = useState({});

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
      const dataResponse = await updatePerfil(id, {
        endereco: endereco,
        nome: nome,
        matricula: matricula,
        cpf: cpf,
        telefone: telefone,
        email: email,
        curriculo: curriculo
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

            const perfil = await perfilPorId(id);
            console.log('Data perfil: ' + perfil)
            setNome(perfil.nome);
            setEmail(perfil.email);
            setCpf(perfil.cpf);
            setTelefone(perfil.telefone);
            setEndereco(perfil.endereco);
            setMatricula(perfil.matricula);
            setCurriculo(perfil.curriculo);

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
              setPerfil(perfil);
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
      <div className='body-profile-container'>
        <div className='profile-container' onSubmit={handleSubmit}>
            <div className='profile-container-form'>
                <h1 className='container-form-title'>Meu Perfil</h1>
                <form action='profile-form-header'>
                    <div className='profile-header-group'>
                        <div className='profile-group-box'>
                            <h1>Nome Completo</h1>
                            <input
                                    className='profile-box-name'
                                    type="text"
                                    placeholder='Digite seu nome completo'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>CPF</h1>
                            <input
                                    className='profile-box-cpf'
                                    type="text"
                                    placeholder='Digite seu CPF'
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Endereço</h1>
                            <input
                                    className='profile-box-endereco'
                                    type="text"
                                    placeholder='Digite seu Endereço'
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Matricula faculdade</h1>
                            <input
                                    className='profile-box-numero'
                                    type="text"
                                    placeholder='Digite seu Numero'
                                    value={matricula}
                                    onChange={(e) => setMatricula(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Telefone</h1>
                            <input
                                    className='profile-box-cidade'
                                    type="text"
                                    placeholder='Digite seu Cidade'
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>E-mail</h1>
                            <input
                                    className='profile-box-estado'
                                    type="text"
                                    placeholder='Digite seu Estado'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                        </div>
                        <div className='profile-group-box'>
                            <h1>Curriculo</h1>
                            <input
                                    className='profile-box-cep'
                                    type="text"
                                    placeholder='Digite seu CEP'
                                    value={curriculo}
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
                <span>{perfil.id}</span>
                <div style={styles}>
                    <Link href="/perfil">perfil</Link>
                </div>
            </div>
        </div>
      </div>
      </BaseLayout>
    </div>
  );
};

export default PerfilUpdate;