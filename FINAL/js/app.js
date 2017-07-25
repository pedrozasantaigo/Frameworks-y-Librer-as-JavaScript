
$(document).ready(function () {


    var busVerti = 0;
    var busHori = 0;
    var movimientos = 0;
    var nuevosDulces = 0;
    var buscarrep = 0;
    var rellenar = 0;
    var quitar = 0;
    var marcador  = 0;



    blanco();

    function blanco() {
        $('.main-titulo').animate({color: "white"}, 'fast', 'linear', verde);
    }
    function verde() {
        $('.main-titulo').animate({color: "#DCFF0E"}, 'fast', 'linear', blanco);
    }




    $('.btn-reinicio').click(function () {

        var str = $(this).text();
        if (str == "Iniciar") {
            $(this).text('Reiniciar')

            rellenar = setInterval(function () {
                llenar();
                drag();
                dropp();
            }, 600);


            setInterval(function () {
                timer()
            }, 1000);



        } else {
            location.reload()
        }
    })


    function llenar() {

        for (var j = 1; j < 8; j++) {
            if ($(".col-" + j).children().length < 7) {
                var numero = Math.floor(Math.random() * 4) + 1
                var ruta = "image/" + numero + ".png";
                $(".col-" + j).prepend('<img class="dulce" src="' + ruta + '">').css("justify-content", "flex-start")
            }

            if ($(".col-" + j).children().length == 7) {
                clearInterval(rellenar);
//                quitar = setInterval(function () {
                    repetidos()
//                }, 150);

            }
        }


    }



    function drag() {
        console.log('entra')
        $(".dulce").draggable({
            containment: ".panel-tablero",
            revert: true,
            revertDuration: 0,
            snap: ".dulce",
            snapMode: "inner",
            snapTolerance: 40,
            start: function (event, ui) {
                movimientos = movimientos + 1;
                $("#movimientos-text").html(movimientos);
            },
            stop: function () {
//                repetidos()
            }
        });

    }


    function dropp() {
        console.log('entra2')
        $(".dulce").droppable({
            drop: function (event, ui) {
                var envia = ui.draggable;
                var recibe = this;
                espera = 0;
                do {
                    espera = envia.intercambio($(recibe));
                } while (espera == 0);

                busquedaHorizontal = VerificarH();
                busquedaVertical = VerificarV();


                if (busquedaHorizontal == 0 && busquedaVertical == 0) {
                    dropped.intercambio($(droppedOn));
                }


                if (busquedaHorizontal == 1 || busquedaVertical == 1) {
                    repetidos()

                }




            },
        });
    }



    function repetidos() {
//        alert()
        busquedaHorizontal = VerificarH();
        busquedaVertical = VerificarV();
        matriz = 0;

        $(".dulce").draggable({disabled: true});
        for (var j = 1; j < 8; j++) {
            matriz = matriz + $(".col-" + j).children().length;
        }


        if (busquedaHorizontal == 1 || busquedaVertical == 1) {

            remover();

            rellenar = setInterval(function () {
                llenar();
                drag();
                dropp();
            }, 600);

        }



        if (busquedaHorizontal == 0 && busquedaVertical == 0 && matriz != 49) {
          
            rellenar = setInterval(function () {
                llenar();
                drag();
                dropp();
            }, 600);
        } 

        $(".dulce").draggable({disabled: false});
    }


    function remover() {
//        alert()
//        console.log('remover')
//        $("div[class^='col']").css("justify-content", "flex-end");
        $(".repetido").hide("pulsate", 1000, function () {
            
            var scoretmp = $(".repetido").length; 
            marcador = marcador + scoretmp * 10;
            $("#score-text").text(marcador);
            $(".repetido").remove();
        });


//        for (var j = 1; j < 8; j++) {
//            console.log("col " + j + " " + $(".col-" + j).children().length)
//            console.log($(".col-" + j).children())
//        }
//        clearInterval(quitar);
    }




    $.fn.intercambio = function (b) {
        b = $(b)[0];
        console.log(b)
        var a = this[0];
        console.log(a)
        var t = a.parentNode.insertBefore(document.createTextNode(''), a);
        b.parentNode.insertBefore(a, b);
        t.parentNode.insertBefore(b, t);
        t.parentNode.removeChild(t);
        return this;
    };





    function VerificarH() {
        var busHori = 0;
        for (var j = 1; j < 8; j++) {
            for (var k = 1; k < 6; k++) {
                var res1 = $(".col-" + k).children("img:nth-last-child(" + j + ")").attr("src");
                var res2 = $(".col-" + (k + 1)).children("img:nth-last-child(" + j + ")").attr("src");
                var res3 = $(".col-" + (k + 2)).children("img:nth-last-child(" + j + ")").attr("src");
                if ((res1 == res2) && (res2 == res3) && (res1 != null) && (res2 != null) && (res3 != null)) {
                    $(".col-" + k).children("img:nth-last-child(" + (j) + ")").attr("class", "dulce repetido");
                    $(".col-" + (k + 1)).children("img:nth-last-child(" + (j) + ")").attr("class", "dulce repetido");
                    $(".col-" + (k + 2)).children("img:nth-last-child(" + (j) + ")").attr("class", "dulce repetido");
                    busHori = 1;
                }
            }
        }
        return busHori;
    }
    ;


    function VerificarV() {
        var busVerti = 0;
        for (var l = 1; l < 6; l++) {
            for (var k = 1; k < 8; k++) {
                var res1 = $(".col-" + k).children("img:nth-child(" + l + ")").attr("src");
                var res2 = $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("src");
                var res3 = $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("src");
                if ((res1 == res2) && (res2 == res3) && (res1 != null) && (res2 != null) && (res3 != null)) {
                    $(".col-" + k).children("img:nth-child(" + (l) + ")").attr("class", "dulce repetido");
                    $(".col-" + k).children("img:nth-child(" + (l + 1) + ")").attr("class", "dulce repetido");
                    $(".col-" + k).children("img:nth-child(" + (l + 2) + ")").attr("class", "dulce repetido");
                    busVerti = 1;
                }
            }
        }
        return busVerti;
    }
    ;

})