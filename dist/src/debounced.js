export function Debounced(func, backoff) {
    var timer;
    var result;
    return function () {
        var self = this;
        var evtargs = Array.from(arguments);
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
        if (result) {
            return result;
        }
        else {
            return (result = new Promise((resolve) => {
                timer = setTimeout(function () {
                    clearTimeout(timer);
                    timer = undefined;
                    resolve(func.apply(self, evtargs));
                }, backoff);
            }));
        }
    };
}
//# sourceMappingURL=debounced.js.map