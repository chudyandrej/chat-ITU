var socket = io();

socket.on('connect',function (){
	console.log('Conected to socekt.io server.');
});
socket.on('message', function (massage){
	var momentTimestamp = moment.utc(massage.timestamp);
	console.log('New massage');
	console.log(massage.text);
	jQuery('.messages').append('<p><strong>' +momentTimestamp.format('h:mm a')+'</strong>'+ massage.text + '</p>');
});


var $form= jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');
	socket.emit('message',{
		text: $message.val()
	});
	$message.val('');
});