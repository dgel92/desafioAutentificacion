import express from "express";
import cookieParser from "cookie-parser"
import session from "express-session";
import {__dirname} from "./utils.js"
import "./db/dbconfig.js"
import MongoStore from "connect-mongo";
import{errorHandler} from "./middlewares/errorHandler.js"
import passport from "passport";
import "./passport/strategies.js"