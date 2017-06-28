
Meteor.publish('Entradas', function(){
	return Entradas.find();
});

Meteor.publish('Comentarios', function(){
	return Comentarios.find();
});