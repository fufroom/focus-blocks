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
        width: 500,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });


    mainWindow.loadFile('index.html');

     mainWindow.webContents.executeJavaScript(`
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    `);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
