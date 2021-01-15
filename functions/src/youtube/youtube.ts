import { firestore } from './../config/config';
import * as functions from 'firebase-functions';
import { v4 as uuid } from 'uuid';

export const onVideoPost = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    const post = snap.data();

    if (!post) {
      console.log('post missing data');
      return;
    }

    // Add new video collection as posts sub collection
    const id = uuid();
    await firestore
      .doc(`posts/${context.params.postId}/videos/${id}`)
      .set({ id, postId: context.params.postId });

    // Set current post to history
    return firestore
      .doc(`posts/${context.params.postId}`)
      .set({ videoId: id }, { merge: true });
  });
