/* Ordena los módulos por bloque (de los cimientos al techo) y rehace la secuencia de subtemas */
(function(){const B=['Bases','Mecánica','Estructuras','Geotecnia','Agua','Vías','Gestión','Proyecto'];
 const pos=m=>{const i=B.indexOf(m.bloque);return i<0?B.length:i;};
 CUR.mods=CUR.mods.map((m,i)=>[m,i]).sort((a,b)=>pos(a[0])-pos(b[0])||a[1]-b[1]).map(x=>x[0]);
 CUR.order=[];CUR.mods.forEach(m=>m.subs.forEach(s=>CUR.order.push(s)));})();
