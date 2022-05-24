/**
 * Filter out an extensive list of tweets to include only those whose text
 * content contains passed-in topics
 *
 * @function
 * @param {object[]} tweets
 * @param {string[]} topics
 * @returns {object[]} topicalTweets - tweets matching request query
 */

const filterBy = (tweets, topics) => {
  // only care about tweet's text here
  const topicalTweets = tweets.filter(({ text }) => {
    // TODO improve text parsing
    const wordsInTweet = text.split(' ');

    for (const word of wordsInTweet) {
      if (topics.includes(word)) return true;
    }

    return false;
  });

  return topicalTweets;
};

export default filterBy;
