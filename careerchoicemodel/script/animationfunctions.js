/*
Author & productowner: Teun Blijlevens, Umanise.
Date: January 9th 2017
(Re-)Use of this code is only allowed if written permission is given by the productowner.
Contact: mail@umanise.nl
*/

///////////////////////////////////////////////////////////////////////////////////////////////
////// 				GLOBAL VARIABELEN VOOR TELLEN, DELAY EN KLEURVERANDERINGEN			//////
/////////////////////////////////////////////////////////////////////////////////////////////


var CountExplore = 0;
var CountExploit = 0;
var CountNewOpt = 0;

var SnelheidDelay = 700;		//prompt("Please enter a speed between 20 (fast) and 2000 (slow)", 300);
var SnelheidDelay2 = 700;

var xas2 = 5						// xas voor invullen grafiek
var xas = 5;	// xas vanaf ingevulde timestep voor tweede forloop die live toont


var option1Color = 'green';
var option2Color = 'red';
var option3Color = 'LightSeaGreen';

var ChoiceMadeVar = "no";

var warning = 0;
var warningtext = "";
var hovertext = "";
var hovertitle = "";

var multiplier = 1;

///////////////////////////////////////////////////////////////////////////////
////// 					On mousedown button	 												//////
/////////////////////////////////////////////////////////////////////////////
/* if you want this on again also change div setParButton in index.html to: <div id='setParButton' onmousedown="mouseDown()" onmouseup="mouseUp()">
function mouseDown() {
    $('#setParButton').animate({width:'145px', height:'28px', left: '+=2.5px', top: '+=1px'}, 50);
		$('.image').css('height', '19px');
}

function mouseUp() {
    $('#setParButton').animate({width:'150px', height:'30px', left: '-=2.5px', top: '-=1px'}, 50);
		$('.image').css('height', '20px');
}
*/
///////////////////////////////////////////////////////////////////////////////
////// 				SET THRESHOLDS LINES ON GRAPH                    	       	//////
/////////////////////////////////////////////////////////////////////////////
function setThreshOnCanvas(){
$('#Thresh1Text').html(Thresh1 + '&emsp;Consideration (<i><b>&#952;1</b></i>)');
$('#Thresh1Line').css('top', (400*multiplier)-Thresh1*(100*multiplier) + 'px');

$('#Thresh2Text').html(Thresh2 + '&emsp;Decision (<i><b>&#952;2</b></i>)');
$('#Thresh2Line').css('top', (400*multiplier)-Thresh2*(100*multiplier) + 'px');
};
setThreshOnCanvas();


///////////////////////////////////////////////////////////////////////////////////////////////////////
////// 					SUBJECTIEVE EN OBJECTIEVE WAARDEN WORDEN LIVE GETOOND RECHTS NAAST GRAFIEK        ////
//////          EN IN TABEL ONDERAAN				                                                     ////
////////////////////////////////////////////////////////////////////////////////////////////////////

	function ShowSubj1(i, color, delay){
	    setTimeout(function(){
        if (Option1[i]<Thresh1){
          color = "grey";
        };
				$('#option1subj').css('color', color);				//// de subjectieve waarde van optie 1 rechts naast grafiek krijgt de juiste kleur bij elke timestep
				$('#legeruimteonderaan').css('top', (i+1)*52+160 + 'px');	////dit onzichtbare divje moved naar onder, zodat er altijd wat ruimte onder de tabel is (soort margin)

			if (Option1[i] === -100){								// nepwaarden worden rechts naast de grafiek niet getoond en in de tabel getoond als streepje
				$('#subj1waardenwaarden').append("-<br><br><hr>");
			}
			else if (Option1[i]>Thresh2-0.25){					//// ALS DE SUBJECTIEVE WAARDE DICHTBIJ KEUZEDREMPEL KOMT WORDT DE WAARDE SCHUIN en extra sterretjes in tabel
				$('#subj1waardenwaarden').append("<font color=" + color + ">-* " + Option1[i].toFixed(2) + " *-</font><br><br><hr>");
			    $('#option1subj').html(Option1[i].toFixed(2));		//// DE SUBJECTIEVE WAARDE VAN OPTIE 1 RECHTS NAAST GRAFIEK KRIJGT DE JUISTE WAARDE BIJ ELKE TIMESTEP
			}
			else {
				 $('#subj1waardenwaarden').append("<font color=" + color + ">" + Option1[i].toFixed(2) + "</font><br><br><hr>"); //// DE SUBJECTIEVE WAARDE VAN OPTIE 1 WORDT ELKE TIMESTEP IN DE TABEL TOEGEVOEGD IN DE JUISTE KLEUR
			    $('#option1subj').html(Option1[i].toFixed(2));		//// DE SUBJECTIEVE WAARDE VAN OPTIE 1 RECHTS NAAST GRAFIEK KRIJGT DE JUISTE WAARDE BIJ ELKE TIMESTEP
			};
			if (Option1[i]>Thresh2-0.25 || Option2[i]>Thresh2-0.25 || Option3[i]>Thresh2-0.25){		// als een subjectieve waarde dichtbij thresh2 komt krijgt de timestep andere opmaak
				$('#timesteps2waarden').append("-* " + (i+1) + " *-<br><br><hr>");	//// DE TIMESTEPS IN DE TABEL ONDERAAN TELLEN MEE
			}
			else {
				$('#timesteps2waarden').append(i+1 + "<br><br><hr>");
			};

		}, delay);
	};

	function ShowObj1(i, color, delay){
	    setTimeout(function(){
        if (Option1[i]<Thresh1){
          color = "grey";
        };
				$('#option1obj').css('color', color);

			if (Option1Obj[i] === -100){
				$('#obj1waardenwaarden').append("-<br><br><hr>");
			}
			else if (Option1[i]>Thresh2-0.25){
				$('#obj1waardenwaarden').append("<font color=" + color + ">-* " + Option1Obj[i].toFixed(2) + " *-</font><br><br><hr>");
			    $('#option1obj').html(Option1Obj[i].toFixed(2));
			}
			else {
				 $('#obj1waardenwaarden').append("<font color=" + color + ">" + Option1Obj[i].toFixed(2) + "</font><br><br><hr>");
			    $('#option1obj').html(Option1Obj[i].toFixed(2));
			};

		}, delay);
	};

	function ShowSubj2(i, color, delay){
	    setTimeout(function(){
        if (Option2[i]<Thresh1){
          color = "grey";
        };
				$('#option2subj').css('color', color);

			if (Option2[i] === -100){							// maar als de waarde -100 is, wordt er niets getoond (pas als er een echte waarde is moet het getoond worden)
				$('#subj2waardenwaarden').append("-<br><br><hr>");	// in de tabel moet wel een streepje komen als er geen waarde is
			}
			else if (Option2[i]>Thresh2-0.25){
				$('#subj2waardenwaarden').append("<font color=" + color + ">-* " + Option2[i].toFixed(2) + " *-</font><br><br><hr>");
			    $('#option2subj').html(Option2[i].toFixed(2));
			}
			else {
				 $('#subj2waardenwaarden').append("<font color=" + color + ">" + Option2[i].toFixed(2) + "</font><br><br><hr>");
			    $('#option2subj').html(Option2[i].toFixed(2));
			};
		}, delay);
	};

	function ShowObj2(i, color, delay){
	    setTimeout(function(){
        if (Option2[i]<Thresh1){
          color = "grey";
        };
				$('#option2obj').css('color', color);

			if (Option2Obj[i] === -100){
				$('#obj2waardenwaarden').append("-<br><br><hr>");
			}
			else if (Option2[i]>Thresh2-0.25){
				$('#obj2waardenwaarden').append("<font color=" + color + ">-* " + Option2Obj[i].toFixed(2) + " *-</font><br><br><hr>");
			    $('#option2obj').html(Option2Obj[i].toFixed(2));
			}
			else {
				 $('#obj2waardenwaarden').append("<font color=" + color + ">" + Option2Obj[i].toFixed(2) + "</font><br><br><hr>");
			    $('#option2obj').html(Option2Obj[i].toFixed(2));
			};
		}, delay);
	};

	function ShowSubj3(i, color, delay){
	    setTimeout(function(){
        if (Option3[i]<Thresh1){
          color = "grey";
        };

			$('#option3subj').css('color', color);

			if (Option3[i] === -100){
				$('#subj3waardenwaarden').append("-<br><br><hr>");
			}
			else if (Option3[i]>Thresh2-0.25){
				$('#subj3waardenwaarden').append("<font color=" + color + ">-* " + Option3[i].toFixed(2) + " *-</font><br><br><hr>");
				$('#option3subj').html(Option3[i].toFixed(2));
			}
			else {
				$('#subj3waardenwaarden').append("<font color=" + color + ">" + Option3[i].toFixed(2) + "</font><br><br><hr>");
				$('#option3subj').html(Option3[i].toFixed(2));
			};
		}, delay);
	};

	function ShowObj3(i, color, delay){
	    setTimeout(function(){
        if (Option3[i]<Thresh1){
          color = "grey";
        };

			$('#option3obj').css('color', color);

			if (Option3Obj[i] === -100){
				$('#obj3waardenwaarden').append("-<br><br><hr>");
			}
			else if (Option3[i]>Thresh2-0.25){
				$('#obj3waardenwaarden').append("<font color=" + color + ">-* " + Option3Obj[i].toFixed(2) + " *-</font><br><br><hr>");
			$('#option3obj').html(Option3Obj[i].toFixed(2));
			}
			else {
				 $('#obj3waardenwaarden').append("<font color=" + color + ">" + Option3Obj[i].toFixed(2) + "</font><br><br><hr>");
			$('#option3obj').html(Option3Obj[i].toFixed(2));
			};
		}, delay);
	};


///////////////////////////////////////////////////////////////////////////////////////////////////////
////// 		DE SUBJECTIEVE EN OBJECTIEVE WAARDEN EN DE STIP VAN DE WINNAAR KNIPPEREN 3 KEER 	    //////
/////////////////////////////////////////////////////////////////////////////////////////////////////

		function showWinner1 (delay){						//// DEZE FUNCTIE HEEFT 1 WAARDE ALS INPUT, NAMELIJK DE DELAY DIE BINNEN DE FORLOOP ALS INPUT WERD AANGEMAAKT
		setTimeout(function(){
      //only winners auras must show:

//      $('#option1').css('opacity', "1");
			$('#option1').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);		////  DE OPTIE 1 STIP VERGROOT EN VERKLEIND (KNIPPERT) 3 KEER
			$('#option1').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option1').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option1').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option1').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option1').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
		//	$('#op1waarde').css('opacity', "0");
			$('#option1obj').animate({fontSize: '18px'}, 300);											//// DE OBJECTIEVE WAARDE VAN OPTIE 1 KNIPPERT 3 KEER
			$('#option1obj').animate({fontSize: '14px'}, 300);
			$('#option1obj').animate({fontSize: '18px'}, 300);
			$('#option1obj').animate({fontSize: '14px'}, 300);
			$('#option1obj').animate({fontSize: '18px'}, 300);
			$('#option1obj').animate({fontSize: '14px'}, 300);
      $('#option1obj').animate({fontSize: '18px'}, 300);
      $('#option1obj').css('font-weight', "bold");
			$('#option1subj').animate({fontSize: '18px'}, 300);											//// DE SUBJECTIEVE WAARDE VAN OPTIE 1 KNIPPERT 3 KEER
			$('#option1subj').animate({fontSize: '14px'}, 300);
			$('#option1subj').animate({fontSize: '18px'}, 300);
			$('#option1subj').animate({fontSize: '14px'}, 300);
			$('#option1subj').animate({fontSize: '18px'}, 300);
			$('#option1subj').animate({fontSize: '14px'}, 300);
      $('#option1subj').animate({fontSize: '18px'}, 300);
      $('#option1subj').css('font-weight', "bold");
		}, delay);
	};

	function showWinner2 (delay){
		setTimeout(function(){


//      $('#option2').css('opacity', "1");
			$('#option2').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option2').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option2').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option2').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option2').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option2').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option2obj').animate({fontSize: '18px'}, 300);
			$('#option2obj').animate({fontSize: '14px'}, 300);
			$('#option2obj').animate({fontSize: '18px'}, 300);
			$('#option2obj').animate({fontSize: '14px'}, 300);
			$('#option2obj').animate({fontSize: '18px'}, 300);
			$('#option2obj').animate({fontSize: '14px'}, 300);
      $('#option2obj').animate({fontSize: '18px'}, 300);
      $('#option2obj').css('font-weight', "bold");
			$('#option2subj').animate({fontSize: '18px'}, 300);
			$('#option2subj').animate({fontSize: '14px'}, 300);
			$('#option2subj').animate({fontSize: '18px'}, 300);
			$('#option2subj').animate({fontSize: '14px'}, 300);
			$('#option2subj').animate({fontSize: '18px'}, 300);
			$('#option2subj').animate({fontSize: '14px'}, 300);
      $('#option2subj').animate({fontSize: '18px'}, 300);
      $('#option2subj').css('font-weight', "bold");

		}, delay);
	};

	function showWinner3 (delay){
		setTimeout(function(){


//      $('#option3').css('opacity', "1");
			$('#option3').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option3').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option3').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option3').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option3').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 300);
			$('#option3').animate({width:'5px', height:'5px', left: '+=5px', top: '+=5px'}, 300);
			$('#option3obj').animate({fontSize: '18px'}, 300);
			$('#option3obj').animate({fontSize: '14px'}, 300);
			$('#option3obj').animate({fontSize: '18px'}, 300);
			$('#option3obj').animate({fontSize: '14px'}, 300);
			$('#option3obj').animate({fontSize: '18px'}, 300);
			$('#option3obj').animate({fontSize: '14px'}, 300);
      $('#option3obj').animate({fontSize: '18px'}, 300);
      $('#option3obj').css('font-weight', "bold");
			$('#option3subj').animate({fontSize: '18px'}, 300);
			$('#option3subj').animate({fontSize: '14px'}, 300);
			$('#option3subj').animate({fontSize: '18px'}, 300);
			$('#option3subj').animate({fontSize: '14px'}, 300);
			$('#option3subj').animate({fontSize: '18px'}, 300);
			$('#option3subj').animate({fontSize: '14px'}, 300);
      $('#option3subj').animate({fontSize: '18px'}, 300);
      $('#option3subj').css('font-weight', "bold");
		}, delay+500);
	};


///////////////////////////////////////////////////////////////////
////// 		TIMESTEPS WORDEN LIVE GETELD EN IN HMTL GEZET    	//////
/////////////////////////////////////////////////////////////////

function CountTimesteps(i, totaltimesteps, delay){					//// DEZE FUNCTIE WERD BINNEN DE FORLOOP, ELKE LOOP GECALLED. DE FUNCTIE KRIJGT DRIE WAARDES INPUT (DIE BINNEN DE FORLOOP ZIJN GEMAAKT IN DIE VOLGORDE). HIER KRIJGEN DIE 3 WAARDES NAMEN DIE VERDEROP BINNEN DE FUNCTIE GECALLED WORDEN.
	    setTimeout(function(){		// een settimeout functie zorgt ervoor dat de functie pas wordt uitgevoerd na de aangegeven delay (in de laatste regel).
			     $('#steps').html('Timesteps: ' + i);			//// de div met id: steps krijgt nieuwe text.
				 CountSteps=i;
		}, delay);								//// DE DELAY IS ELKE LOOP SnelheidDelay*i+SnelheidDelay (DUS ELKE LOOP WAS DEZE WAARDE ANDERS). AANGEZIEN ELKE ANIMATIE 'SnelheidDelay' MS DUURT (STIP VERPLAATST 1 STUKJE IN SnelheidDelay MS, zie animatie functies), ZORGT DIT ERVOOR DAT DE OUDE TIMESTEP WAARDE OP HET JUISTE MOMENT VERANDERD NAAR DE NIEUWE TIMESTEP WAARDE. ELKE SnelheidDelay MS VERSCHIJNT EEN NIEUWE WAARDE (ZONDER DEZE DELAY ZOU DIRECT ALLE WAARDES VERANDERD ZIJN, EN ZIE JE INSTANTLY VANAF HET BEGIN DE LAATSTE WAARDE).
};


///////////////////////////////////////////////////////////////////////////////////
////// 			EXPLORES NEW OPTIONS EN EXPLOITS COUNTS GAAN LIVE	 		//////
/////////////////////////////////////////////////////////////////////////////////

	function ExploreCount(CountExplore, delay){					//// DEZE FUNCTIE WERD BINNEN DE FORLOOP, ELKE KEER GECALLED WANNEER ER SPRAKE WAS VAN EEN EXPLORE. 2 INPUTS: DE NIEUWE WAARDE VAN EXPLORES EN DE DELAY (NA HOEVEEL TIJD DIE NIEUWE WAARDE GETOOND MOET WORDEN)
	    setTimeout(function(){
			     $('#countexplore').html(CountExplore);
		}, delay);
};

	function NewOptCount(CountNewOpt, delay){					//// DEZE FUNCTIE WERD BINNEN DE FORLOOP, ELKE KEER GECALLED WANNEER ER SPRAKE WAS VAN EEN EXPLORE ÉN EEN NIEUWE OPTIE.
	    setTimeout(function(){
			     $('#countnewopt').html(CountNewOpt);
		}, delay);
};

	function ExploitCount(CountExploit, delay){					//// DEZE FUNCTIE WERD BINNEN DE FORLOOP, ELKE KEER GECALLED WANNEER ER SPRAKE WAS VAN EEN EXPLOIT
	    setTimeout(function(){
			     $('#countexploit').html(CountExploit);
		}, delay);
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// 		ANIMATIES: DIVS VERPLAATSEN EN VERKLEUREN EN LIJNEN WORDEN OP HET CANVAS GETEKEND            /////
//////    EN VERKLEUREN  EN ERVARINGEN WORDEN WEERGEGEVEN IN GRAPH EN TABEL	                          /////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////
////// OPTION 1 //////
//////////////////////

function moveDiv1HighLight(y, i, atx, etx, xas, yas, color, delay, yobj){			// wanneer er iets met optie 1 gebeurt (happenedto=1, waarde van optie 1 veranderd) knippert de div terwijl hij verplaatst. de functie heeft 7 inputwaardes die binnen de forloop gecreëerd zijn (nieuwe waardes elke keer dat daar deze functie gecalled werd). Die waardes krijgen hier namen, zodat ze verderop in de functie gecalled kunnen worden.
	    setTimeout(function(){
				$('#option1').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 0);		//// stip wordt groter
				$('#option1').animate({left: (xas-4)*multiplier, top:y*multiplier}, 0.5*SnelheidDelay);							//// stip verplaatst naar nieuwe positie in halve delay tijd (zodat er elke timestep gesynct kan worden)
				$('#option1').animate({width:'5px', height:'5px', left: '+=2.5px'}, 0);						//// stip wordt weer kleiner


        if (Option1[i]<Thresh1){                    //And the option is below T1
          color="grey"                      // colors of dot and experiences and values will change
        };

				$('#ervaringen').css("color", color);										//// ervaringen krijgen de juiste kleur

				if (NewOpt[i]==1){										// If it is a new option

            atx.beginPath();									// a new line starts with a dot
  					atx.strokeStyle=color;								// in the right color
  					atx.lineTo(xas, yas);
  					atx.lineTo(xas-1, yas);
  					atx.lineTo(xas-1, yas-1);
  					atx.lineTo(xas+1, yas-1);
  					atx.lineTo(xas+1, yas+1);
  					atx.lineTo(xas-1, yas+1);
  					atx.lineTo(xas-1, yas);
  					atx.lineTo(xas, yas);
  					atx.stroke();                       // the line is unbroken

  // show lines of objective fits if option is above T1
            if (Option1[i]>=Thresh1){

              etx.beginPath();
              etx.strokeStyle=color;
              etx.lineTo(xas, yobj);
    					etx.lineTo(xas-1, yobj);
    					etx.lineTo(xas-1, yobj-1);
    					etx.lineTo(xas+1, yobj-1);
    					etx.lineTo(xas+1, yobj+1);
    					etx.lineTo(xas-1, yobj+1);
    					etx.lineTo(xas-1, yobj);
    					etx.lineTo(xas, yobj);
              etx.stroke();
          };

  					$('#ervaringen').show(0);							// als er een nieuwe optie is wordt er een ervaringsquote gegeven
  					if (y<(400*multiplier)-Thresh2*(100*multiplier) && i == Option1.length-1){								// als de subjectieve waarde boven de choice threshold zit EN het is de laatste timestep:
  						ChoiceMade(color);									// wordt de choice quote weergegeven
  					}
  					else if (y<(400*multiplier)-Thresh1*(100*multiplier) && ChoiceMadeVar =="no"){								// als de subjectieve waarde boven good option thresh zit
  						NewOptQuoteNice(color);							// is het een positieve eerste indruk, function wordt gecalled
  					}
  					else{												// als de subjectieve waarde onder good option thresh zit
  						NewOptQuoteNot(color);							// is het een negatieve eerste indruk
  					};

				}   // einde 'if newopt==1'


				else {													// als er geen nieuwe optie is gekomen
					atx.lineTo(xas, yas);								// wordt de 'oude' lijn gewoon doorgetrokken naar deze coordinaten (geen nieuw beginpunt, geen nieuwe kleur)

          if (i == Option1.length-1){   // if it is the last timestep, end the line with a dot
            atx.lineTo(xas, yas);
  					atx.lineTo(xas-1, yas);
  					atx.lineTo(xas-1, yas-1);
  					atx.lineTo(xas+1, yas-1);
  					atx.lineTo(xas+1, yas+1);
  					atx.lineTo(xas-1, yas+1);
  					atx.lineTo(xas-1, yas);
  					atx.lineTo(xas, yas);

            etx.lineTo(xas, yobj);
  					etx.lineTo(xas-1, yobj);
  					etx.lineTo(xas-1, yobj-1);
  					etx.lineTo(xas+1, yobj-1);
  					etx.lineTo(xas+1, yobj+1);
  					etx.lineTo(xas-1, yobj+1);
  					etx.lineTo(xas-1, yobj);
  					etx.lineTo(xas, yobj);
            etx.stroke();
          }
          atx.stroke();										// het is weer een gewone lijn

            etx.lineTo(xas, yobj);
            etx.stroke();

					if (y<(400*multiplier)-Thresh2*(100*multiplier) && i == Option1.length-1){								// if the perceived fit is higher than Decision threshold AND it is the last timestep (winner!)
						$('#ervaringen').show(0);
						ChoiceMade(color);					// wordt de choice quote weergegeven
					}
					else if (Option1[i]<Option1[i-1]){								// als het geen nieuwe optie is, dan moet het een exploit zijn. als de exploit waarde minder is dan de vorige waarde
							$('#ervaringen').show(0);
							randomQuoteNegative(color);							// laat een negatieve ervaring zien. Hier wordt een functie gecalled waar een negatieve ervaring wordt weergegeven uit een array met 12 ervaringen
							$('#ervaringen').delay(SnelheidDelay).hide(0);
						};
						if (Option1[i]>Option1[i-1] && ChoiceMadeVar =="no"){								// als de exploit waarde hoger is dan de vorige waarde EN onder choice thresh zit
							$('#ervaringen').show(0);
							randomQuotePositive(color);							// laat een positieve ervaring zien. Hier wordt een functie gecalled waar een positieve ervaring wordt weergegeven uit een array met 10 ervaringen
							$('#ervaringen').delay(SnelheidDelay).hide(0);
						};
					};

// als de stip onder de canvas staat, maak hem dan onzichtbaar (geen zichtbare stippen buiten de grafiek). Als de animatie heel snel gaat En het is niet de laatste timestep, laat dan geen divjes zien, want die gaan trager dan de lijntjes
			if (SnelheidDelay<50 || Option1[i]<Thresh1){
				$('#option1').css('opacity', "0");
			}
			else {
				$('#option1').css('opacity', "1");
			};
		}, delay);														// na de juiste delay wordt al het bovenstaande pas uitgevoerd
};    // einde moveDiv1HighLight functie

function moveDiv1(y, atx, etx, xas, yas, i, delay, yobj){								// optie 1 verplaatst gewoon zonder highlighting en de lijn tekent door aan bestaande lijn in dezelfde kleur
	    setTimeout(function(){

			$('#option1').animate({left: (xas-4)*multiplier, top:y*multiplier}, 0.5*SnelheidDelay);

      if (Option1[i]>=Thresh1){       // if option is above T1 the line continues as a line to the right location
        atx.lineTo(xas, yas);

        if (i == Option1.length-1){       // if it is the last timestep the P and O lines end in a dot
          atx.lineTo(xas, yas);
          atx.lineTo(xas-1, yas);
          atx.lineTo(xas-1, yas-1);
          atx.lineTo(xas+1, yas-1);
          atx.lineTo(xas+1, yas+1);
          atx.lineTo(xas-1, yas+1);
          atx.lineTo(xas-1, yas);
          atx.lineTo(xas, yas);

            etx.lineTo(xas, yobj);
            etx.lineTo(xas-1, yobj);
            etx.lineTo(xas-1, yobj-1);
            etx.lineTo(xas+1, yobj-1);
            etx.lineTo(xas+1, yobj+1);
            etx.lineTo(xas-1, yobj+1);
            etx.lineTo(xas-1, yobj);
            etx.lineTo(xas, yobj);
            etx.stroke();
        };
        atx.stroke();

            etx.lineTo(xas, yobj);
            etx.stroke();

      };          // end of if condition y>=Thresh1

////    if option is below T1 or the speed is on 4, option1 dv will not be shown.
			if (SnelheidDelay<50 || Option1[i]<Thresh1){
				$('#option1').css('opacity', "0");
			}
			else  {
				$('#option1').css('opacity', "1");
			};
		}, delay);
};    // einde moveDiv1 function

function changeColor1(color, delay){									// de div verandert van kleur elke keer dat die gecalled wordt binnen de forloop
	    setTimeout(function(){
			     $('#option1').css('background-color', color);
		}, delay);														// uiteraard veranderd het pas na de juiste delay die elke call opnieuw werd ingesteld
};



//////////////////////
////// OPTION 2 //////
//////////////////////

function moveDiv2HighLight(y, i, btx, ftx, xas, yas, color, delay, yobj){
	    setTimeout(function(){

				$('#option2').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 0);
				$('#option2').animate({left: (xas-4)*multiplier, top:y*multiplier}, 0.5*SnelheidDelay);
				$('#option2').animate({width:'5px', height:'5px', left: '+=5px'}, 0);

        if (Option2[i]<Thresh1){
          color = "grey";
        };
				$('#ervaringen').css("color", color);
				if (NewOpt[i]==1){
					btx.beginPath();
					btx.strokeStyle=color;
			    btx.moveTo(xas, yas);
					btx.lineTo(xas-1, yas);
					btx.lineTo(xas-1, yas-1);
					btx.lineTo(xas+1, yas-1);
					btx.lineTo(xas+1, yas+1);
					btx.lineTo(xas-1, yas+1);
					btx.lineTo(xas-1, yas);
					btx.lineTo(xas, yas);
					btx.stroke();

          if (Option2[i]>=Thresh1){

            ftx.beginPath();
            ftx.strokeStyle=color;
            ftx.lineTo(xas, yobj);
  					ftx.lineTo(xas-1, yobj);
  					ftx.lineTo(xas-1, yobj-1);
  					ftx.lineTo(xas+1, yobj-1);
  					ftx.lineTo(xas+1, yobj+1);
  					ftx.lineTo(xas-1, yobj+1);
  					ftx.lineTo(xas-1, yobj);
  					ftx.lineTo(xas, yobj);
            ftx.stroke();
        };

					$('#ervaringen').show(0);
					if (y<(400*multiplier)-Thresh2*(100*multiplier) && i == Option1.length-1){
						ChoiceMade(color);
					}
					else if (y<(400*multiplier)-Thresh1*(100*multiplier) && ChoiceMadeVar =="no"){
						NewOptQuoteNice(color);
					}
					else{
						NewOptQuoteNot(color);
					};
				}
				else {
          btx.lineTo(xas, yas);

          if (i == Option1.length-1){   // if it is the last timestep, end the line with a dot
            btx.lineTo(xas, yas);
  					btx.lineTo(xas-1, yas);
  					btx.lineTo(xas-1, yas-1);
  					btx.lineTo(xas+1, yas-1);
  					btx.lineTo(xas+1, yas+1);
  					btx.lineTo(xas-1, yas+1);
  					btx.lineTo(xas-1, yas);
  					btx.lineTo(xas, yas);

            ftx.lineTo(xas, yobj);
  					ftx.lineTo(xas-1, yobj);
  					ftx.lineTo(xas-1, yobj-1);
  					ftx.lineTo(xas+1, yobj-1);
  					ftx.lineTo(xas+1, yobj+1);
  					ftx.lineTo(xas-1, yobj+1);
  					ftx.lineTo(xas-1, yobj);
  					ftx.lineTo(xas, yobj);
            ftx.stroke();
          }
          btx.stroke();										// het is weer een gewone lijn

            ftx.lineTo(xas, yobj);
            ftx.stroke();

					if (y<(400*multiplier)-Thresh2*(100*multiplier) && i == Option1.length-1){
						$('#ervaringen').show(0);
						ChoiceMade(color);
					}
					else if (Option2[i]<Option2[i-1]){
							$('#ervaringen').show(0);
							randomQuoteNegative(color);
							$('#ervaringen').delay(SnelheidDelay).hide(0);
						};
						if (Option2[i]>Option2[i-1] && ChoiceMadeVar =="no"){
							$('#ervaringen').show(0);
							randomQuotePositive(color);
							$('#ervaringen').delay(SnelheidDelay).hide(0);
						};

					};

			if (SnelheidDelay<50 || Option2[i]<Thresh1){
				$('#option2').css('opacity', "0");
			}
			else {
				$('#option2').css('opacity', "1");
			};
		}, delay);
};

function moveDiv2(y, btx, ftx, xas, yas, i, delay, yobj){
	    setTimeout(function(){
				$('#option2').animate({left: (xas-4)*multiplier, top:y*multiplier}, 0.5*SnelheidDelay);

        if (Option2[i]>=Thresh1){
          btx.lineTo(xas, yas);

          if (i == Option1.length-1){
            btx.lineTo(xas, yas);
            btx.lineTo(xas-1, yas);
            btx.lineTo(xas-1, yas-1);
            btx.lineTo(xas+1, yas-1);
            btx.lineTo(xas+1, yas+1);
            btx.lineTo(xas-1, yas+1);
            btx.lineTo(xas-1, yas);
            btx.lineTo(xas, yas);

              ftx.lineTo(xas, yobj);
              ftx.lineTo(xas-1, yobj);
              ftx.lineTo(xas-1, yobj-1);
              ftx.lineTo(xas+1, yobj-1);
              ftx.lineTo(xas+1, yobj+1);
              ftx.lineTo(xas-1, yobj+1);
              ftx.lineTo(xas-1, yobj);
              ftx.lineTo(xas, yobj);
              ftx.stroke();
          }
          btx.stroke();
              ftx.lineTo(xas, yobj);
              ftx.stroke();
          };
			if (SnelheidDelay<50 || Option2[i]<Thresh1){
				$('#option2').css('opacity', "0");
			}
			else {
				$('#option2').css('opacity', "1");
			};

		}, delay);
};

function changeColor2(color, delay){
	    setTimeout(function(){
			     $('#option2').css('background-color', color);
		}, delay);
};


//////////////////////
////// OPTION 3 //////
//////////////////////

function moveDiv3HighLight(y, i, ctx, gtx, xas, yas, color, delay, yobj){
	    setTimeout(function(){
				$('#option3').animate({width:'15px', height:'15px', left: '-=5px', top: '-=5px'}, 0);
				$('#option3').animate({left: (xas-4)*multiplier, top:y*multiplier}, 0.5*SnelheidDelay);
				$('#option3').animate({width:'5px', height:'5px', left: '+=2.5px'}, 0);

        if (Option3[i]<Thresh1){
          color = "grey";
        };
				$('#ervaringen').css("color", color);
				if (NewOpt[i]==1){
					ctx.beginPath();
					ctx.strokeStyle=color;
			        ctx.moveTo(xas, yas);
					ctx.lineTo(xas-1, yas);
					ctx.lineTo(xas-1, yas-1);
					ctx.lineTo(xas+1, yas-1);
					ctx.lineTo(xas+1, yas+1);
					ctx.lineTo(xas-1, yas+1);
					ctx.lineTo(xas-1, yas);
					ctx.lineTo(xas, yas);
					ctx.stroke();

          if (Option3[i]>=Thresh1){

            gtx.beginPath();
            gtx.strokeStyle=color;
            gtx.lineTo(xas, yobj);
  					gtx.lineTo(xas-1, yobj);
  					gtx.lineTo(xas-1, yobj-1);
  					gtx.lineTo(xas+1, yobj-1);
  					gtx.lineTo(xas+1, yobj+1);
  					gtx.lineTo(xas-1, yobj+1);
  					gtx.lineTo(xas-1, yobj);
  					gtx.lineTo(xas, yobj);
            gtx.stroke();
        };

					$('#ervaringen').show(0);
					if (y<(400*multiplier)-Thresh2*(100*multiplier) && i == Option1.length-1){
						ChoiceMade(color);
					}
					else if (y<(400*multiplier)-Thresh1*(100*multiplier) && ChoiceMadeVar =="no"){
						NewOptQuoteNice(color);
					}
					else{
						NewOptQuoteNot(color);
					};
				}
				else {
          ctx.lineTo(xas, yas);

          if (i == Option1.length-1){
            ctx.lineTo(xas, yas);
  					ctx.lineTo(xas-1, yas);
  					ctx.lineTo(xas-1, yas-1);
  					ctx.lineTo(xas+1, yas-1);
  					ctx.lineTo(xas+1, yas+1);
  					ctx.lineTo(xas-1, yas+1);
  					ctx.lineTo(xas-1, yas);
  					ctx.lineTo(xas, yas);

            gtx.lineTo(xas, yobj);
  					gtx.lineTo(xas-1, yobj);
  					gtx.lineTo(xas-1, yobj-1);
  					gtx.lineTo(xas+1, yobj-1);
  					gtx.lineTo(xas+1, yobj+1);
  					gtx.lineTo(xas-1, yobj+1);
  					gtx.lineTo(xas-1, yobj);
  					gtx.lineTo(xas, yobj);
            gtx.stroke();
          }
          ctx.stroke();										// het is weer een gewone lijn

          gtx.lineTo(xas, yobj);
          gtx.stroke();

					if (y<(400*multiplier)-Thresh2*(100*multiplier) && i == Option1.length-1){
						$('#ervaringen').show(0);
						ChoiceMade(color);
					}
					else if (Option3[i]<Option3[i-1]){
							$('#ervaringen').show(0);
							randomQuoteNegative(color);
							$('#ervaringen').delay(SnelheidDelay).hide(0);
						};
						if (Option3[i]>Option3[i-1] && ChoiceMadeVar =="no"){
							$('#ervaringen').show(0);
							randomQuotePositive(color);
							$('#ervaringen').delay(SnelheidDelay).hide(0);
						};
					};

			if (SnelheidDelay<50 || Option3[i]<Thresh1){
				$('#option3').css('opacity', "0");
			}
			else {
				$('#option3').css('opacity', "1");
			};
		}, delay);
};

function moveDiv3(y, ctx, gtx, xas, yas, i, delay, yobj){
	    setTimeout(function(){
				$('#option3').animate({left: (xas-4)*multiplier, top:y*multiplier}, 0.5*SnelheidDelay);

        if (Option3[i]>=Thresh1){
          ctx.lineTo(xas, yas);

          if (i == Option1.length-1){
            ctx.lineTo(xas, yas);
            ctx.lineTo(xas-1, yas);
            ctx.lineTo(xas-1, yas-1);
            ctx.lineTo(xas+1, yas-1);
            ctx.lineTo(xas+1, yas+1);
            ctx.lineTo(xas-1, yas+1);
            ctx.lineTo(xas-1, yas);
            ctx.lineTo(xas, yas);

            gtx.lineTo(xas, yobj);
            gtx.lineTo(xas-1, yobj);
            gtx.lineTo(xas-1, yobj-1);
            gtx.lineTo(xas+1, yobj-1);
            gtx.lineTo(xas+1, yobj+1);
            gtx.lineTo(xas-1, yobj+1);
            gtx.lineTo(xas-1, yobj);
            gtx.lineTo(xas, yobj);
            gtx.stroke();
          }
          ctx.stroke();
            gtx.lineTo(xas, yobj);
            gtx.stroke();
        };

			if (SnelheidDelay<50 || Option3[i]<Thresh1){
				$('#option3').css('opacity', "0");
			}
			else {
				$('#option3').css('opacity', "1");
			};
		}, delay);
};

function changeColor3(color, delay){
	    setTimeout(function(){
			     $('#option3').css('background-color', color);
		}, delay);
};



//////////////////////
////// OPTION 0 //////
//////////////////////

function moveDiv0HighLight(x, y, i, dtx, xas, delay, yobj){										// option 0 wordt alleen getoond en knippert even wanneer er onsuccesvol is ge-exploreerd (wanneer option 0 een nieuwe waarde krijgt)
	    setTimeout(function(){
				$('#option0').animate({width:'10px', height:'10px', left: '-=5px', top: '-=5px'}, 0);		// option 0 heeft begingrootte van 0 px waardoor je hem niet ziet. hier wordt hij vergroot
				$('#option0').animate({left: (xas-4)*multiplier, top:-Option0[i]*100*multiplier+(399*multiplier)}, 0);							// hij beweegt naar rechts
				$('#option0').animate({width:'0px', height:'0px', left: '+=2.5px'}, 0.5*SnelheidDelay );					// hij verkleint weer tot onzichtbaar



					dtx.beginPath();
					dtx.strokeStyle="grey";
          dtx.moveTo(xas, y);
          dtx.lineTo(xas, y);
          dtx.lineTo(xas-1, y);
          dtx.lineTo(xas-1, y-1);
          dtx.lineTo(xas+1, y-1);
          dtx.lineTo(xas+1, y+1);
          dtx.lineTo(xas-1, y+1);
          dtx.lineTo(xas-1, y);
          dtx.lineTo(xas, y);
					dtx.stroke();

				$('#ervaringen').show(0);
				$('#ervaringen').css("color", "grey");
				ExploreFail("grey");

			if (SnelheidDelay<50 || y<600){
        $('#option0').css('opacity', "0");
			}
			else {
				$('#option0').css('opacity', "1");
			}
		}, delay);
};

function moveDiv0(x, y, delay, i, yobj){													// ookal is hij onzichtbaar, hij moet wel meebewegen met de andere divs
	    setTimeout(function(){
				$('#option0').animate({left: (xas-4)*multiplier, top:-Option0[i]*100*multiplier+(399*multiplier)}, 0.5*SnelheidDelay);

			if (SnelheidDelay<50 || y<600){
        $('#option0').css('opacity', "0");
			}
			else {
				$('#option0').css('opacity', "1");
			};
		}, delay);
};


///////////////////////////////////////////////////////////////////////////////
////// 		ERVARINGEN WORDEN GETOOND IN GRAPH EN IN TABEL LIVE			       /////
/////////////////////////////////////////////////////////////////////////////

function randomQuoteNegative(color) {
var randomnumber = Math.floor((Math.random() * NegativeArray.length));
if (SnelheidDelay > 1500){      // ervaringen worden alleen in de grafiek getoont als die langzaam getekent wordt
$('#ervaringen').html(NegativeArray[randomnumber]);
};
$('#ervaringenTabelWaarden').append('<font color="' + color + '">' + NegativeArray[randomnumber] + '</font><br><hr>');          // eravringen komen sowieso in de tabel te staan
}
function randomQuotePositive(color) {
var randomnumber = Math.floor((Math.random() * PositiveArray.length));
if (SnelheidDelay > 1500){
$('#ervaringen').html(PositiveArray[randomnumber]);
};
$('#ervaringenTabelWaarden').append('<font color="' + color + '">' + PositiveArray[randomnumber] + '</font><br><hr>');
}
function NewOptQuoteNice(color) {
if (SnelheidDelay > 1500){
$('#ervaringen').html(NewOptionQuote + "<br> " + NewOptionNice);
};
$('#ervaringenTabelWaarden').append('<font color="' + color + '">' + NewOptionQuote + " " + NewOptionNice + '</font><br><hr>');
}
function NewOptQuoteNot(color) {
if (SnelheidDelay > 1500){
$('#ervaringen').html(NewOptionQuote + "<br> " + NewOptionNot);
};
$('#ervaringenTabelWaarden').append('<font color="' + color + '">' + NewOptionQuote + " " + NewOptionNot + '</font><br><hr>');
}
function ChoiceMade(color) {
if (SnelheidDelay > 1500){
$('#ervaringen').html(Choice);
};
$('#ervaringenTabelWaarden').append('<font color="' + color + '">' + Choice  + '</font><br><hr>');
ChoiceMadeVar = "yes";
}

function ExploreFail(color) {
var randomnumber = Math.floor((Math.random() * ExploreFailQuote.length));
if (SnelheidDelay > 1500){
$('#ervaringen').html(ExploreFailQuote[randomnumber]);
};
$('#ervaringenTabelWaarden').append('<font color="' + color + '">' + ExploreFailQuote[randomnumber]  + '</font><br><hr>');
}
