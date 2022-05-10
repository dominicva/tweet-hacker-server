import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const { TWITTER_BEARER_TOKEN } = process.env;

const auth = {
  headers: {
    authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  },
};

/**
 * Get twitter ID and display name based on a username/handle
 *
 * @async
 * @function getUserData
 * @param {string} username - User's twitter handle
 * @returns {Promise<object>} - user's twitter id and display name
 */
const getUserData = async username => {
  try {
    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=name,username,id,verified,profile_image_url,location,description,public_metrics`;

    const { data } = await fetch(url, auth).then(r => r.json());

    return data;
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
const getUserTweets = async username => {
  const user = await getUserData(username);

  const url = `https://api.twitter.com/2/users/${user.id}/tweets?tweet.fields=id,created_at,text,author_id,public_metrics`;

  try {
    const { data: tweets } = await fetch(url, auth).then(r => r.json());

    return { user, tweets };
  } catch (error) {
    console.error(`Error getting user's Tweets: ${error}`);
  }
};

export default getUserTweets;
