const fs=require('fs'),path=require('path');
const out=path.join(__dirname,'..','app','vendor');fs.mkdirSync(out,{recursive:true});
const pick=l=>l.map(p=>path.join(__dirname,'..','node_modules',p)).find(fs.existsSync);
[['jspdf.umd.min.js',['jspdf/dist/jspdf.umd.min.js']],
 ['xlsx.full.min.js',['xlsx/dist/xlsx.full.min.js']],
 ['qrcode.min.js',['qrcode-generator/dist/qrcode.js','qrcode-generator/qrcode.js']]
].forEach(([n,l])=>{const f=pick(l);if(!f)throw new Error('Missing library: '+n);fs.copyFileSync(f,path.join(out,n))});
console.log('Libraries copied for offline use.');
