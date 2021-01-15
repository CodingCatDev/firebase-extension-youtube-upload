// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const firestore = admin.firestore();

// YouTube API Key
// export const algoliaAppId = functions.config().algolia.app_id;
