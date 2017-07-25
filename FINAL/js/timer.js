
var seg = 0;
var min = 1;
var tiempo = 0;
 


//---temporizador de dos minutos---
function timer(){
	if(seg!=0){
		seg=seg-1;}
	if(seg==0){
		if(min==0){ 
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow",scoreGrande);
			$(".time").hide();
      $(".panel-score").show();
    }
		seg=59;
		min=min-1;}
	$("#timer").html("0"+min+":"+seg);
};

function scoreGrande(){
	$( ".panel-score" ).animate({width:'100%'},3000);
	//$(".termino").css({"display":"block","text-align":"center"});
};