var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;


//On mouse events on canvas
$canvas.mousedown(function(e){
    lastEvent = e;
    mouseDown = true;
}).mousemove(function(e){
    if(mouseDown){
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = "white";
        context.lineWidth = 25;
        context.stroke();
        lastEvent = e;
}
}).mouseup(function(){
    mouseDown = false;
}).mouseleave(function(){
    $canvas.mouseup();
});

document.getElementById('clear').addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}, false);



$("#predict").click(function(){
    var canvasObj = document.getElementById("canvas");
    var image = canvasObj.toDataURL("image/png");
    var img =  image.replace(/^data:image\/(png|jpg);base64,/, "");
    $('#result').hide();
    $('.loader').show();
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/digit-identifier/",
        data: {"image" : img},
        success: function(data){
            $('#result').show();
            $('#result').text(data);
            $('.loader').hide();
        }
    });
});