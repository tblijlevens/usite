/*
Author & productowner: Teun Blijlevens, Umanise.
Date: January 9th 2017
(Re-)Use of this code is only allowed if written permission is given by the productowner.
Contact: mail@umanise.nl
*/
$(document).ready(function(){

$(this).scrollTop(0);

// The set and run button attracts attention.
$('#setParButton').css({bottom: "300px", right: '-500px'});
$('#setParButton').animate({bottom: "-15px", right: '25px'}, 1000);


/////////////////////////////////////////////////////////////////////
////// RESPONSIVENESS OF BROWSERZOOM: SMALLER GRAPH ETC.      //////
///////////////////////////////////////////////////////////////////
/*
// normal values:
    var bodyfontsize = 15;
    var titlefontsize = 18;

    var rectbottomright = bottomright.getBoundingClientRect();
    if (rectbottomright.top <620){
      multiplier = 0.75;
      bodyfontsize = 12;
      titlefontsize = 14;
        };
        if (rectbottomright.top <555){
      multiplier = 0.5;
      bodyfontsize = 11;
      titlefontsize = 12;
        };

    var maindivheight = 600 * multiplier;
    var maindivwidth = 820 * multiplier;
    var linedistance = 100 * multiplier;
    var plus3top = 100 * multiplier;
    var startpoint = 590 * multiplier;
    var yaswidth = 600 * multiplier;
    var yasleft = (-325*multiplier)-(4/multiplier);
    var yastop = 290 * multiplier;
    var xastop = 625 * multiplier;
    var whathaptop = 640 * multiplier+60;
    var whathapwidth = 820 * multiplier;

$('#everything').css({fontSize: bodyfontsize});
$('.title').css({fontSize: titlefontsize});

//setting graph size and linetops and startpoints of dots
$('#maindiv').css({height: maindivheight, width: maindivwidth});
$('#Plus3').css({top: plus3top});
$('#Plus2').css({top: plus3top + linedistance});
$('#Thresh2Line').css({top: plus3top + linedistance});
$('#Plus1').css({top: plus3top + 2*linedistance});
$('#Thresh1Line').css({top: plus3top + 2*linedistance});
$('#nul').css({top: plus3top + 3*linedistance});
$('#min1').css({top: plus3top + 4*linedistance});
$('#yAs').css({width: yaswidth, left: yasleft, top: yastop});
$('#xAs').css({top: xastop});
$('#option1, #option2, #option3, #option0').css({top: startpoint});

//setting livecounts size
$('#whathappened').css({width: whathapwidth, top: whathaptop});


*/



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// 				THIS BLOCK LOGS ALL setTimeout ID's IN A VARIABLE (each timeout gets its own number).			/////
//////        THIS MAKES IT POSSIBLE TO CLEAR ALL TIMEOUTS OF ALL CALLED FUNCTIONS.            					/////
//////        This way the animation can stop and start again when clicking the set and run button      /////
//////        before the graph was finished		                                                   				/////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

timers = {};
originalSetTimeout = window.setTimeout
// override setTimeout with a function that keeps track of all timers
window.setTimeout = function(fu, t) {					//// fu is the function that got a timeout (eg. moveDiv1()), t is the delay that this specific timeout has
     var id = originalSetTimeout(function() {							//// the variabele id gets the value of the idnumber of this timeout
        delete timers[id]; // do not track popped timers		//// id's of finished timeouts are deleted froem the timers object
        fu();
    }, t);
    timers[id] = ({id:id,  setAt: new Date(),  timeout: t});			//// of each timeout, the idnumber, triggerdate and delay value are stored in the timers object.

$('#setParButton').click(function() {
myStopFunction(id);													//// this clears all timeouts, stopping the graph
});
};    //end settimeout function

function myStopFunction(id) {
clearTimeout(id);													//// all still exisiting timeouts are cleared (animation stops). Gets called when button 'set and run' is clicked.
};

///////////////////////////////////////////////////////////////////////////////////////////
///                     SET AND RUN WITH NEW PARAMETERS FUNCTION                        ///
///////////////////////////////////////////////////////////////////////////////////////////

// The speed of the animation is set by the user
$('#speed1').click(function() {
  SnelheidDelay2 = 1800;
  $("#speed1").css({"box-shadow" : "0 0 15px blue", "font-weight": "bold"});
  $("#speed2").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed3").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed4").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
});
$('#speed2').click(function() {
  SnelheidDelay2 = 700;
  $("#speed1").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed2").css({"box-shadow" : "0 0 15px blue", "font-weight": "bold"});
  $("#speed3").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed4").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
});
$('#speed3').click(function() {
  SnelheidDelay2 = 350;
  $("#speed1").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed2").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed3").css({"box-shadow" : "0 0 15px blue", "font-weight": "bold"});
  $("#speed4").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
});
$('#speed4').click(function() {
  SnelheidDelay2 = 25;
  $("#speed1").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed2").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed3").css({"box-shadow" : "0 0 0px blue", "font-weight": "normal"});
  $("#speed4").css({"box-shadow" : "0 0 15px blue", "font-weight": "bold"});
});


// button 'set and run' is clicked:
$('#setParButton').click(function() {

$(document).scrollTop(0);

// variables take the user inputs as values:
    SnelheidDelay = SnelheidDelay2;
    var thresh1Par = document.getElementById('thresh1Field').value;
    var thresh2Par = document.getElementById('thresh2Field').value;
		noise = 1-document.getElementById('noiseField').value;
		probsample = document.getElementById('probsampleField').value;
    warning = 0;    // each time the button gets clicked, the warnings will be off.
    warningtext = "";        // each time the button gets clicked, the warningtext will be empty.

// Then conditions are checked, to see if warnings are needed:
    if (thresh1Par < -2 || thresh1Par > 3.5) {
      warning += 1;
      warningtext += "Consideration threshold (<i><b>&#952;<sub>1</sub></b></i>) must be between -2 and 3.5. <p>";
    };
		if (thresh2Par-thresh1Par<=0 || thresh2Par > 4) {
      warning += 1;
      warningtext += "Decision threshold (<i><b>&#952;<sub>2</sub></b></i>) must be bigger than Consideration threshold (<i><b>&#952;<sub>1</sub></b></i>) and equal to or smaller than 4. <p>";
    };
		if (thresh1Par >=-2 && thresh1Par <= 3.5 && thresh2Par-thresh1Par>0 && thresh2Par <= 4) { // if T1 and T2 are correct:
        Thresh1 = parseFloat(thresh1Par).toFixed(1);		// set new thresholds
				Thresh2 = parseFloat(thresh2Par).toFixed(1);
				setThreshOnCanvas(); 		// set new Threshold lines on canvas
    };
    if (noise<0 || noise>1) {
      warning += 1;
      warningtext += "Accuracy (<i><b>&alpha;</b></i>) must be between 0 and 1. <p>";
    }
    if (probsample<0 || probsample>1) {
      warning += 1;
      warningtext += "Exploration tendency (<i><b>m</b></i>) must be between 0 and 1. <p>";
    }

$('#hovertexts').fadeOut(500);

if (warning != 0){
  warningtext = "Please adjust the parameter settings.<p>" + warningtext;
  $('#wrongpars').css("height", warning*35+80) //warning box adjusts its height depending on number of warnings
  if (warning>1){
    $('#warningtitle').html(warning + " warnings:");
  }
  else {
    $('#warningtitle').html(warning + " warning:");
  }
  $('#warning').html(warningtext);
  $('#wrongpars').fadeIn(500);
}
else {
  $('#wrongpars').fadeOut(500);
  $("#option1std1").css({"width":2*noise*100*multiplier, "height":2*noise*100*multiplier}); // objective dot and auras width and height are set to their noise values
  $("#option1std2").css({"width":4*noise*100*multiplier, "height":4*noise*100*multiplier});
  $("#option1std3").css({"width":6*noise*100*multiplier, "height":6*noise*100*multiplier});
  $("#option2std1").css({"width":2*noise*100*multiplier, "height":2*noise*100*multiplier});
  $("#option2std2").css({"width":4*noise*100*multiplier, "height":4*noise*100*multiplier});
  $("#option2std3").css({"width":6*noise*100*multiplier, "height":6*noise*100*multiplier});
  $("#option3std1").css({"width":2*noise*100*multiplier, "height":2*noise*100*multiplier});
  $("#option3std2").css({"width":4*noise*100*multiplier, "height":4*noise*100*multiplier});
  $("#option3std3").css({"width":6*noise*100*multiplier, "height":6*noise*100*multiplier});
  $("#option0std1").css({"width":2*noise*100*multiplier, "height":2*noise*100*multiplier});
  $("#option0std2").css({"width":4*noise*100*multiplier, "height":4*noise*100*multiplier});
  $("#option0std3").css({"width":6*noise*100*multiplier, "height":6*noise*100*multiplier});

  // the live counts are set to their original values (blank)
  $('#option1obj').css({"font-size": '14px', 'font-weight': "normal"}).html("");
  $('#option1subj').css({"font-size": '14px', 'font-weight': "normal"}).html("");
  $('#option2obj').css({"font-size": '14px', 'font-weight': "normal"}).html("");
  $('#option2subj').css({"font-size": '14px', 'font-weight': "normal"}).html("");
  $('#option3obj').css({"font-size": '14px', 'font-weight': "normal"}).html("");
  $('#option3subj').css({"font-size": '14px', 'font-weight': "normal"}).html("");


    setandPlay();     /// function gets called that clears all previous arrays and graphs and runs the model
  }
}); //end set parameters function



///////////////////////////////////////////////////////////////////////////////////////
////// 				HOVER OVER INFORMATION FOR PARAMETERS AND SETTINGS              		/////
///////////////////////////////////////////////////////////////////////////////////////

$("#thresh2Lable, #thresh2Field, #thresh1Lable, #thresh1Field, #noiseLable, #noiseField, #probsampleLable, #probsampleField, #speed1, #speed2, #speed3, #speed4, #noiseCheck, #setParButton").hover(function(){
  $('#wrongpars').fadeOut(0)
  // tekst is changed depending on which element was hovered over:
  if (this.id == "thresh2Field" || this.id == "thresh2Lable"){
    $('#hovertexts').css("height", "360")
    hovertitle = "Selectiveness - Decision threshold (<i><b>&#952;<sub>2</sub></b></i>)";
    hovertext = "<div class='hoverimg'><img src='images/t2gif.gif' width='250px'></div><p>If the perceived fit of an option exceeds this number, the individual enters the mode of final decision making for this option. In his mode, the individual will either explore this option in depth or make the final decision for this option with equal probability. <br>If the perceived fit falls below this value, the individual exits the mode of final decision making.<P> <i><b>&#952;<sub>2</sub></b></i> must be bigger than <i><b>&#952;<sub>1</sub></b></i> and between -2 and 4.<br>-2 = not at all selective<br>4 = extremely selective";
  };
  if (this.id == "thresh1Lable" || this.id == "thresh1Field"){
    $('#hovertexts').css("height", "310")
hovertitle = "Selectiveness - Consideration threshold (<i><b>&#952;<sub>1</sub></b></i>)";
    hovertext = "<div class='hoverimg'><img src='images/t1gif.gif' width='250px'></div><p>If the perceived fit of a newly explored option exceeds this number, the individual takes this option under consideration. <br>If the perceived fit falls below this value, the option is discarded.<p> <i><b>&#952;<sub>1</sub></b></i> must be between -2 and 3.5.<br>-2 = not at all selective<br>3.5 = extremely selective";
  };
  if (this.id == "noiseLable" || this.id == "noiseField"){
    $('#hovertexts').css("height", "260")
    hovertitle = "Accuracy (<b>&alpha;</b>)";
    hovertext = "This parameter determines the accuracy with which the individual assesses how well an option fits her interests and capabilities (i.e. the objective fit [<b>x<sub>o</sub></b>]). The higher this number, the higher the individual's accuracy. Specifically, this value is directly related to the standard deviation <i>&sigma;</i> of a normally distributed random variable (e), which is the uncertainty term that is added to the objective fit to obtain the perceived fit (x<sub>p</sub> = x<sub>o</sub> + e; &alpha; = 1 - &sigma;).<p> <i><b>&alpha;</b></i> must be between 0 and 1<br>0 = very inaccurate.<br>1 = perfectly accurate";
  };
  if (this.id == "probsampleLable" || this.id == "probsampleField"){
    $('#hovertexts').css("height", "195")
    hovertitle = "Exploration tendency <i><b>m</b>";
    hovertext = "This parameter denotes fraction of time that the individual dedicates to broad exploration. The individual dedicates the complementary fraction (1-<i><b>m</b></i>) of time to in-depth exploration of options that are already under consideration. <p> <i><b>m</b></i> must be between 0 and 1.<br>0 = only broad exploration<br>1 = only in-depth exploration";
  };
  if (this.id == "speed1"){
    $('#hovertexts').css("height", "140")
    hovertitle = "Speed 1";
    hovertext = "Slow - also shows examplary experiences in graph:<p><div><img src='images/experience.png' width='400px'></div><p> <i>You can also press the 1-4 keys to change the speed.</i>";
  };
  if (this.id == "speed2"){
    $('#hovertexts').css("height", "100")
    hovertitle = "Speed 2";
    hovertext = "Normal<p> <i>You can also press the 1-4 keys to change the speed.</i>";
  };
  if (this.id == "speed3"){
    $('#hovertexts').css("height", "100")
    hovertitle = "Speed 3";
    hovertext = "Fast<p> <i>You can also press the 1-4 keys to change the speed.</i>";
  };
  if (this.id == "speed4"){
    $('#hovertexts').css("height", "100")
    hovertitle = "Speed 4";
    hovertext = "Very fast<p> <i>You can also press the 1-4 keys to change the speed.</i>";
  };
  if (this.id == "setParButton"){
    $('#hovertexts').css("height", "140")
    hovertitle = "Set and run";
    hovertext = "Set new parameters and animation speed and run the simulation. <p> <i>You can also press the 'Enter' key from anywhere on the screen.</i>";
  };

  // information is shown.
    $('#hoverinformation').html(hovertext);
    $('#hovertitle').html(hovertitle);
    if (this.id != "speeds"){
      $('#hovertexts').fadeIn(0);
    };
        }, function(){
        $('#hovertexts').fadeOut(0);
        if (warning != 0){
          $('#wrongpars').fadeIn(0)
        };
      });

////////////////////////////////////////////////////////////////////////////
/////////                 KEYBOARD FUNCTIONALITY                ////////////
////////////////////////////////////////////////////////////////////////////

$('#defaults').click(function() {
 $('#probsampleField').val(0.5);
 $('#noiseField').val(0.5);
 $('#thresh1Field').val(1.0);
 $('#thresh2Field').val(2.0);
});

$(document).keyup(function(event){
    if(event.keyCode == 13){            //enter key
        $("#setParButton").click();
    };
    if ($(event.target).is(':not(input, textarea)')) {    //following buttons not if cursor is in inputfield
      if(event.keyCode == 49 || event.keyCode == 97){     // 1 Num 1
          $("#speed1").click();
      };
      if(event.keyCode == 50 || event.keyCode == 98){     // 2 Num 2
          $("#speed2").click();
      };
      if(event.keyCode == 51 || event.keyCode == 99){     // 3 Num 3
          $("#speed3").click();
      };
      if(event.keyCode == 52 || event.keyCode == 100){     // 4 Num 4
          $("#speed4").click();
      }
  };
});
$("#showAura").click(function() {
        $("#noiseCheck").click();
});

///////////////////////////////////////////////////////////////////////////////////////////////
////// 					SCROLLFUNCTIONS (TABLEHEADERS FLOATING ETC.)					                 	//////
/////////////////////////////////////////////////////////////////////////////////////////////

window.onscroll = function (e) {  		// called when the window is scrolled.
var recttime = timesteps2waarden.getBoundingClientRect();
var rectgraph = whathappened.getBoundingClientRect();
var rectbottom = legeruimteonderaan.getBoundingClientRect();

if (recttime.top < 125 && rectbottom.top>150){									//// when the table hits the upper edge of the screen, table headers start to float
	$('#tabelkoppen').css({"position":'fixed', "top":'75px', "left":'60px'});
}
else{
	$('#tabelkoppen').css({"position":'absolute', "top":'0px', "left":'0px'});
};

if (recttime.top < 125){
  $('#menu').css({"position":'fixed', "top":'20px', "left":'60px'});
}
else{
  $('#menu').css({"position":'absolute', "top":'940px', "left":'60px'});
};

ga('send', 'event', 'scroll', 'scrolling', 'scrolls');
};    // end scroll float function




///////////////////////////////////////////////////////////////////////////////////////////////////////////
////// 					SET AND PLAY FUNCTION: CLEAR EVERYTHING AND RUN MODEL WITH NEW PARAMETERS            	/////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//// this function is called with the 'set and run' button and the setparameters function. This function clears all canvasses, tables, and arrays of their previous values. Then it calls the runModel function, which will run the model (filling the arrays with all the subjective and objective values). Then a forloop runs through those arrays, based on those values functions are called with the right delays inside this forloop which will draw the graph and fill the table, etc..

function setandPlay(){

      Option0 = [];                               //// arrays are cleared
      Option0Obj = [];
      Option1 = [];
      Option1Obj = [];
      playOption1Obj = [];
      Option2 = [];
      Option2Obj = [];
      Option3 = [];
      Option3Obj = [];
      WhatHappened = [];
      NewOpt = [];
      HappenedTo = [];

      $('#timesteps2waarden').html("<br>");				//// table is cleared
      $('#subj1waardenwaarden').html("<br>");
      $('#obj1waardenwaarden').html("<br>");
      $('#subj2waardenwaarden').html("<br>");
      $('#obj2waardenwaarden').html("<br>");
      $('#subj3waardenwaarden').html("<br>");
      $('#obj3waardenwaarden').html("<br>");
      $('#ervaringenTabelWaarden').html("<br>");
      $('#ervaringen').html("");


        runModel();   // The careerchoice model is run, which fills all arrays with new values.

ChoiceMadeVar = "no";
xas2=5;                 // the amount of pixels a dot or line moves horizontally each timestep

CountExplore = 0;       // initially all counts are zero.
CountExploit = 0;
CountNewOpt = 0;

$('#countexplore').html(CountExplore);    // also the live counts must update to 0
$('#countnewopt').html(CountNewOpt);
$('#countexploit').html(CountExploit);

option1Color = 'green';       // initial colors of the options
option2Color = 'red';
option3Color = 'LightSeaGreen';

changeColor1(option1Color,0);       // The dots might have gotten different colors during a previous run
changeColor2(option2Color,0);       // Here they get their initial colors again
changeColor3(option3Color,0);


					var a = document.getElementById("myCanvas1");  // Option 1 subjective line canvas
					var atx = a.getContext("2d");
          atx.clearRect(0, 0, 820, 600);			// canvas cleared.
          atx.lineWidth=2;
					atx.strokeStyle="green";
          atx.lineCap = "round";
          atx.beginPath();
					atx.moveTo(5, 900);

					var b = document.getElementById("myCanvas2");    //Option 2 subjective line
					var btx = b.getContext("2d");
          btx.clearRect(0, 0, 820, 600);
          btx.lineWidth=2;
					btx.strokeStyle="red";
          btx.beginPath();
					btx.moveTo(5, 900);

					var c = document.getElementById("myCanvas3");    // Option 3 subjective line
					var ctx = c.getContext("2d");
          ctx.beginPath();
          ctx.clearRect(0, 0, 820, 600);
					ctx.lineWidth=2;
					ctx.strokeStyle="LightSeaGreen";
					ctx.moveTo(5, 900);

					var d = document.getElementById("myCanvas4");    // Option 0 subjective dots
					var dtx = d.getContext("2d");
          dtx.beginPath();
          dtx.clearRect(0, 0, 820, 600);
					dtx.lineWidth=2;
					dtx.strokeStyle="grey";
					dtx.moveTo(5, 900);


// canvasses of the objective lines

          var e = document.getElementById("myCanvas5");   //Option 1 objective line
          var etx = e.getContext("2d");
          etx.clearRect(0, 0, 820, 600);
          etx.lineWidth=1;
          etx.strokeStyle="green";
          etx.setLineDash([5,3]);
          etx.beginPath();
          etx.moveTo(5, 900);

          var f = document.getElementById("myCanvas6");   // Option 2 objective line
          var ftx = f.getContext("2d");
          ftx.clearRect(0, 0, 820, 600);
          ftx.lineWidth=1;
          ftx.strokeStyle="red";
          ftx.setLineDash([5,3]);
          ftx.beginPath();
          ftx.moveTo(5, 900);

          var g = document.getElementById("myCanvas7");   // Option 3 objective line
          var gtx = g.getContext("2d");
          gtx.clearRect(0, 0, 820, 600);
          gtx.lineWidth=1;
          gtx.strokeStyle="LightSeaGreen";
          gtx.setLineDash([5,3]);
          gtx.beginPath();
          gtx.moveTo(5, 900);


///////////////////////////////////////////////////////////////////
////// 	           		FORLOOP BEGINS    		                //////
/////////////////////////////////////////////////////////////////
/// This forloop runs through all values in the arrays (made by runModel). Based on those values functions are called with their right delay which make the dots move over the graph, draw the lines, fill the table, etc...

for (var i=0; i<Option1.length; ++i){

/// Depending on the timelimit (might be adjustable in the future (now set at 100 timesteps) the graph can be 'stretched'. De smaller the timelimit, the bigger the distance of a timestep on the graph.

	if (timelimit<101){
			xas2 += 8;
		};
	if (timelimit>150){
			xas2 += 4;
		};
	if (timelimit>100 && timelimit<151){
			xas2 += 5;
		};

CountTimesteps(i+1, Option1.length, SnelheidDelay * (i) + 300);		////// 		each time the loop passes this line, this function gests called. It has three input values: the current timestep, the total number of timesteps, the delay. See the function itself for more explanation (in aimationfunctions.js).

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////// 					THREE OPTION DOTS START MOVING EN CHANGE COLOR WHEN IT IS A NEW OPTION. ALL           /////
//////          THE BELOW IS INPUT FOR FUNCTIONS THAT ARE DEFINED IN ANIMATIONFUNCTIONS.JS.           /////
//////          THEY ARE CALLED HERE WITH THEIR RIGHT DELAY. EACH OPTION HAS 2 MAIN FUNCTIONS         /////
//////          THAT WILL OR WILL NOT BE CALLED HERE: A HIGHLIGHT + MOVE FUNCTION AND A               /////
//////          (JUST) MOVE FUNCTION                                                                 	/////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

			if (HappenedTo[i] === 0){					////// 		DOT 0 HIGHLIGHT WHEN NONE OF THE OTHER OPTIONS GET A NEW VALUE (UNSUCCESFULL EXPLORE)
					moveDiv0HighLight((i+1)*5+5, -Option0[i]*100+399, i, dtx, xas2, SnelheidDelay * (i) + 300, -Option0Obj[i]*100+399);
					moveDiv1(-Option1[i]*100+399, atx, etx, xas2, -Option1[i]*100+400, i, SnelheidDelay * (i) + 300, -Option1Obj[i]*100+399);
					moveDiv2(-Option2[i]*100+399, btx, ftx, xas2, -Option2[i]*100+400, i, SnelheidDelay * (i) + 300, -Option2Obj[i]*100+399);
					moveDiv3(-Option3[i]*100+399, ctx, gtx, xas2, -Option3[i]*100+400, i, SnelheidDelay * (i) + 300, -Option3Obj[i]*100+399);
				}

			else if (HappenedTo[i] === 1){				////// 		DOT 1 SHOULD HIGHLIGHT AND CHANGE COLOR IF IT IS A NEW OPTION, ALL THE OTHER DOTS MUST ONLY MOVE (WITHOUT HIGHLIGHTING)
        //// first: the others move.
					moveDiv0((i+1)*5+5, -Option0[i]*100+399, SnelheidDelay * (i) + 300, i, -Option0Obj[i]*100+399);
					moveDiv2(-Option2[i]*100+399, btx, ftx, xas2, -Option2[i]*100+400, i, SnelheidDelay * (i) + 300, -Option2Obj[i]*100+399);
					moveDiv3(-Option3[i]*100+399, ctx, gtx, xas2, -Option3[i]*100+400, i, SnelheidDelay * (i) + 300, -Option3Obj[i]*100+399);

          //// then: conditions decide what should happen with dot 1 (highlight the dot and change color to green or to yellow or no color change)
					if (NewOpt[i] === 1 && option1Color === 'green') {					//// if dot 1 is a new option and was green
						option1Color='yellow'; 											//// change this variable to yellow, so next time this condition sees that the dot was yellow (to be changed below)
						changeColor1(option1Color, SnelheidDelay * (i) + 300);		//// after the right delay this function changes the dot's color (now yellow)
						moveDiv1HighLight(-Option1[i]*100+399, i, atx, etx, xas2, -Option1[i]*100+400, option1Color, SnelheidDelay * (i) + 300, -Option1Obj[i]*100+399);		//// the highlight function gets called
						}
					else if (NewOpt[i] === 1 && option1Color === 'yellow'){				//// if dot 1 is a new option but was yellow...
						option1Color='green';
						changeColor1(option1Color, SnelheidDelay * (i) + 300);
						moveDiv1HighLight(-Option1[i]*100+399, i, atx, etx, xas2, -Option1[i]*100+400, option1Color, SnelheidDelay * (i) + 300, -Option1Obj[i]*100+399);
						}
					else {									//// if there was no new option (but the new value did belong to option 1)(it was a in-depth explore)
						moveDiv1HighLight(-Option1[i]*100+399, i, atx, etx, xas2, -Option1[i]*100+400, option1Color, SnelheidDelay * (i) + 300, -Option1Obj[i]*100+399);
					};
			}

			else if (HappenedTo[i] === 2){ 					////// 		same as the above but for dot 2
					moveDiv1(-Option1[i]*100+399, atx, etx, xas2, -Option1[i]*100+400, i, SnelheidDelay * (i) + 300, -Option1Obj[i]*100+399);
					moveDiv3(-Option3[i]*100+399, ctx, gtx, xas2, -Option3[i]*100+400, i, SnelheidDelay * (i) + 300, -Option3Obj[i]*100+399);
					moveDiv0((i+1)*5+5, -Option0[i]*100+399, SnelheidDelay * (i) + 300, i, -Option0Obj[i]*100+399);

					if (NewOpt[i] === 1 && option2Color === 'red') {
						option2Color='#ff6900';
						changeColor2(option2Color, SnelheidDelay * (i) + 300);
						moveDiv2HighLight(-Option2[i]*100+399, i, btx, ftx, xas2, -Option2[i]*100+400, option2Color, SnelheidDelay * (i) + 300, -Option2Obj[i]*100+399);
						}
					else if (NewOpt[i] === 1 && option2Color === '#ff6900'){
						option2Color='red';
						changeColor2(option2Color, SnelheidDelay * (i) + 300);
						moveDiv2HighLight(-Option2[i]*100+399, i, btx, ftx, xas2, -Option2[i]*100+400, option2Color, SnelheidDelay * (i) + 300, -Option2Obj[i]*100+399);
						}
					else {
						moveDiv2HighLight(-Option2[i]*100+399, i, btx, ftx, xas2, -Option2[i]*100+400, option2Color, SnelheidDelay * (i) + 300, -Option2Obj[i]*100+399);
					};
			}

			else if (HappenedTo[i] === 3){				////// 		same but for dot 3
					moveDiv1(-Option1[i]*100+399, atx, etx, xas2, -Option1[i]*100+400, i, SnelheidDelay * (i) + 300, -Option1Obj[i]*100+399);
					moveDiv2(-Option2[i]*100+399, btx, ftx, xas2, -Option2[i]*100+400, i, SnelheidDelay * (i) + 300, -Option2Obj[i]*100+399);
					moveDiv0((i+1)*5+5, -Option0[i]*100+399, SnelheidDelay * (i) + 300, i, -Option0Obj[i]*100+399);

					if (NewOpt[i] === 1 && option3Color === 'LightSeaGreen') {
						option3Color='Fuchsia';
						changeColor3(option3Color, SnelheidDelay * (i) + 300);
						moveDiv3HighLight(-Option3[i]*100+399, i, ctx, gtx, xas2, -Option3[i]*100+400, option3Color, SnelheidDelay * (i) + 300, -Option3Obj[i]*100+399);
						}
					else if (NewOpt[i] === 1 && option3Color === 'Fuchsia'){
						option3Color='LightSeaGreen';
						changeColor3(option3Color, SnelheidDelay * (i) + 300);
						moveDiv3HighLight(-Option3[i]*100+399, i, ctx, gtx, xas2, -Option3[i]*100+400, option3Color, SnelheidDelay * (i) + 300, -Option3Obj[i]*100+399);
						}
					else {
						moveDiv3HighLight(-Option3[i]*100+399, i, ctx, gtx, xas2, -Option3[i]*100+400, option3Color, SnelheidDelay * (i) + 300, -Option3Obj[i]*100+399);
					};
			};


/////////////////////////////////////////////////////////////////////////////////////////////////
////// 		WINNING OPTION (THE ONE THAT GETS CHOSEN) BLINKS FOR A WHILE AT THE END 	     	//////
///////////////////////////////////////////////////////////////////////////////////////////////

				if (i === Option1.length-1 && Option1[Option1.length-1] > Option2[Option1.length-1] && Option1[Option1.length-1] > Option3[Option1.length-1]){		/////if it is the last timestep and option 1 value is bigger than the others it must be the winner and so showwinner1 gets called:
					showWinner1(((Option1.length-1))*SnelheidDelay+500);
				}
				else if (i === Option1.length-1 && Option2[Option1.length-1] > Option1[Option1.length-1] && Option2[Option1.length-1] > Option3[Option1.length-1]){
					showWinner2(((Option1.length-1))*SnelheidDelay+500);
				}
				else if (i === Option1.length-1 && Option3[Option1.length-1] > Option1[Option1.length-1] && Option3[Option1.length-1] > Option2[Option1.length-1]){
					showWinner3(((Option1.length-1))*SnelheidDelay+500);
				};


///////////////////////////////////////////////////////////////////////////////////////////////////
////// 				INPUT FOR LIVE SHOWING OF SUBJECTIVE AND OBJECTIVE VALUES   		             	//////
/////////////////////////////////////////////////////////////////////////////////////////////////
// EACH LOOP THE VALUES GET UPDATED
				ShowSubj1 (i, option1Color, SnelheidDelay * (i) + 300);
				ShowObj1 (i, option1Color, SnelheidDelay * (i) + 300);
				ShowSubj2 (i, option2Color, SnelheidDelay * (i) + 300);
				ShowObj2 (i, option2Color, SnelheidDelay * (i) + 300);
				ShowSubj3 (i, option3Color, SnelheidDelay * (i) + 300);
				ShowObj3 (i, option3Color, SnelheidDelay * (i) + 300);


///////////////////////////////////////////////////////////////////////////////////////////////////
////// 		INPUT FOR FUNCTIONS THAT COUNT AND SHOW EXPLORES, EXPLOITS AND NEW OPTIONS  	     /////
/////////////////////////////////////////////////////////////////////////////////////////////////
			if (WhatHappened[i] === 4){						//// if there was an explore (4)
				CountExplore++;								//// 1 is added to CountExplore
				ExploreCount (CountExplore, SnelheidDelay * (i) + 300);
				if (NewOpt[i] === 1){						//// if the explore causes a new option to be considered
					CountNewOpt++;
					NewOptCount (CountNewOpt, SnelheidDelay * (i) + 300);
					};
			}
			else {											//// otherwise it was an exploit (in-depth exploration)
				CountExploit++;
				ExploitCount (CountExploit, SnelheidDelay * (i) + 300);
			};
};

///////////////////////////////////////////////
////// 		   	END FORLOOP		 	           /////
/////////////////////////////////////////////

		}; /////////// END setandPlay function ('set and run' button)
});		/////////// END DOCUMENT
