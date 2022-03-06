//hello//
synth = window.speechSynthesis;
Status = "";
objects = [];
utterThis = object_name;
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;

}

function modelLoaded()
    {
console.log("model loaded");
Status = true;
    }

    function draw()
    {
        image(video, 0, 0, 500, 500);
        if(Status != "")
        {
            objectDetector.detect(video, gotResult);
            for (i = 0; i < objects.length; i++)
            {

                document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;
                if (objects[i].label == object_name)
                {
                    video.stop();
                    objectDetector.detect(gotResult);
                    document.getElementById("status").innerHTML = "Status :" + object_name + " detected";
                    SpeechSynthesisUtterance(synth.speak(utterThis));
                }
                else 
                {
                    document.getElementById("status").innerHTML = "Status :" + object_name + " not detected";
                }
        
                fill("#ff0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#ff0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }