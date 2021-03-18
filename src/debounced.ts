export function Debounced(func: Function, backoff: number): (...args: unknown[]) => void {
  var timer: number | undefined;
  return function () {
    var self = this;
    var evtargs = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = undefined;
      func.apply(self, evtargs);
    }, backoff);
  }
}