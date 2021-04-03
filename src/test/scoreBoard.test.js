/* eslint-disable no-unused-vars */
import 'jest-canvas-mock';
import regeneratorRuntime from 'regenerator-runtime';
import { scoreBoard } from '../api/scoreBoard';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ result: {} }),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('Requestion the information from the API', () => {
  it('The result should be an Object', async () => {
    const result = await scoreBoard();

    expect(typeof result).toBe('object');
  });
});