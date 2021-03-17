export function Debounced(func: Function, backoff: number): () => void {
  var timer;
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