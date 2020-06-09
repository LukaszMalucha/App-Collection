const paintCanvas = document.querySelector( '#canvas' );
const context = paintCanvas.getContext( '2d' );
context.lineCap = 'round';


let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; }
const startDrawing = event => {
    isMouseDown = true;
   [x, y] = [event.offsetX, event.offsetY];
}
const drawLine = event => {
    if ( isMouseDown ) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo( x, y );
        context.lineTo( newX, newY );
        context.stroke();
        context.strokeStyle = "white";
        context.lineWidth = 24;
        x = newX;
        y = newY;
    }
}

paintCanvas.addEventListener( 'mousedown', startDrawing );
paintCanvas.addEventListener( 'mousemove', drawLine );
paintCanvas.addEventListener( 'mouseup', stopDrawing );
paintCanvas.addEventListener( 'mouseout', stopDrawing );

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