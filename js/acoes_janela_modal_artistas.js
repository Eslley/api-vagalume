$(document).on("click", ".modal-art", function(){
	abrir_modal();

	//pega o id do link que disparou o evento
	var id = $(this).addClass("active")[0].id;
	mostrar_letras_art(id);

});

var conteudo;
function mostrar_letras_art(id){
	var url = "https://www.vagalume.com.br/"+id.split(",")[0]+"/index.js";
	var len;

	$(".conteudo-modal").html("<label id='art-name'>"+id.split(",")[1]+"</label><br><br>");

	fetch(url).then(response => response.json()).
		then(data => {
			len = data.artist.lyrics.item.length;
			for(i=0;i<len;i++){
				$(".conteudo-modal").append("<a class='link-letra-art' href='#' id='"+data.artist.lyrics.item[i].id+"'>"+(i+1)+". "+data.artist.lyrics.item[i].desc+"</a><br>");
			}
		});
	conteudo = $(".conteudo-modal").html();
}



$(document).on("click", ".link-letra-art", function(){
	var conteudo = $(".conteudo-modal").html();

	var id = $(this).addClass("active")[0].id;
	$(".window").append("<a href='#' class='voltar'><img src='imgs/back.png' alt='voltar'></a>");
	mostrar_letra(id);

});

$(document).on("click", ".voltar", function(){
	$(".voltar").hide();
	
	$(".conteudo-modal").html(conteudo);
});