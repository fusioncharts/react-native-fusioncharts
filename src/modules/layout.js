export default `<!DOCTYPE html>
<html>
    <head>
        <title>FusionCharts</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <style type="text/css">
            body,
            html {
                margin: 0;
                padding: 0;
                overflow: hidden;
                font-size: 13px;
            }

            #chart-container {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                position: absolute;
                user-select: none;
                -webkit-user-select: none;
                overflow: hidden;
            }

            #loading-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                user-select: none;
                -webkit-user-select: none;
            }
        </style>
    </head>

    <body>
        <div id="chart-container">
            <div id="loading-text">
                Chart is loading...
            </div>
        </div>
        <script>
            var promiseChain = Promise.resolve();
            var callbacks = {};
            const guid = function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return (
                    s4() +
                    s4() +
                    '-' +
                    s4() +
                    '-' +
                    s4() +
                    '-' +
                    s4() +
                    '-' +
                    s4() +
                    s4() +
                    s4()
                );
            };
            window.webViewBridge = {
                /**
                 * send message to the React-Native WebView onMessage handler
                 * @param targetFunc - name of the function to invoke on the React-Native side
                 * @param data - data to pass
                 * @param success - success callback
                 * @param error - error callback
                 */
                send: function (targetFunc, data, success, error) {
                    var msgObj = {
                        targetFunc: targetFunc,
                        data: data || {}
                    };
                    if (success || error) {
                        msgObj.msgId = guid();
                    }
                    var msg = JSON.stringify(msgObj);
                    promiseChain = promiseChain
                        .then(function () {
                            return new Promise(function (resolve, reject) {
                                console.log('sending message ' + msgObj.targetFunc);
                                if (msgObj.msgId) {
                                    callbacks[msgObj.msgId] = {
                                        onsuccess: success,
                                        onerror: error
                                    };
                                }
                                window.ReactNativeWebView.postMessage(msg);
                                resolve();
                            });
                        })
                        .catch(function (e) {
                            console.error('rnBridge send failed ' + e.message);
                        });
                }
            };
        </script>
    </body>
</html>`;