import { Strategy as GithubStratergy } from "passport-github2";
import UserDao from "../daos/user.dao.js"
import passport from "passport";

const userDao = new UserDao();

const strategyOptions = {
    clientID: "Iv1.a28d4a1dc23a0c74",
    clientSecret: "32d497d8a0cd4ea8f908fe51c6c7583b95f7e93e",
    callbackURL: "http://localhost:8080/users/profilegithub"
};

const registerOrLogin = async(accessToken, refreshToken, profile, done)=>{
    console.log("profile:::", profile);
}

passport.use("github", new GithubStratergy(strategyOptions, registerOrLogin))