//(function () {
	console.log("qq");
	/**
	 * parivate variable
	 */
	const _socket = io();
	// let _sensorInterval;

	/**
	 * init
	 */
	/*
        setInterval(function() {
		//spawn('python',['/home/pi/FeedFish/python/sensor.py'])
 		console.log('hello world');
	}, 5000);
*/
/*
	setInterval(function () {
		$('.snapshot').attr('src', '/image/image.jpg?' + Math.random());
	}, 1000);
	*/
	/**
	 * ws event
	 */
/*
	_socket.on('value', function (data) {
		Object.keys(data).forEach(function (key, i) {
			$('#' + key).text(data[key]);
		});
	});
	_socket.on('light',function (on) {
		console.log($('#light').prop('checked'));
		if ($('#light').prop('checked') == true) {
			$('#light').prop('checked',true);
		} else {
			$('#light').prop('checked',false);
		}
		//console.log($('#light').prop('checked'));
	});
*/
	/**
	 * bind event
	*/
	//$('#light').on('change',_handleLightChange());
	//$('.btn-feed').on('click',_handleFeed());
	//$('.btn-setwater').on('click',_handleWater());
	$("#light").on("change",function(event){
		event.preventDefault();
		var isOn = $('#light').is(':checked');
		_socket.emit('turnLight', isOn);
		console.log(isOn);
	});
	$('.btn-feed').on('click',function(event){
		event.preventDefault();
		const q = $('.input-q:checked').val();
		_socket.emit('feed', q);
	});

	$('.btn-setwater').on('click',function(event){
                event.preventDefault();
                const p = $('.input-p:checked').val();
                _socket.emit('turnPump', p);
        });
       setInterval(function(){
		$.getJSON('sensor.json', function (data) { //讀取json資料,把資料放進data裡
			$('#tds2').text(data.tdsValue);
			$('#dirty2').text(data.voltage);
			if(data.light > 499)
				$('#light2').text("亮的真舒服");
			else if(500 < data.light && 8 < t1 < 23)
				$('#light2').text("幫我開燈QQ");
			else
				$('#light2').text("別管我讓我長大");
			//$('#light2').text(data.light);
			if(data.water < 100)
				$('#location2').text("幫我加水QQ");
			else
				$('#location2').text("水很夠啦，一起來游");
			//$('#location2').text(data.water);
		});
	},3000);
	setInterval(function(){
		$.getJSON('sensor.json', function (data) {
			const w = data.water;
			_socket.emit('checkwater',w);
		});
	},30000);
        var t1 = new Date ().getHours();
        if (8 < t1 < 23 ){
                setInterval(function(){
			$.getJSON('sensor.json', function (data) {
                        	const l = data.light;
				var isOn = $('#light').is(':checked');
				console.log(isOn,l);
                        	_socket.emit('autoLight',isOn,l);
			});
                },30000);
        };

/*	function _handleLightChange(event) {
		event.preventDefault();
		//const isOn = $('#light').is(':checked');
		//_socket.emit('turnLight', isOn);
		//console.log(isOn);
		console.log("QAQ");
	}
*/
	/*
	function _handleFeed() {
		const q = $('.input-q:checked').val();
		console.log(q);
		//_socket.emit('feed', q);
	}

	function _handleSetwater() {
		//_socket.emit('setwater', $('#temperature').val());
	}
	function _handleWater(){
 		const p = $('.input-p:checked').val();
		//_socket.emit('turnPump', p);
	}
*/
//})();
