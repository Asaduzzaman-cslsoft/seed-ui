import decode from "jwt-decode";

export default class AuthService {
  getToken() {
    return localStorage.getItem("seed_current_token");
  }
  setToken(idToken) {
    localStorage.setItem("seed_current_token", idToken);
  }
  getUser() {
    let user = localStorage.getItem("seed_current_user");
    if (user) return JSON.parse(user);
    else return null;
  }
  setUser(user) {
    localStorage.setItem("seed_current_user", JSON.stringify(user));
  }
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  logOut() {
    localStorage.removeItem("seed_current_token"); 
    localStorage.removeItem("seed_current_user");    
  }
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }
}