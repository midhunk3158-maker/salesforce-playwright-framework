import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';

export async function getSalesforceVerificationCode(): Promise<string> {
  console.log('Fetching Salesforce verification code from Gmail...');
  const config = {
    imap: {
      user: process.env.GMAIL_USER!,
      password: process.env.GMAIL_APP_PASSWORD!,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 15000,
    },
  };

  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  const searchCriteria = ['UNSEEN', ['FROM', 'noreply@salesforce.com']];
  const fetchOptions = { bodies: [''], markSeen: true };

  let messages: any[] = [];
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`Attempt ${attempt + 1}: found ${messages.length} Salesforce unseen messages`);
    if (messages.length > 0) break;
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  await connection.end();

  if (messages.length === 0) {
    throw new Error('Verification email not found in inbox');
  }

  // Sort by actual date, pick the most recent — don't trust array order
  messages.sort((a, b) => {
    const dateA = new Date(a.attributes.date).getTime();
    const dateB = new Date(b.attributes.date).getTime();
    return dateB - dateA; // newest first
  });

  const latestEmail = messages[0];
  const rawBody = latestEmail.parts.find((part: any) => part.which === '')?.body;
  const parsed = await simpleParser(rawBody);

  console.log('--- EMAIL SUBJECT ---', parsed.subject);
  console.log('--- EMAIL TEXT ---', parsed.text);

  const codeMatch = parsed.text?.match(/\b\d{6}\b/);
  if (!codeMatch) {
    throw new Error('Could not extract verification code from email');
  }

  return codeMatch[0];
}