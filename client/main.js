


Template.main.events({
"click a#register":function(event,template){
	event.preventDefault();
	Modal.show('register');
},
"click a#login":function(event,template){
	event.preventDefault();
	Modal.show('login');
},
"click a#logout":function(event,template){
	event.preventDefault();
	Modal.show('logout');
},

});

Template.content.helpers({
	entradas:function(){
		return Entradas.find({});
	},
	comentarios:function(_id){
		return Comentarios.find({entrada_id:_id});
	}
});
