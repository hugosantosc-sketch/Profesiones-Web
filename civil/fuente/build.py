js=''.join(open(f+'.js',encoding='utf8').read().replace("if(typeof module!=='undefined')module.exports={};","")+'\n' for f in ['core','c1','c2','c3','c4','app'])
assert '</script' not in js
h=open('shell.html',encoding='utf8').read().replace('/*JS*/',js)
head='<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="description" content="Aprende ingeniería civil desde cero: 21 módulos, 90 subtemas y 5400 ejercicios autocorregidos.">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}img{max-width:100%}[hidden]{display:none!important}body{margin:0}</style>\n'
i=h.index('<header class="top">')
import os
os.makedirs('../civil',exist_ok=True)
open('../civil/index.html','w',encoding='utf8').write(head+h[:i]+'</head>\n<body>\n'+h[i:]+'\n</body>\n</html>\n')
print('Listo: ../civil/index.html',len(h)//1024,'KB')
