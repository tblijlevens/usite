/*
Author & productowner: Teun Blijlevens, Umanise.
Date:
Contact: mail@umanise.nl
*/
$(document).ready(function(){
$(this).scrollTop(0);
  /////////////////////////////////////////////////////////////////////////////
  ///////////////////// DETECT  MOBILE BROWSERS             ///////////////////
  /////////////////////////////////////////////////////////////////////////////
  window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
/*
if (mobilecheck() == true){   // change stylesheet when mobile browser
  $("#stylemain").attr('href', 'stylesheet/stylesheetmainmobile.css');
  $("#styleall").attr('href', 'stylesheet/stylesheetallmobile.css');
}
*/

/////////////////////////////////////////////////////////////////////////////
/////////////////////  DATE FUNCTIONS                     ///////////////////
/////////////////////////////////////////////////////////////////////////////
var birthday = 463096800000; /// mijn geboortedag: 463096800000 (4 september 84)
var myAge = function(birthday){
		var ageDifMs = Date.now() - birthday;
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
	};
	$("#age").html(myAge(birthday));

var AfstudeerDatum = 1252159200000; /// mijn afstudeerdatum: 463096800000 (09/05/2009 16:00:00)
var myGraduation = function(afstudeerdatum){
		var gradDifMs = Date.now() - afstudeerdatum;
		var gradDate = new Date(gradDifMs); // miliseconds from epoch
    return Math.abs(gradDate.getUTCFullYear() - 1970);
	};
  $("#grad").html(myGraduation(AfstudeerDatum));

  /* get date in milliseconds
var date = new Date("09/05/2009 16:00:00");
var milliseconds = date.getTime();
console.log(milliseconds);
*/


/////////////////////////////////////////////////////////////////////////////
///////////////////// SCROLL FUNCTIONS                    ///////////////////
/////////////////////////////////////////////////////////////////////////////
var rectsummarytop;
window.onscroll = function (e) {  		// called when the window is scrolled.
var rectsummary = summary.getBoundingClientRect();
rectsummarytop = rectsummary.top;
if (rectsummarytop < 80){									//// when the summary hits the upper edge of the screen
  $('#header').animate({height: "65px", top: "0px"}, 250);
	$('.menu').animate({"line-height": "65px"}, 250);   //make menu smaller
  if ($('#ulogo').attr("src") != "images/ulogo.png"){
    $('#ulogo').fadeOut(250, function() {
          $('#ulogo').attr("src","images/ulogo.png");
          $('#logo').css({height: "65px"})
          $('#ulogo').fadeIn(750);
      });
  };
  $("#totop").fadeIn(750);
}
else{
  $('#header').stop(true).animate({height: "100px", top: "10px"}, 250);
	$('.menu').stop(true).animate({"line-height": "100px"}, 250);
  if ($('#ulogo').attr("src") == "images/ulogo.png"){
    $('#ulogo').fadeOut(250, function() {
        $('#ulogo').attr("src","images/umaniselogo.png");
        $('#logo').css({height: "100%"})
        $('#ulogo').fadeIn(750);
    });
  };
  $("#totop").fadeOut(750);
};
ga('send', 'event', 'scroll', 'scrolling', 'scrolls');  //google analytics detects scrolling

};    // end scroll float function


/////////////////////////////////////////////////////////////////////////////
/// GIVE COLUMNS IN SUMMARY DIFFERENT CSS ON PORTFOLIO AND HOME PAGE  ///////
/////////////////////////////////////////////////////////////////////////////
if (active_Menu_Item() == "portfolio"){
  $(".col1, .col2").css({width:'100%'})
}
/*
if (active_Menu_Item() == "index"){
  $(".col3").css({width:'100%'})
}
*/

/////////////////////////////////////////////////////////////////////////////
///////////////////// POPUP HOVER MOUSEOVER AND MOUSEOUT  ///////////////////
/////////////////////////////////////////////////////////////////////////////
$("#popup").mouseover(function(){
  $("#popup").css('display', 'inline');

});
$("#popup").mouseout(function(){
  $("#popup").css('display', 'none');

});

///////////////////////////////////////////////////////////////////////////////
// INPAGE LINKS GET AN OFFSET SO THAT THE MENU IS NOT OVERLAPPING THE ANCHOR //
///////////////////////////////////////////////////////////////////////////////
$('a[href^="#"]').click(function() {    // when a anchor link is clicked (href begins with #) -- 'a[href*="#"]' = (contains #)
//if link of unchecked category is clicked, it will be checked and all boxes will appear before scrolling to the anchor:
  var whichCheckbox = $(this).parent().parent().parent().attr('id');
  $('#'+whichCheckbox+'1').prop('checked', true);
  checkboxOnOff(true, whichCheckbox+'1');
// scroll to anchor with topoffset:
    var target = $(this.hash);

    if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
    if (target.length == 0) target = $('html');

    $('html, body').delay(200).animate({ scrollTop: target.offset().top-75 }, 500);
    return false;
});

// when anchor on other page also scroll to anchor with offset:
var targethash = window.location.hash.slice(0, -1); // get the 1 of the end of the hash. 1 needs to be there, in order to start at the top of the page instead of at the anchor itself, causing the menu logo to shift sizes.
if ( targethash != '' ){
  var $targethash = $(targethash);
  $('html, body').animate({scrollTop: 0},  100).delay(600).animate({scrollTop: $targethash.offset().top - 75},  500);
  var target = targethash.substr(1); // take of the '#' for the expand function
  expand(target, 1300); //also expand the box of the clicked anchor
};


$(":checkbox").on("change", function(){  // if a checkbox is clicked
  checkboxOnOff(document.getElementById(this.id).checked, this.id) // call function to hide/display the right boxes
});

/*
$(".userresearch").click(function(){
  $(".box:not(.usre)").css('display', 'none');
});
*/


///////////////////////////////////////////////////////////////////////////////
// AUTOMATICALLY SET BOX HEIGHT BASED ON LIST HEIGHT //
///////////////////////////////////////////////////////////////////////////////
/*
//Trying to automatically set height of contracted boxes depending on length of the list inside (full list in view)

var listheights = $(".portlist").map(function () {   //create array with heights of all 'column' class elements
        return $(this).height();
    }).get();
var listids = $(".portlist").map(function () {   //create array with heights of all 'column' class elements
        return $(this).parent().parent().attr('id');
    }).get();


for (var i=0 ; i<listheights.length ; i++){
  var thisboxheight = $("#"+listids[i]).height() - 30 + listheights[i];
  jQuery("#"+listids[i]).find(".hidden").css({'max-height': thisboxheight +'px', transition: 'max-height 0.15s ease-out', overflow: 'hidden'});
console.log(listids[i] + ": " + listheights[i]);

}

var wholeHeight = $(".portlist")[0].scrollHeight;
*/

});		/////////// END DOCUMENT
