import express from 'express';
import {PORT}  from "./config/env.js";
import userRouter from "./Routes/user.routes.js";
import subscriptionRoutes from "./Routes/subscription.routes.js";
import authRouter from "./Routes/auth.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.get('/',(req, res)=>{
    res.send("welcome to the Subscription system!");
});

app.listen(PORT,async ()=>{
    console.log(`Subpub is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;
