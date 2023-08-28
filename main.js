const { app, Menu, MenuItem, BrowserWindow, clipboard } = require('electron');
const path = require('path');
const { app: server } = require('./index');
// npx electron-packager . Anh-Tuan --platform=win32 --arch=x64
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  const template = [
    { label: 'Dán', role: 'paste' },
    { label: 'Sao Chép', role: 'copy' },
    { label: 'Cắt', role: 'cut' },
  ];

  const editMenu = Menu.buildFromTemplate(template);

  win.loadFile('index.html');

  win.webContents.on('context-menu', (e, props) => {
    editMenu.popup(win, props.x, props.y);
  });
  // Khởi chạy child process để chạy server Express
  server.listen(3001, () => {
    console.log(`Server is on port 3001 !!!`);
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
