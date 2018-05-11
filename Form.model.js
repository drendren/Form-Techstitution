var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var formSchema = new Schema({
	nrProkurorimit: String,
	llojiProkurorimit: String,
	aktivitetiProkurorimit: String,
	dataInicimit: String,
	dataPublikimit: String,
	dataNenshkrimit: String,
	afatiPerImplementimin1: String,
	afatiPerImplementimin2: String,
	dataPermbylljes: String,
	shumaEKontrates: String,
	shumaTotale: String,
	emriKontaktuesit: String,
	llojiKontrates: String,
	gjendjaEKontrates: String,
	shpjegim: String
	
})

module.exports = mongoose.model('Form', formSchema);