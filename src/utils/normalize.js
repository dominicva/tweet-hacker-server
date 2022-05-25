export const normalizeAnnotations = annotations =>
  annotations instanceof Array &&
  annotations.map(({ type, normalized_text }) => ({
    type,
    normalized_text,
  }));

export const normalizeMentions = mentions =>
  mentions instanceof Array &&
  mentions.map(({ id, username }) => ({ id, username }));

export const normalizeTweets = tweets =>
  tweets.map(
    ({
      author_id,
      created_at,
      text,
      entities,
      public_metrics: { retweet_count, like_count, reply_count, quote_count },
      id: tweet_id,
    } = {}) => ({
      author_id,
      tweet_id,
      created_at,
      text,
      retweet_count,
      like_count,
      reply_count,
      quote_count,
      entities,
    })
  );
