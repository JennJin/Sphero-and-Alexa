var queue = [];

setInterval(function () {
    if (queue.length > 0) {
        handleQueue(queue.shift());
    }
}, 10000);

function handleQueue(callbackFunction) {

    callbackFunction();
}


setTimeout(function () {
    console.log("First wait");
    queue.push(function () { console.log("Hello 1 from within!!!"); });
}, 1000);

setTimeout(function () {
    console.log("Second wait");
    queue.push(function () { console.log("Hello 2 from within!!!"); });
}, 2000);

setTimeout(function () {
    console.log("Third wait");
    queue.push(function () { console.log("Hello 3 from within!!!"); });
}, 3000);