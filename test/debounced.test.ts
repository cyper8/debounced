import { expect } from 'chai';
import { Debounced } from '../index';

describe('Debounced func', async () => {
  const TIMEOUT: number = 100 + Math.round( 900 * Math.random());
  it('postpones execution approximately by '+TIMEOUT+' ms', async () => {
    function Test(start: number): number {
      return Date.now() -start;
    }
    expect(await Debounced(Test, TIMEOUT)(Date.now())).to.be.approximately(TIMEOUT, 10);
  });
});