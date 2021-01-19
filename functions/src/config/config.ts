import * as admin from 'firebase-admin';
admin.initializeApp();

export const firestore = admin.firestore();
export const storage = admin.storage();

// YouTube API Key
export const clientId = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const tokenCollection = process.env.TOKEN_COLLECTION || 'youtubeApiTokens';
