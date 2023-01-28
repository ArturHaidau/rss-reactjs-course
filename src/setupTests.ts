import '@testing-library/jest-dom';
import crypto from 'crypto';

Object.defineProperty(global.self, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID(),
  },
});
