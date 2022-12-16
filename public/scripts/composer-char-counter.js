$(document).ready(function() {
  let max = 140;
  $("#tweet-text").on("input",function() {
    let length = max - $(this).val().length
    $(".counter").text(length)

    color = length < 0 ? 'red' : '#545149';
    $('.counter').css({
    'color': color
  });

  });
});