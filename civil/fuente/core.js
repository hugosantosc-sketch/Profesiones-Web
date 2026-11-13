/* Motor de contenido: currículo, generadores deterministas y formato */
const CUR={mods:[],subs:{},order:[]};
const NIVELES=['Básico','Aplicación','Intermedio','Avanzado','Reto'];
const POR_NIVEL=12;
let _modActual=null;
function MOD(id,t,bloque,intro,libros,equiv){_modActual={id,t,bloque,intro,libros,equiv,subs:[]};CUR.mods.push(_modActual);}
function SUB(id,d){d.id=id;d.mod=_modActual.id;_modActual.subs.push(id);CUR.subs[id]=d;CUR.order.push(id);}
const PI=Math.PI,sq=Math.sqrt,rad=d=>d*PI/180,sind=d=>Math.sin(rad(d)),cosd=d=>Math.cos(rad(d)),tand=d=>Math.tan(rad(d)),atand=x=>Math.atan(x)*180/PI,G=9.81;
function n(x,s=4){if(!isFinite(x))return String(x);const v=Number(x.toPrecision(s));return String(v);}
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function RNG(seed){let a=seed>>>0;const u=()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
 return{u,
  i:(a0,b,st=1)=>{const k=Math.floor((b-a0)/st+1e-9)+1;return +(a0+st*Math.floor(u()*k)).toFixed(6);},
  p:arr=>arr[Math.floor(u()*arr.length)]};}
const _cache={};
/* Tolerancia estricta donde el 2 % aceptaría respuestas erradas: conteos y cotas */
const TOL={det:[0,0,0,0,0],arm:[0],pol:[0],cpm:[,0,0,0],niv:[.00002,.00002,.00002],ver:[0,0,.00002,,.00002],hor:[,,,.0002]};
function ejercicios(id){if(_cache[id])return _cache[id];const S=CUR.subs[id],out=[],vistos=new Set();
 S.g.forEach((lv,li)=>{const arr=Array.isArray(lv)?lv:[lv];
  for(let k=0;k<POR_NIVEL;k++){const f=arr[k%arr.length];let e=null;
   for(let salt=0;salt<400;salt++){const c=f(RNG(hash(id+'|'+li+'|'+k+'|'+salt)));if(!vistos.has(c.q)){vistos.add(c.q);e=c;break;}}
   if(!e)e=Object.assign(f(RNG(hash(id+li+k))),{dup:true});
   e.lv=li;e.num=out.length+1;const tf=TOL[id]&&TOL[id][li];if(tf!==undefined)e.tol=tf;e.key=id+':'+e.num;out.push(e);}});
 return _cache[id]=out;}
function correcto(e,val){if(val===null||!isFinite(val))return false;const t=e.tol??0.02;return Math.abs(val-e.a)<=Math.max(t*Math.abs(e.a),1e-3);}
/* Mini sintaxis de fórmulas: _{x} ^{x} [[a|b]] √{x} */
function fm(s){if(s==null)return'';let t=String(s),prev;
 do{prev=t;
  t=t.replace(/\[\[([^\[\]|]*)\|([^\[\]|]*)\]\]/g,'<span class="fr"><span>$1</span><span>$2</span></span>');
  t=t.replace(/√\{([^{}]*)\}/g,'√<span class="rad">$1</span>');
  t=t.replace(/_\{([^{}]*)\}/g,'<sub>$1</sub>');
  t=t.replace(/\^\{([^{}]*)\}/g,'<sup>$1</sup>');
 }while(t!==prev);return t;}
/* Texto de lección: ## título, - lista, **negrita**, párrafos con línea en blanco */
function md(s){const out=[];s.trim().split(/\n\s*\n/).forEach(b=>{b=b.trim();
  if(b.startsWith('## ')){const i=b.indexOf('\n');out.push('<h3>'+inl(i<0?b.slice(3):b.slice(3,i))+'</h3>');if(i<0)return;b=b.slice(i+1).trim();}
  if(b.startsWith('- '))out.push('<ul>'+b.split(/\n/).map(l=>'<li>'+inl(l.replace(/^- /,''))+'</li>').join('')+'</ul>');
  else out.push('<p>'+inl(b)+'</p>');});return out.join('');}
function inl(s){return fm(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');}
/* Deducciones, preguntas de criterio y referencias que se agregan a subtemas ya creados */
function DED(id,t){CUR.subs[id].ded=t;}
function CRI(id,a){const S=CUR.subs[id];S.cri=(S.cri||[]).concat(a);}
function REF(id,a){const S=CUR.subs[id];S.ref=(S.ref||[]).concat(a);}
if(typeof module!=='undefined')module.exports={};
