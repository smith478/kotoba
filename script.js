let mediaRecorder;
let audioChunks = [];
let startTime;
const audioDuration = 5000; // Duration of chunks in milliseconds (t * 1000)
const overlapDuration = 2000; // Overlap duration in milliseconds (s * 1000)

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

                if (elapsedTime >= audioDuration - overlapDuration) {
                    startTime += (audioDuration - overlapDuration);
                    saveAudio();
                    audioChunks = [];
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
}

function saveAudio() {
    const audioBlob = new Blob(audioChunks, { 'type' : 'audio/ogg; codecs=opus' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const clipContainer = document.createElement('article');
    const audioElement = document.createElement('audio');
    const deleteButton = document.createElement('button');

    clipContainer.classList.add('audio-clip');
    audioElement.src = audioUrl;
    audioElement.controls = true;
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        clipContainer.parentNode.removeChild(clipContainer);
    };

    clipContainer.appendChild(audioElement);
    clipContainer.appendChild(deleteButton);
    document.getElementById('audioClips').appendChild(clipContainer);
}

function initializeMedia() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("Media Devices are not supported.");
    }
}

initializeMedia();
