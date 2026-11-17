const {app,BrowserWindow,ipcMain,dialog,shell,clipboard}=require('electron');
const path=require('path'),fs=require('fs');
const MAIN='khanika-hostel-v1';
const safeKey=k=>String(k||MAIN).replace(/[^A-Za-z0-9_-]/g,'')||MAIN;
const dataFile=k=>{k=safeKey(k);return path.join(app.getPath('userData'),k===MAIN?'khanika-data.json':'khanika-data-'+k+'.json')};
const backupDir=()=>path.join(app.getPath('documents'),'Khanika Backups');
let win=null;
// Windows can leave the page without keyboard focus after a native dialog (alert / confirm / save box) or after another
// program was opened on top; typing then does nothing until the app is restarted. Giving focus back fixes it.
const refocus=()=>{try{if(!win||win.isDestroyed())return;if(!win.isFocused()){win.focus()}else{win.blur();win.focus()}win.webContents.focus()}catch(x){}};
function createWindow(){
  const w=new BrowserWindow({width:1280,height:850,title:'Khanika Hostel Manager',
    webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}});
  win=w;
  w.setMenuBarVisibility(false);
  w.on('focus',()=>{try{w.webContents.focus()}catch(x){}});
  w.on('closed',()=>{win=null});
  w.webContents.setWindowOpenHandler(({url})=>{if(/^(https?|mailto|sms|tel):/.test(url))shell.openExternal(url);return {action:'deny'}});
  w.loadFile(path.join(__dirname,'app','index.html'));
}
// Data: one file per property, plus a daily backup copy in Documents\Khanika Backups
ipcMain.handle('read',(e,k)=>{const f=dataFile(k);return fs.existsSync(f)?fs.readFileSync(f,'utf8'):null});
ipcMain.handle('write',(e,k,json)=>{
  const f=dataFile(k);fs.writeFileSync(f+'.tmp',json);fs.renameSync(f+'.tmp',f);
  fs.mkdirSync(backupDir(),{recursive:true});
  const key=safeKey(k),tag=key===MAIN?'':key.replace(/^khanika-p-/,'')+'-',d=new Date().toISOString().slice(0,10);
  fs.writeFileSync(path.join(backupDir(),`khanika-backup-${tag}${d}.json`),json);
  const re=new RegExp('^khanika-backup-'+tag+'\\d{4}-\\d{2}-\\d{2}\\.json$');
  fs.readdirSync(backupDir()).filter(n=>re.test(n)).sort().slice(0,-60)
    .forEach(n=>fs.unlinkSync(path.join(backupDir(),n)));
  return true;
});
const viewable=/\.(pdf|jpe?g|png|gif|webp)$/i;
ipcMain.handle('saveAs',async(e,name,buf)=>{
  if(viewable.test(name)){
    const dir=path.join(app.getPath('documents'),'Khanika Files');
    fs.mkdirSync(dir,{recursive:true});
    const safe=name.replace(/[\\/:*?"<>|]/g,'_');
    let f=path.join(dir,safe);
    if(fs.existsSync(f)){const p=path.parse(safe);f=path.join(dir,p.name+'-'+Date.now()+p.ext)}
    fs.writeFileSync(f,Buffer.from(buf));
    const err=await shell.openPath(f);
    if(err)dialog.showErrorBox('Could not open the file','It was saved here:\n'+f);
    setTimeout(refocus,300);
    return f;
  }
  const r=await dialog.showSaveDialog(win||undefined,{defaultPath:path.join(app.getPath('documents'),name)});
  refocus();
  if(r.canceled)return false;fs.writeFileSync(r.filePath,Buffer.from(buf));return r.filePath;
});
// Share a PDF: save a copy in Documents\Khanika Files, then show it in its folder (copy=false)
// or put the file on the clipboard so it can be pasted into WhatsApp / an email (copy=true, Windows).
ipcMain.handle('sharePdf',async(e,name,buf,copy)=>{
  const dir=path.join(app.getPath('documents'),'Khanika Files');
  fs.mkdirSync(dir,{recursive:true});
  const safe=String(name||'document.pdf').replace(/[\\/:*?"<>|]/g,'_');
  let f=path.join(dir,safe);
  if(fs.existsSync(f)){const p=path.parse(safe);f=path.join(dir,p.name+'-'+Date.now()+p.ext)}
  fs.writeFileSync(f,Buffer.from(buf));
  let copied=false;
  if(copy){try{if(process.platform==='win32'){clipboard.writeBuffer('FileNameW',Buffer.from(f+'\0','ucs2'));copied=true}}catch(x){}}
  else shell.showItemInFolder(f);
  setTimeout(refocus,300);
  return {path:f,copied};
});
ipcMain.handle('openBackups',()=>{fs.mkdirSync(backupDir(),{recursive:true});shell.openPath(backupDir())});
ipcMain.handle('refocus',()=>{refocus();return true});
ipcMain.handle('copyText',(e,t)=>{try{clipboard.writeText(String(t||''));return true}catch(x){return false}});
// Holiday list update: fetch a web page and return its text (tables become "a | b | c" lines)
ipcMain.handle('fetchText',async(e,url)=>{
  if(!/^https?:\/\//i.test(url))throw new Error('Only http and https addresses are allowed');
  const ac=new AbortController(),tm=setTimeout(()=>ac.abort(),20000);
  try{
    const r=await fetch(url,{signal:ac.signal,headers:{'User-Agent':'Mozilla/5.0 KhanikaHostelManager'}});
    if(!r.ok)throw new Error('The website answered with status '+r.status);
    let t=await r.text();
    t=t.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi,' ')
       .replace(/<\/(td|th)>/gi,' | ').replace(/<\/(tr|p|div|li|h[1-6]|table)>/gi,'\n')
       .replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,' ')
       .replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&#39;|&apos;/gi,"'").replace(/[ \t]+/g,' ');
    return t.slice(0,600000);
  }finally{clearTimeout(tm)}
});
// Website sync: POST a JSON message to the Google Apps Script web app (desktop only)
ipcMain.handle('postJson',async(e,url,body)=>{
  if(!/^https:\/\/script\.google(usercontent)?\.com\//i.test(url))throw new Error('The address must be a Google Apps Script web app address (https://script.google.com/...)');
  const ac=new AbortController(),tm=setTimeout(()=>ac.abort(),60000);
  try{
    const r=await fetch(url,{method:'POST',signal:ac.signal,headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body),redirect:'follow'});
    const t=await r.text();
    try{return JSON.parse(t)}catch(x){throw new Error('The website returned an unexpected reply. Check the address, and that it is deployed for Anyone.')}
  }finally{clearTimeout(tm)}
});
app.whenReady().then(createWindow);
app.on('window-all-closed',()=>app.quit());
