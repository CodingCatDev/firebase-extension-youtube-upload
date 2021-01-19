import { firestore, storage, tokenCollection } from './../config/config';
import * as functions from 'firebase-functions';
import { v4 as uuid } from 'uuid';
import { Video } from './video.model';
import { HttpsError } from 'firebase-functions/lib/providers/https';

enum PublishStatus {
  initialize = 'initialize',
  running = 'running',
  failed = 'failed',
  complete = 'complete'
}

export const onPublish = functions.https.onCall(async (data, context) => {
  /*
    * Initial checks, unable to even record
  */
  if (!data) {
    throw new HttpsError('invalid-argument', `Data missing from calling payload.`);
  }
  if (!data.publishDoc) {
    throw new HttpsError('invalid-argument', `publishDoc missing to store publish details on upload`);
  }

  const docRef = firestore.doc(data.publishDoc);
  await docRef.set({ id: uuid(), status: 'initialize' }, { merge: true });

  /*
    * Auth Check
  */
  let token = null;
  if (!context.auth || !context.auth.uid) {
    await setInvalidThrowError(docRef, `Missing uid for ${tokenCollection} token lookup`);
  }else{
  /*
    * Token Check
  */
    const tokenPath = `${tokenCollection}/${context.auth.uid}`;
    token = await firestore.doc(tokenPath);
    if(!token){
      await setInvalidThrowError(docRef, `Token missing in ${tokenPath}`);
    }
  }

  if (!data.storageMetadata) {
    await setInvalidThrowError(docRef, `Bucket Missing, for Firebase storage retrieval.`);
  }
  if (!data.video) {
    await setInvalidThrowError(docRef, `Missing 'video' object.`);
  }

  const { storageMetadata, video }: { publishDoc: string, storageMetadata: StorageMetadata, video: Video, } = data;

  /*
    * Check Storage required details 
  */
  if (!storageMetadata.bucket) {
    await setInvalidThrowError(docRef, `Missing 'storage.bucket', for Firebase storage retrieval.`);
  }
  if (!storageMetadata.name) {
    await setInvalidThrowError(docRef, `Missing 'storage.name', for Firebase storage retrieval.`);
  }
  /*
    * Check Video required details 
  */
  if (!video.snippet) {
    await setInvalidThrowError(docRef, `Missing 'video.snippet' object.`);
  } else {
    if (!video.snippet.title) {
      setInvalidThrowError(docRef, `Missing 'video.snippet.title'.`);
    }
    if (!video.snippet.description) {
      setInvalidThrowError(docRef, `Missing 'video.snippet.description'.`);
    }
  }
  if (!video.status) {
    setInvalidThrowError(docRef, `Missing 'video.status'.`);
  } else {
    if (!video.status.privacyStatus) {
      setInvalidThrowError(docRef, `Missing 'video.status.privacyStatus'.`);
    }
  }

  /*
  * Start Downloading file from storage
  */
  console.log(`Starting storage download from ${storageMetadata.bucket}/${storageMetadata.name}`);

  const bucket = storage.bucket(storageMetadata.bucket);
  const file: [Buffer] = await bucket.file(storageMetadata.name).download();

  if (!file) {
    const message = `File: ${storageMetadata.name} download missing or failed to download.`;
    await docRef.set({ status: 'failed', message }, { merge: true });
    throw new HttpsError('not-found', message);
  }

  return true;
});

async function setInvalidThrowError(docRef: FirebaseFirestore.DocumentData, message: string) {
  await setThrowError(docRef, PublishStatus.failed, message, 'invalid-argument');
}

async function setThrowError(docRef: FirebaseFirestore.DocumentData, status: PublishStatus,
  message: string, errorCode: functions.https.FunctionsErrorCode) {

  try {
    await docRef.set({ status, message }, { merge: true });
    throw new HttpsError(errorCode, message);
  } catch (err) {
    throw new HttpsError('internal', JSON.stringify(err));
  }
}