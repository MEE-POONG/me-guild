import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const clientId = process.env.CLIENT_ID; // Store this in .env file
const clientSecret = process.env.CLIENT_SECRET; // Store this in .env file
const redirectUri = process.env.REDIRECT_URI; // Store this in .env file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    try {
      const tokenResponse = await axios.post(
        'https://discord.com/api/oauth2/token',
        new URLSearchParams({
          client_id: clientId!,
          client_secret: clientSecret!,
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: redirectUri!,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      res.status(200).json(userResponse.data);
    } catch (error) {
      console.error('Error during Discord OAuth:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
