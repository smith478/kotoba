let mediaRecorder;
let audioChunks = [];
let startTime;
const audioDuration = 10000; // Duration of chunks in milliseconds (10 seconds)
const overlapDuration = 3000; // Overlap duration in milliseconds (3 seconds)

document.getElementById('startBtn').addEventListener('click', startRecording);
document.getElementById('stopBtn').addEventListener('click', stopRecording);
document.getElementById('resetBtn').addEventListener('click', resetRecording);

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            startTime = Date.now();

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
                let currentTime = Date.now();
                let elapsedTime = currentTime - startTime;

                // Check if 10 seconds have passed
                if (elapsedTime >= audioDuration) {
                    startTime += (audioDuration - overlapDuration);
                    saveAudio();
                    
                    // Retain the last 3 seconds of audio data for overlap
                    let overlapChunks = audioChunks.slice(-Math.floor(overlapDuration / 1000));
                    audioChunks = overlapChunks;

                    // Display the audio
                    displayAudio(audioChunks);
                }
            };

            mediaRecorder.onstop = saveAudio;
        })
        .catch(error => console.error('Error accessing media devices.', error));
}

function stopRecording() {
    mediaRecorder.stop();
}

function resetRecording() {
    document.getElementById('audioClips').innerHTML = '';
    audioChunks = [];
}

function displayAudio(audioChunks) {
    const audioBlob = new Blob(audioChunks, { 'type' : 'audio/ogg; codecs=opus' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    audioElement.controls = true;
    document.getElementById('audioClips').appendChild(audioElement);
}

function saveAudio() {
    const audioBlob = new Blob(audioChunks, { 'type' : 'audio/ogg; codecs=opus' });
    const formData = new FormData();
    formData.append('audio', audioBlob, `audio${audioIndex}.wav`);
    fetch('http://localhost:5000/save-audio', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        audioIndex++;
    }).catch(error => {
        console.error('Error:', error);
    });
}

function initializeMedia() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("Media Devices are not supported.");
    }
}

initializeMedia();
