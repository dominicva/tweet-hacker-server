import dotenv from 'dotenv';
import jsFetch from '@notthedom/js-fetch';

dotenv.config();

const { TWITTER_BEARER_TOKEN } = process.env;
const AUTH = {
  headers: {
    authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  },
};
const BASE_URL = 'https://api.twitter.com/2/users';

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
    const url = `${BASE_URL}/by/username/${username}?user.fields=name,username,created_at,id,verified,profile_image_url,location,description,public_metrics`;

    const { data } = await jsFetch(url, AUTH);

    return data;
  } catch (error) {
    console.error(`Error getting user's Twitter id: ${error}`);
    return null;
  }
};

// const getUserMentions = async url => {
//   const mentions = await jsFetch(url, AUTH);
//   console.log('mentions:', mentions);
// };

/**
 * Fetch a user's tweets and merge user data and tweets into single object
 *
 * @async
 * @function getUserTweets
 * @param {string} username - Twitter handle of a user
 * @returns {Promise<object>}
 */
const getUserTweets = async username => {
  try {
    const user = await getUserData(username);

    const tweetsUrl = `${BASE_URL}/${user.id}/tweets?tweet.fields=id,created_at,attachments,text,entities,author_id,public_metrics,possibly_sensitive`;
    const { data: tweets } = await jsFetch(tweetsUrl, AUTH);

    const mentionsUrl = `${BASE_URL}/${user.id}/mentions?expansions=author_id`;
    const { data: mentions } = await jsFetch(mentionsUrl, AUTH);

    return { user, tweets, mentions };
  } catch (error) {
    console.error(`Error getting user's Tweets: ${error}`);
    return null;
  }
};

export default getUserTweets;
