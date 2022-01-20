import Cookies from 'js-cookie';

const usernameCookie = "username";

class Auth {
    login(username, cb) {
        Cookies.set(usernameCookie, username)
        cb()
    }

    logout(cb) {
        Cookies.remove(usernameCookie)
        cb()
    }

    isAuthenticated() {
        return typeof Cookies.get(usernameCookie) !== 'undefined'
    }

    value() {
        return Cookies.get(usernameCookie)
    }
}

export default new Auth();