
var qnTimer;
var ansTimer;
var number;
var ansNumber;
var cnt = 0;
var correct=0;
var wrong=0;

//obj that stores the movie trivia info
var triGameObj = [
{qn:"What classic horror movie is set in Haddonfield, Illinois?",
 ans:"b",
 options:{
	 a:"Psycho",
	 b:"Halloween",
	 c:"Friday the 13th",
	 d:"Carrie"	 
     },
 search:"Halloween movie"
},
{qn:"Which of the following movies is set at a summer camp?",
 ans:"b",
 options:{
	 a:"When a Stranger Calls",
	 b:"Friday the 13th",
	 c:"The Shining",
	 d:"Carrie"
     },
 search:"Friday the 13th movie"
},
{qn:"How many killers are revealed at the end of Scream?",
 ans:"b",
 options:{
	 a:"1",
	 b:"2",
	 c:"3",
	 d:"4"
     },
 search:"Scream movie"
},
{qn:"Noman Bates murdered his mother and her __________",
 ans:"d",
 options:{
	 a:"Mother",
	 b:"Sister",
	 c:"Brother",
	 d:"Lover"
     },
 search:"Noman Bates horror movie"
},
{qn:"Leatherface was a character in what horror film?",
 ans:"d",
 options:{
	 a:"Carrie",
	 b:"The Shining",
	 c:"The Blair Witch Project",
	 d:"The Texas Chainsaw Massacre"
     },
 search:"Leatherface"
}
];

$("#optionDiv").on("click",'.dynButton',function() {
	var userAns = $(this).attr("opt");
	if(userAns == triGameObj[cnt].ans){
        ShowAnswer("Correct!");
        correct++;
	}
	else{
        ShowAnswer("Wrong!");
        wrong++;
	}
});
	
	
function ShowQuestion(){
	var getQn = triGameObj[cnt];
	$("#disp").text(getQn.qn);
	$("#optionDiv").text("");
	var getOptions = getQn.options;
	for(var key in getOptions){	
		var tempDiv = $("<div>");
		tempDiv.addClass("temp_center");
		var opt = $("<button>");
		opt.addClass("button_img");
		opt.addClass("dynButton");
		opt.text(getOptions[key]);
		opt.attr("opt",key);			
		tempDiv.append(opt);		
		$("#optionDiv").append(tempDiv);
	}	
}

function getGif(){
	var gifPhrase = triGameObj[cnt].search;
    // Storing our giphy API URL for a answer selected
	var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+gifPhrase;
	  // Perfoming an AJAX GET request to our queryURL
	  $.ajax({
		url: queryURL,
		method: "GET"
	  })
	  // After the data from the AJAX request comes back
		.then(function(response) {
		// Saving the image_original_url property
		  var imageUrl = response.data.image_original_url;
		  // Creating and storing an image tag
		  var ansImage = $("<img>");		  
		  ansImage.attr("src", imageUrl);	
		  ansImage.height(200);	
		  ansImage.width(200);
		  // Prepending to the images div
		  $("#imgDiv").append(ansImage);
		});
	
}

function ShowAnswer(msg){
    $("#disp").text("");
	$("#optionDiv").text("");
	var msg = $("<p>").text(msg)
	var ans = $("<p>").text("The answer is : "+triGameObj[cnt].options[triGameObj[cnt].ans]);
	var gif = getGif();
	$("#disp").append(msg);
	$("#disp").append(ans);	
    clearInterval(qnTimer);
    cnt++;	
	setTimeout(displayQn, 2000);
}

//on refreshing the screen
function reset(){	
	$("#gameDiv").hide();
    $(".start").show();
}

//timer set to 10 secs for each question
function startQnqnTimer(){	
	number = 10;
	qnTimer = setInterval(displaySecs,1000);	
}

//starts the game on click of start button
function startGame(){
    $("#gameDiv").show();
    $(".start").hide();
    $("#gameResult").hide();
    cnt = 0;
    correct=0;
    wrong=0;
	displayQn();
}


//display next question from obj, else display result
function displayQn(){	
    $("#imgDiv").text("");
	if (triGameObj.length > cnt){		
			startQnqnTimer();
            ShowQuestion();	
		}
		else{
            var result = "Good Job. Correct: "+correct+" Wrong: "+wrong;
            console.log();
            $("#gameResult").show();
            $("#result").text(result);
            $(".start").text("RESTART?");
            $(".start").show();
            $("#gameDiv").hide();
		}
}

//display the seconds on timer
function displaySecs(){	
	number --;
	$("#displayTime").text(number +" seconds");	
	if (number === 0)
	{
		clearInterval(qnTimer);
        ShowAnswer("time Out!");
        wrong++;
			
	}
	
}

 $(document).ready(function() {	 
	reset();
	 
});

