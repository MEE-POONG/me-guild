import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const clientId = "YOUR_CLIENT_ID";
const clientSecret = "YOUR_CLIENT_SECRET";
const redirectUri = "YOUR_REDIRECT_URI";

app.get("/auth/discord/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Now you can use the access token to fetch the user's Discord profile
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Do something with the user's Discord data
    res.json(userResponse.data);
  } catch (error) {
    console.error("Error during Discord OAuth:", error);
    res.status(500).send("Authentication failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
