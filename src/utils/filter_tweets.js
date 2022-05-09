/**
 * Filter out an extensive list of tweets to include only those whose text
 * content contains passed-in topics
 *
 * @function
 * @param {Array<object>} tweets
 * @param {Array<string>} topics
 * @returns {Array<object>} topicalTweets - Tweets that match the topics being queried
 */

const filterByTopics = (tweets, topics) => {
  //destructure object to just pull out the text
  const topicalTweets = tweets.filter(({ text }) => {
    const wordsInTweet = text.split(' ');

    for (const word of wordsInTweet) {
      if (topics.includes(word)) return true;
    }
  });

  console.log('topicalTweets:', topicalTweets);

  return topicalTweets;
};

export default filterByTopics;
