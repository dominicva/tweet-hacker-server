import { Router } from 'express';
import getUserTweets from './utils/get_tweets.js';

const router = Router();

// mounted at /api in index.js
router.route('/tweets/:username').get(async (req, res) => {
  const { username = 'balajis' } = req.params;

  const responseData = await getUserTweets(username, numResults);

  res.json(responseData);
});

export default router;
