// JQuery used to locate counter and on input will reduce counter from 140. After the user goes past a count of 140 the counter will display red font. 
$(document).ready(function() {
  let max = 140;
  $("#tweet-text").on("input",function() {
    let length = max - $(this).val().length;
    $(this).parent().find('output').text(length);
    color = length < 0 ? 'red' : '#545149';
    $(this).parent().find('output').css({
      'color': color
    });
  });

 //Button to scroll to top. 
  $(window).scroll(function(){
    if($(this).scrollTop() > 200)
    { $("#topBtn").fadeIn();
    $("nav").slideUp("medium");
    } else
    { $("#topBtn").fadeOut();
     $("nav").slideDown("medium");
    }
  });
  
  //When scroll to top button is clicked it will open the tweet form and focus on the tweet text area.
   $("#topBtn").click(function(){
      $('html, body').animate({scrollTop: 0},800);
      $("#tweet").slideDown("medium"); 
      $("#tweet-text").focus();
      return false;           
  });

});

