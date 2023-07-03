import UserDao from "../daos/user.daos.js"
import { passport } from 'passport';

const userDao = new UserDao();
export const registerResponse = (req, res, next) =>{
    try {
        res.json({
            msj: "registro ok",
            session: req.session
        })
    } catch (error) {
        next(error)
    }
}

export const loginResponse = async (req, res, next)=>{
    try {
        const user = await UserDao.getById(req.session.passport.user);
        const {
            first_name,
            last_name,
            email,
            age,
            role 
        } = user;
        rs.json({
            msg:"Login OK",
            session: req.session,
            userData:{
                first_name,
                last_name,
                email,
                age,
                role            
            }
        })
    } catch (error) {
        next(error)
    }
}
