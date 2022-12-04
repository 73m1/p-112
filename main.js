Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function capture() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'/>"
    });
}

console.log("ml5",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oG3Yd8kIC/model.json',modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}
function speak() {
    synth = window.speechSynthesis;
    speak_data = "your emoji is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("result");
        classifier.classify(img, gotResults);
    }

    function gotResults(error, results) {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("hand-ges-name").innerHTML = results[0].label;
            prediction = results[0].label;
            speak();
            if(results[0].label == "peace sign") {
                document.getElementById("hand-ges-icon").innerHTML = "&#128522"
            }
            if(results[0].label == "ok") {
                document.getElementById("hand-ges-icon").innerHTML = "&#128532"
            }
            if(results[0].label == "thumbs up") {
                document.getElementById("hand-ges-icon").innerHTML = "&#128548"
            }
        }
        }