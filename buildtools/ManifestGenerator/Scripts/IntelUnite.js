////////////////////////////////////////////////////////////////////////////////////////////////////
// file:	Scripts\IntelUnite.js
//
// summary:	Intel unite class
////////////////////////////////////////////////////////////////////////////////////////////////////

var OSName = 'Unknown';
if (window.navigator.userAgent.indexOf('Windows') !== -1) {
    OSName = 'Windows';
}
if (window.navigator.userAgent.indexOf('Mac') !== -1) {
    OSName = 'Mac';
}
if (window.navigator.userAgent.indexOf('Linux') !== -1) {
    OSName = 'Linux';
}
if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
    OSName = 'Chrome';
}
if (window.navigator.userAgent.indexOf('Android') !== -1) {
    OSName = 'Android';
}

// Global variable for storing promises
var promises = {};

// Generates a unique identifier
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

// Common function for resolving / rejecting a promise previously stored
function resolvePromise(promiseId, data, error) {
    if (error) {
        window.promises[promiseId].reject(data);

    } else {
        window.promises[promiseId].resolve(data);
    }
    // remove referenfe to stored promise
    delete window.promises[promiseId];
}

function IntelUnite() { }

if (OSName === 'Mac') {


    window.IntelUnite.prototype.logMessage = function (message, severity) {
        webkit.messageHandlers.logMessage.postMessage({ message: message, severity: severity });
    }


    window.IntelUnite.prototype.logTelemetryEvent = function (data) {
        webkit.messageHandlers.logTelemetryEvent.postMessage({ data: data });
    }

    window.IntelUnite.prototype.sendMessage = function (message) {
        webkit.messageHandlers.sendMessage.postMessage({ message: message });

    }
    window.IntelUnite.prototype.updateToolMenu = function (label, imageBase64) {
        webkit.messageHandlers.updateToolMenu.postMessage({ label: label, imageBase64: imageBase64 });

    }
    window.IntelUnite.prototype.setNumberNotification = function (number) {
        webkit.messageHandlers.setNumberNotification.postMessage({ number: number });
    }

    window.IntelUnite.prototype.showScreenSharing = function (multidisplaySupported) {
        webkit.messageHandlers.showScreenSharing.postMessage({ multidisplaySupported: multidisplaySupported });

    }


    ///////////////////////////
    /*Functions with promises*/
    ///////////////////////////

    window.IntelUnite.prototype.getContext = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.getContext.postMessage({ promiseId: promiseId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at GetContext, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.getTheme = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.getTheme.postMessage({ promiseId: promiseId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at GetTheme, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.getMaxMessageSize = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.getMaxMessageSize.postMessage({ promiseId: promiseId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at GetMaxMessageSize, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.getAppointmentList = function (nextHours) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.getAppointmentList.postMessage({ promiseId: promiseId, nextHours: nextHours });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at GetAppointmentList, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.getCurrentAppointments = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.getCurrentAppointments.postMessage({ promiseId: promiseId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at GetCurrentAppointments, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.isCalendarAvailable = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.isCalendarAvailable.postMessage({ promiseId: promiseId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at IsCalendarAvailable, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    /*File Sharing*/
    window.IntelUnite.prototype.createFile = function (fileName) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.createFile.postMessage({ promiseId: promiseId, fileName: fileName });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at CreateFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.writeToFile = function (fileHandleId, base64Chunk) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.writeToFile.postMessage({ promiseId: promiseId, fileHandleId: fileHandleId, base64Chunk: base64Chunk });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at WriteToFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.closeFile = function (fileHandleId) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.closeFile.postMessage({ promiseId: promiseId, fileHandleId: fileHandleId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at CloseFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.openFolder = function (fileHandleId) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.openFolder.postMessage({ promiseId: promiseId, fileHandleId: fileHandleId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at OpenFolder, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.deleteFile = function (fileHandleId) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.deleteFile.postMessage({ promiseId: promiseId, fileHandleId: fileHandleId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at DeleteFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.getFileTransferConfiguration = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.getFileTransferConfiguration.postMessage({ promiseId: promiseId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at GetFileTransferConfiguration, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.getMaxFileSize = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                webkit.messageHandlers.getMaxFileSize.postMessage({ promiseId: promiseId });
            }
            catch (exception) {
                console.log(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Webkit error at GetMaxFileSize, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    /*End File Manager*/
    /*End File Sharing*/
}
//Windows
if (OSName === 'Windows') {

    window.IntelUnite.prototype.logMessage = function (message, severity) {
        window.external.logMessage(message, severity);
    }


    window.IntelUnite.prototype.logTelemetryEvent = function (data) {
        window.external.logTelemetryEvent(data);
    }

    window.IntelUnite.prototype.sendMessage = function (message) {
        window.external.sendMessage(message);

    }
    window.IntelUnite.prototype.updateToolMenu = function (label, imageBase64) {
        window.external.updateToolMenu(label, imageBase64);

    }
    window.IntelUnite.prototype.setNumberNotification = function (number) {
        window.external.setNumberNotification(number);

    }
    window.IntelUnite.prototype.showScreenSharing = function (multidisplaySupported) {
        window.external.showScreenSharing(multidisplaySupported);

    }

    ///////////////////////////
    /*Functions with promises*/
    ///////////////////////////

    window.IntelUnite.prototype.getContext = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.getContext(promiseId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at GetContext, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.getTheme = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.getTheme(promiseId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at GetTheme, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.getMaxMessageSize = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.getMaxMessageSize(promiseId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at GetMaxMessageSize, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.getAppointmentList = function (nextHours) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.getAppointmentList(promiseId, nextHours);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at GetAppointmentList, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.getCurrentAppointments = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.getCurrentAppointments(promiseId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at GetCurrentAppointments, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.isCalendarAvailable = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.isCalendarAvailable(promiseId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at IsCalendarAvailable, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    /*File Manager Functions*/
    window.IntelUnite.prototype.createFile = function (fileName) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.createFile(promiseId, fileName);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at CreateFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.writeToFile = function (handleId, base64Chunk) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.writeToFile(promiseId, handleId, base64Chunk);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at WriteToFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.closeFile = function (handleId) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.closeFile(promiseId, handleId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at CloseFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.openFolder = function (handleId) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.openFolder(promiseId, handleId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at OpenFolder, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }
    window.IntelUnite.prototype.deleteFile = function (handleId) {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.deleteFile(promiseId, handleId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at DeleteFile, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.getFileTransferConfiguration = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.getFileTransferConfiguration(promiseId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at GetFileTransferConfiguration, " + exception, 4);
                } catch (ex){

                }
            }
        });
        return promise;
    }

    window.IntelUnite.prototype.getMaxFileSize = function () {
        var promise = new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                window.external.getMaxFileSize(promiseId);
            }
            catch (exception) {
                alert(exception);
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at GetMaxFileSize, " + exception, 4)
                } catch (ex){

                }
            }
        });
        return promise;
    }
    /*End File Manager*/
}

if (OSName === 'Chrome' || OSName === 'Linux') {

    // Send message out to the parent window to communicate with the Unite client
    window.IntelUnite.prototype.postMessage = function (event, data) {
        window.console.debug(JSON.stringify({
            event: event,
            data: data
        }))
    }
    /*
     * Define event handlers
     */
    window.IntelUnite.prototype.logMessage = function (message, severity) {
        window.IntelUnite.postMessage('logMessage', { message: message, severity: severity })
    }

    window.IntelUnite.prototype.logTelemetryEvent = function (data) {
        window.IntelUnite.postMessage('logTelemetryEvent', data)
    }

    window.IntelUnite.prototype.sendMessage = function (message) {
        window.IntelUnite.postMessage('sendMessage', message)
    }

    window.IntelUnite.prototype.updateToolMenu = function (label, imageBase64) {
        window.IntelUnite.postMessage('updateToolMenu', { label: label, imageBase64: imageBase64 })
    }

    window.IntelUnite.prototype.setNumberNotification = function (number) {
        window.IntelUnite.postMessage('setNumberNotification', number)
    }

    window.IntelUnite.prototype.showScreenSharing = function (multidisplaySupported, title, description, base64Image) {
        window.IntelUnite.postMessage('showScreenSharing', {
            multidisplaySupported: multidisplaySupported,
            title: title,
            description: description,
            based64Image: base64Image
        })
    }

    /*
     * Define Promise based handlers
     */
    window.IntelUnite.prototype.getFileTransferConfiguration = function (fileName) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('getFileTransferConfig', {
                promiseId: promiseId
            })
        });
    }

    window.IntelUnite.prototype.createFile = function (fileName) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('createFile', {
                promiseId: promiseId,
                fileName: fileName
            })
        });
    }

    window.IntelUnite.prototype.writeToFile = function (fileId, data) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('writeFile', {
                promiseId: promiseId,
                fileId: fileId,
                base64Data: data
            })
        });
    }

    window.IntelUnite.prototype.closeFile = function (fileId) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('closeFile', {
                promiseId: promiseId,
                fileId: fileId
            })
        });
    }

    window.IntelUnite.prototype.openFolder = function (fileId) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('openFolder', {
                promiseId: promiseId,
                fileId: fileId
            })
        });
    }

    window.IntelUnite.prototype.deleteFile = function (fileId) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('deleteFile', {
                promiseId: promiseId,
                fileId: fileId
            })
        });
    }

    window.IntelUnite.prototype.getContext = function () {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('getContext', {
                promiseId: promiseId
            })
        })
    }

    window.IntelUnite.prototype.getTheme = function () {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('getTheme', {
                promiseId: promiseId
            })
        })
    }

    window.IntelUnite.prototype.getMaxMessageSize = function () {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('getMaxMessageSize', {
                promiseId: promiseId
            })
        })
    }

    window.IntelUnite.prototype.getAppointmentList = function (nextHours) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('getAppointmentList', {
                promiseId: promiseId
            })
        })
    }
    window.IntelUnite.prototype.getCurrentAppointments = function () {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('getCurrentAppointments', {
                promiseId: promiseId
            })
        })
    }
    window.IntelUnite.prototype.isCalendarAvailable = function () {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            window.IntelUnite.postMessage('isCalendarAvailable', {
                promiseId: promiseId
            })
        })
    }
    window.IntelUnite.prototype.invokeModuleFunction = function (name, data) {
        if (window[name]) {
            window[name](data)
        }
    }

    /*
     * Handle incoming messages and trigger appropriate functions
     */
    window.addEventListener('message', function (e) {
        // Attempt to parse 
        var data = e.data
        if (data === '') {
            console.log('Ignore message: empty')
            return
        }
        switch (data.event) {
            case 'promise':
                if (window.promises[data.promiseId] && data.result) {
                    window.promises[data.promiseId].resolve(data.result)
                } else {
                    window.promises[data.promiseId].reject(new Error(data.error))
                }
                break;
            case 'UserConnected':
                IntelUnite.invokeModuleFunction('onUserConnected', data.message)
                break;
            case 'UserInfoChanged':
                IntelUnite.invokeModuleFunction('onUserInfoChanged', data.message)
                break;
            case 'UserDisconnected':
                IntelUnite.invokeModuleFunction('onUserDisconnected', data.message)
                break;
            case 'ModerationModeUpdated':
                IntelUnite.invokeModuleFunction('onModerationModeUpdated', data.message)
                break;
            case 'LockSession':
                IntelUnite.invokeModuleFunction('onLockSession', true)
                break;
            case 'UnlockSession':
                IntelUnite.invokeModuleFunction('onUnlockSession', false)
                break;
            case 'ScreenSharing':
                IntelUnite.invokeModuleFunction('showScreenSharingCallback', data.screenParams)
                break;
            case 'message':
                IntelUnite.invokeModuleFunction('onMessage', data.message)
                break;
        }
    })

}

if (OSName === 'Android') {

    //Outbound events
    window.IntelUnite.prototype.logMessage = function (message, severity) {
        window.jsInterface.logMessage(message, severity);
    }
    window.IntelUnite.prototype.logTelemetryEvent = function (data) {
        window.jsInterface.logTelemetryEvent(data);
    }
    window.IntelUnite.prototype.sendMessage = function (m) {
        window.jsInterface.sendMessage(m.DataType, m.Base64Data, m.Priority);
    }
    window.IntelUnite.prototype.updateToolMenu = function (label, imageBase64) {
        window.jsInterface.updateToolMenu(label, imageBase64);
    }
    window.IntelUnite.prototype.setNumberNotification = function (number) {
        window.jsInterface.setNumberNotification(number);
    }
    window.IntelUnite.prototype.showScreenSharing = function (multidisplaySupported) {
        window.jsInterface.showScreenSharing(multidisplaySupported);
    }

    //Promised incoming events
    window.handleAndroidMessage = function (type, arg1, arg2) {
        return new Promise(function (resolve, reject) {
            var promiseId = generateUUID();
            window.promises[promiseId] = { resolve: resolve, reject: reject };
            try {
                switch (type) {
                    case "getContext":
                        resolve(window.jsInterface.getContextMessage(promiseId));
                        break;
                    case "getTheme":
                        resolve(window.jsInterface.getTheme(promiseId));
                        break;
                    case "getMaxMessageSize":
                        resolve(window.jsInterface.getMaxMessageSize(promiseId));
                        break;
                    case "getAppointmentList":
                        resolve(window.jsInterface.getAppointmentList(promiseId));
                        break;
                    case "getCurrentAppointments":
                        resolve(window.jsInterface.getCurrentAppointments(promiseId));
                        break;
                    case "isCalendarAvailable":
                        resolve(window.jsInterface.isCalendarAvailable(promiseId));
                        break;
                    case "createFile":
                        var res = window.jsInterface.createFile(promiseId, arg1)
                        var obj = JSON.parse(res);
                        if (obj.code == "SUCCESS") {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                        break;
                    case "writeToFile":
                        var res = window.jsInterface.writeToFile(promiseId, arg1, arg2)
                        var obj = JSON.parse(res);
                        if (obj.code == "SUCCESS") {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                        break;
                    case "closeFile":
                        var res = window.jsInterface.closeFile(promiseId, arg1)
                        var obj = JSON.parse(res);
                        if (obj.code == "SUCCESS") {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                        break;
                    case "deleteFile":
                        var res = window.jsInterface.deleteFile(promiseId, arg1)
                        var obj = JSON.parse(res);
                        if (obj.code == "SUCCESS") {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                        break;
                    case "getFileTransferConfiguration":
                        resolve(window.jsInterface.getFileTransferConfiguration(promiseId));
                        break;
                }
            } catch (exception) {
                try {
                    IntelUnite.logMessage("On IntelUnite.js, Error at HandleAndroidMessage, " + exception, 4);
                } catch (ex){

                }
                alert(exception)
                reject(exception);
            }
        });
    }
    window.IntelUnite.prototype.getContext = function () {
        return window.handleAndroidMessage("getContext");
    }
    window.IntelUnite.prototype.getTheme = function () {
        return window.handleAndroidMessage("getTheme");
    }
    window.IntelUnite.prototype.createFile = function (filename) {
        return window.handleAndroidMessage("createFile", filename);
    }
    window.IntelUnite.prototype.writeToFile = function (fileId, content) {
        return window.handleAndroidMessage("writeToFile", fileId, content);
    }
    window.IntelUnite.prototype.closeFile = function (fileId) {
        return window.handleAndroidMessage("closeFile", fileId);
    }
    window.IntelUnite.prototype.deleteFile = function (fileId) {
        return window.handleAndroidMessage("deleteFile", fileId);
    }
    window.IntelUnite.prototype.openFolder = function (fileId) {
        window.jsInterface.openFolder(fileId);
    }
    window.IntelUnite.prototype.getMaxMessageSize = function () {
        return window.handleAndroidMessage("getMaxMessageSize");
    }
    window.IntelUnite.prototype.getAppointmentList = function () {
        return window.handleAndroidMessage("getAppointmentList");
    }
    window.IntelUnite.prototype.getCurrentAppointments = function () {
        return window.handleAndroidMessage("getCurrentAppointments");
    }
    window.IntelUnite.prototype.isCalendarAvailable = function () {
        return window.handleAndroidMessage("isCalendarAvailable");
    }
    window.IntelUnite.prototype.getFileTransferConfiguration = function () {
        return window.handleAndroidMessage("getFileTransferConfiguration");
    }

    //Disable notifications and errors
    window.Notification = function () { };
    window.alert = function () { };
}



window.IntelUnite = new IntelUnite();

//this code handles the F5/Ctrl+F5/Ctrl+R
var version = navigator.appVersion;
document.onkeydown = checkKeycode;
var f5 = 116;


//Disable ctr f5, ctrl r
function checkKeycode(e) {
    var keycode = (window.event) ? event.keyCode : e.keyCode;
    console.log(event.keyCode);
    console.log('Key combination CTRL + '
        + String.fromCharCode(keycode));
    // IE
    if (keycode === f5 || disableCtrlKeyCombination(e)) {
        if (e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}
function disableCtrlKeyCombination(e) {
    //list all CTRL + key combinations you want to disable
    //» -> +
    //½ -> -
    var forbiddenKeys = new Array('o', 'l', 'n', 'p', '»', '½', '0', 'f');
    var key;
    var isCtrl;

    if (window.event) {
        key = window.event.keyCode;     //IE
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else {
        key = e.which;     //firefox
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    //alert('Command '+String.fromCharCode(key).toLowerCase());
    //if ctrl is pressed check if other key is in forbidenKeys array
    if (isCtrl) {
        for (var i = 0; i < forbiddenKeys.length; i++) {
            //case-insensitive comparation
            if (forbiddenKeys[i].toLowerCase() === String.fromCharCode(key).toLowerCase()) {
                console.log('Key combination CTRL + ' + String.fromCharCode(key) + ' has been disabled.');
                return true;
            }
        }

    }
    return false;
}