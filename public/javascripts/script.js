const width = 640;
const height = 360;

var video = document.getElementById("video");
const img = document.getElementById("image");

var canvas = document.createElement("canvas");
const socket = io.connect('http://localhost:3000');
video.style.width = width+"px";
video.style.height = height+"px";

var context = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;
var i;
socket.on('server_send_image', function(image) {     
     img.src = 'data:image/jpeg;base64,'+ image;
})
video.addEventListener('play',function() {
    i=window.setInterval(function() {
        context.drawImage(video,0,0,width,height);
        data = canvas.toDataURL('image/jpeg');
        socket.emit('image', data);
    },100);
},false);
video.addEventListener('pause',function() {window.clearInterval(i);},false);
video.addEventListener('ended',function() {clearInterval(i);},false);