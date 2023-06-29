!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";function e(e){var d=document.createElement("a");return d.href=e||window.location.href,{source:e,protocol:d.protocol.replace(":",""),host:d.hostname,port:d.port,origin:d.origin,search:d.search,query:d.search,file:(d.pathname.match(/\/([^/?#]+)$/i)||["",""])[1],hash:d.hash.replace("#",""),path:d.pathname.replace(/^([^/])/,"/$1"),relative:(d.href.match(/tps?:\/\/[^/]+(.+)/)||["",""])[1],params:function(){for(var e={},t=[],n=d.search.replace(/^\?/,"").split("&"),o=0;o<n.length;o++){var r=n[o];""!==r&&r.indexOf("=")&&t.push(r)}for(var a=0;a<t.length;a++){var i=t[a],s=i.indexOf("="),c=i.substring(0,s),i=i.substring(s+1);c?e[c]=i:e[i]=null}return e}()}}var t=["code","tree","form","text","view","preview"];let n=e(location.href).params.mode||"code";const a={editor:{mode:n=-1===t.indexOf(n)?"code":n,modes:t},hotkeys:[{desc:"自定义快捷键",key:"$mod+k $mod+s",command:"customHotkeys",disabled:!1},{desc:"保存文件",key:"$mod+s",command:"save",disabled:!1},{desc:"打开本地JSON文件",key:"$mod+o $mod+o",command:"openLocalFile",disabled:!1},{desc:"打开URL下的JSON文件",key:"$mod+o $mod+u",command:"openURL",disabled:!1},{desc:"弹窗新开一个JSON编辑器",key:"$mod+o $mod+n",command:"openNewEditor",disabled:!1},{desc:"弹窗新开一个JSON编辑器",key:"$mod+shift+m",command:"openNewEditor",disabled:!1},{desc:"弹窗新开一个JSON编辑器",key:"$mod+n",command:"openNewEditor",disabled:!1},{desc:"格式化JSON",key:"shift+alt+f",command:"formatter",disabled:!1},{desc:"压缩JSON",key:"$mod+alt+f",command:"compress",disabled:!1},{desc:"格式化JSON和压缩JSON间来回切换",key:"alt+f",command:"toggleFormatter",disabled:!1}]};function i(e){return new Promise((t,n)=>{fetch(e).then(e=>e.json()).then(e=>{t(e)}).catch(e=>{n(e)})})}function s(n,o){if(window.jsonEditorSaveHandler instanceof Function)window.jsonEditorSaveHandler(n);else if(o&&window[o]instanceof Function)window[o](n);else{let e=window.prompt("要保存的文件名："),t=(-1===e.indexOf(".")?e+=".json":"json"!==e.split(".").pop().toLowerCase()&&(e=e.split(".")[0]+".json"),n.getText());try{t=JSON.stringify(n.get(),null,2)}catch(e){if(!confirm("JSON 格式错误，继续保存？"))return;t=n.getText()}var r,o=new Blob([t],{type:"application/json;charset=utf-8"});n=o,o=e,r=document.createElement("a"),document.body.appendChild(r),r.style="display: none",n=window.URL.createObjectURL(n),r.href=n,r.download=o,r.click(),window.URL.revokeObjectURL(n),document.body.removeChild(r)}}const c=e(location.href);const d=window.Map,o=window.WeakMap;function r(e){return"[object Object]"===Object.prototype.toString.call(e)}function l(e){return Array.isArray(e)?e:void 0===e?[]:[e]}function m(e){return["ctrl","controlleft","controlright","shift","shiftleft","shiftright","alt","altleft","altright","meta","metaleft","metaright","capsLock"].includes(e.toLowerCase())}const h={ControlLeft:"ctrl",ControlRight:"ctrl",ShiftLeft:"shift",ShiftRight:"shift",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta"},u=function(){const r=new d,a=new o;return{combinationKeysState:r,getCombinationKeys:function(){const n=new d;return r.forEach((e,t)=>{!0===e&&n.set(t,e)}),n},init:function(e=window){if(!e||e!==e.self||!e.addEventListener||a.get(e))return!1;const t={};function n(e){m(e.code)&&r.set(e.code,!0)}function o(e){if(!(e instanceof KeyboardEvent))return r.forEach((e,t)=>{r.set(t,!1)}),!0;m(e.code)&&(clearTimeout(t[e.code]),t[e.code]=setTimeout(()=>{r.set(e.code,!1)},50))}e.addEventListener("keydown",n,!0),e.addEventListener("keypress",n,!0),e.addEventListener("keyup",o,!0),e.addEventListener("blur",o,!0),a.set(e,!0)}}}();class f{constructor(e,t=window){this.window=t,this.MOD="object"==typeof navigator&&/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"Meta":"Ctrl",this.prevPress=null,this._prevTimer_=null,this.setHotkeys(e),u.init(t)}setCombinationKeysMonitor(e){this.window=e,u.init(e)}hotkeysPreprocess(e){return!!Array.isArray(e)&&(e.forEach(e=>{if(!r(e)||!e.key||"string"!=typeof e.key)return!1;var t=e.key.trim().toLowerCase();const o=this.MOD.toLowerCase();e.keyBindings=t.split(" ").map(e=>{e=e.split(/\b\+/);const t=[];let n="";return e.forEach(e=>{m(e="$mod"===e?o:e)?t.push(e):n=e}),[t,n]})}),e)}setHotkeys(e){this.hotkeys=this.hotkeysPreprocess(e)||[]}isMatch(e,t){if(!e||!Array.isArray(t))return!1;var n=e.combinationKeys||u.getCombinationKeys(),o=t[0],t=t[1];if(o.length!==n.size)return!1;if(t&&e.key.toLowerCase()!==t&&e.code.toLowerCase()!==t)return!1;let r=!0;const a=new d;return n.forEach((e,t)=>{a.set(t,e),a.set(t.toLowerCase(),e),h[t]&&a.set(h[t],e)}),o.forEach(e=>{a.has(e)||(r=!1)}),r}isMatchPrevPress(e){return this.isMatch(this.prevPress,e)}run(a={}){var e=this.window.KeyboardEvent;if(!(a.event instanceof e))return!1;const i=a.event,s=a.target||null,c=a.conditionHandler||a.whenHandler;let d=null;return this.hotkeys.forEach(e=>{if(e.disabled||!e.keyBindings)return!1;let t=e.keyBindings[0];if(this.prevPress&&(e.keyBindings.length<=1||!this.isMatchPrevPress(t)))return!1;if(this.prevPress&&1<e.keyBindings.length&&this.isMatchPrevPress(t)&&(t=e.keyBindings[1]),!this.isMatch(i,t))return!1;d=e;var n=a.stopPropagation||e.stopPropagation,o=a.preventDefault||e.preventDefault;if(n&&i.stopPropagation(),o&&i.preventDefault(),t===e.keyBindings[0]&&1<e.keyBindings.length)return this.prevPress={combinationKeys:u.getCombinationKeys(),code:i.code,key:i.key,keyCode:i.keyCode,altKey:i.altKey,shiftKey:i.shiftKey,ctrlKey:i.ctrlKey,metaKey:i.metaKey},clearTimeout(this._prevTimer_),this._prevTimer_=setTimeout(()=>{this.prevPress=null},1e3),!0;1<e.keyBindings.length&&t!==e.keyBindings[0]&&setTimeout(()=>{this.prevPress=null},0);n=l(e.args);let r=e.command;if(!((r=s&&"string"==typeof e.command?function(e,t){var n=(t=t||"").split(".");let o=e;for(let e=0;e<n.length&&o;e++)o=o[n[e]];return o}(s,e.command):r)instanceof Function)&&s)throw new Error(`[hotkeysRunner] 未找到command: ${e.command} 对应的函数`);e.when&&c instanceof Function&&!0!==c.apply(s,l(e.when))||r.apply(s,n)}),d}binding(t={}){if(!r(t)||!Array.isArray(t.hotkeys))throw new Error("[hotkeysRunner] 提供给binding的参数不正确");t.el=t.el||this.window,t.type=t.type||"keydown",t.debug&&(this.debug=!0),this.setHotkeys(t.hotkeys),"string"==typeof t.el&&(t.el=document.querySelector(t.el)),t.el.addEventListener(t.type,e=>{t.event=e,this.run(t)},!0)}}const p=e(location.href);t=async function(){let n=null,o={};var r,e=document.getElementById("jsoneditor");if(n=new window.JSONEditor(e,{mode:a.editor.mode,modes:a.editor.modes,search:!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),mainMenuBar:!0,navigationBar:!0,statusBar:!0,onModeChange:function(e,t){o.createSaveButton(),"true"===p.params.expandAll&&n.expandAll()}}),window.jsonEditor=n,(o=(r=n,{async getDefaultText(){let t={Array:[1,2,3],Boolean:!0,Null:null,Number:123,Object:{a:"b",c:"d"},Corlor:"#FF0000",String:"Hello World",Hello:"这是JSON示例数据"};if(c.params.url){var n=decodeURIComponent(c.params.url);try{t=await i(n)}catch(e){console.error("URL获取到的JSON数据异常：",e,n),alert(`URL获取到的JSON数据异常：${n}  `+e)}}if(c.params.json){n=decodeURIComponent(c.params.json);try{t=JSON.parse(n)}catch(e){t=n,console.error("JSON parse error:",e,n),alert(`URL参数里的JSON数据格式异常： ${n}  `+e)}}return t="object"==typeof t?JSON.stringify(t,null,2):t},save(){s(r,c.params.saveHandlerName)},formatter(){try{var e=r.get(),t=JSON.stringify(e,null,2);r.setText(t)}catch(e){alert("JSON 格式错误，无法格式化： "+e),console.error("JSON 格式错误，无法格式化：",e)}},compress(){try{var e=r.get(),t=JSON.stringify(e);r.setText(t)}catch(e){alert("JSON 格式错误，无法压缩： "+e),console.error("JSON 格式错误，无法压缩：",e)}},toggleFormatter(){try{var e,t=r.get(),n=JSON.stringify(t,null,2);r.getText().trim().length===n.length?(e=JSON.stringify(t),r.setText(e)):r.setText(n)}catch(e){alert("JSON 格式错误，无法格式化： "+e),console.error("JSON 格式错误，无法格式化：",e)}},customHotkeys(){r.set(a.hotkeys)},openURL(){const t=prompt("请输入URL地址");t&&i(t).then(e=>{r.set(e)}).catch(e=>{alert(`URL获取到的JSON数据异常：${t}  `+e),console.error("URL获取到的JSON数据异常：",e,t)})},openLocalFile(){const n=document.createElement("input");n.type="file",n.accept="application/json",n.onchange=function(){var e,t=n.files[0];t&&((e=new FileReader).onload=function(e){e=JSON.parse(e.target.result);r.set(e)},e.readAsText(t))},n.click()},openNewEditor(){window.open(location.href,"_blank","width=1024,height=768")},createSaveButton(){var e;r.menu.querySelector(".jsoneditor-save")||((e=document.createElement("button")).className="jsoneditor-save",e.innerText="💾",e.style="background-image: none; border: 1px dashed #aaa; border-radius: 3px;",e.onclick=()=>{this.save()},r.menu.insertBefore(e,r.menu.firstChild))}})).createSaveButton(),p.params.loadJsonHandlerName&&window[p.params.loadJsonHandlerName]instanceof Function)try{var t=await window[p.params.loadJsonHandlerName]();n.set(t)}catch(e){console.error(p.params.loadJsonHandlerName+" error:",e),alert(p.params.loadJsonHandlerName+" error: "+e)}else n.setText(await o.getDefaultText());return"true"===p.params.expandAll&&n.expandAll(),await 0,(new f).binding({el:document.documentElement,type:"keydown",hotkeys:a.hotkeys,target:o,stopPropagation:!0,preventDefault:!0,debug:!0,conditionHandler(e){if(e)return!0}}),o}();t.init instanceof Function||(t.init=function(){}),t.init()});
