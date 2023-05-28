const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./data/data");
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log("Server ativo na porta 3000");

})

// Encerrar as conexões do pool de conexões ao final do processo
process.on('SIGINT', () => {
    pool.end();
    process.exit();
});


let register = null;
app.post('/api/registerUser', async (req, res) => {
    try {
        register = await pool.connect();
        const { name, email, password } = req.body;
        await register.query(`INSERT INTO Users (id, nome, email, senha) VALUES (uuid_generate_v4(), '${name}', '${email}', '${password}')`)
        res.send("Cadastrado com sucesso!")
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário");
    } finally {
        // Liberar a conexão do pool de conexões
        register.release();
    }
});

//buscar Usuarios
app.get('/api/getUsers', async(req, res) => {
    try {
        register = await pool.connect();
        const data = await register.query(`SELECT * FROM Users`);
        // console.log(data.rows);
        res.send(data.rows)
    } catch (error) { 
        res.status(500).send('Erro na consulta')
    }
})
//Alterar usuario por Id
app.put("/api/putUsers/:id", async (req, res) => {
    try { 
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      if (!id || !name) {
        return res.status(401).send("Campos obrigatorios vazios.");
      }
  
      const client = await pool.connect();
      const user = await client.query("SELECT * FROM users WHERE id=$1", [id]);
      if (user.rows.length === 0) {
        return res.status(401).send("Usuário não encontrado.");
      }
  
      await client.query(
        "UPDATE users SET nome=$1, email=$2, senha=$3 WHERE id=$4",
        [name, email, password, id]
      );

  
      res.status(200).send({
        msg: "O usuario foi atualizado com sucesso.",
        result: {
          id,
          name,
          email,
          password,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro de conexão com o servidor");
    }
  });
//deletar usuario por id
  app.delete("/api/deleteUsers/:id", async(req, res) =>{
    try{
       const { id } = req.params;
       if(!id){
        return res.status(401).send(`id inexistente`)
       }
       const client = await pool.connect();
       const del = await client.query("DELETE FROM Users WHERE id=$1", [id]);
    
    if(del.rowCount===1){
        return res.status(200).send (`Usuario deleado`)
    }
    else{
        return res.status(401("Usuario nao encontrado"))
    }
    }catch(error){
        console.error("error");
        res.status(500).send("Erro de conexão com o servidor")
    }
  });