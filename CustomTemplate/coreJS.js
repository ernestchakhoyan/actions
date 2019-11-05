const coreJs = ( function () {
    let iOSBridge;

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
            // Send event to JS from iOS
            bridge.registerHandler("eventToJS", function (data, responseCallback) {
                const {eventName} = data;
                const eventToSend = new CustomEvent(`${eventName}`, { detail: data });
                dispatchEvent(eventToSend);

                // TODO: Handle error
                console.log("Data from iOS", data);
                responseCallback(data);
            });
        }
    );

    return {
        // Send event to iOS from JS
        sendDataToPartner: function (data) {
            iOSBridge.callHandler("eventToiOS", data, function responseCallback(responseData) {
                // TODO: Handle error
                console.log("Data to iOS:", responseData);
            });
        }
    };
} )();