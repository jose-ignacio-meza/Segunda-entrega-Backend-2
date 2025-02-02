import express from 'express';
import config from './configs/config.js';
import connectDB from './configs/db.js';
import usersRouter from './routes/users.router.js'
import businessRouter from './routes/bussines.router.js'
import ordersRouter from './routes/orders.router.js'
import sessionRouter from './routes/session.router.js'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import cors from 'cors'
import session from 'express-session';
import cookieParser from "cookie-parser";

const app = express();
const connection = connectDB(config.url_mongo);

app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: config.secret_key, // Clave secreta para firmar la sesión
    resave: false, // Evita que se guarde la sesión si no hubo cambios
    saveUninitialized: false, // No guardar sesiones vacías
    cookie: { secure: false, maxAge: 60 * 60 * 1000 } // 1 hora de duración
}));

// Middleware para establecer req.user
app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user;
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routers
app.use('/api', sessionRouter);
app.use('/api/user', usersRouter);
app.use('/api/products',productsRouter );
app.use('/api/business', businessRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', ordersRouter);

//Variables de entorno
const PORT = config.port;

//Iniciar el servidor
app.listen(PORT, () => {
    console.log("Listening on PORT: ",PORT)
})