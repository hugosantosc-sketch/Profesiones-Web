const fs=require('fs'),vm=require('vm');
let c='';for(const f of ['core',...Array.from({length:40},(_,i)=>'c'+(i+1)),'orden'].filter(f=>fs.existsSync(f+'.js')))c+=fs.readFileSync(f+'.js','utf8')+'\n';
vm.runInThisContext(c+';globalThis.CUR=CUR;globalThis.ejercicios=ejercicios;globalThis.correcto=correcto;globalThis.fm=fm;');
let tot=0,prob=[];
for(const id of CUR.order){const S=CUR.subs[id];
 if(S.g.length!==5)prob.push(id+' niveles '+S.g.length);
 for(const[t]of S.x||[])if(!CUR.subs[t])prob.push(id+' enlace roto '+t);
 const e=ejercicios(id);tot+=e.length;
 const d=e.filter(x=>x.dup).length,b=e.filter(x=>!isFinite(x.a)||typeof x.a!=='number');
 if(e.length<50)prob.push(id+' pocos');if(d)prob.push(id+' dup '+d);if(b.length)prob.push(id+' NaN '+b.length+' '+b[0].q);
 for(const x of e){if(!Array.isArray(x.s)||!x.s.length)prob.push(id+' sin pasos');if(/undefined|NaN|Infinity/.test(x.q+x.s.join()))prob.push(id+' txt '+x.num+': '+(x.q+x.s.join()).slice(0,130));if(!correcto(x,x.a))prob.push(id+' autoverif');}
}
console.log('módulos',CUR.mods.length,'subtemas',CUR.order.length,'ejercicios',tot);
console.log([...new Set(prob)].slice(0,60).join('\n')||'sin problemas');
for(const id of CUR.order){const e=ejercicios(id);const per={};e.forEach(x=>{(per[x.lv]=per[x.lv]||[]).push(x)});
 Object.entries(per).forEach(([lv,a])=>{const d=a.filter(x=>x.dup).length;if(d)console.log('DUP',id,'L'+(+lv+1),d);const v=a.map(x=>x.a);const mn=Math.min(...v),mx=Math.max(...v);if(mn<0&&!['vec','crs','hip','apu','cpm','vpn','pol','num','edo','der','sis','pro','pta','res2','vm'].includes(id))console.log('NEG',id,'L'+(+lv+1),n(mn),a[v.indexOf(mn)].q.slice(0,120));});
}
