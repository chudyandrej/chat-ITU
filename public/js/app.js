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
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');


	console.log('New massage');
	console.log(message.text);
	$message.append('<p><strong>'+ message.name + ' ' +momentTimestamp.format('h:mm a')+'</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
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