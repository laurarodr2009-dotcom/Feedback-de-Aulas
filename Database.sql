CREATE TABLE Professores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    disciplina VARCHAR(100) NOT NULL
);

CREATE TABLE Feedbacks (
    id SERIAL PRIMARY KEY,
    professor_id INT NOT NULL,
    comentario TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (professor_id) REFERENCES Professores(id)
);

INSERT INTO Professores (nome, disciplina) VALUES
('Ryan', 'Segurança de Dados'),
('Heroiso', 'Banco de Dados'),
('Fernanda', 'matemática');

INSERT INTO Feedbacks (professor_id, comentario) VALUES
(1, 'A aula foi bem dinamica.'),
(2, 'Aula excelente e produtiva.'),
(1, 'Aprendi bem.');

SELECT * FROM Professores;

SELECT * FROM Feedbacks;

SELECT comentario, data 
FROM Feedbacks 
WHERE professor_id = 1;

SELECT 
    f.id AS feedback_id,
    p.nome AS professor,
    p.disciplina,
    f.comentario,
    f.data
FROM Feedbacks f
JOIN Professores p ON f.professor_id = p.id
ORDER BY f.data DESC;