import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const { TWITTER_BEARER_TOKEN: bearerToken } = process.env;

/**
 * Get twitter ID and display name based on a username/handle
 *
 * @async
 * @function getUserMetaData
 * @param {string} username - User's twitter handle
 * @returns {Promise<object | void>} - user's twitter id and display name if fetch successful
 */
const getUserMetaData = async username => {
  try {
    const url = `https://api.twitter.com/2/users/by/username/${username}`;
    const {
      data: { id, name },
    } = await fetch(url, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    }).then(r => r.json());

    return { id, name };
  } catch (error) {
    console.error(`Error getting user's Twitter id: ${error}`);
  }
};

/**
 * Merge user meta data and recent tweets into single object
 *
 * @async
 * @function getUserTweets
 * @param {string} username - Twitter handle of a user
 * @param {number} maxTweetCount - Number of tweets we want to fetch
 * @returns {Promise} - Once proimse fulfilled, will be oject user meta data and recent tweets
 */
const getUserTweets = async (username, maxTweetCount = 10) => {
  const { id, name: display_name } = await getUserMetaData(username);

  const url = `https://api.twitter.com/2/users/${id}/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=${maxTweetCount}`;

  try {
    const { data: recent_tweets } = await fetch(url, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    }).then(r => r.json());

    return { display_name, id, recent_tweets };
  } catch (error) {
    console.error(`Error getting user's Tweets: ${error}`);
  }
};

export default getUserTweets;
