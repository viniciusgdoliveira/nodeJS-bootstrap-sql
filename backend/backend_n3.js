const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();         
const port = 3000; //porta padrão
app.use(express.json())
app.use(cors());
const config = {
    server: 'localhost',
    database: 'NossaLei',
    port:1433,
    user: 'sa',
    password: 'adscesusc231',
    trustServerCertificate:true,
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
            trustServerCertificate: true,
        }
    }   
  }


//fazendo a conexão global
sql.connect(config)
	.then(conn => global.conn = conn)
	.catch(err => console.log(err))

function execSQLQuery(sqlQry, res){
	global.conn.request()
				.query(sqlQry)
				.then(result => res.json(result.recordset))
				.catch(err => res.json(err));
}

app.get('/lei', (req, res) => {
	execSQLQuery('SELECT * FROM lei', res)
})

app.post('/lei', (req, res) => {

	const id_abrangencia = req.body.id_abrangencia
    const id_ramodireito = req.body.id_ramodireito
    const nome_proposta = req.body.nome_proposta
    const exposicao_motivos = req.body.exposicao_motivos
    const texto_lei = req.body.texto_lei

    execSQLQuery(`exec adicionarlei @id_abrangencia = ${id_abrangencia},@id_ramodireito = ${id_ramodireito},@nome_proposta = '${nome_proposta}',@exposicao_motivos = '${exposicao_motivos}',@texto_lei = '${texto_lei}';`, res);
})

app.get('/lei/:id', (req, res) => {
    let filter = ''

    if(req.params.id) {
		filter = ' WHERE ID=' + parseInt(req.params.id)
	} 

    execSQLQuery('SELECT * FROM lei' + filter, res);
})

app.delete('/lei/:id', (req, res) => {
    const id = parseInt(req.params.id)
    execSQLQuery(`exec deletarlei @lei_id = ${id} ;`, res);
})

app.put('/lei/:id', (req, res) => {
	const id = parseInt(req.params.id);
    const id_abrangencia = req.body.id_abrangencia;
    const id_ramodireito = req.body.id_ramodireito;
    const nome_proposta = req.body.nome_proposta;
    const exposicao_motivos = req.body.exposicao_motivos;
    const texto_lei = req.body.texto_lei;
    
    execSQLQuery(`UPDATE lei
    SET
      id_abrangencia = ${id_abrangencia},
      id_ramodireito = ${id_ramodireito},
      nome_proposta = '${nome_proposta}',
      exposicao_motivos = '${exposicao_motivos}',
      texto_lei = '${texto_lei}'
    WHERE
      id = ${id};`, res);
});

app.get('/ramodireito', (req, res) => {
	execSQLQuery('SELECT * FROM ramodireito', res)
})

app.post('/ramodireito', (req, res) => {

	const descricao = req.body.descricao

    execSQLQuery(`INSERT INTO ramodireito(descricao) VALUES(${descricao}')`, res);
})

app.get('/ramodireito/:id', (req, res) => {
    let filter = ''

    if(req.params.id) {
		filter = ' WHERE ID=' + parseInt(req.params.id)
	} 

    execSQLQuery('SELECT * FROM ramodireito' + filter, res);
})

app.delete('/ramodireito/:id', (req, res) => {
    execSQLQuery('DELETE ramodireito WHERE ID=' + parseInt(req.params.id), res);
})

app.put('/ramodireito/:id', (req, res) => {
	const id = parseInt(req.params.id)
    const descricao = req.body.descricao
    
    execSQLQuery(`UPDATE ramodireito SET descricao='${descricao}' WHERE ID=${id}`, res);
})

app.get('/abrangencia', (req, res) => {
	execSQLQuery('SELECT * FROM abrangencia', res)
})

app.post('/abrangencia', (req, res) => {

	const descricao = req.body.descricao

    execSQLQuery(`INSERT INTO abrangencia(descricao) VALUES(${descricao}')`, res);
})

app.get('/abrangencia/:id', (req, res) => {
    let filter = ''

    if(req.params.id) {
		filter = ' WHERE ID=' + parseInt(req.params.id)
	} 

    execSQLQuery('SELECT * FROM abrangencia' + filter, res);
})

app.delete('/abrangencia/:id', (req, res) => {
    execSQLQuery('DELETE abrangencia WHERE ID=' + parseInt(req.params.id), res);
})

app.put('/abrangencia/:id', (req, res) => {
	const id = parseInt(req.params.id)
    const descricao = req.body.descricao
    
    execSQLQuery(`UPDATE abrangencia SET descricao='${descricao}' WHERE ID=${id}`, res);
})
		
app.listen(port, () => {
	console.log('API funcionando na porta: ' + port)
})