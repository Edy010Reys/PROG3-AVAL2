const express = require('express')
const sqlite = require('./server/index')

const app = express()

let elect;

app.use(express.static('./client'))
app.use(express.json())

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.header('Access-Control-Max-Age', 3600);
  next();
});

app.post('/candidato', (request, response) => {
  let search = request.body.name

  const sql = `SELECT cand_nome, cand_status, cand_votos, cargo_nome FROM votos_cand_estado WHERE cand_nome LIKE '${search.toUpperCase()}%'`

  sqlite.database.all(sql, [], (err, rows) => {
    if (err) {throw err;}
    let result = rows.map((row) => {
      if(row.cand_status === 0){
        elect = 'Não eleito'
      } else if(row.cand_status === 1){
        elect = 'Eleito'
      }
      return {
        nome: row.cand_nome,
        cargo: row.cargo_nome,
        votacao: row.cand_votos,
        status: elect
      }
    })
    const json = JSON.stringify(result)
    response.send(json)
  });
})

app.post('/municipio', (request, response) => {
  const city = request.body.city

  sqlite.database.all(`SELECT cand_nome, cargo_nome, cand_status, cand_votos FROM votos_cand_municipio WHERE muni_nome LIKE '${city.toUpperCase()}%';`, [], (err, rows) => {
    if (err) {throw err;}
    let result = rows.map((row) => {
      if(row.cand_status === 0){
        elect = 'Não eleito'
      } else if(row.cand_status === 1){
        elect = 'Eleito'
      }
      return {
        nome: row.cand_nome,
        cargo: row.cargo_nome,
        votacao: row.cand_votos,
        status: elect
      }
    })
    const json = JSON.stringify(result)
    response.send(json)
  });
})

app.post('/cargo', (request, response) => {
  const role = request.body.role

  sqlite.database.all(`SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado WHERE cargo_nome LIKE '${role}';`, [], (err, rows) => {
    if (err) { throw err; }
    let result = rows.map((row) => {
      if(row.cand_status === 0){
        elect = 'Não eleito'
      } else if(row.cand_status === 1){
        elect = 'Eleito'
      }
      return {
        nome: row.cand_nome,
        cargo: row.cargo_nome,
        votacao: row.cand_votos,
        status: elect
      }
    })

    const json = JSON.stringify(result)
    response.send(json)
  });
})

app.listen(3000, () => {
    console.log('Servidor funcionando em http://localhost:3000/')
})
