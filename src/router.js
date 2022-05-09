import { Router } from 'express';
import reqLogger from '@notthedom/logging-express';
import getUserTweets from './utils/get_tweets.js';
import filterUserTweets from './utils/filter_tweets.js';
const { log } = console;

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
    console.log('topics:', topics);

    const { display_name, id, tweets } = await getUserTweets(
      username,
      num_results
    );

    const clientResponse = {
      data: {
        username,
        display_name,
        id,
        [topics == null ? 'recent_tweets' : 'filtered_tweets']:
          topics == null ? tweets : filterUserTweets(tweets, topics.split(',')),
      },
    };

    res.json(clientResponse);
  });

export default router;
