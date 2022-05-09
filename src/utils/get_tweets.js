import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const { TWITTER_BEARER_TOKEN: bearerToken } = process.env;

/**
 * Get twitter ID and display name based on a username/handle
 *
 * @async
 * @function getMetaData
 * @param {string} username - User's twitter handle
 * @returns {Promise<object>} - user's twitter id and display name
 */
const getMetaData = async username => {
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
 * Fetch a user's tweets and merge user data and tweets into single object
 *
 * @async
 * @function getUserTweets
 * @param {string} username - Twitter handle of a user
 * @param {number} maxTweetCount - Number of tweets we want to fetch
 * @returns {Promise<object>}
 */
const getUserTweets = async (username, maxTweetCount = 10) => {
  const { id, name } = await getMetaData(username);

  const url = `https://api.twitter.com/2/users/${id}/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=${maxTweetCount}`;

  try {
    const { data: tweets } = await fetch(url, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    }).then(r => r.json());

    return { user: { name, handle: `@${username}`, id }, tweets };
  } catch (error) {
    console.error(`Error getting user's Tweets: ${error}`);
  }
};

export default getUserTweets;
