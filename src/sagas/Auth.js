import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { showAuthMessage, userSignInSuccess, userSignOutSuccess } from "actions/Auth";

import {
    SIGNIN_USER,
    SIGNOUT_USER
} from "constants/ActionTypes";

import { $http } from "util/HttpRequest";
import AuthService from "../util/AuthService";
import { AppConst, Services } from "../util/Util";


const signInUserWithEmailPasswordRequest = async (userName, password) =>
    await $http.post(`${AppConst.BaseUrl}${Services.Security}/User/SignIn`,
        { UserName: userName, Password: password })
        .then(authUser => authUser);

const signOutRequest = async () =>
    await $http.get(`${AppConst.BaseUrl}${Services.Security}/User/SignOut`)
        .then(authUser => authUser);

function* signInUserWithEmailPassword({ payload }) {
    const { userName, password } = payload;
    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, userName, password);
        if (signInUser.Status !== "OK") {
            yield put(showAuthMessage(signInUser.Message));
        } else {
            const { Result } = signInUser;
            const auth = new AuthService();
            auth.setToken(Result.Token);
            delete Result.Token;
            auth.setUser(Result);
            AppConst.DateFormat = Result.DateFormat;
            yield put(userSignInSuccess(Result));
        }
    } catch (error) {
        yield put(showAuthMessage(error.response ? error.response.data.message : error));
    }
}

function* signOut() {
    try {
        const signOutUser = yield call(signOutRequest);
        if (signOutUser.Status === "OK") {
            new AuthService().logOut();
            yield put(userSignOutSuccess(signOutUser));
        } else {
            yield put(showAuthMessage(signOutUser.Message));
        }
    } catch (error) {
        yield put(showAuthMessage(error.response ? error.response.data.message : error));
    }
}


export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
    yield all(
        [
            fork(signInUser),
            fork(signOutUser)
        ]
    );
}