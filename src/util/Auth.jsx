import AuthService from "../util/AuthService";
import { AppConst, Services } from "../util/Util";
import { $http } from "../util/HttpRequest";

export default class Auth {
    constructor() {
        this.logIn = this.logIn.bind(this);
    }
    async logIn(userName, password) {
        const user = {
            userName,
            password
        };
        return await $http
            .post(`${AppConst.BaseUrl}${Services.Security}/User/SignIn`, user)
            .then(res => {
                if (res.Status !== "OK") return Promise.reject(res.Message);
                const { Result } = res;
                const auth = new AuthService();
                auth.setToken(Result.Token);
                delete Result.Token;
                auth.setUser(Result);
                AppConst.DateFormat = Result.DateFormat;
                return Promise.resolve(Result);
            })
            .catch(err => {
                if (err && (err.toString() === "Network Error" || err.status === -1))
                    return Promise.reject("Server not found....");
                return Promise.reject(err);
            });
    }
    async logOut() {
        return await $http
            .get(`${AppConst.BaseUrl}${Services.Security}/User/SignOut`)
            .then(res => {
                return Promise.resolve(res.Result);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
}