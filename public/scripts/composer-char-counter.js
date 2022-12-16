$(document).ready(function() {
  let max = 140;
  $("#tweet-text").on("input",function() {
    let length = max - $(this).val().length
    $(this).parent().find('output').text(length)
    color = length < 0 ? 'red' : '#545149';
    $(this).parent().find('output').css({
    'color': color
    });
  });
});

