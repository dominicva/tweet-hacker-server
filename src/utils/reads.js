import dotenv from 'dotenv';
import jsFetch from '@notthedom/js-fetch';
import { normalizeTweets } from './normalize.js';

dotenv.config();

const { TWITTER_BEARER_TOKEN } = process.env;
const AUTH = {
  headers: {
    authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  },
};
const BASE_URL = 'https://api.twitter.com/2/users';

export const getUser = async username => {
  try {
    const url = `${BASE_URL}/by/username/${username}?user.fields=created_at,public_metrics,description,profile_image_url`;

    const {
      data,
      data: {
        public_metrics: { tweet_count, following_count, followers_count },
      },
    } = await jsFetch(url, AUTH);
    // want to remove this piece of nesting
    delete data.public_metrics;

    return { ...data, tweet_count, followers_count, following_count };
  } catch (error) {
    console.error(`Error getting @${username}'s Twitter id: ${error}`);
  }
};

// ENDPOINT https://api.twitter.com/2/users/:id/mentions
export const getMentions = async username => {
  const { id } = await getUser(username);

  const url = `${BASE_URL}/${id}/mentions?expansions=author_id,attachments.media_keys&media.fields=type,url,public_metrics`;
  const { data: mentions } = await jsFetch(url, AUTH);
  return mentions;
};

export const getTweets = async username => {
  try {
    const user = await getUser(username);

    const tweetsUrl = `${BASE_URL}/${user.id}/tweets?tweet.fields=id,created_at,attachments,text,entities,author_id,public_metrics,possibly_sensitive`;

    const { data: tweets } = await jsFetch(tweetsUrl, AUTH);
    const result = normalizeTweets(tweets);
    return result;
  } catch (error) {
    console.error(
      `getting @${username}'s Tweets. Was that the correct username? :: ${error}`
    );
  }
};

// export const getTweets = async username => {
//   try {
//     const user = await getUser(username);
//     console.log('user:', user);

//     const tweetsUrl = `${BASE_URL}/${user.id}/tweets?tweet.fields=id,created_at,attachments,text,entities,author_id,public_metrics,possibly_sensitive`;

//     const { data: tweets } = await jsFetch(tweetsUrl, AUTH);
//     const result = normalizeTweets(tweets);
//     return result;
//   } catch (error) {
//     console.error(
//       `getting @${username}'s Tweets. Was that the correct username? :: ${error}`
//     );
//   }
// };

/**
 * Get twitter ID and display name based on a username/handle
 *
 * @async
 * @function getUserData
 * @param {string} username - User's twitter handle
 * @returns {Promise<object>} - user's twitter id and display name
 */
// const getUserData = async username => {
//   try {
//     const url = `${BASE_URL}/by/username/${username}?user.fields=name,username,created_at,id,verified,profile_image_url,location,description,public_metrics`;

//     const { data } = await jsFetch(url, AUTH);

//     return data;
//   } catch (error) {
//     console.error(`Error getting user's Twitter id: ${error}`);
//     return null;
//   }
// };

// /**
//  * Fetch a user's tweets and merge user data and tweets into single object
//  *
//  * @async
//  * @function getUserTweets
//  * @param {string} username - Twitter handle of a user
//  * @returns {Promise<object>}
//  */
// const getUserTweets = async username => {
//   try {
//     const user = await getUserData(username);

//     const tweetsUrl = `${BASE_URL}/${user.id}/tweets?tweet.fields=id,created_at,attachments,text,entities,author_id,public_metrics,possibly_sensitive`;
//     const mentionsUrl = `${BASE_URL}/${user.id}/mentions?expansions=author_id`;

//     const { data: tweets } = await jsFetch(tweetsUrl, AUTH);
//     const { data: mentions } = await jsFetch(mentionsUrl, AUTH);

//     // declutter the returned mentions object
//     const mentionsText = mentions.map(({ author_id, text }) => ({
//       author_id,
//       text,
//     }));

//     return { user, tweets, mentions: mentionsText };
//   } catch (error) {
//     console.error(`Error getting user's Tweets: ${error}`);
//     return null;
//   }
// };

// export default getUserTweets;
