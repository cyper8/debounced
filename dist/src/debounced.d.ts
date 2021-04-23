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
export declare function Debounced<T>(func: (...args: any[]) => T | PromiseLike<T>, backoff: number): (...args: any[]) => Promise<T>;
