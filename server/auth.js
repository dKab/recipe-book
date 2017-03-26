import Router from "koa-router";
import { query } from "./db";
import SQL from "sql-template-strings";

export const router = new Router();
router.get("/handle_twitter_callback", async ctx => {
  const {
    "raw[screen_name]": userName,
    "raw[user_id]": twitterUserId,
    access_token: accessToken,
    access_secret: accessSecret
  } = ctx.query;
  try {
    // Find app user associated with this twitter user.
    var result = await query(
      SQL`SELECT 
  "Users".id, 
  "oauth".id as oauthrow_id
FROM 
  oauth_providers, 
  oauth, 
  "Users"
WHERE 
  oauth_providers.id = oauth.provider AND
  oauth.user_id = "Users".id AND
  oauth_providers.name = 'twitter' AND 
  oauth.provider_internal_id = ${twitterUserId};`
    );
  } catch (queryError) {
    // TODO do something here  - log it at least once logging module is added
    ctx.body = "Internal server error" + queryError;
    throw new Error(queryError);
  }
  if (result.rows.length > 0) {
    // Refresh access_token and secret for this user as it is
    // regenerated on every login by twitter.
    const selectedData = result.rows.shift();
    const user = { id: selectedData.id, name: userName };
    try {
      await query(
        SQL`UPDATE oauth
            SET provider_access_token=${accessToken}, 
                provider_access_secret=${accessSecret}
          WHERE id = ${selectedData.oauthrow_id};`
      );
    } catch (err) {
      ctx.body = "Internal server error" + err;
      // TODO do something here  - log it at least once logging module is added
      throw new Error(err);
    }
    ctx.session.user = user;
    ctx.body = user;
  } else {
    // If we don't know this twitter user we shall create new user.
    try {
      result = await query(
        SQL`WITH user_rows AS (
          INSERT INTO "Users"
              (name)
          VALUES
              (${userName})
          RETURNING *
      ),
      provider_id AS (
	select id FROM
	oauth_providers
	WHERE name = 'twitter'
      ),
      oauth_user as (
      INSERT INTO oauth (user_id, 
      provider, 
      provider_internal_id, 
      provider_access_token,
      provider_access_secret )
          VALUES ( (SELECT id
          FROM user_rows), 
          (SELECT id FROM provider_id),
           ${twitterUserId},
		${accessToken},
		${accessSecret}
            ) RETURNING *) SELECT * from user_rows;`
      );
    } catch (err) {
      ctx.body = "Internal server error" + err;
      // TODO do something here  - log it at least once logging module is added
      throw new Error(err);
    }

    const returnedRow = result.rows.shift();
    ctx.session.user = { id: returnedRow.id, name: returnedRow.name };
  }
  ctx.redirect("/");
  //TODO handle case when twitter didn't authenticate the user
});
