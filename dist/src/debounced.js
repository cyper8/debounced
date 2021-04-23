/**
 * Function that wraps target function (```func```) and returns it.
 * As soon as wrapped function is called with some args it
 * postpones actual execution by ```backoff``` ms.
 * If wrapper is called again new args are been used and timer is restarted.
 *
 * @export
 * @template T
 * @param {((...args: any[]) => T | PromiseLike<T>)} func
 * @param {number} backoff
 * @returns {(...args: any[]) => Promise<T>}
 */
export function Debounced(func, backoff) {
    let timer;
    let resolver;
    let result;
    let renew = true;
    return function (...args) {
        let evtargs = args;
        if (renew) {
            result = new Promise((resolve) => {
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
//# sourceMappingURL=debounced.js.map