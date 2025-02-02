import express from 'express';
import {current,registrarse,login,restorePasword,cerrarSession} from '../controllers/session.controller.js'

const router = express.Router();

//Current v
router.get('/current', current);

//Registración v
router.post('/register', registrarse)

//Iniciar sesión v
router.post('/login', login)

//Restaurar contraseña
router.post('/restore-password', restorePasword)

//Cerrar sesión del usuario
router.post('/logout', cerrarSession)

export default router;