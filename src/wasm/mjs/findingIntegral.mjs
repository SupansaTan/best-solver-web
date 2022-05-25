
var createModule = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(createModule) {
  createModule = createModule || {};

var Module=typeof createModule!="undefined"?createModule:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject});var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=true;var ENVIRONMENT_IS_WORKER=false;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}});if(ENVIRONMENT_IS_WORKER){readBinary=(url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}})}readAsync=((url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=(()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()});xhr.onerror=onerror;xhr.send(null)})}setWindowTitle=(title=>document.title=title)}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}function getCFunc(ident){var func=Module["_"+ident];return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}ret=onDone(ret);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["a"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["k"];addOnInit(Module["asm"]["b"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync().catch(readyPromiseReject);return{}}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func=="number"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var wasmTableMirror=[];function getWasmTableEntry(funcPtr){var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["b"]).apply(null,arguments)};var _f=Module["_f"]=function(){return(_f=Module["_f"]=Module["asm"]["c"]).apply(null,arguments)};var _df=Module["_df"]=function(){return(_df=Module["_df"]=Module["asm"]["d"]).apply(null,arguments)};var _reimann=Module["_reimann"]=function(){return(_reimann=Module["_reimann"]=Module["asm"]["e"]).apply(null,arguments)};var _findReimann=Module["_findReimann"]=function(){return(_findReimann=Module["_findReimann"]=Module["asm"]["c"]).apply(null,arguments)};var _trapezoid=Module["_trapezoid"]=function(){return(_trapezoid=Module["_trapezoid"]=Module["asm"]["g"]).apply(null,arguments)};var _findTrapezoid=Module["_findTrapezoid"]=function(){return(_findTrapezoid=Module["_findTrapezoid"]=Module["asm"]["h"]).apply(null,arguments)};var _simpson=Module["_simpson"]=function(){return(_simpson=Module["_simpson"]=Module["asm"]["i"]).apply(null,arguments)};var _findSimpson=Module["_findSimpson"]=function(){return(_findSimpson=Module["_findSimpson"]=Module["asm"]["j"]).apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return(stackSave=Module["stackSave"]=Module["asm"]["l"]).apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return(stackRestore=Module["stackRestore"]=Module["asm"]["m"]).apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return(stackAlloc=Module["stackAlloc"]=Module["asm"]["n"]).apply(null,arguments)};Module["ccall"]=ccall;Module["cwrap"]=cwrap;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();


  return createModule.ready
}
);
})();
export default createModule;