var webcam		= document.getElementById("_webcam");		// our webcam video
var imageData	= document.getElementById("_imageData");	// image data for BRFv4
var brfManager	= null;
var resolution	= null;
var brfv4		= null;

var constraints = {video: {width: 640, height: 480, frameRate: 30}}

function initExample() {

  startCamera();
  function startCamera() {
    // Start video playback once the camera was fetched.
    function onStreamFetched (mediaStream) {
      webcam.srcObject = mediaStream;
      webcam.play();
      // Check whether we know the video dimensions yet, if so, start BRFv4.
      function onStreamDimensionsAvailable () {
        if (webcam.videoWidth === 0) {
          setTimeout(onStreamDimensionsAvailable, 100);
        } else {
          waitForSDK();
        }
      }
      onStreamDimensionsAvailable();
    }


    // {video: {deviceId: videoSource, width: 640, height: 480, frameRate: 30}}
    window.navigator.mediaDevices.getUserMedia(constraints).then(onStreamFetched).catch(function () { alert("No camera available."); });
  }
  function waitForSDK() {
    if(brfv4 === null) {
      brfv4 = {locateFile: function() { return "js/libs/brf_asmjs/BRFv4_JS_trial.js.mem" }};
      initializeBRF(brfv4);
    }
    if(brfv4.sdkReady) {
      initSDK();
    } else {
      setTimeout(waitForSDK, 100);
    }
  }
  function initSDK() {
    // Resize the canvas to match the webcam video size.
    imageData.width		= webcam.videoWidth;
    imageData.height	= webcam.videoHeight;
    resolution	= new brfv4.Rectangle(0, 0, imageData.width, imageData.height);
    brfManager	= new brfv4.BRFManager();
    brfManager.init(resolution, resolution, "com.tastenkunst.brfv4.js.examples.minimal.webcam");
    brfManager.setNumFacesToTrack(4);
    trackFaces();
  }
  function trackFaces() {
    var imageDataCtx = imageData.getContext("2d");
    imageDataCtx.setTransform(-1.0, 0, 0, 1, resolution.width, 0); // mirrored for draw of video
    imageDataCtx.drawImage(webcam, 0, 0, resolution.width, resolution.height);
    imageDataCtx.setTransform( 1.0, 0, 0, 1, 0, 0); // unmirrored for draw of results
    brfManager.update(imageDataCtx.getImageData(0, 0, resolution.width, resolution.height).data);
    faces = brfManager.getFaces();

    for(var i = 0; i < faces.length; i++) {
      var face = faces[i];
      // if(		face.state === brfv4.BRFState.FACE_TRACKING_START ||
      //     face.state === brfv4.BRFState.FACE_TRACKING) {
      //   imageDataCtx.strokeStyle="#00a0ff";
      //   for(var k = 0; k < face.vertices.length; k += 2) {
      //     imageDataCtx.beginPath();
      //     imageDataCtx.arc(face.vertices[k], face.vertices[k + 1], 2, 0, 2 * Math.PI);
      //     imageDataCtx.stroke();
      //   }
      // }
    }
    requestAnimationFrame(trackFaces);
  }
}
window.onload = initExample;
