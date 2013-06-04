/*
 * tipJS - OpenSource Javascript MVC Framework ver.1.43
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */
(function(Z){var au={};au.ver=au.version=au.VERSION="1.43";Z.tipJS=au;var u=Object.prototype.toString;var Y=["Arguments","Function","String","Number","Boolean","Date","RegExp"];for(var s=0,an=Y.length;s<an;s++){(function(i){au["is"+i]=function(t){return u.call(t)==="[object "+i+"]"}})(Y[s])}au.isArray=Array.isArray||function(i){return u.call(i)==="[object Array]"};au.isObject=function(i){return i===Object(i)};var at=function(t,i){return !i?document.getElementById(t):i.getElementById(t)};var aj=function(i,t){return !t?document.getElementsByName(i):t.getElementsByName(i)};var aa=function(i,t){return !t?document.getElementsByTagName(i):t.getElementsByTagName(i)};var q=function(aA){var az=[];if(aA.length){for(var ay=0,t=aA.length;ay<t;ay++){az[ay]=aA[ay]}}return az};var ak=function(i){return"Please : define "+i};var R=function(t,ay){for(var i in ay){if(t[i]){continue}t[i]=ay[i]}return t};var S=function(az,t){if(au.isArray(az)){for(var ay=az.length;ay--;){if(az[ay]==t){return true}}}else{if(az==t){return true}}return false};var O=function(aA,ay){if(!au.isObject(ay)){throw new Error(ak(aA))}var t=(ay.__name)?ay.__name:ay.name;if(!au.isString(t)){throw new Error(ak(aA))}if(ay.__extend&&aA!="controllers"&&aA!="interceptors"&&S(ay.__extend,t)){throw new Error("Can't extend itself: "+t)}var az=t.split("."),aB=az[0],i=az[1],aD=d[aB];if(!aD){throw new Error(ak(aA))}if(aD.loadOrder.presentOrder()===aA){var aC=x[aB]=x[aB]||{};aC[aA]=aC[aA]||{};aC[aA][i]=ay}};var M=function(aC,ay){var t=y.loadOrder;if(ay===t.order[0]){return K(aC[ay])}var aB=aC.name;if(d.MAIN&&d.MAIN!=aB&&ay!="models"){return[]}if(ay===t.order[1]&&aC.localSet){aC[ay]=[ac+T.path.lang+"/"+au.lang+".js"];return aC[ay]}var aA=T.path[ay],az=T.applicationPath[aB],i=K(aC[ay]);return P(az,aA,i)};var P=function(az,aB,aA){var ay=[];for(var t=aA.length;t--;){ay.push(az+"/"+aB+"/"+aA[t])}return ay};var N=function(t,i){if(i.nocache===true){t+=(t.indexOf("?")<0)?"?":"&";t+=i.paramName+"="+i.version}return t};var m=au.loadJS=function(az,ay,t){var i=document.createElement("script");i.type="text/javascript";i.src=N(az,ay);i.charset=T.charSet;if(t){if(i.readyState){i.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyState=="complete"){this.onreadystatechange=null;t(this)}}}else{i.onload=function(){t(this)}}}aa("head")[0].appendChild(i)};var ad=function(i,ay,t){m(t,J(i),function(az){if(av(i,ay,az.src)){ao(i)}})};var l=function(t,az){p(t,az);var aA=A[t][az].requireList=M(w(t),az);if(aA.length>0){for(var ay=aA.length;ay--;){ad(t,az,aA[ay])}}else{ao(t)}};var ar=function(aA,az){var t=aA.__extend;if(!t){return aA}if(au.isString(t)){aA=U(aA,t,az)}else{if(t instanceof Array){for(var ay=t.length;ay--;){aA=U(aA,t[ay],az)}}}return aA};var U=function(az,ay,t){var i=ay.split(".");if(t=="model"){if(i.length==2){return R(az,b(af(i[1],false,i[0])))}else{return R(az,b(W(ay)))}}else{if(i.length==2){return R(az,b(I(i[1],i[0])))}else{return R(az,b(H(ay)))}}};var W=au.loadCommonModel=function(t,aB){var az=F;if(!az[t]||az[t]===undefined){throw new Error("Can't find commonModel: "+t)}if(aB===true){var ay=ap;if(ay[t]){return ay[t]}var i=ay[t]=b(az[t],ah["CommonModel"+t]);if(typeof i.__init=="function"){i.__init()}return i}var aA=b(az[t],ah["CommonModel"+t]);if(au.isFunction(aA.__init)){aA.__init()}return aA};var af=function(ay,aD,t){var aC=(!t)?d.MAIN:t,aA=x[aC].models;if(!aA[ay]||aA[ay]===undefined){throw new Error("Can't find model: "+ay)}if(aD===true){var az=x[aC].syncModels;if(!az){az=x[aC].syncModels={}}if(az[ay]){return az[ay]}var i=az[ay]=b(aA[ay],ah["models"+aC+"."+ay]);if(au.isFunction(i.__init)){i.__init()}return i}var aB=b(aA[ay],ah["models"+aC+"."+ay]);if(au.isFunction(aB.__init)){aB.__init()}return aB};var H=function(ay){var t=ai;if(!t||!t[ay]||t[ay]===undefined){throw new Error("Can't find commonView: "+ay)}var i=b(t[ay],ah["CommonView"+ay]);if(au.isFunction(i.__init)){i.__init()}return i};var I=function(aA,i){var az=(!i)?d.MAIN:i,ay=x[az].views;if(!ay||!ay[aA]||ay[aA]===undefined){throw new Error("Can't find view: "+aA)}var t=b(ay[aA],ah["views"+az+"."+aA]);if(au.isFunction(t.__init)){t.__init()}return t};au.loadModel=function(t,aA){var ay,az,i,aB=(au.isBoolean(aA))?aA:false;if((ay=t.split(".")).length!=2){throw new Error("tipJS.loadModel : invalid parameter")}az=ay[0];i=ay[1];return af(i,aB,az)};var w=function(i){return d[i].define};var J=function(i){var ay={};var t=w(i);if(t){ay.nocache=t.noCache;ay.version=(t.noCacheAuto===true)?""+Math.random():t.noCacheVersion;ay.paramName=t.noCacheParam}return ay};var D=function(){var az,aB,i,t,ay,aA;for(az in d){ae[az]={};aB=d[az];i=aB.controller;for(t in i){ay=b(i[t]);aA={controllerName:(ay.__name)?ay.__name:ay.name,beforeCtrler:aB.define.beforeController,afterCtrler:aB.define.afterController,loadCommonModel:ay.loadCommonModel,loadCommonView:ay.loadCommonView,loadModel:ay.loadModel,loadView:ay.loadView,renderTemplate:ay.renderTemplate,getById:ay.getById,getByName:ay.getByName,getByTag:ay.getByTag};ae[az][t]=(function(aD,aC){return function(){var aF=arguments,aG,aE;if(au.isDevelopment===true){aG=V()}if(aD.beforeCtrler&&aD.beforeCtrler.apply(aD,arguments)===false){return}aE=function(){var aI=function(){var aL=function(){if(aC.afterInvoke){aC.afterInvoke.apply(aC,aF)}};var aJ=function(){if(aC.invoke&&aC.invoke.apply(aC,aF)===false){return}aL()};var aK=function(){if(aC.beforeInvoke&&aC.beforeInvoke.apply(aC,aF)===false){return}aJ()};aK()};if(aC.exceptionInvoke){try{aI()}catch(aH){(aF=q(aF)).unshift(aH);aC.exceptionInvoke.apply(aC,aF)}}else{aI()}if(aD.afterCtrler){aD.afterCtrler.apply(aD,aF)}if(au.isDevelopment===true){au.debug(aD.controllerName+" completed in "+((V()-aG)/1000)+" seconds")}};if(aC.async===true){setTimeout(aE,(!aC.delay?15:aC.delay))}else{aE()}}})(aA,ay)}}};var f=function(ay){var aB,aD=x[ay].interceptors,t,i,aA,aC;for(var az in aD){t=i=aA=[];aB=aD[az];aC=(aB.order)?aB.order:0;if(aB.target){t=(au.isArray(aB.target))?aB.target:[aB.target]}if(aB.before){i=(au.isArray(aB.before))?aB.before:[aB.before]}if(aB.after){aA=(au.isArray(aB.after))?aB.after:[aB.after]}ag.push({order:aC,scope:t,before:i,after:aA})}ag.sort(function(aE,aF){return aE.order-aF.order})};var B=function(t,i,ay){return function(){var aA=ay.before;for(var aB=0,az=aA.length;aB<az;aB++){aA[aB].apply(i,arguments)}t.apply(i,arguments)}};var j=function(t,i,ay){return function(){var aB=ay.after;t.apply(i,arguments);for(var aA=0,az=aB.length;aA<az;aA++){aB[aA].apply(i,arguments)}}};var ax=function(aE,aD,aH,aA,t){var aC=aH.split("."),az=x[aE][aD];if(aC.length==1&&(aD==aH||aD+"*"==aH)){for(var ay in az){var aB=az[ay];for(var i in aB){if(au.isFunction(aB[i])){aB[i]=t(aB[i],aB,aA)}}}}else{if(aC.length==2&&aD==aC[0]){var aG=aC[1];for(var ay in az){if(ay==aG||(aG.indexOf("*")>0&&ay.indexOf(aG.substr(0,aG.indexOf("*")))==0)){var aB=az[ay];for(var i in aB){if(au.isFunction(aB[i])){aB[i]=t(aB[i],aB,aA)}}}}}else{if(aC.length==3&&aD==aC[0]){var aG=aC[1],aF=aC[2];for(var ay in az){if(ay==aG){var aB=az[ay];for(var i in aB){if(i==aF||(aF.indexOf("*")>0&&i.indexOf(aF.substr(0,aF.indexOf("*")))==0)){if(au.isFunction(aB[i])){aB[i]=t(aB[i],aB,aA)}}}}}}}}};var r=function(ay,aD){for(var aC=ag.length;aC--;){var aB=ag[aC],aE=aB.scope;for(var aA=0,az=aE.length;aA<az;aA++){ax(ay,aD,aE[aA],aB,B)}}for(var aC=0,t=ag.length;aC<t;aC++){var aB=ag[aC],aE=aB.scope;for(var aA=0,az=aE.length;aA<az;aA++){ax(ay,aD,aE[aA],aB,j)}}};var ao=function(aF){var ay,aH,aB=d[aF];if(aB.loadOrder.isLastOrder()===false){l(aF,aB.loadOrder.nextOrder());return}if(d.MAIN!=aF){return}f(aF);var aA=aB.controller=x[aF].controllers;if(aA){r(aF,"controllers");for(ay in aA){aA[ay].loadCommonModel=W;aA[ay].loadCommonView=H;aA[ay].loadModel=af;aA[ay].loadView=I;aA[ay].renderTemplate=e;aA[ay].getById=at;aA[ay].getByName=aj;aA[ay].getByTag=aa}D()}for(ay in F){aH=(F[ay].__name)?F[ay].__name:F[ay].name;ar(F[ay],"model");if(aH.lastIndexOf("VO")!=(aH.length-2)){F[ay].loadCommonModel=W;F[ay].getById=at;F[ay].getByName=aj;F[ay].getByTag=aa}ah["CommonModel"+aH]=!v(F[ay])}var aC=x[aF].models;if(aC){r(aF,"models");for(ay in aC){aH=(aC[ay].__name)?aC[ay].__name:aC[ay].name;ar(aC[ay],"model");if(aH.lastIndexOf("VO")!=(aH.length-2)){aC[ay].loadCommonModel=W;aC[ay].loadModel=af;aC[ay].getById=at;aC[ay].getByName=aj;aC[ay].getByTag=aa}ah["models"+aH]=!v(aC[ay])}}for(ay in ai){aH=(ai[ay].__name)?ai[ay].__name:ai[ay].name;ar(ai[ay],"view");ai[ay].loadCommonView=H;ai[ay].renderTemplate=e;ai[ay].getById=at;ai[ay].getByName=aj;ai[ay].getByTag=aa;ah["CommonView"+aH]=!v(ai[ay])}var t=x[aF].views;if(t){r(aF,"views");for(ay in t){aH=(t[ay].__name)?t[ay].__name:t[ay].name;ar(t[ay],"view");t[ay].loadCommonView=H;t[ay].loadView=I;t[ay].renderTemplate=e;t[ay].getById=at;t[ay].getByName=aj;t[ay].getByTag=aa;ah["views"+aH]=!v(t[ay])}}au.debug("tipJS version "+au.version+"["+au.lang+"]");if(!au.isArray(aB.onLoadArgs)){aB.onLoadArgs=[]}aB.define.onLoad.apply(aB.define,aB.onLoadArgs);if(h&&h[aF]){var aE=h[aF];for(var az=0,aG=aE.length;az<aG;az++){var aD=aE[az];au.action(aD.name,aD.param)}delete h[aF]}};var av=function(t,aA,aC){var az,aB=A[t][aA].requireList,ay;for(az=aB.length;az--;){if(aB[az]===true){continue}ay=aB[az].indexOf("./")>-1?aB[az].substr(aB[az].lastIndexOf("./")+1):aB[az];if(aC.indexOf(ay)>-1){aB[az]=true;break}}for(az=aB.length;az--;){if(aB[az]!==true){return false}}return true};var o=function(i){if(au.isFunction(Object.create)){o=function(t){return Object.create(t)}}else{o=function(ay){function t(){}t.prototype=ay;return new t()}}return o(i)};var b=au.cloneObject=function(az,i){if(az==null||typeof az!="object"){return az}if(!i){var ay=(az instanceof Array)?[]:{};for(var t in az){if(typeof az[t]=="object"){ay[t]=b(az[t],false)}else{ay[t]=az[t]}}return ay}else{return o(az)}};var v=function(t){for(var i in t){if(typeof t[i]=="object"){return true}}return false};var aw=au.echo=function(az,t,ay){if(ay&&(typeof ay!="string"||typeof ay=="string"&&(ay.split(".").length+ay.split("]").length)>3)){return}if(!t){t=""}if(az===null||az===undefined){console.log(((ay)?ay+".":"")+az);return}if(typeof az!="object"){if(typeof az==t||t===""){console.log(((ay)?ay+".":"")+az+"["+typeof az+"]")}return}if(az instanceof Array){console.log(((ay)?ay+":":"")+"[Array["+az.length+"]]")}else{console.log(((ay)?ay+":":"")+"[Object]")}for(var i in az){if(az instanceof Array){if(typeof az[i]=="object"){aw(az[i],t,((ay)?ay+"[":"[")+i+((ay)?"]":"]"))}else{if(typeof az[i]==t||t===""){console.log(((ay)?ay+"[":"[")+i+((ay)?"]":"]")+":"+az[i]+" ("+typeof az[i]+")")}}}else{if(typeof az[i]=="object"){aw(az[i],t,((ay)?ay+".":"")+i)}else{if(typeof az[i]==t||t===""){console.log(((ay)?ay+".":"")+i+":"+az[i]+" ("+typeof az[i]+")")}}}}};var K=au.uniqueArray=function(t){var aB=[],ay=t.length;for(var aA=0;aA<ay;aA++){for(var az=aA+1;az<ay;az++){if(t[aA]===t[az]){az=++aA}}aB.push(t[aA])}return aB};var p=function(i,t){var ay=A[i]=A[i]||{};ay[t]=ay[t]||{}};var ab=function(az,ay){for(var aA=0,t=ay.length;aA<t;aA++){var aB=ay[aA];if(az.noCache&&az.noCache===true){aB+=(aB.indexOf("?")<0)?"?":"&";aB+=(az.noCacheParam?az.noCacheParam:T.noCacheParam)+"=";if(az.noCacheAuto===true){aB+=Math.random()}else{aB+=(az.noCacheVersion?az.noCacheVersion:T.noCacheVersion)}}document.write('<script type="text/javascript" charset="'+(az.charSet?az.charSet:T.charSet)+'" src="'+aB+'"><\/script>')}};au.config=function(t){if(t.commonLib){ab(t,t.commonLib)}if(t.commonModel){ab(t,t.commonModel)}if(t.commonView){ab(t,t.commonView)}T=R(t,y.config);if(au.isDevelopment===null){for(var ay=T.developmentHostList.length;ay--;){if(al.hostname.match(T.developmentHostList[ay])!==null){au.isDevelopment=true;break}}}};var V=function(){if(Date.now){V=function(){return Date.now()}}else{V=function(){return(new Date).getTime()}}return V()};au.benchmark={};au.benchmark.mark=function(i){g[i]=V()};au.benchmark.elapsedTime=function(i,az,t){var ay=g[i],aB=g[az],aA=(aB-ay)/1000;if(t){t(i,az,ay,aB,aA)}else{au.log("elapsed time["+i+" to "+az+"] : "+aA+" seconds","[BENCHMARK]")}return aA};var c=function(){var i=false;if(window.XMLHttpRequest){i=new XMLHttpRequest()}else{if(window.ActiveXObject){try{i=new ActiveXObject("Msxml2.XMLHTTP")}catch(ay){try{i=new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}}}c=function(){return i};return c()};var e=au.renderTemplate=function(az){var ay;var aB=d.MAIN;if(arguments.length>1){return aq(arguments[0],arguments[1],arguments[2])}if(w(aB).templateCache&&n[az.url]){ay=aq(n[az.url],az.data,az.tplId);if(au.isString(az.renderTo)){at(az.renderTo).innerHTML+=ay}return ay}var t=J(aB),aC=N(az.url,t),i=c();i.open("GET",aC,false);try{i.send(null)}catch(aA){return null}if(i.readyState==4&&i.status==200){ay=n[az.url]=i.responseText;ay=aq(ay,az.data,az.tplId);if(au.isString(az.renderTo)){at(az.renderTo).innerHTML+=ay}return ay}else{throw new Error("Can't find templates file: "+aC)}};var aq=function(aC,aA,aF){aC=aC.replace(/\r\n/g,"\n");aC=aC.replace(/\r/g,"\n");aC=aC.replace(/\\/g,"\\\\");aC=aC.replace(/\n/g,"");if(au.isString(aF)){var aE=aC.split("[[#"),ay=new RegExp("^"+aF+"]]");for(var aB=0,aD=aE.length;aB<aD;aB++){if(aE[aB].match(ay)){aC=aE[aB].replace(ay,"");break}}}else{aC=aC.replace(/\[\[#[a-zA-Z0-9_-]*\]\]/g,"")}var az=aC.split("@>"),t=new Function("data",am(az));return t(aA)};var am=function(aF){var aI=[],aG=[],t=[],aD="PLN",aH="VAL",az="PAS",aB="__tempArr__.push(",aA,aE,aC,ay;aI.push("var __tempArr__ = [];");for(aA=0,aE=aF.length;aA<aE;aA++){aC=aF[aA];if(aC.indexOf("<@=")>-1){ay=aC.split("<@=");if(ay.length>1){t.push(ay[0].replace(/"/g,'\\"'));t.push(ay[1]);aG.push(aD);aG.push(aH)}else{t.push(ay[0]);aG.push(aH)}}else{if(aC.indexOf("<@")>-1){ay=aC.split("<@");if(ay.length>1){t.push(ay[0].replace(/"/g,'\\"'));t.push(ay[1]);aG.push(aD);aG.push(az)}else{t.push(ay[0]);aG.push(az)}}else{t.push(aC.replace(/"/g,'\\"'));aG.push(aD)}}}for(aA=0,aE=t.length;aA<aE;aA++){aC=t[aA];if(aG[aA]==aH){aC='""+'+aC+'+""';aI.push(aB+aC+");")}else{if(aG[aA]==az){aI.push(aC)}else{aC='"'+aC+'"';aI.push(aB+aC+");")}}}aI.push("return __tempArr__.join('');");return aI.join("")};au.commonModel=function(t){var i="CommonModel";if(!t||typeof t!="object"){throw new Error(ak(i))}var ay=(t.__name)?t.__name:t.name;if(typeof ay!="string"){throw new Error(ak(i))}if(t.__extend&&S(t.__extend,ay)){throw new Error("Can't extend itself: "+ay)}F[ay]=t};au.commonView=function(t){var i="CommonView";if(!t||typeof t!="object"){throw new Error(ak(i))}var ay=(t.__name)?t.__name:t.name;if(typeof ay!="string"){throw new Error(ak(i))}if(t.__extend&&S(t.__extend,ay)){throw new Error("Can't extend itself: "+ay)}ai[ay]=t};au.log=function(ay,az){window.console=window.console||{log:function(){},error:function(){}};var aD=new Date(),i=aD.getFullYear(),aF=aD.getMonth()+1,aA=aD.getDate(),aE=aD.getHours(),t=aD.getMinutes(),aB=aD.getSeconds(),aC=aD.getMilliseconds();console.log(((az)?az:"")+i+"/"+aF+"/"+aA+" "+aE+":"+t+":"+aB+"."+aC+" "+ay)};au.debug=function(i){if(au.isDevelopment){au.log(i,"[DEBUG]")}};au.localSet=function(i){var t=d[d.MAIN];if(t.loadOrder.presentOrder()===y.loadOrder.order[1]){k=i}};au.msg=function(i){return k[i]?k[i]:i};au.interceptor=function(i){O("interceptors",i)};au.controller=function(i){O("controllers",i)};au.model=function(i){O("models",i)};au.view=function(i){O("views",i)};au.action=function(){var az,aA,aC,aB,t;if(!arguments.length){return ae}else{var ay=arguments[0];var i=q(arguments).slice(1);az=ay.split(".");if((aA=az[0]).length==0||(aC=az[1]).length==0){throw new Error("tipJS.action : invalid parameter")}aB=d[aA];if(!aB||!aB.loadOrder||!aB.loadOrder.isLastOrder()){h[aA]=h[aA]||[];h[aA].push({name:ay,param:i});return}t=ae[aA][aC];t.apply(t,i)}};au.loadApp=function(){var aC=arguments[0],t=q(arguments).slice(1);if(typeof aC=="string"){aC=[aC]}for(var ay=0,aA=aC.length;ay<aA;ay++){var aB=aC[ay];if(!d.MAIN){d.MAIN=aB}if(t.length){d[aB]={};d[aB].onLoadArgs=t}var az=T.applicationPath[aB]+"/"+T.defineFileName+".js";setTimeout(function(){if(!d[aB]||!d[aB].define){throw new Error("Can't find application: "+aB)}},1000);m(az,{nocache:true,version:Math.random(),paramName:T.noCacheParam})}delete au.loadApp};au.define=function(ay){R(ay,y.define);if(ay.templateCache===undefined){ay.templateCache=T.templateCache}if(ay.noCache===undefined){ay.noCache=T.noCache;ay.noCacheVersion=T.noCacheVersion;ay.noCacheParam=T.noCacheParam;ay.noCacheAuto=T.noCacheAuto}else{if(ay.noCache===true){if(ay.noCacheVersion===undefined){ay.noCacheVersion=T.noCacheVersion}if(ay.noCacheParam===undefined){ay.noCacheParam=T.noCacheParam}if(ay.noCacheAuto===undefined){ay.noCacheAuto=T.noCacheAuto}}}var i=ay.name;d[i]=d[i]||{};d[i].loadOrder={};R(d[i].loadOrder,y.loadOrder);var t=d[i].loadOrder.presentOrder();p(i,t);d[i].define=ay;l(i,t)};var A={},x={},ag=[],F={},ap={},ai={},y={config:{noCache:false,noCacheVersion:1,noCacheParam:"noCacheVersion",noCacheAuto:false,templateCache:true,charSet:"utf-8",defineFileName:"define",path:{lang:"lang",interceptors:"interceptors",controllers:"controllers",models:"models",views:"views"},developmentHostList:[],applicationPath:{}},define:{extLib:[],lang:[],interceptors:[],controllers:[],models:[],views:[],localSet:false,onLoad:function(){},beforeController:function(){},afterController:function(){},loadCommonModel:W,loadModel:af,loadCommonView:H,loadView:I},loadOrder:{index:0,presentOrder:function(){return this.order[this.index]},nextOrder:function(){return this.order[++this.index]},isLastOrder:function(){return(this.index+1)==this.order.length},order:["extLib","lang","interceptors","controllers","models","views"]}},g={},d={},ae={},k={},n={},h={},T=b(y.config),ah={},al=window.location,L=al.pathname,E=al.search,Q=aa("script"),ac,X,G,a=null,C=(navigator.language||navigator.systemLanguage||navigator.userLanguage).substr(0,2);for(var z=Q.length;z--;){X=Q[z].src;G=X.match(/tipJS-MVC-1\.43\.js$/);if(G){ac=X.substring(0,X.length-G[0].length);break}}if(E.match("(\\?|&)debug")!==null||L.match("debug")!==null){a=true}au.isDevelopment=a;au.lang=C;document.write('<script type="text/javascript" charset="UTF-8" src="'+ac+"tipJS.config.js?"+T.noCacheParam+"="+Math.random()+'"><\/script>')})(this);