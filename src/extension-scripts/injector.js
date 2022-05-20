// console.log("Loaded");

let typing = localStorage.getItem("typing");
let read = localStorage.getItem("read");
console.log("Read: ", read);
var OrigWebSocket = window.WebSocket;
var wsSend = OrigWebSocket.prototype.send;
var enc = new TextDecoder("utf-8");
// var enc1 = new TextEncoder("utf-8");
wsSend = wsSend.apply.bind(wsSend);

function getPropertyByRegex(obj, propName) {
    var re = obj.match(new RegExp(`(?:"${propName}":)(.*?)(?:,)`));
    return re ? re.pop() : false;
}

// eslint-disable-next-line no-extend-native
String.prototype.stripSlashes = function () {
    return this.replace(/\\(.)/gm, "$1");
};

OrigWebSocket.prototype.send = async function (data) {
    let blockIt = false;
    let host = "wss://edge-chat.messenger.com"
    // console.log("Here");
    if (window.location.host.includes(".facebook.com")) {
        host = "wss://edge-chat.facebook.com"
    }
    if (this.url.startsWith(host)) {
        var decodedArrayBuffer = enc.decode(arguments[0]);
        var reqId = getPropertyByRegex(decodedArrayBuffer, "type");
        var lastReadWatermarkTS = decodedArrayBuffer.includes(
            "last_read_watermark_ts"
        );
        let stripped = decodedArrayBuffer.stripSlashes();
        var sendType = stripped.includes(`\\"send_type\\":1`);
        // console.log(stripped, !sendType, parseInt(reqId), read, lastReadWatermarkTS);
        if (
            (typing === "true" && parseInt(reqId) === 4 && stripped.includes(`\\"is_typing\\":1`)) ||
            (read === "true" && parseInt(reqId) === 3 && lastReadWatermarkTS && !sendType)
        ) {
            blockIt = true;
        }
    }
    if (blockIt) {
        return;
    }
    return wsSend(this, arguments);
};