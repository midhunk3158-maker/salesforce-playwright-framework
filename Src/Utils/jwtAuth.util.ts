// Src/Utils/jwtAuth.util.ts
import jwt from 'jsonwebtoken';
import fs from 'fs';

export async function getSalesforceSession(): Promise<{ sessionId: string; instanceUrl: string }> {
  const privateKey = fs.readFileSync(process.env.SF_JWT_KEY_PATH!, 'utf8');

  const token = jwt.sign(
    {
      iss: process.env.SF_CONSUMER_KEY!,
      sub: process.env.SF_USERNAME!,
      aud: 'https://login.salesforce.com',
      exp: Math.floor(Date.now() / 1000) + 180,
    },
    privateKey,
    { algorithm: 'RS256' }
  );

  const response = await fetch('https://login.salesforce.com/services/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`JWT auth failed: ${JSON.stringify(data)}`);
  }

  return { sessionId: data.access_token, instanceUrl: data.instance_url };
}