
Template.entrada.helpers({
	"createdAtE":function(sDate){
		return sDate.toLocaleDateString()+' '+sDate.toLocaleTimeString();
	},
	"textoE":function(sTexto){
		return Spacebars.SafeString(sTexto.replace(/(\n)+/g,'<br />'));
	}
});