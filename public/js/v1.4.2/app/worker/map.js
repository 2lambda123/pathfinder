"use strict";let window={};self.importScripts(self.name);let MsgWorker=window.MsgWorker,socket=null,ports=[],characterPorts=[],initSocket=e=>{let t=new MsgWorker("ws:open");null===socket?((socket=new WebSocket(e)).onopen=(e=>{t.meta({readyState:socket.readyState}),sendToCurrentPort(t)}),socket.onmessage=(e=>{let t=JSON.parse(e.data),r=new MsgWorker("ws:send");r.task(t.task),r.meta({readyState:this.readyState,characterIds:t.characterIds}),r.data(t.load),broadcastPorts(r)}),socket.onclose=(e=>{let t=new MsgWorker("ws:closed");t.meta({readyState:socket.readyState,code:e.code,reason:e.reason,wasClean:e.wasClean}),broadcastPorts(t),socket=null}),socket.onerror=(e=>{let t=new MsgWorker("ws:error");t.meta({readyState:socket.readyState}),sendToCurrentPort(t)})):(t.meta({readyState:socket.readyState}),sendToCurrentPort(t))},sendToCurrentPort=e=>{ports[ports.length-1].postMessage(e)},broadcastPorts=e=>{let t=ports,r=e.meta();r&&r.characterIds&&"undefined"!==r.characterIds&&r.characterIds instanceof Array&&(t=getPortsByCharacterIds(r.characterIds));for(let r=0;r<t.length;r++)t[r].postMessage(e)},addPort=(e,t)=>{(t=parseInt(t))>0?characterPorts.push({characterId:t,port:e}):ports.push(e)},getPortsByCharacterIds=e=>{let t=[];for(let r=0;r<characterPorts.length;r++)for(let a=0;a<e.length;a++)characterPorts[r].characterId===e[a]&&t.push(characterPorts[r].port);return t};self.addEventListener("connect",e=>{let t=e.ports[0];addPort(t),t.addEventListener("message",e=>{let r=e.data;switch(Object.setPrototypeOf(r,MsgWorker.prototype),r.command){case"ws:init":let e=r.data();addPort(t,e.characterId),initSocket(e.uri);break;case"ws:send":let a={task:r.task(),load:r.data()};socket.send(JSON.stringify(a))}},!1),t.start()},!1);
//# sourceMappingURL=map.js.map