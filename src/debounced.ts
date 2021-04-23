/**
 * Function that wraps target function (```func```) and returns it.
 * As soon as wrapped function is called with some args it
 * postpones actual execution by ```backoff``` ms.
 * If wrapper is called again new args are been used and timer is restarted.
 *
 * @export
 * @template T - type, expected of target function (which can be async)
 * @param {((...args: any[]) => T | PromiseLike<T>)} func - target function
 * @param {number} backoff - target function execution timeout
 * @returns {(...args: any[]) => Promise<T>} - wrapper async function
 */
export function Debounced<T>(
  func: (...args: any[]) => T | PromiseLike<T>,
  backoff: number
): (...args: any[]) => Promise<T> {
  let timer: any;
  let resolver: (result: T | PromiseLike<T>) => void;
  let result: Promise<T>;
  let renew: boolean = true;

  return function (...args: any[]): Promise<T> {
    let evtargs: any[] = args;

    if (renew) {
      result = new Promise<T>((resolve: typeof resolver) => {
        renew = false;
        resolver = resolve;
      })
        .then((v) => {
          renew = true;
          return v;
        })
        .catch((error) => {
          renew = true;
          throw error;
        });
    }

    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = undefined;
      resolver(func.apply(func, evtargs));
    }, backoff);

    return result;
  };
}
