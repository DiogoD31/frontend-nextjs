import fontwhitecenter from '../styles/font-white-center';
import fontwhite from '../styles/font-white';
import Link from 'next/link';
import Header from '../components/Header';
import { FaFacebookF,FaInstagram,FaLinkedinIn } from "react-icons/fa";

const qs = require('qs');

export default function Home() {
  return (
    <div className='welcome-header'>
      <div className='welcome-home-container'>
        <h1>Bem vindo a <span className='text-color'>Estagiun</span></h1>
        <p>Se você tiver um cadastro clique no botão!<br></br>Para conhecer mais sobre nosso trabalho siga abaixo!</p>

        <div className='welcome-home-btns'>
          <Link href="/login">
            <button className='welcome-home-btn-login'>Login</button>
          </Link>
          <Link href="/register">
            <button className='welcome-home-btn-cadastro'>Cadastrar-se</button>
          </Link>
          
          
        </div>
      </div>

      <section className='welcome-home-detail'>
        <div className='welcome-detail-container'>
          <div className='welcome-detail-row'>
            <div className='welcome-detail-detailItem'>
              <span>ICON</span>
              <h2>Como funciona</h2>
              <div className='welcome-detailItem-line'></div>
              <p className='welcome-detailItem-text'>Essa plataforma foi desenvolvida pensando na facilidade de interação entre alunos e empresas. As empresas poderão divulgar
              suas vagas de todos os níveis para qualquer cargo, especificando requisitos e obtendo informações dos candidatos, como nome, 
              idade, nivel de escolaridade, de conhecimento, suas avaliações entre outras informações</p>
            </div>
            <div className='welcome-detail-detailItem'>
              <span>ICON</span>
              <h2>Os dois lados</h2>
              <div className='welcome-detailItem-line'></div>
              <p className='welcome-detailItem-text'>Por parte dos  alunos, além de sempre terem as 
              informações de empresas e cargos que estão contratando e avaliações da empresa, eles poderão se candidatar a vagas publicadas pelas mesmas. 
              Um outro ponto positivo, é que tanto para as empresas, quanto para os alunos, poderão, de certa forma, estarem mais ativos 
              no mercado de trabalho.</p>
            </div>
          </div>  
        </div>
      </section>

      <footer className= "welcome-home-footer">
      <div className= "welcome-footer-container">
        <p className= "welcome-container-text">Copyright &copy; Estagiun | All Rights Reserved</p>
        <div className= "welcome-container-footer-links">
          <a href = "#" className= "center">
            <FaFacebookF/>
          </a>
          <a href = "#" className= "center">
            <FaInstagram/>
          </a>
          <a href = "#" className= "center">
            <FaLinkedinIn/>
          </a>
        </div>
      </div>
    </footer>
    </div>

  );
}