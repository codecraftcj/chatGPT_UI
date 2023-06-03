// main.js

// Modules to control application life and create native browser window

const { app, BrowserWindow, ipcMain } = require('electron');
const {PythonShell} = require("python-shell")
const path = require('path')

const env = process.env.NODE_ENV || 'development';
const pyshell = new PythonShell("script.py")


    
// If development environment
if (env === 'development') {
  try {
    require('electron-reloader')(module, {
        debug: true,
        watchRenderer: true
    });
} catch (_) { console.log('Error'); }  
}
const handleSetTitle = (event, title) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
  console.log(title)
  win.webContents.executeJavaScript(`console.log('${title}')`)
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.on("run-python",(event,func_message) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    pyshell.send(func_message);
    
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
        win.webContents.executeJavaScript(`console.log('${message}')`)
    });
  })
  createWindow()
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.