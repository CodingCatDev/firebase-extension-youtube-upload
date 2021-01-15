import { firestore, triggerCollection, youtubeApiKey} from './../config/config';
import * as functions from 'firebase-functions';
import { v4 as uuid } from 'uuid';

export const onVideoMetaCreate = functions.firestore
  .document(`${triggerCollection}/{videoMetaId}`)
  .onCreate(async (snap, context) => {
    if (!youtubeApiKey) {
      console.log(`youtubeApiKey missing, please add YOUTUBE_API_KEY`);
      return;
    }

    const docData = snap.data();
    if (!docData) {
      console.log(`docData missing data at ${triggerCollection}`);
      return;
    }

    // Add new video collection as posts sub collection
    const id = uuid();
    await firestore
      .doc(`${triggerCollection}/${context.params.videoMetaId}/videos/${id}`)
      .set({ id, videoMetaId: context.params.videoMetaId });

    // Set current post to history
    return firestore
      .doc(`${triggerCollection}/${context.params.videoMetaId}`)
      .set({ videoId: id }, { merge: true });
  });
