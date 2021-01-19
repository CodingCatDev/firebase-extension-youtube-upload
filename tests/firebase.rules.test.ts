import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { setup, teardown } from './helpers';
import firebase from 'firebase/app';
import {describe, expect, test, afterAll, beforeAll} from '@jest/globals';

const mockData = {
  '/users/user123': {
    roles: ['admin'],
  },
};

afterAll(async () => {
  // If you comment this it will leave the test data.
  await teardown();
});

describe('Positive Tests', () => {
  describe('Firestore Author rules', () => {
    let db: firebase.firestore.Firestore;

    // Applies only to tests in this describe block
    beforeAll(async () => {
      db = await setup(
        {
          uid: 'user123',
        },
        mockData
      );
    });

    test('Verify YouTube Token', async () => {
      const ref = db.doc(``);
      expect(
        await assertSucceeds(
          ref.get()
        )
      );
    });
  });
});
