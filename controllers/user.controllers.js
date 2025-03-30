import { pool } from "../store/db.js";


export const getUsers = async (req, res) => {

    const {rows} = await pool.query("Select * from usuarios");

    res.json(rows);
};

export const getUsersId = async (req, res) => {
    const { id } = req.params;

    const { rows } = await pool.query('select * from usuarios where id = $1', [id]);

    if(rows.length === 0){
        return res.status(404).json({ message: "user not found"});
    }

    res.json(rows[0]);
}

export const createUser = async (req, res) => {
   
    try{
        const data = req.body;
        const {rows} = await pool.query(
            'insert into usuarios (id,nombre) values ($1, $2) RETURNING*',
             [data.id,data.nombre]
            );
            return res.json(rows[0]);

    }catch(error){
        console.log(error);

        if(error?.code==="23505"){
            return res.status(409).json({message:"error ya existe"});
        }


        return res.status(500).json({message: "internal server error"});
    }
   
}

export const deleteuser = async (req, res) => {
    const { id } = req.params;

    const { rowCount } = await pool.query('delete from usuarios where id = $1  RETURNING*', [id]);
    
    if(rowCount === 0){
        return res.status(404).json({ message: "user not found"});
    }
    
    return res.status(204);
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const {rows} = await pool.query('update usuarios set nombre = $1 where id = $2 RETURNING *',
        [data.nombre, id]);
    
        return res,json(rows[0]);
}