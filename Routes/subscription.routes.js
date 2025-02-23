import {Router} from "express";
import authorize from "../middleware/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../Controllers/subscription.controller.js";

const subRouter = Router();

subRouter.get('/', (req, res) => res.send({title:"GET all subscribtions"}));

subRouter.get('/:id', (req, res) => res.send({title:"GET subscribtion details"}));

subRouter.post('/', authorize, createSubscription);

subRouter.put('/:id', (req, res) => res.send({title:"UPDATE subscribtion"}));

subRouter.delete('/:id', (req, res) => res.send({title:"DELETE subscribtion"}));

subRouter.get('/user/:id', authorize, getUserSubscriptions);

subRouter.put('/:id/cancel', (req, res) => res.send({title:"CANCLE subscribtion "}));

subRouter.get('/upcomming-renewals', (req, res) => res.send({title:"GET upcomming renewls "}));

export default subRouter;
