const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;
const { spawn } = require('child_process');
const time = require('time');

//let _bonOn = false;
const _light = new Gpio(21, 'out');
const _pump = false;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static("view/web"));
//start


io.on('connection', function (socket) {
	//console.log(socket.id);
	console.log('client connected');

	//setInterval(function() {
	//	spawn('python', ['/home/pi/FeedFish/python/sensor.py']);
	//	console.log('Get data!!!!!!');
	//}, 5000);
	socket.on('connect_failed',function(data){
		console.log('failed');
	});
	socket.on('error',function(data){
		console.log('error');
	});
	/*
	setInterval(function(isOn){
		if(isOn){
			spawn('python', ['/home/pi/test/python/lightOff.py']);
                } else {
                        spawn('python', ['/home/pi/test/python/lightOn.py']);
                }
		socket.emit('light',isOn);
	},2000);
	*/
  //Light控制

	setInterval(function() {
		spawn('python', ['/home/pi/Fishbaby/python/sensor.py']);
	}, 5000);

	socket.on('turnLight', function (isOn) {
		if (isOn) {
			spawn('python', ['/home/pi/Fishbaby/python/lightOn.py']);
		} else {
			spawn('python', ['/home/pi/Fishbaby/python/lightOff.py']);
		}

		socket.emit('light', isOn);
	});

	socket.on('autoLight',function(isOn,l){
		if (isOn == false && l < 1000) {
			console.log('True');
			spawn('python', ['/home/pi/Fishbaby/python/lightOn.py']);
		} else {
			spawn('python', ['/home/pi/Fishbaby/python/lightOff.py']);
		}
	});


  //Feed控制
/*
	setInterval(function (q) {
        	const timeout = {
        	'1': 8,
        	'2': 5,
        	'3': 3
        	};
        	const f = spawn('python',['/home/pi/test/python/servo.py']);
		setTimeout(function () {
                        f.kill();
                }, timeout[q] * 1000);
        },2000);
*/
	socket.on('feed', function (q) {
	const timeout = {
	'1': 8,
	'2': 5,
	'3': 3
	};
	const f = spawn('python',['/home/pi/Fishbaby/python/servo.py']);
	setTimeout(function () {
			spawn('python',['/home/pi/Fishbaby/python/servo2.py']);
		}, timeout[q] * 1000);
	});
 //pump控制(要加水位控制)
	socket.on('checkwater', function(w){
		if(w < 50){
			spawn('python',['/home/pi/Fishbaby/python/pumpOn.py']);
			setTimeout(function () {
                        	spawn('python',['/home/pi/Fishbaby/python/pumpOff.py']);
                	},10000);
		}
	});
        socket.on('turnPump', function (p) {
        	const timeout = {
        	'1': 8,
        	'2': 5,
        	'3': 3
        	};
        	const f = spawn('python',['/home/pi/Fishbaby/python/pumpOn.py']);
        	setTimeout(function () {
			spawn('python',['/home/pi/Fishbaby/python/pumpOff.py']);
                }, timeout[p] * 1000);
        });
  //pump控制(要加水位控制)
/*
	socket.on('turnPump', function (isOn) {
		if (_pump != true) {
	console.log('turn pump on');
	_pump = true;
			spawn('python', ['/home/pi/test/python/pumpOn.py']);
		} else {
 	if(_pump == false);
 	console.log('turn pump off');
 	_pumpOn = false;
			spawn('python', ['/home/pi/test/python/pumpOff.py']);
		}

	socket.emit('pump', isOn);
	});
*/
//	socket.emit('light', _light.readSync());
  //End
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});

});

//3000port
http.listen(3000, function(){
	console.log('listening on 127.0.0.1:3000');
});

