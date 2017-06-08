/*
Author & productowner: Teun Blijlevens, Umanise.
Date:
Contact: mail@umanise.nl
*/


/////////////////////////////////////////////////////////////////////////////
/////////////////////       SET MENU MARKER               ///////////////////
/////////////////////////////////////////////////////////////////////////////

var active_Menu_Item = function() {   // get the name of the page from the url
  var active_Menu_Item = window.location.href.split("/");   // split the url with '/', splitting domainname form page
  active_Menu_Item = active_Menu_Item[active_Menu_Item.length-1]; //get the last item of the array (pagename plus extention)
  active_Menu_Item = active_Menu_Item.split(".");   // split with'.' splitting name from extention'
  active_Menu_Item = active_Menu_Item[0]; // get the name
  return active_Menu_Item;
};
window.onload = function() {

  $("#"+active_Menu_Item()).css({'text-decoration': 'underline',   'background-image': "url('images/achter-light.svg')"}); //detect page and underline that div (menu div has same name as page name)
// of  'background-color': 'rgba(0, 0, 153, 0.15)' //<-- transparent blue
// of   achter-dark.svg
};


/////////////////////////////////////////////////////////////////////////////
/////////////////////      FILTER FUNCTIONS (CHECKBOXES)         ////////////
/////////////////////////////////////////////////////////////////////////////
function checkboxOnOff (offoron, divid){
    if (offoron == true) { // checkbox is checked
      $("."+divid).css('display', 'inline-block');  // show all the right boxes
    }
    else {    // checkbox is unchecked
      $("."+divid).css('display', 'none');  // get rid of all right boxes
    }
};



/////////////////////////////////////////////////////////////////////////////
/////////////////////       EXPAND BOXES                  ///////////////////
/////////////////////////////////////////////////////////////////////////////
function expand(whatWasClicked, sum){
  if (active_Menu_Item()=="diensten"){

    if (sum==500 || sum == 1000 || sum == 1300){ // if the div was clicked in the summary or other page wait untill scolled to anchor until expanding
        $("#"+whatWasClicked).find(".hidden").delay(sum).queue(function (next) {
            $(this).css({'max-height': '800px', transition: 'max-height 1s ease-in'});
            //smoothly resize image only if box is contracted
            if ($("#"+whatWasClicked).find(".hidden").css('max-height') == '140px'){   //if box is contracted
              ga('send', 'event', 'expand', 'expandclicked', whatWasClicked);

                var elementWidth = $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").width()*1.5; // multiply image width by 1.5
                var elementHeight = $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").height()*1.5;
                $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").animate({width: elementWidth, height: elementHeight}, 500); //resize picture with new values
              }
            next();
          });
        $("#"+whatWasClicked).find('.leesmeer').html("&#9195; Lees minder &#9195;");   //change text


    }
    else {  //if the leesmeer was clicked at the box itself expand immediately
      if ($("#"+whatWasClicked).find(".hidden").css('max-height') == '140px'){   //if box is contracted
        ga('send', 'event', 'expand', 'expandclicked', whatWasClicked);

        $("#"+whatWasClicked).find(".hidden").css({'max-height': '800px', transition: 'max-height 1s ease-in'}); //expand smoothly
        $("#"+whatWasClicked).find('.leesmeer').html("&#9195; Lees minder &#9195;");   //change text

    //smoothly resize image
        var elementWidth = $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").width()*1.5; // multiply image width by 1.5
        var elementHeight = $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").height()*1.5;
        $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").animate({width: elementWidth, height: elementHeight}, 500); //resize picture with new values
      }
    else {  // if box is expanded do the opposite
      $("#"+whatWasClicked).find(".hidden").css({'max-height': '140px', transition: 'max-height 0.4s ease-out', overflow: 'hidden'});
      $("#"+whatWasClicked).find('.leesmeer').html("&#9196; Lees meer &#9196;");

      elementWidth = $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").width()/1.5;
      elementHeight = $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").height()/1.5;
      $("#"+whatWasClicked).find("#"+active_Menu_Item()+"img").animate({width: elementWidth, height: elementHeight}, 300);
    }

    }

}  //END diensten expand actions

if (active_Menu_Item()=="portfolio"){

  if (sum==500 || sum == 1000 || sum == 1300){ // if the div was clicked in the summary or other page wait untill scolled to anchor until expanding
      $("#"+whatWasClicked).find(".hidden2").delay(sum).queue(function (next) {
          $(this).css({'max-height': '2200px', transition: 'max-height 1s ease-in'});
          //smoothly resize image only if box is contracted
          if ($("#"+whatWasClicked).find(".hidden2").css('max-height') == '240px'){   //if box is contracted
            ga('send', 'event', 'expand', 'expandclicked', whatWasClicked);
            }
          next();
        });
      $("#"+whatWasClicked).find('.leesmeer').html("&#9195; Lees minder &#9195;");   //change text


  }
  else {  //if the leesmeer was clicked at the box itself expand immediately
  if ($("#"+whatWasClicked).find(".hidden2").css('max-height') == '240px'){   //if box is contracted
    ga('send', 'event', 'expand', 'expandclicked', whatWasClicked);

    $("#"+whatWasClicked).find(".hidden2").css({'max-height': '2200px', transition: 'max-height 1s ease-in'}); //expand smoothly
    $("#"+whatWasClicked).find('.leesmeer').html('&#9195; Lees minder &#9195');   //change text
//    $("#"+whatWasClicked).find('.leesmeer').html("<span onclick='smoothAnchor("+whatWasClicked+")'>&#9195; Lees minder &#9195;</span>");   //change text
  }
else {  // if box is expanded do the opposite
  $("#"+whatWasClicked).find(".hidden2").css({'max-height': '240px', transition: 'max-height 0.7s ease-out', overflow: 'hidden'});
  $("#"+whatWasClicked).find('.leesmeer').html("&#9196; Lees meer &#9196;");

}
}
} //END portfolio expand actions

if (active_Menu_Item()!="diensten" && active_Menu_Item()!="portfolio"){

  if ($("#"+whatWasClicked).find(".hidden2").css('max-height') == '240px'){   //if box is contracted
    ga('send', 'event', 'expand', 'expandclicked', whatWasClicked);

    $("#"+whatWasClicked).find(".hidden2").css({'max-height': '1200px', transition: 'max-height 1s ease-in'}); //expand smoothly
    $("#"+whatWasClicked).find('.leesmeer').html('&#9195; Lees minder &#9195');   //change text
//    $("#"+whatWasClicked).find('.leesmeer').html("<span onclick='smoothAnchor("+whatWasClicked+")'>&#9195; Lees minder &#9195;</span>");   //change text
  }
else {  // if box is expanded do the opposite
  $("#"+whatWasClicked).find(".hidden2").css({'max-height': '240px', transition: 'max-height 0.7s ease-out', overflow: 'hidden'});
  $("#"+whatWasClicked).find('.leesmeer').html("&#9196; Lees meer &#9196;");

}
} //END index expand actions

};


///////////////////////////////////////////////////////////////////////////////
// LEES MINDER LINKS GET INPAGE LINK WITH SMOOTH SCROLL TO anchor         /////
///////////////////////////////////////////////////////////////////////////////
function smoothAnchor(div) {    // when a anchor link is clicked (href contains #)
//if link of unchecked category is clicked, it will be checked and all boxes will appear before scrolling to the anchor:
//var divid = $(div).attr('id');
    $('html, body').animate({ scrollTop: $("#"+div).offset().top-75 }, 500);
    return false;
};

/////////////////////////////////////////////////////////////////////////////
/////////////////////       POPUP ON HOVER                  /////////////////
/////////////////////////////////////////////////////////////////////////////
// this function makes the popup appear at the mousecursor
function hoverdiv(e, text){
    var left  = e.clientX-2  + "px";  //get cursor position with offset -2 to get popup just under the cursor
    var top  = e.clientY-2  + "px";
    var div = document.getElementById('popup');
    div.style.left = left;  //move popup tot right position
    div.style.top = top;
    div.style.display = 'inline';

    $("#popup").html(text);
//    $("#popup").css('display', 'inline');

    return false;
}
function hoverdivout(){
    $("#popup").css('display', 'none');
    return false;
}
