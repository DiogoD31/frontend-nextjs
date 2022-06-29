import { getToken, setToken } from "./token";

export const loginUser = async (email, senha) => {
  console.log('-1>' + email + '-' + senha);

  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/login", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();
  const token = JSON.stringify(data.token).replace(/^["'](.+(?=["']$))["']$/, '$1');
  console.log("Data is :", token);
  setToken(token)

  return data;
};
// ------------------------------------------------------------*
export const registerUser = async (payload) => {
  console.log('-1>' + payload.email + '-' + payload.nome + '-' + payload.senha);
  //const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/register", {
  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/register", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(function (resp) {
    console.log(resp.status);
    console.log(resp.ok);
    console.log(JSON.stringify(resp.json()));
    return resp;
  });
  //
  //return await res;
};

// ------------------------------------------------------------*
export const registerCargo = async (payload) => {
  const token = getToken();
  console.log('Token registerCargo:', token);

  console.log('-1>' + payload.email + '-' + payload.nome + '-' + payload.senha);
  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/cargos", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(payload),
  });
  
  const data = await res;
  console.log("Data Usuario:", data);
  return data;
};

// ------------------------------------------------------------*
export const updateCargo = async (id, payload) => {
  const token = getToken();
  // console.log('Id:', id);
  // console.log('Token registerCargo:', token);

  // console.log('-1>' + payload.email + '-' + payload.nome + '-' + payload.senha);
  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/cargos/" + id, {
    method: "PUT",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(payload),

  });

  const data = await res;
  console.log("Data Usuario:", data);
  return data;
};
// ------------------------------------------------------------*
export const updatePerfil = async (id, payload) => {
  const token = getToken();
  console.log('Id:', id);
  console.log('Token:', token);

  console.log('-1>' + payload.email + '-' + payload.nome + '-' + payload.senha);
  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/aluno/" + id, {
    method: "PUT",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(payload),

  });

  const data = await res;
  console.log("Data Usuario:", data);
  return data;
};
// ------------------------------------------------------------*

export const registerPerfil = async (payload) => {
  const token = getToken();
  console.log('Token registerPerfil:', token);

  console.log('-1>' + payload.email + '-' + payload.nome + '-' + payload.senha);
  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/aluno", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(payload),
  });
  
  const data = await res;
  console.log("Data Usuario:", data);
  return data;
};


// ------------------------------------------------------------*
export const whoAmI = async () => {
  const token = getToken();
  console.log('Token WhoAmi:', token);

  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/usuarios/1", {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  const data = await res.json();
  console.log("Data Usuario:", data);
  return data;
};
// ------------------------------------------------------------*
export const cargoList = async () => {
  const token = getToken();
  console.log('Token Gargos:', token);

  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/cargos", {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  const data = await res.json();
  console.log("Data Cargo:", data);
  return data;
};
// ------------------------------------------------------------*
export const cargoDelete = async (id) => {
  const token = getToken();
  console.log('Token Gargos:', token);

  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/cargos/" + id, {
    method: "DELETE",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  const data = await res.status;
  console.log("Data Cargo:", data);
  return data;
};
// ------------------------------------------------------------*
export const cargoPorId = async (id) => {
  const token = getToken();
  console.log('Token Gargos:', token);

  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/cargos/" + id, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  const data = await res.json();
  console.log("Data Cargo:", data);
  return data;
};
// ------------------------------------------------------------*
export const perfilPorId = async (id) => {
  const token = getToken();
  console.log('Token Gargos:', token);

  const res = await fetch("https://unipacvagas.herokuapp.com/api/v1/aluno/" + id, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });

  const data = await res.json();
  console.log("Data Cargo:", data);
  return data;
};