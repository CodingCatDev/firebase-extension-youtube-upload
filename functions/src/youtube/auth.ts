import * as functions from 'firebase-functions';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { google } from 'googleapis';
import { clientId, clientSecret, firestore, tokenCollection } from './../config/config';

/**
 * Request a OAuth URL from your credentials
 */
export const getAuthURL = functions.https.onCall(async (data) => {
    const redirectUri = data.redirectUri;

    if (!clientId) {
        console.log(`clientId missing, please add CLIENT_ID to your Configuration`);
    }
    
    if (!clientSecret) {
        console.log(`clientSecret missing, please add CLIENT_SECRET to your Configuration`);
    }

    if(!redirectUri){
        throw new HttpsError("invalid-argument", "Request missing redirectUri."); 
    }
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    const scopes = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/youtube',
    ];
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    return url;
});

/**
 * Generate and store OAuth Tokens
 */
export const createAndSaveTokens = functions.https.onCall(async (data, context) => {
    const code = data.code;
    const redirectUri = data.redirectUri;

    if(!context.auth || !context.auth.uid){
        throw new HttpsError("unauthenticated", "Request had invalid credentials."); 
    }

    // if (context.auth && context.auth.uid) {
    //     const userRef = admin
    //       .firestore()
    //       .collection('users')
    //       .doc(context.auth.uid)
    //       .get();
    //     const user: any = (await userRef).data();
    //     const roles: string[] = user.roles;
    //     console.log('Checking User for roles', JSON.stringify(user));
    //     if (!roles.some((a) => validRoles.includes(a))) {
    //       throw new functions.https.HttpsError(
    //         'permission-denied',
    //         `User missing ${validRoles}`
    //       );
    //     }
    //   }

    if(!code){
        throw new HttpsError("invalid-argument", "Request missing code."); 
    }

    if(!redirectUri){
        throw new HttpsError("invalid-argument", "Request missing redirectUri."); 
    }

    if (!clientId) {
        console.log(`clientId missing, please add CLIENT_ID to your Configuration`);
    }
    
    if (!clientSecret) {
        console.log(`clientSecret missing, please add CLIENT_SECRET to your Configuration`);
    }
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    try{
    const { tokens } = await oauth2Client.getToken(code);
    // Save to database
    await firestore.doc(`${tokenCollection}/${context.auth.uid}`).set(tokens);
    return 'success';
    }catch(e){
        throw new HttpsError('internal', `${JSON.stringify(e)}`);
    }
});
