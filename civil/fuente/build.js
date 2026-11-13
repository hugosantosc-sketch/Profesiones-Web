// Une la app en un solo archivo: ../index.html (equivale a build.py, pero solo necesita Node)
const fs=require('fs'),path=require('path');process.chdir(__dirname);
const files=['core',...Array.from({length:40},(_,i)=>'c'+(i+1)),'orden','app'].filter(f=>fs.existsSync(f+'.js'));
const js=files.map(f=>fs.readFileSync(f+'.js','utf8').replace("if(typeof module!=='undefined')module.exports={};","")+'\n').join('');
if(js.includes('</script'))throw new Error('Un archivo contiene </script');
const h=fs.readFileSync('shell.html','utf8').replace('/*JS*/',()=>js);
const desc=fs.readFileSync('build.py','utf8').match(/name="description" content="([^"]*)"/)[1];
const head='<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="description" content="'+desc+'">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}img{max-width:100%}[hidden]{display:none!important}body{margin:0}</style>\n';
const i=h.indexOf('<header class="top">');
fs.writeFileSync(path.join('..','index.html'),head+h.slice(0,i)+'</head>\n<body>\n'+h.slice(i)+'\n</body>\n</html>\n','utf8');
console.log('Listo: ../index.html',Math.floor(h.length/1024),'KB');
