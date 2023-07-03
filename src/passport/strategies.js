import { Strategy as LocalStrategy } from "passport-local";
import UserDao from "../daos/user.dao.js";
import passport from "passport";

const userDao = new UserDao();
const strategyOptions = {
    userNameField: "email",
    passwordField: "password",
    passReqToCallBack: true
}

const signUp = async(req, email, password, done)=>{
    try {
        const user = await userDao.getByEmail(email);
        //done es una funcion callback
        //tiene 3 parametros
        //error = null
        //false = no inicia sesion (no se encontro usuario o paso algo)
        //true = funciono el registro (done) y llama a serializar
        if(user) return done(null, false);
        const newUser = await userDao.createUser(req.body);
        return done(null, newUser);
    } catch (error) {
    console.log(error);        
    }
}

const login = async (req, email, password, done) =>{
    const user = { email, password };
    const userLogin = await userDao.loginUser(user);
    if(!userLogin) return done(null, false);
    return done(null, userLogin);
};

const signupStrategy = new LocalStrategy(strategyOptions, signUp);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("register", signupStrategy)
passport.use("login", loginStrategy)

passport.serializeUser((user, done)=>{
    done(null, user._id);

})

passport.deserializeUser(async(id, done)=>{
    const user = await userDao.getById(id);
    return done(null, user);
});