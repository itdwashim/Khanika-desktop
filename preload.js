const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('desktop',{
  read:k=>ipcRenderer.invoke('read',k),
  write:(k,j)=>ipcRenderer.invoke('write',k,j),
  saveAs:(n,b)=>ipcRenderer.invoke('saveAs',n,b),
  openBackups:()=>ipcRenderer.invoke('openBackups'),
  refocus:()=>ipcRenderer.invoke('refocus'),
  copyText:t=>ipcRenderer.invoke('copyText',t),
  sharePdf:(n,b,c)=>ipcRenderer.invoke('sharePdf',n,b,!!c),
  fetchText:u=>ipcRenderer.invoke('fetchText',u),
  postJson:(u,b)=>ipcRenderer.invoke('postJson',u,b)});
