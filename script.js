var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onload);
function onload(event) {
    initWebSocket();
}
function getValues(){
    websocket.send("getValues");
}
function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}
function onOpen(event) {
    console.log('Connection opened');
    getValues();
    initButtonUp();
    initButtonLeft();
    initButtonRight();
    initButtonDown();
}
function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}
function updateSliderPWM(element) {
    var sliderNumber = element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
    console.log(sliderValue);
    websocket.send(sliderNumber+"s"+sliderValue.toString());
}
function onMessage(event) {
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);

    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        document.getElementById(key).innerHTML = myObj[key];
        document.getElementById("slider"+ (i+1).toString()).value = myObj[key];
    }
}
function initButtonUp() {
    document.getElementById('upButton').addEventListener('click', toggleUp);
}
function initButtonUp() {
    document.getElementById('upButton').addEventListener('click', toggleUp);
}
function toggleUp(){
    websocket.send('toggleUp');
}
function initButtonLeft() {
    document.getElementById('leftButton').addEventListener('click', toggleLeft);
}
function toggleLeft(){
    websocket.send('toggleLeft');
}
function initButtonRight() {
    document.getElementById('rightButton').addEventListener('click', toggleRight);
}
function toggleRight(){
    websocket.send('toggleRight');
}
function initButtonDown() {
    document.getElementById('downButton').addEventListener('click', toggleDown);
}
function toggleDown(){
    websocket.send('toggleDown');
}