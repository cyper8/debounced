export function Debounced<T>(
  func: (...args: any[]) => T,
  backoff: number
): (...args: any[]) => Promise<T> {
  var timer: any;
  var result: Promise<T>;
  return function (): Promise<T> {
    var self = this;
    var evtargs = Array.from(arguments);

    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    if (result) {
      return result;
    } else {
      return (result = new Promise<T>((resolve) => {
        timer = setTimeout(function () {
          clearTimeout(timer);
          timer = undefined;
          resolve(func.apply(self, evtargs));
        }, backoff);
      }));
    }
  };
}
