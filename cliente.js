const request = require('request');
const mergeSort = require('./mergeSort');

function a(){
	let i = 0
	while(i < 20){
		request('http://localhost:5000/', { json: true }, (err, res, body) => {
			if(err)
				return console.error(err);
			if(body.problema == "ordenacao")
				ordenacao(body);
			else if(body.problema == "multiplicacao_matrizes")
				console.log("Matrizes");
			else
				console.log(body.problema);

		});
		i++;
	}	
}


function ordenacao(array){
	console.time("mergeSort");
	let res = {elementos: mergeSort.mergeSort(array.elementos), n: array.n};
	console.timeEnd("mergeSort");
	request.post({url: 'http://localhost:5000/solucao', form: res}, (erro, res, body)=>{
		if(erro)
			return console.error(erro);
		console.log("Retornou array ordenada");
	})
}

a();