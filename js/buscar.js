function buscar_artistas(str, who){
	/*O parâmetro who pode ser 0 ou 1:
	se 0 realiza a função de mostrar os artistas,
	se 1 retorna o id da banda que será requisitada
	na função mostrar_letras_art_mus()*/
	var url = "https://api.vagalume.com.br/search.art?limit=10&q="+ encodeURIComponent(str);

	if(who==0){
		$.getJSON(url, function(data) {
			mostrar_artistas(data, str);
			setUrlArt();
			setUrlLet();
		});
	}else if(who==1){
		var t;
		$.ajax({url : url,async : false, success : function(data) {
			t = (data.response.docs[0].id);
		}});
		return t;
	}
}

function setUrlArt(){
	imgs = $(".artistas img");
	for(i=0;i<imgs.length;i++){
		url_foto_artista(imgs[i]);
	}
}

function setUrlLet(){
	imgs = $(".letras img");
	for(i=0;i<imgs.length;i++){
		url_foto_artista(imgs[i]);
	}
}

function url_foto_artista(img){
	var url = "https://api.vagalume.com.br/image.php?bandID=" + img.id;
	console.log(url);

	fetch(url).then(response => response.json()).
		then(data => {
			try{
				img.src = data.images[0].thumbUrl;
			} catch(e){
				img.src = "imgs/vagalume-default.png"
			}
		});
}


function mostrar_artistas(data, str){
	var quantidade = data.response.docs.length;
	if(quantidade==0 && str!=""){
		$(".artistas").html("Nenhum resultado encontrado!!");
	}else{
		var url,url_img;
		//var url_img;
		var docs = data.response.docs;
		$(".artistas").html("");
		for(i=0; i<quantidade;i++){
			$(".artistas").append("<div class='res-artistas'> <a href='#janela' class='modal-art' id='"+docs[i].url+","+docs[i].band+"'><img alt='' src='' id='"+ docs[i].id.substring(1) +"'></img><div class='nbanda'>"+ docs[i].band+"</div></a></div>");

		}
	}
}

function buscar_letras(str){
	var url = "https://api.vagalume.com.br/search.excerpt?limit=10&q="+ encodeURIComponent(str);
	
	$.getJSON(url, function(data) {
		mostrar_letras_art_mus(data, str);
	});
}

function mostrar_letras_art_mus(data, str){
	var docs = data.response.docs;
	var quantidade = docs.length;
	if(quantidade==0 && str!=""){
		$(".letras").html("Nenhum resultado encontrado!!");
	}else{
		var url,id, id_letra;
		$(".letras").html("");
		for(i=0;i<quantidade;i++){
			id_letra = docs[i].id.substring(1);
			docs[i].id=buscar_artistas(docs[i].band, 1);
			var band = docs[i].band;
			var title = docs[i].title;
			$(".letras").append("<div class='res-letras'><a class='modal' id='"+id_letra+"' href='#janela'> <img id='"+ docs[i].id +"' alt='' src=''></img><div class='nbanda'>"+ band+"</div><div class='nletra'>"+ title +"</div></a></div>");
		}
	}
}
