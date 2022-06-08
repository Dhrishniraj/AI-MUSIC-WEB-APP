song1 = "";
song2 = "";
leftristex = 0;
leftristwaay = 0;
rightristex = 0;
rightristwaay = 0;
score_leftwrist = 0;
score_rightwrist = 0;
function preload(){
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(800, 500);
    canvas.position((screen.width / 2 - 400), 300);
    video = createCapture(VIDEO);
    video.hide();
    Poserao = ml5.poseNet(video, modeLoaded);
    Poserao.on("pose", gotPoses);
}
function modeLoaded(){
    console.log("Baburao is loaded.")
}
function draw(){
    image(video, 0, 0, 800, 600);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    if(score_leftwrist > 0.2){
        fill("red");
        stroke("red");
        circle(leftristex, leftristwaay, 20);
        song2.stop();
        if(song1status == false){
            song1.play();
            document.getElementById("idontknowtheid").innerHTML = "Song name is peter pan.";
        }
    }
    if(score_rightwrist > 0.2){
        fill("red");
        stroke("red");
        circle(rightristex, rightristwaay, 20);
        song1.stop();
        if(song2status == false){
            song2.play();
            document.getElementById("idontknowtheid").innerHTML = "Song name is Harry Potter.";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftristex = results[0].pose.leftWrist.x;
        leftristwaay = Math.round(Number(results[0].pose.leftWrist.y));
        rightristex = results[0].pose.rightWrist.x;
        rightristwaay = Math.round(Number(results[0].pose.rightWrist.y));
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;
        console.log(leftristex);
        console.log(leftristwaay);
        console.log(rightristex);
        console.log(rightristwaay);
        console.log(score_leftwrist);
        console.log(score_rightwrist);
    }
}