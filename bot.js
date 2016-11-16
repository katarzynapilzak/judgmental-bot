console.log("The bot is starting");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

var stream = T.stream('user');

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
  var fs = require('fs');
  var json = JSON.stringify(eventMsg,null,2);
  fs.writeFile("tweet.json", json);

  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var fromuser = eventMsg.user.screen_name;
  var judgements = ["It's true.","It's a lie!"];
  var randomJudgement = judgements[Math.floor((Math.random())*judgements.length)];

  console.log(replyto + ' ' + fromuser);

  if (replyto === 'judgmentalbot') {
  var newreply = "@" + fromuser + ": " + text + " - " + randomJudgement;
  tweetIt(newreply);
  }
}

function tweetIt(txt) {
  var tweet = {
    status:txt
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted (err, data, response) {
    if (err){
      console.log("Something went wrong.");
    }
    else {
      console.log("Praise anchovies!");
    }
  }
}

/*This looks for ponies or love:

var query = ["ponies","love"];
var randomNumber = Math.floor((Math.random())*query.length);

var params = {
   q: query[randomNumber],
   lang: 'en',
   count: 3
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response)
{
  var tweets = data.statuses;
    for (var i=0; i<tweets.length; i++)
    {
      console.log(tweets[i].text)
    };
}; */
