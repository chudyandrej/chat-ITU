var socket = io();
var name= getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');



jQuery('.room-title').text(room);


socket.on('connect',function (){
	socket.emit('joinRoom',{
		name : name,
		room : room
	});


});
socket.on('message', function (message){
	var momentTimestamp = moment.utc(message.timestamp);
	$messages = jQuery('.messages');

	console.log('New massage');
	console.log(message.text);
	$messages.append('<p><strong>'+ message.name + ' ' +momentTimestamp.format('h:mm a')+'</strong></p>');
	$messages.append('<p>' + message.text + '</p>');
});


var $form= jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');
	socket.emit('message',{
		text: $message.val(),
		name:name
	});
	$message.val('');
});