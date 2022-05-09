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
export const getUserMetaData = async username => {
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
 * @function mergeTweetsWithMetaData
 * @param {string} username - Twitter handle of a user
 * @param {number} maxTweetCount - Number of tweets we want to fetch
 * @returns {Promise} - Once proimse fulfilled, will be oject user meta data and recent tweets
 */
export const mergeTweetsWithMetaData = async (username, maxTweetCount) => {
  const { id, name } = await getUserMetaData(username);

  // could use more research into what fields are available
  // extension could also be to make this more user-determined
  const url = `https://api.twitter.com/2/users/${id}/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=${maxTweetCount}`;

  try {
    const { data: tweets } = await fetch(url, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    }).then(r => r.json());

    return { id, name, tweets };
  } catch (error) {
    console.error(`Error getting user's Tweets: ${error}`);
  }
};
