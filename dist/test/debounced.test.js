import { expect } from 'chai';
import { Debounced } from '../index';
describe('Debounced func', async () => {
    it('postpones execution approximately by requested time in ms', done => {
        const start = Date.now();
        const TIMEOUT = 100;
        function Test(start) {
            expect(Date.now() - start).to.be.approximately(TIMEOUT, 10);
            done();
        }
        Debounced(Test, TIMEOUT)(start);
    });
});
//# sourceMappingURL=debounced.test.js.map