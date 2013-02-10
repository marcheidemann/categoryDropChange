(function($) {

function renderButton(buttonValue){
    var buttonnode= document.createElement('input');
        buttonnode.setAttribute('type','button');
        buttonnode.setAttribute('class','n-definer');
        buttonnode.setAttribute('value',buttonValue);
        input.after(buttonnode);
}

function randomColor(){
    var letters = '0123456789ABCDEF'.split(''),
    color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function renderDivElements(){
    for(var i = 1; i <= num; i++) {
         container.append('<div id="id'+i+'" class="box category'+i+'"><p>Id:'+i+'</p></div>');
         select.options.add(new Option('category'+i));
         idSelect.options.add(new Option('id'+i));
     }
}

function renderColorBoxes(){
    for(var i = 1; i <= num; i++){
     colorContainer.append('<div class="ui-widget-content draggable colorbox" style="background:'+randomColor()+'"></div>');
    }
}

function render(){
    var input = $('input').val();
    num = parseInt(input);
    renderDivElements();
    renderColorBoxes();
    $('.revert').css("visibility","visible");
    if(input <= 0) {
    } else {
         $('#droppable').delay(123).fadeIn();
         $('.chzn-select').trigger("liszt:updated");
         form.fields['className'].$el.fadeIn();
        $('.spanForfirstChosenSelect').fadeIn();
    }
}

function populateIds(){
    $("#id-selector :selected").each(function(){
        idSelection.push($(this).val()); 
    });
}

function getValues(){
    idSelection = [];
    className = $("#className option:selected").text();
    populateIds();
    ArrayLength = idSelection.length;
    jQuery.each(idSelection, function(index, value) {
        $("#" + value).addClass(className);
    });
}

function DivClear(){
    container.empty(),
    renderDivElements();
    $(".draggable").animate({left:0,top:0});
    $.ajax({
            type: "POST",
            url: "ajax.php",
            data: { 'className': "Hello" },
            cache: false,
            success: function(data)
                {
                    console.log(data);
                }
            });

    $.each( $('.box'), function(){
        $('.dropClass').removeClass('dropClass');
             $(this).css({
                    'background':'white', 
                    'color':'black'
                });
         });
    }

function setDropAreaReadyState(){
    $( "#droppable" ).droppable( "option", "disabled", false );
}

function classApply(){
    setDropAreaReadyState();
    getValues();
    if(ArrayLength === idSelection.length){
        console.log("TODOO: ClassApply does not revert if state is changed")
        event.preventDefault(event);
    }  else {
        DivClear(); 
    }
}

function backState(){
    $(this).find( "p" ).html( "Dropped!" );
        $('.ui-draggable-dragging').removeClass('hoverClass').addClass('dropClass');
        bgApply = $('.dropClass').css('backgroundColor');
        $("." + className).css("background-color",bgApply).css("color","#dadada");
}


    var idSelect = document.getElementById('id-selector');
    var container = $('.holder'),
        input = $('.input'),
        ankerSelect = $('#anchor-select'),
        multiSelect = $('.spanForfirstChosenSelect'),
        colorContainer = $('.holder-color');

    var form = new Backbone.Form({
        schema: {
            className: { type: 'Select', options: ['',],
            editorClass: 'select-choice-1, chzn-select' },
        }}).render();

    var form1 = new Backbone.Form({
        schema: {
            nDefine: 'Number',
        }}).render();

    form.fields['className'].$el.hide();
    form.on('className:change', function(form, classNameEditor) {
        getValues();
        setDropAreaReadyState();
    });
    input.append(form1.el);
    ankerSelect.append(form.el);
    multiSelect.hide();
    $('.field-nDefine label').hide();

    var select = document.getElementById('className');
    renderButton("generieren");

//

$(".undo").click(function() {
    $('#droppable').find( "p" ).html( "Drop here" );
    DivClear();
    getValues();
});

$('.applyClasses').click(function(event){
    classApply();
});

$('.n-definer').click(function() {
    container.empty(),
    colorContainer.empty();
    render();
    $( ".draggable" ).draggable({
        revert: function (event, ui) {
            $(this).originalPosition = {
                top: 0,
                left: 0
            };
            return !event;
        }
    });

    $( "#droppable" ).droppable({
        disabled: "true",
        drop: function( event, ui ) {
        $.ajax({
            type: "POST",
            url: "ajax.php",
            data: { 'className': className },
            cache: false,
            success: function(data)
                {
                    console.log(data);
                }
            });
        backState();
      }
    });
    console.log("hahahahahahha");
});
})(jQuery);
