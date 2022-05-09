import { Router } from 'express';
import reqLogger from '@notthedom/logging-express';
import getUserTweets from './utils/get_tweets.js';
const { log } = console;

const router = Router();

// mounted at /api in index.js
router
  .route('/tweets/:username?/:num_tweets?')
  .get(reqLogger, async (req, res) => {
    const { username = 'elonmusk', num_tweets } = req.params;

    const { display_name, id, recent_tweets } = await getUserTweets(
      username,
      num_tweets
    );

    const clientResponse = {
      data: {
        username,
        display_name,
        id,
        recent_tweets,
      },
    };

    res.json(clientResponse);
  });

export default router;
