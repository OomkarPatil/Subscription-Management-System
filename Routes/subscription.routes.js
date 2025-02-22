import {Router} from "express";

const subRouter = Router();

subRouter.get('/', (req, res) => res.send({title:"GET all subscribtions"}));

subRouter.get('/:id', (req, res) => res.send({title:"GET subscribtion details"}));

subRouter.post('/', (req, res) => res.send({title:"CREATE subscribtion"}));

subRouter.put('/:id', (req, res) => res.send({title:"UPDATE subscribtion"}));

subRouter.delete('/:id', (req, res) => res.send({title:"DELETE subscribtion"}));

subRouter.get('/user/:id', (req, res) => res.send({title:"GET all user subscribtion "}));

subRouter.put('/:id/cancel', (req, res) => res.send({title:"CANCLE subscribtion "}));

subRouter.get('/upcomming-renewals', (req, res) => res.send({title:"GET upcomming renewls "}));

export default subRouter;
