const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    log: (message) => ipcRenderer.send('log-message', message),
    playSound: (type) => ipcRenderer.send('play-sound', type),
});
