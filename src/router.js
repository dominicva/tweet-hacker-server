import { Router } from 'express';
import reqLogger from '@notthedom/logging-express';
import { getUserMetaData } from './utils/get_tweets.js';
const { log } = console;

const router = Router();

// mounted at /api in index.js
router.route('/tweets/:username?').get(reqLogger, async (req, res) => {
  const { username = 'elonmusk' } = req.params;

  const { id, name: displayName } = await getUserMetaData(username);

  const clientResponse = {
    username,
    displayName,
    id,
  };

  res.json({ data: clientResponse });
});

export default router;
