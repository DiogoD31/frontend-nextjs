import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Router from "next/router";
import { removeToken } from '../lib/token';
import { BiBook,BiMessageAlt,BiMessageCheck,BiUser,BiRocket,BiLogOut } from "react-icons/bi";


export default function Header() {

  function redirectToLogin() {
    Router.push("/login");
  }

  function handleLogout(e) {
    e.preventDefault();

    removeToken();
    redirectToLogin();
  }

  return (
    <div>
      <section id="sidebar">
        <a href="/cargos" className="brand">
          <i className='bx bxs-smile'></i>
          <span className="text">Estagiun</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="/curriculo">
              <BiBook className='bx bxs-dashboard' />
              <span className="text">Curriculo</span>
            </a>
          </li>
          <li>
            <a href="/cargos">
              <BiMessageAlt className='bx bxs-shopping-bag-alt' />
              <span className="text">Cargos</span>
            </a>
          </li>
          {/* <li>
            <a href="/vagasaplicadas">
              <BiMessageCheck className='bx bxs-doughnut-chart' />
              <span className="text">Vagas Aplicadas</span>
            </a>
          </li> */}
          <li>
            <a href="/perfil">
              <BiUser className='bx bxs-message-dots' />
              <span className="text">Perfil</span>
            </a>
          </li>
          <li>
            <a href="/dicas">
              <BiRocket className='bx bxs-group' />
              <span className="text">Em breve</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="/login" className="logout">
              <BiLogOut className='bx bxs-log-out-circle' />
              <span className="text" onClick={handleLogout}>Logout</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
    















    // <header className='header'>
    //   <nav className='navbar'>
    //     <h1 className='title-nav' href="/">
    //       <BiSmile className='bx' />
    //       <span id="site-name">Estagiun</span>
    //     </h1>
    //     <ul className='group-link' id="pages">
    //       <li className='link-nav'>
    //         <Link className='link-nav-link' href="/curriculo">
    //           {/* ICONE */}
    //           <span className='navbar-text'>Curriculo</span>
    //         </Link>
    //       </li>
    //       <li className='link-nav'>
    //         <Link className='link-nav-link' href="/cargos">
    //           {/* ICONE */}
    //           <span className='navbar-text'>Cargos</span>
    //         </Link>
    //       </li>
    //       <li className='link-nav'>
    //         <Link className='link-nav-link' href="/vagasaplicadas">
    //           {/* ICONE */}
    //           <span className='navbar-text'>Vagas Aplicadas</span>
    //         </Link>
    //       </li>
    //       <li className='link-nav'>
    //         <Link className='link-nav-link' href="/perfil">
    //           {/* ICONE */}
    //           <span className='navbar-text'>Perfil</span>
    //         </Link>
    //       </li>
    //       <li className='link-nav'>
    //         <Link className='link-nav-link' href="/register-forms">
    //           {/* ICONE */}
    //           <span className='navbar-text'>Dicas</span>
    //         </Link>
    //       </li>
    //       <li className='link-nav'>
    //         <Link className='link-nav-link' href="/login">
    //           {/* ICONE */}
    //           <span className='navbar-text'>Entrar</span>
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
};