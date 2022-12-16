/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function(tweets) {
  // loops through tweets
  data.forEach(tweet => {
    // calls createTweetElement for each tweet
    const tweetHtml = createTweetElement(tweet);
    $('.tweets-container').append(tweetHtml);
  })
}

//Responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
const createTweetElement = function(tweet) {
const date = new Date(tweet.created_at)  
  let $tweet = $(`<article class="new-tweet">
    <header class="tweet-header"> 
      <i class="fa-solid fa-user-tie"></i>
      <div class="user">${tweet.user.name}</div>
     </header>
      <div class="usertag">${tweet.user.handle}</div>
      <div class="old-tweet">${tweet.content.text}</div>
      <div class="date">${date.getDay()} days ago</div>
      <div class="icons">
        <i id="flag" class="fa-solid fa-flag"></i>
        <i id="retweet" class="fa-solid fa-retweet"></i>
        <i id="heart" class="fa-solid fa-heart"></i>
      </div>
  </article>`);
  return $tweet;
 }

renderTweets(data);



// const form = document.getElementById("tweet")
// form.addEventListener("submit", function(event) {
//   //const tweet = document.getElementById("tweet-text");
//   event.preventDefault()
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("POST", 'http://localhost:8080/tweets', true);
//   xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
//   xhttp.send();
// })


