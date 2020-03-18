const constraints = {
  audio: true,
  video: {
    width: 512,
    height: 512
  }
}
// get the video element
const video = document.querySelector('video');
// get timer
const time = document.querySelector('.timer');
//
navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  }
})
.catch(function(err) {
  console.error(err.name + ": " + err.message);
})
//
const recButton = document.querySelector(".rec");
const stopButton = document.querySelector(".stop");
// mediastream capture frames rate (optional)
var stream = video.captureStream(25);
var recordedChunks = [];
//
var options = { mineType: "video/webm; codecs=vp9" };
mediaRecorder = new MediaRecorder(stream, options);
//
// button record
recButton.onclick = function(event){
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  this.classList.add('record');
  timer(20);
};
// stop record function
function stopRecord() {
  mediaRecorder.stop();
  recButton.classList.remove('record');
  recordedChunks = [];
}
//
function handleDataAvailable(event) {
  console.log("data-available");
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    console.log(recordedChunks);
    download();
  } else {
    // ...
  }
}
//
function download() {
  var date = new Date();
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  //
  var blob = new Blob(recordedChunks, {
    type: "video/webm"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = `daily_journal_${month}_${day}_${year}_${hours}h_${minutes}m_${seconds}s_.mp4`;
  a.click();
  window.URL.revokeObjectURL(url);
}
// timer 
var seconds = 0
var interval;

// timer function to stop the video recording
function timer(sec) {
  seconds = sec || 0;
  interval = setInterval(function() {
    seconds--;
    if(seconds > 9) {
      time.innerHTML = `0:${seconds}`;
    } else {
      time.innerHTML = `0:0${seconds}`;
    }

    if(!seconds){
      clearInterval(interval);
      stopRecord();
      time.innerHTML = `0:20`;
      //alert("Done, now you can download your video and share it!")
    }
  }, 1000)
}