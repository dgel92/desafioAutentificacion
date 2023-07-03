import "./db/dbconfig.js"
import "./passport/strategies.js"

import {__dirname} from "./utils.js"
import cookieParser from "cookie-parser"
import{errorHandler} from "./middlewares/errorHandler.js"
import express from "express";
import mongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    session({
        secret: 'sessionKey',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 10000
        },
        store: new mongoStore({
            mongoUrl: 'mongodb+srv://admin:admin@cluster0.vcjyxe3.mongodb.net/coderhouse?retryWrites=true&w=majority',
            //autoRemove: "interval",
            ttl: 10,
            // crypto: {
            //   secret: '1234',       //encripta los datos de la sesion
            // },
        }),
        })
    )

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',usersRouter)

const PORT = 8088
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})
