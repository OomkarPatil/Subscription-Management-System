import {Router} from "express";
import {getUser, getUsers} from "../Controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/',(req,res)=>res.send({title:"CREATE new User"}));

userRouter.put('/:id',(req,res)=>res.send({title:"UPDATE User"}));

userRouter.delete('/:id',(req,res)=>res.send({title:"DELETE User"}));

export default userRouter;