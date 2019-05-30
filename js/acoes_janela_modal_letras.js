
function abrir_modal(){
	$("#janela").fadeIn(1000);
	$("#janela").fadeTo("slow", 0.96);

	$("#mascara").show();
	$("#janela").show();

	$("#txt_pesquisa").attr("disabled","disabled");
	$("#btn_buscar").attr("disabled","true");
}

var original, trans, check;
//mostra a letra na janela modal ja aberta
function mostrar_letra(id){
	url = "https://api.vagalume.com.br/search.php?musid="+ id;
	$(".conteudo-modal").html("");

	fetch(url).then(response => {
		return response.json();
	}).then(data => {
		trans = data.mus[0].translate;
		original = data.mus[0].text;
		if(trans == undefined){
			conteudo_trans ="";
		}else {
			conteudo_trans = "<button class='translate'>Traduzir</button><br>";
			trans = data.mus[0].translate[0].text;
			check = 0;
		}
		$(".conteudo-modal").html("<label id='art-name'>"+data.art.name+
		"</label><br><label id='mus-name'>"+data.mus[0].name+"</label><br>"+
		conteudo_trans+"<pre>"+data.mus[0].text+"</pre>");
	});

}

$(document).on("click", ".modal", function(){
	abrir_modal();

	//pega o id do link que disparou o evento
	var id = $(this).addClass("active")[0].id;

	mostrar_letra(id);

});

$(document).ready(function(){

	function fechar_modal(){
		$("#mascara").fadeOut();
		$("#janela").fadeOut("slow");
		$("#txt_pesquisa").removeAttr("disabled");
		$("#btn_buscar").removeAttr("disabled");
	}


	$("#mascara").click(function(){
		fechar_modal();
	});

	$(".fechar").click(function(ev){
		fechar_modal();
	});

});

$(document).on("click", ".translate", function(){
	if(check==1){
		$(".conteudo-modal pre").html(original);
		check = 0;
	}else{
		$(".conteudo-modal pre").html(trans);
		check = 1;
	}
});