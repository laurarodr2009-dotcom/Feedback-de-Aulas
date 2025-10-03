const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: "postgres",        
  host: "localhost",
  database: "feedbackdb",   
  password: "senha123",    
  port: 5432,
});


app.get("/professores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Professores ORDER BY nome");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar professores:", err);
    res.status(500).send("Erro no servidor");
  }
});


app.post("/feedback", async (req, res) => {
  const { professor_id, comentario } = req.body;
  if (!professor_id || !comentario) {
    return res.status(400).send("Professor e comentário são obrigatórios");
  }
  try {
    await pool.query(
      "INSERT INTO Feedbacks (professor_id, comentario) VALUES ($1, $2)",
      [professor_id, comentario]
    );
    res.status(201).send("Feedback inserido com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir feedback:", err);
    res.status(500).send("Erro no servidor");
  }
});


app.get("/feedbacks", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.id, f.comentario, f.data, p.nome as professor, p.disciplina
      FROM Feedbacks f
      JOIN Professores p ON f.professor_id = p.id
      ORDER BY f.data DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar feedbacks:", err);
    res.status(500).send("Erro no servidor");
  }
});

app.listen(port, () => {
  console.log(`💖 Servidor rodando em http://localhost:${port}`);
});