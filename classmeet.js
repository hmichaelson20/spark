// mostly borrowed code next 23 lines
var audio = true
var participants = 0
var videoOnOff = true

// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: audio };

// Define constants
const cameraView = document.querySelector("#camera--view"),
	  cameraOutput = document.querySelector("#camera--output"),
	  cameraSensor = document.querySelector("#camera--sensor"),
	  cameraTrigger = document.querySelector("#camera--trigger")

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        tr = stream.getTracks()[0];
        cameraView.srcObject = stream;
		participants += 1;
		document.getElementById("numParticipants").innerHTML = participants;
		cameraView.srcObject.getAudioTracks()[0].enabled = false;
    }).catch(function(error) {
        console.error("Video unavailable", error);
    });
}

function cameraStop(){
	cameraView.srcObject.getTracks().forEach(function(track) {
	  track.stop();
	});
	participants -= 1;
	document.getElementById("numParticipants").innerHTML = participants;
}

function setCamera(){
	if(videoOnOff){
		cameraStop()
		videoOnOff = !videoOnOff;
	}else if(!videoOnOff){
		videoOnOff = !videoOnOff;
		cameraStart()
	}
}

function audioChange(){
	cameraView.srcObject.getAudioTracks()[0].enabled = !cameraView.srcObject.getAudioTracks()[0].enabled;
}

function getAudio(){
	return audio;
}

function setAudio(){
	audio = !audio;
	console.log(audio)
	audioChange()
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

window.onload = function() {
   document.getElementById("numParticipants").innerHTML = participants;
} 

//document.getElementById("meeting").innerHTML = "CLASSMEET";
