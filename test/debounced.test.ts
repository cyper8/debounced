import { expect } from "chai";
import { Debounced } from "../index";

describe("Debounced func", async () => {
  const TIMEOUT: number = 100 + Math.round(900 * Math.random());
  it("postpones execution approximately by " + TIMEOUT + " ms", async () => {
    function Test(start: number): number {
      return Date.now() - start;
    }
    expect(await Debounced(Test, TIMEOUT)(Date.now())).to.be.approximately(
      TIMEOUT,
      10
    );
  });

  const DELAY: number = 100;
  it("redebounces execution if wrapper is called again with new args", async () => {
    function Test(): number {
      return Date.now();
    }
    const debouncedTest = Debounced(Test, TIMEOUT);
    let start = Date.now();
    let end = await Promise.race([
      debouncedTest(), // first call
      new Promise<number>((res) => {
        setTimeout(() => {
          res(debouncedTest()); // second call
        }, DELAY); // (with delay)
      }),
    ]);
    expect(end - start).to.be.approximately(TIMEOUT + DELAY, 15); // delay included
  });
});
