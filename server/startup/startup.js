
entradas=[];

function random_string(len){
	var res="";
	var chars="0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	for (var i=0;i<len;i++){
		res += chars[Math.floor(Math.random()*chars.length)];
	}
	return res;
}

function lorem(){
	return "Integer non dapibus ex. Suspendisse convallis lorem cursus sapien consectetur eleifend. Curabitur posuere porta orci, quis suscipit metus malesuada eu. Donec efficitur aliquam orci laoreet vulputate. Nulla facilisi. Mauris eget neque eget tellus ullamcorper laoreet pharetra vel leo. Donec enim purus, sagittis bibendum nisl eget, lobortis tincidunt mauris. Sed non pulvinar justo. Aliquam at mauris convallis, rhoncus risus nec, blandit metus. Fusce sed nibh et ipsum maximus dictum sit amet eget tellus. Curabitur at risus hendrerit, viverra lorem vel, semper massa. Vestibulum at facilisis arcu. Nulla at iaculis nulla. Cras quis lorem faucibus, placerat ipsum sed, auctor sem. Cras malesuada diam in neque iaculis, sit amet imperdiet ante varius. Vivamus ultricies tempus sem nec mollis.\n"+

"Sed pulvinar eros iaculis tellus laoreet lacinia. Nunc ultrices lectus quis massa tristique, in efficitur ligula malesuada. Ut tempor rutrum leo quis fringilla. Aenean dapibus et mi eget condimentum. Suspendisse tempor erat id ornare sollicitudin. Etiam magna eros, molestie maximus enim in, tincidunt pulvinar nibh. Fusce mollis, sapien eget vulputate finibus, mi neque commodo felis, sit amet consectetur turpis justo venenatis turpis. Sed faucibus magna velit, a tempus mauris bibendum ut. Nam vel metus dignissim, vulputate turpis sit amet, scelerisque diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis consequat sapien, sollicitudin blandit mi sollicitudin vel.\n"+

"Cras maximus faucibus arcu, id placerat est ornare ut. Praesent pharetra, enim non consectetur varius, elit risus vestibulum nulla, id blandit dolor orci at nulla. In a posuere neque, in placerat neque. Aliquam et fringilla eros, nec gravida tortor. Curabitur porta sem interdum efficitur auctor. Proin sed dignissim odio, at vulputate est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam nec tellus ac sapien sollicitudin feugiat ut sit amet diam. Quisque porttitor eu augue et tempus. Fusce varius libero sed egestas scelerisque. Vivamus sed euismod diam, vel malesuada lacus. Quisque nec enim eget sem interdum congue. Ut viverra, lorem ac imperdiet ultrices, nunc mauris viverra turpis, aliquam lobortis erat eros in neque.\n"+

"Duis ornare urna et risus congue fermentum. Morbi lacus erat, elementum at pulvinar et, maximus in leo. Morbi dapibus dolor est, nec finibus eros tristique eget. Aenean augue nibh, bibendum vitae eleifend non, condimentum id purus. Quisque ut est finibus, tempor risus ut, porttitor lacus. Phasellus eu imperdiet leo. Curabitur dui erat, suscipit vitae eros at, pharetra feugiat enim. Cras eleifend justo ac ullamcorper gravida. Nunc at turpis at felis mattis pulvinar. Etiam ut pretium velit, tempor vulputate justo. Nulla eget ante nibh. Sed placerat lacus nisl, eget molestie enim rhoncus quis.\n"+

"Vivamus in dui nisi. Curabitur et nisi mauris. Nam ut quam rhoncus libero finibus sodales. Integer rutrum eros eu turpis suscipit, id aliquet neque maximus. Curabitur quis dolor ut nisi suscipit cursus. Fusce fermentum odio nec orci porta, in aliquet nulla venenatis. Mauris scelerisque et massa id posuere. Cras suscipit justo aliquet vulputate bibendum. Nullam fermentum tincidunt accumsan. Suspendisse ac tristique elit. Mauris at magna nulla. Pellentesque molestie, nibh eget porta tristique, nisi diam finibus tortor, et congue dolor nisi ut lacus. Nunc tristique mauris et quam efficitur luctus. Cras euismod felis vitae dolor egestas, nec dapibus eros pulvinar. Pellentesque in nunc dui. Donec porttitor metus vel cursus commodo.";
}

Meteor.startup(function(){
	if (!Meteor.users.findOne()){
		for (var i=1;i<101;i++){

			var options={};

			if (i==1){
				options = {
					/*username:"grover",
					email:"romanogrover@gmail.com",
					paswoord:"grocho30",*/
					username:"user"+i,
					email:"user"+i+"@test.com",
					password:"123456",
					profile:{
						active:true,
						roles:"admin"
					}
				};
			}else{
				options = {
					username:"user"+i,
					email:"user"+i+"@test.com",
					password:"123456",
					profile:{
						active:true,
						roles:"user"
					}
				};
			}

			var userId=Accounts.createUser(options);
			console.log("creado usuario con id : "+userId);
		}
	}

	//Entradas
	if (!Entradas.findOne()){
		for (var i=0;i<100;i++){
			var usr_count = Meteor.users.find().count();
			var j = Math.floor (Math.random()*usr_count);
			var user_name = "user"+j;
			var  selector = {username:user_name};
			var user = Meteor.users.findOne(selector);
			if (user){
				var entrada = {
					title:random_string(10),
					texto:lorem(), 
					author_id:user._id,
					active: true,
					coments_num:0
				};
				Entradas.insert(entrada,function(err,result){
					if (err){
						throw new Meteor.Error(333, Entradas.simpleSchema().namedContext().invalidKeys());
					}else{
						console.log("entrada "+i+" id : "+result);
						entradas[i]=result;
					}
				});
			}
		}
		console.log(Entradas.simpleSchema().namedContext().invalidKeys());

		//Comentarios
	if (!Comentarios.findOne()){
		for (var i=0;i<100;i++){
			var usr_count = Meteor.users.find().count();
			var j = Math.floor (Math.random()*usr_count);
			var user_name = "user"+j;
			var selector = {username:user_name};
			var user = Meteor.users.findOne(selector);
			if (user){
				var rand_entrada = Math.floor(Math.random()*entradas.length);
				var comentario = {
					 
					author_id:user._id,
					entrada_id:entradas[rand_entrada],
					title:random_string(25),
					texto:lorem()
				};
				if (comentario.entrada_id){
					Comentarios.insert(comentario,function(err,result){
						if (err){
							throw new Meteor.Error(333, Comentarios.simpleSchema().namedContext().invalidKeys());
					
						}
					});
				}
				
			}
		}
		console.log(Comentarios.simpleSchema().namedContext().invalidKeys());
	}
	
	}

	
});