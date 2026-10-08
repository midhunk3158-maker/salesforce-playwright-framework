// Src/Utils/testJwt.ts - temporary, for manual verification only
import * as dotenv from 'dotenv';
dotenv.config();

import { getSalesforceSession } from './jwtAuth.util.js';

(async () => {
  try {
    const { sessionId, instanceUrl } = await getSalesforceSession();
    console.log('SUCCESS');
    console.log('Instance URL:', instanceUrl);
    console.log('Session ID (first 20 chars):', sessionId.substring(0, 20) + '...');
  } catch (err) {
    console.error('FAILED:', err);
  }
})();