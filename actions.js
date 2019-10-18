(function() {
    var ActionsCore = {
        setAccessToken: function (token) {
            mainStore.saveAccessToken(token);
            console.log(token);
        },
        getCurrentUser: function () {
            coreApi.getUserProfile();
        }
    };

    class MainStore {
        AccessToken = "";

        saveAccessToken(token) {
            this.AccessToken = token;
        }
    }
    const mainStore = new MainStore();

    function httpRequest(url, method, callback) {
        const Http = new XMLHttpRequest();
        Http.open(method, url);
        Http.setRequestHeader("Authorization", mainStore.AccessToken);
        Http.setRequestHeader("content-type", "application/json");
        Http.send();

        Http.onload = (e) => {
            if (Http.status === 200) {
                const data = JSON.parse(Http.responseText);
                callback(data, null);
            } else {
                const error = `Error ${ Http.status }: ${ Http.statusText }`;
                callback(null, error);
                console.error(error);
            }
        };
    }

    class CoreApi {
        getUserProfile() {
            httpRequest("https://dev.api.be-hive.io/account/get", "GET", sendDataToTemplate);
        }
    }
    const coreApi = new CoreApi();

    function sendDataToTemplate(data) {
        const iframeEl = document.getElementById("iframe");
        iframeEl.contentWindow.postMessage(JSON.stringify(data), "*");
    }

    (function getEventFromTemplate() {
        window.addEventListener("message", (event) => {
            const {data} = event;
            if(data === "getUser"){
                coreApi.getUserProfile();
            }
        });
    } )();
})();