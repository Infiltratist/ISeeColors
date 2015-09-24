(function() {
	var context, soundSource, soundBuffer, url = 'viper2.ogg';

	var mute = false;
	function init() {
		if (typeof AudioContext !== "undefined") {
			console.log("Context created");
			context = new AudioContext();
		} else if (typeof webkitAudioContext !== "undefined") {
			console.log("Context created");
			context = new webkitAudioContext();
		} else {
			throw new Error('AudioContext not supported. :(');
		}
		
		startSound();
	}
	var myAudio=document.querySelector('audio');
	function startSound() {
		var audioCtx=new AudioContext();
		var source= audioCtx.createMediaElementSource(myAudio);
		console.log("source created");
		var frameCount=audioCtx.sampleRate*2.0;
		var myArrayBuffer=audioCtx.createBuffer(2, frameCount, 41000);
		source.buffer=myArrayBuffer;
		source.connect(audioCtx.destination);
		
//		var request = new XMLHttpRequest();
//		request.open("GET", url, true);
//		request.responseType = "arraybuffer";
//
//		// Our asynchronous callback
//		request.onload = function() {
//			var audioData = request.response;
//
//			audioGraph(audioData);
//
//		};
//
//		request.send();
	}

	// Finally: tell the source when to start
	function playSound() {
		// play the source now
		soundSource.start(context.currentTime);
	}

	function stopSound() {
		// stop the source now
		soundSource.stop(context.currentTime);
	}

	// Events for play/stop
	var currentTime;
	window.addEventListener("keydown", dealWithKeyboard, false);
	function dealWithKeyboard(e) {
		if (e.keyCode == '32') {
			mute = !mute;
			console.log(mute);
			if(mute){
			myAudio.pause();
			}
			else {
				myAudio.play();
			}
		}
	}
	function audioGraph(audioData) {
		// create a sound source
		soundSource = context.createBufferSource();

		// The Audio Context handles creating source buffers from raw binary
		context.decodeAudioData(audioData, function(soundBuffer) {
			// Add the buffered data to our object
			soundSource.buffer = soundBuffer;

			// Plug the cable from one thing to the other
			soundSource.connect(context.destination);

			// Finally
			playSound(soundSource);
		});
	}

	init();

}());

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var c = document.getElementById('myCanvas');
var canvasCtx = c.getContext("2d");
function resize() {
	console.log("Window height " + windowHeight);
	console.log("Window width " + windowWidth);
	console.log();
	console.log("Current canvas height: " + c.height);
	console.log("Current canvas width: " + c.width);
	console.log();
	c.height = windowHeight;
	c.width = windowWidth;
	console.log("Current canvas height: " + c.height);
	console.log("Current canvas width: " + c.width);
}