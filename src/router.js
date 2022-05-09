import { Router } from 'express';
import reqLogger from '@notthedom/logging-express';
import getUserTweets from './utils/get_tweets.js';
import filterUserTweets from './utils/filter_tweets.js';

const router = Router();

// mounted at /api in index.js
router
  .route('/tweets/:username?/:topics?/:num_results?')
  .get(reqLogger, async (req, res) => {
    const {
      username = 'elonmusk',
      topics = null,
      num_results = 10,
    } = req.params;

    const { user, tweets } = await getUserTweets(username, num_results);

    const clientResponse = {
      data: {
        user,
        [topics ? 'filtered_tweets' : 'recent_tweets']: topics
          ? filterUserTweets(tweets, topics.split(','))
          : tweets,
      },
    };

    res.json(clientResponse);
  });

export default router;
