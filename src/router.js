import { Router } from 'express';
const { log } = console;

const router = Router();

// mounted at /api in index.js
router.route('/tweets/:username').get((req, res) => {
  const { username } = req.params;

  const clientResponse = {
    username,
  };

  res.json({ data: clientResponse });
});

export default router;
