import { Router } from "express";
import { pool } from "../store/db.js";


import { getUsers, 
    getUsersId, 
    createUser,
    deleteuser,
    updateUser 
} from "../controllers/user.controllers.js";

import jwt from "jsonwebtoken";
import Message from "tedious/lib/message.js";
import { token } from "morgan";

const router = Router();






router.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    try {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE nombre = $1 AND id = $2', 
            [username, password]);

            if (rows.length > 0) {
                // Si las credenciales son correctas, se genera el token
                const user = { username: rows[0].nombre, id: rows[0].id };  // Aquí puedes elegir qué información incluir en el token
                const accessToken = generateAccesToken(user);
    
                // Se envía el token en el encabezado de la respuesta o como parte de la respuesta
                res.json({
                    message: 'Usuario autenticado exitosamente',
                    token: accessToken
                });
            } else {
                // Si las credenciales no coinciden
                res.status(401).json({
                    message: 'Credenciales incorrectas',
                });
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            res.status(500).json({
                message: 'Error en el servidor al intentar autenticar al usuario',
            });
        }
});




function generateAccesToken(user) {
    return jwt.sign(user, process.env.SECRET, {expiresIn: "5m"});

}

//todos los usuarios
router.get('/usuarios', getUsers)

//usuario en especifico
router.get('/usuarios/:id', getUsersId )


//ingreso de usuarios
router.post('/usuarios/ingreso', createUser )

//borrado
router.delete('/usuarios/delete/:id', deleteuser )


//actualizar
router.put('/usuarios/:id', updateUser )




export default router;
