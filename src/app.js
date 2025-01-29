import express from 'express';
import config from './configs/config.js';
import connectDB from './configs/db.js';
import usersRouter from './routes/users.router.js'
import businessRouter from './routes/bussines.router.js'
import ordersRouter from './routes/orders.router.js'
import sessionRouter from './routes/session.router.js'
import cors from 'cors'

const app = express();
const connection = connectDB(config.url_mongo);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routers
app.use('/api', sessionRouter);
app.use('/api/user', usersRouter);
app.use('/api/business', businessRouter);
app.use('/api/order', ordersRouter);

//Variables de entorno
const PORT = config.port;

//Iniciar el servidor
app.listen(PORT, () => {
    console.log("Listening on PORT: ",PORT)
})