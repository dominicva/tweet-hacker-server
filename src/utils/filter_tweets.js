/**
 * Filter out an extensive list of tweets to include only those whose text
 * content contains passed-in topics
 *
 * @function
 * @param {Array<object>} tweets
 * @param {Array<string>} topics
 * @returns {Array<object>} topicalTweets - Tweets that match the topics being queried
 */

const filterBy = (tweets, topics) => {
  console.log('topics in filter func:', topics);

  // only care about tweet's text here
  const topicalTweets = tweets.filter(({ text }) => {
    const wordsInTweet = text.split(' ');

    for (const word of wordsInTweet) {
      if (topics.includes(word)) return true;
    }
  });

  return topicalTweets;
};

export default filterBy;
