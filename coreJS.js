( function () {
    let iOSBridge;

    // Send data to child iframe
    function sendDataToTemplate(data) {
        const iframeEl = document.getElementById("iframe");
        iframeEl.contentWindow.dataObject = data;
    }

    // Subscribe to iOS events
    ( function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [ callback ];
        const WVJBIframe = document.createElement("iframe");
        WVJBIframe.style.display = "none";
        WVJBIframe.src = "https://__bridge_loaded__";
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    } )(
        function (bridge) {
            iOSBridge = bridge;


            // Event fired in JS
            bridge.registerHandler("JS Echo", function (data, responseCallback) {
                console.log("JS Echo called with:", data);
                responseCallback(data);
            });
        }
    );

    // Invoke calback in iOS
    (function () {
        window.addEventListener("message", (event) => {
            let json = JSON.parse(event.data);
            iOSBridge.callHandler("ObjC Echo", json.message, function responseCallback(responseData) {
                console.log("JS received response:", responseData);
            });
        });
    })();

} )();