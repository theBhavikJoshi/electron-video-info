const { app, BrowserWindow, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');
let mainWindow;
app.on('ready', () => {
  console.log('Hey!');
  mainWindow = new BrowserWindow({});
  mainWindow.loadFile('index.html');
});

ipcMain.on('video:submit', (e, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log(metadata);
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  })
})