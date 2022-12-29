//Responsible for loading existing tweets.
$(document).ready(function() {
  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets); 
      });
  };
  loadTweets();

  //Responsible for showing and adding to the tweets container. 
  const renderTweets = function(tweets) {
    $('.tweets-container').empty();
    tweets.forEach(tweet => {
      const tweetHtml = createTweetElement(tweet); //Calls createTweetElement function for each tweet
      $('.tweets-container').prepend(tweetHtml);
    });
  };

  //Responsible for e-encoding text so that unsafe characters are converted into a safe "encoded" representation.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
  const createTweetElement = function(tweet) {
    const date = timeago.format(tweet.created_at); //Use timeago to format date
    const safeHTML = `${escape(tweet.content.text)}`; //Use the escape function for safe characters
    let $tweet = $(`<article class="tweets">
    <header class="tweet-header"> 
      <i class="fa-solid fa-user-tie"></i>
      <div class="user">${tweet.user.name}</div>
     </header>
      <div class="usertag">${tweet.user.handle}</div>
      <div class="old-tweet">${safeHTML}</div>
      <div class="date">${date}</div>
      <div class="icons">
        <i id="flag" class="fa-solid fa-flag"></i>
        <i id="retweet" class="fa-solid fa-retweet"></i>
        <i id="heart" class="fa-solid fa-heart"></i>
      </div>
  </article>`);
    return $tweet;
  };

  //Responsible for form submission of a new tweet and error handling if input is invalid. 
  $('#tweet').on('submit', function(event) {
    $(".error").slideUp("medium");
    $(".errorLength").slideUp("medium");
    event.preventDefault();  //Prevent the page from reloading 
    const textarea = document.querySelector("#tweet-text");
    const textareaValue = textarea.value;
    if (textareaValue === undefined || textareaValue === null || textareaValue === "") { //Error handling 
      $(".error").slideDown("slow");
      return;
    } else if (textareaValue.length > 140) {
      $(".errorLength").slideDown("slow");
      return;
    }
    $.ajax({ //POST request
      url: 'http://localhost:8080/tweets/',
      type: 'POST',
      data: $('#tweet').serialize()
    })
      .then(response => {
        loadTweets();
        this.reset(); //reset input text box 
        $("#tweet").find('.counter').text('140'); //reset counter to 140 
      });
  });
});




