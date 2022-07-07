/**
 * * Remove stored token
 * It should remove the Token into the SessionStorage or LocalStorage
 *
 * @returns {void}
 */
export function removeToken() {
   localStorage.removeItem("token");
}

/**
 * * Get the Token if presents.
 *
 * @returns {string | undefined}
 */
export function getToken() {
   var token = window.localStorage.getItem("token");// || window.sessionStorage.get("token");
   console.log("Token Retornado: ", token);
   return token;
}

/**
* * Remove stored token
* It should remove the Token into the SessionStorage or LocalStorage
*
* @returns {void}
*/
export function setToken(token) {
   window.localStorage.setItem("token", token);
   //console.log("Token adicionado: " + token)
}