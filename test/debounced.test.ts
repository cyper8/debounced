import { expect } from 'chai';
import { Debounced } from '../index';

describe('Debounced func', async () => {
  const TIMEOUT: number = 100 + Math.round( 900 * Math.random());
  it('postpones execution approximately by '+TIMEOUT+' ms', done => {
    const start = Date.now();

    function Test(start: number): void {
      expect(Date.now() - start).to.be.approximately(TIMEOUT, 10);
      done();
    }
    Debounced(Test, TIMEOUT)(start);
  });
});