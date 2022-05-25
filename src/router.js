import { Router } from 'express';
import { getUser, getMentions, getTweets } from './utils/reads.js';

const router = Router();

// mounted at /api in index.js
// endpoint to get data on a specific user
router.route('/:username/').get(async (req, res) => {
  const { username = 'balajis' } = req.params;
  const { expansions } = req.query;

  const responseData = {};

  responseData.user = await getUser(username);

  try {
    if (expansions.includes('tweets')) {
      responseData.tweets = await getTweets(username);
    }

    if (expansions.includes('mentions')) {
      responseData.mentions = await getMentions(username);
    }
  } catch (error) {
    console.error(error);
  } finally {
    res.json(responseData);
  }
});

export default router;
