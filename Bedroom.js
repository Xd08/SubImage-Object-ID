img="";
status="";
objects=[];

function setup() {
    canvas= createCanvas(700, 420);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Current status: Detecting Objects..."
}

function preload() {
    img=loadImage("bedroom.jpg");
}

function draw() {
    image(img, 0, 0,700, 420);
    if(status != "") {
        for(i=0; i< objects.length; i++) {
            document.getElementById("status").inneHTML="Current Status: Objects detected"
            fill("blue");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +" " + percent+ "%", objects[i].x, objects[i].y);
            //noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("Detected_images").innerHTML="In the Image there is 1 object out of which the COCO S.S.D model has detected" + objects.length + " objects";
        }
    }
}

function modelLoaded() {
    console.log("COCO.S.S.D Model has succesfully been loaded");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, result) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(result);
        objects=result;
    }
}