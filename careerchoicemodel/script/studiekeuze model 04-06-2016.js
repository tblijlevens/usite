/*
Author & productowner: Teun Blijlevens, Umanise.
Date: January 9th 2017
(Re-)Use of this code is only allowed if written permission is given by the productowner. Original career choice simulation model was written in C++ by Dr. M.A.E. van der Gaag and Dr. P. van den Berg. For web and animation purposes it was translated into this javascript file by T. Blijlevens.
Contact: mail@umanise.nl
*/

///GLOBAL VARIABLES////

// variable parameters
var Thresh1 = 1;
var Thresh2 = 2;
var noise = 0.5;
var probsample = 0.5;

// fixed parameters
var recency = 0.5;
var chancetocheck = 0.5;
var timelimit = 100;
var consider_size = 3;
var chosen = -1;

// the object 'consider' stores the values of all the options
var consider = {
  opt1: {obj: -100, subj: -100, eval: 0},
  opt2: {obj: -100, subj: -100, eval: 0},
  opt3: {obj: -100, subj: -100, eval: 0},
  opt0: {obj: -100, subj: -100},
  thisopt: {obj: -100, subj: -100}
};



// general explanation for animation. For the animation values gets pushed to arrays. Arrays in javascript are lists of values. For example: var option1 = [1,1,1,2,3,4,4,3];
// The animation will loop through the arays to see each timestep what the values of the different options were. The added code for animation purposes do not have any effect on how the model works.

///////////////////////////////
///     EXPLORE FUNCTION    ///
///////////////////////////////

function explore(){

WhatHappened.push(4);  // For animation: this array keeps track every timestep whether was explored (4) or exploited (-1)

// een random objectieve waarde plus zijn subjectieve waarde worden getokken en in thisopt gezet
consider.thisopt.obj = Gaussian();
consider.thisopt.subj = consider.thisopt.obj + Gaussian()*noise;

//option in consider object with the lowest subjective value is located and stored in minsubj
var minsubj = 1;              ///minsubj begint als 1 (in eerste loop verwijzend naar opt1)
for(var i=2; i<4; ++i) { // loopt door alle options in consider (excl opt0 and thisopt)
    if(consider["opt" +i]["subj"] < consider["opt" + minsubj]["subj"]){     // als option i kleiner is dan option minsubj
        minsubj = i;        // minsubj verwijst nu naar de opt die het kleinst is
    };
}

//the obj subj and eval of the lowest option are replaced with the values of thisopt (if thisopt is higher) in the consider object:
if(consider["opt" + minsubj]["subj"]<consider.thisopt.subj){
  consider["opt" + minsubj]["subj"] = consider.thisopt.subj;
  consider["opt" + minsubj]["obj"] = consider.thisopt.obj;
  consider["opt" + minsubj]["eval"] = 1;

//for the animation values need to be stored in the arrays for each timestep:
  NewOpt.push(1); //in this timestep there was a new option
  HappenedTo.push(minsubj); //the new option was optionx where x=minsubj
  Option1Obj.push(consider.opt1.obj);
  Option1.push(consider.opt1.subj);
  Option2.push(consider.opt2.subj);
  Option2Obj.push(consider.opt2.obj);
  Option3.push(consider.opt3.subj);
  Option3Obj.push(consider.opt3.obj);
  Option0.push(consider.opt0.subj);
  Option0Obj.push(consider.opt0.obj);
}
else{   //thisopt (explored) is smaller than one of the options, so it gets stored in the consider object in opt0 (discarded: explore fail)
  consider.opt0.obj = consider.thisopt.obj;
  consider.opt0.subj = consider.thisopt.subj;
  Option0Obj.push(consider.opt0.obj);
  Option0.push(consider.opt0.subj);
  Option1.push(consider.opt1.subj);
  Option1Obj.push(consider.opt1.obj);
  Option2.push(consider.opt2.subj);
  Option2Obj.push(consider.opt2.obj);
  Option3.push(consider.opt3.subj);
  Option3Obj.push(consider.opt3.obj);
  NewOpt.push(0); //in this timestep there was no new option
  HappenedTo.push(0); //optie 0 is altijd degene die niet in consider opgenomen wordt, direct gediscard, explore fail
};

if(consider["opt" + minsubj]["subj"]>Thresh2){
  return minsubj;
}
else{
  return -1;
};
};    // end explore function


///////////////////////////////
///     EXPLOIT FUNCTION    ///
///////////////////////////////

function exploit(chosen){
WhatHappened.push(-1);  // For animation: this array keeps track every timestep whether was explored (4) or exploited (-1)
NewOpt.push(0);     //There is never a new option when exploiting

var pick; // the option that will be chosen to exploit will be stored in this variable

if(chosen === -1){        // when there is no option about to be chosen
        pick = Math.floor((Math.random() * 3) + 1); //random number between 1 and 3
        while (consider["opt" + pick].subj < Thresh1){   //an option only gets chosen if it's a good option (thresh>1), so here it randomly picks one of the options that is above thresh 1
            pick = Math.floor((Math.random() * 3) + 1);
            }
    }

else {        //if a choice is about to be made for an option (i.e. option is above t2), exploit that option
        pick = chosen;      // chosen got passed into the exploit function earlier as an argument
    };

// de optie die gekozen is krijgt nieuwe subjectieve waarde
var thissubj = consider["opt" + pick].obj + Gaussian()*noise;
consider["opt" + pick].subj = ((consider["opt" + pick].subj * consider["opt" + pick].eval) * recency + thissubj)/(consider["opt" + pick].eval * recency + 1);
consider["opt" + pick].eval += 1;

//nieuwe waarden moeten in de arrays voor de animatie
HappenedTo.push(pick); //de nieuwe optie was optie x waarbij x=pick
Option1.push(consider.opt1.subj);
Option1Obj.push(consider.opt1.obj);
Option2.push(consider.opt2.subj);
Option2Obj.push(consider.opt2.obj);
Option3.push(consider.opt3.subj);
Option3Obj.push(consider.opt3.obj);
Option0Obj.push(consider.opt0.obj);
Option0.push(consider.opt0.subj);


//if the newly exploited option has a higher subjective value than thresh 2, this function eventually returns the chosen option:
if(consider["opt" + pick].subj > Thresh2)  {
          chosen = pick;      //chosen gets returned at the end of the function, now containing the number of the option > thresh 2.
      }

return chosen;

};      /// end exploit function




////////////////////////////////////////
//       FOR LOOP: EACH TIMESTEP      //
////////////////////////////////////////

function runModel(){  // deze functie wordt in een ander bestand aangeroepen, zodra de gebruiker de 'set and run' knop indrukt.

//voordat de loop begint moet alles weer op -100 gezet worden (om in de animatie mogelijk te maken het model te runnen zonder de hele page te refreshen)
  consider = {
    opt1: {obj: -100, subj: -100, eval: 0},
    opt2: {obj: -100, subj: -100, eval: 0},
    opt3: {obj: -100, subj: -100, eval: 0},
    opt0: {obj: -100, subj: -100},
    thisopt: {obj: -100, subj: -100}
  };

for(var i = 0; i < timelimit; ++i){

// each timestep these variables will be reset
var goodoption = 0;
var choicemade=0;

//for every option, check whether it crosses t1 or t2, if so assign state: good option found, or choice about to be made
for(var j = 1; j<consider_size+1; j++){
    if(consider["opt" + j]["subj"] > Thresh1){
        goodoption = 1;
    };
    if(consider["opt" + j]["subj"] > Thresh2){
        choicemade = 1;
    };
};

// if there is no choicemade this if-sequence decides if there will be explored or exploited:
if(choicemade === 0){                     //if no option is above thresh 2
    if(goodoption === 0){                 //and if there is also no option above thresh 1, must explore:
        chosen = explore();
    }
    else {                                //if there is an option above thresh 1 (but no choice made),
        if(Math.random()<probsample) {    //explore if a randomly drawn number is lower than parameter 'probsample'
            chosen = explore();
        }
        else {                            //otherwise exploit
            chosen = exploit(chosen);
        };
    };
}

// if there is an option above thresh2 (choicemade=1) this if-sequence decides if the student will check again (exploit), or really choose the option:

if (choicemade === 1){
    if (Math.random()<chancetocheck){  //exploit if a randomly drawn number is lower than parameter 'chancetocheck'
        chosen = exploit(chosen);
    }

    else{                              //if the chosen option is not exploited again, this is the choice, loop ends
        i=timelimit;
    };
};


}   // einde main for loop

// to double check if the model runs correctly this is outputted to the console. You can check it in your browser in the console log each time you run the model.
console.log("1: " + Option1 + "\n" +
            "1obj: " + Option1Obj + "\n" +
            "2: " + Option2 + "\n" +
            "3: " + Option3 + "\n" +
            "0: " + Option0 + "\n" +
            "0obj: " + Option0Obj + "\n" +
            "what happened: " + WhatHappened + "\n" +
            "happened to o: " + HappenedTo + "\n" +
            "was new optio: " + NewOpt + "\n" +
            "timesteps: " + Option1.length)

}; //einde runModel function
