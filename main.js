const { app, BrowserWindow, session } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    // Clear cache
    session.defaultSession.clearCache().then(() => {
        console.log('Cache cleared successfully');
    }).catch((err) => {
        console.error('Failed to clear cache:', err);
    });

    // Create the main window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    // Load the app
    mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
