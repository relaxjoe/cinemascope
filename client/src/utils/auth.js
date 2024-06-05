// utils/auth.js
class Auth {
  static login(token) {
    localStorage.setItem('id_token', token);
    window.location.assign('/');
  }

  static logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }

  static loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  static getToken() {
    return localStorage.getItem('id_token');
  }

  static isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}

export default Auth;