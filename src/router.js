import { Router } from 'express';
import reqLogger from '@notthedom/logging-express';
import getUserTweets from './utils/get_tweets.js';
import filterUserTweets from './utils/filter_tweets.js';

const router = Router();

// mounted at /api in index.js
router
  .route('/tweets/:username?/:topics?/:numResults?')
  .get(reqLogger, async (req, res) => {
    const { username = 'balajis', topics = null, numResults = 10 } = req.params;

    const { user, tweets } = await getUserTweets(username, numResults);

    const clientResponse = {
      data: {
        user,
        tweets: topics ? filterUserTweets(tweets, topics.split(',')) : tweets,
      },
    };

    res.json(clientResponse);
  });

export default router;
