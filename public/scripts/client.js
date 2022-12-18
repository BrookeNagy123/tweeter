/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {
  const loadTweets = function(){
    $.ajax('http://localhost:8080/tweets', { method: 'GET' }) 
      .then(function (tweets) {
        renderTweets(tweets);
      });
    }
    loadTweets();


const renderTweets = function(tweets) {
  $('.tweets-container').empty();
  tweets.forEach(tweet => {
    // calls createTweetElement for each tweet
    const tweetHtml = createTweetElement(tweet);
    $('.tweets-container').prepend(tweetHtml);
  })
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
const createTweetElement = function(tweet) {
const date = timeago.format(tweet.created_at)  
const safeHTML = `${escape(tweet.content.text)}`;
  let $tweet = $(`<article class="new-tweet">
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
 }

$('#tweet').on('submit', function(event){
  event.preventDefault()
  const textarea = document.querySelector("#tweet-text");
  const textareaValue = textarea.value;
  if(textareaValue === undefined || textareaValue === null || textareaValue === ""){
    alert("Form is empty");
    return;
  } else if (textareaValue.length > 140){
    alert("Please use less than 140 characters for your tweet")
    return;
  }
  $.ajax({
    url: 'http://localhost:8080/tweets/',
    type: 'POST',
    data: $('#tweet').serialize()
    })
    .then(response => {
      loadTweets();
    })
});

});




