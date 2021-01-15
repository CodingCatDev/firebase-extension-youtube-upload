import * as admin from 'firebase-admin';
admin.initializeApp();

export const firestore = admin.firestore();

// YouTube API Key
export const youtubeApiKey = process.env.YOUTUBE_API_KEY;
export const triggerCollection = process.env.TRIGGER_COLLECTION || 'videoMeta';
