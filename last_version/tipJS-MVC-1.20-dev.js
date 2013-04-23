/*
 * tipJS - OpenSource Javascript MVC Framework ver.1.20
 *
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

/* tipJS initialization */
var tipJS = tipJS || {};
tipJS.ver = tipJS.version = "1.20";
(function() {
	/**
	 * overwrite Object 에 존재하는 속성 이외의 항목을 base Object의 속성과 병합
	 *
	 * @param overwrite
	 * @param base
	 * @return 병합된 Object
	 */
	var __mergeObject__ = function(overwrite, base) {
		for (var k in base) {
			if (overwrite[k])
				continue;
			overwrite[k] = base[k];
		};
		return overwrite;
	};
	/**
	 * department Object 를 departmentType 으로 등록
	 *
	 * @param departmentType
	 * @param department
	 */
	var __registDepartment__ = function(departmentType, department) {
		if (!department || !department.name || typeof (department.name) != "string") {
			throw "Please check your " + departmentType + " definition";
		}
		var _arrDepartment = department.name.split(".");
		var _appName = _arrDepartment[0];
		var _departmentName = _arrDepartment[1];
		var _application = __getApp__(_appName);

		if (!_application)
			throw "Please check your " + departmentType + " definition";
		if (_application.loadOrder.presentOrder() === departmentType) {
			department.__appName__ = _appName;
			__TIPJS_TEMPLATE__.department[_appName] = __TIPJS_TEMPLATE__.department[_appName] || {};
			__TIPJS_TEMPLATE__.department[_appName][departmentType] = __TIPJS_TEMPLATE__.department[_appName][departmentType] || {};
			__TIPJS_TEMPLATE__.department[_appName][departmentType][_departmentName] = department;
		};
	};

	/**
	 * Application 에 속하는 파일들을 경로가 포함된 파일로 리스트화
	 *
	 * @param define
	 * @param depart
	 * @return File Path를 포함한 List
	 */
	var __makeAppRequireFileList__ = function(define, depart) {
		if (depart === __TIPJS_TEMPLATE__.OBJECT_TEMPLATE.loadOrder.order[0])
			return __uniqueArray__(define[depart]);

		var _appName = define.name, _path = __config__.path[depart], _applicationRoot = __config__.applicationPath[_appName], _departs = __uniqueArray__(define[depart]);
		return __getUnitPathList__(_applicationRoot, _path, _departs);
	};

	/**
	 * Application 에 속하는 unit의 File Path를 작성
	 *
	 * @param rootPath
	 * @param unitPath
	 * @param unit
	 * @return unit의 File Path
	 */
	var __getUnitPathList__ = function(rootPath, unitPath, unit) {
		var _ret = [];
		for (var i = 0, unitLen = unit.length; i < unitLen; i++) {
			_ret.push(rootPath + __wrapPath__(unitPath) + unit[i]);
		};
		return _ret;
	};

	/**
	 * JS File 의 NoCache 처리를 위한 Query String 을 작성
	 *
	 * @param file
	 * @param config
	 * @return Query String
	 */
	var __makeNocacheString__ = function(file, config) {
		if (config.nocache === true) {
			file = (file.indexOf("?") < 0) ? file + "?" : file + "&";
			file = file + config.paramName + "=" + config.version;
		};
		return file;
	};

	/**
	 * JS File Load
	 *
	 * @param file
	 * @param noCacheOpt
	 * @param callbackFn
	 */
	var __loadJsFile__ = function(file, noCacheOpt, callbackFn) {
		var _tagScript = document.createElement('script');
		_tagScript.type = 'text/javascript';
		_tagScript.src = __makeNocacheString__(file, noCacheOpt);
		_tagScript.charset = __config__.charSet;

		if (callbackFn) {
			var _loaded = false;
			_tagScript.onreadystatechange = function() {
				if (this.readyState == 'loaded' || this.readyState == 'complete') {
					if (_loaded == true) {
						return;
					};
					_loaded = true;
					callbackFn(this);
				};
			};
			_tagScript.onload = function() {
				if (!document.all) {
					callbackFn(this);
				};
			};
		};
		document.getElementsByTagName('head')[0].appendChild(_tagScript);
	};

	/**
	 * Application에 속해 있는 JS File 을 읽어들임
	 *
	 * @param appName
	 * @param depart
	 * @param file
	 */
	var __loadAppSubFile__ = function(appName, depart, file) {
		var _callback = function(scriptTag) {
			if (__checkAppFileAllLoaded__(appName, depart, scriptTag.src)) {
				__afterApplicationLoaded__(appName);
			};
		};
		__loadJsFile__(file, __getAppNoCacheInfo__(appName), _callback);
	};

	/**
	 * Application에 속해 있는 각각의 Part 를 읽어들인 후 모두 완료되면 Application 초기화 메소드를 호출
	 *
	 * @param appName
	 * @param depart
	 */
	var __loadDepart__ = function(appName, depart) {
		__initAppTemplateNS__(appName, depart);
		var _define = __getAppDefine__(appName);
		var _requireList = __makeAppRequireFileList__(_define, depart);
		__TIPJS_TEMPLATE__[appName][depart].requireList = _requireList;
		if (_requireList.length > 0) {
			for (var i = 0, reqLen = _requireList.length; i < reqLen; i++) {
				__loadAppSubFile__(appName, depart, _requireList[i]);
			};
		} else
			__afterApplicationLoaded__(appName);
	};

	/**
	 * tipJS 의 config file 에 정의된 commonModel 을 작성 후 반환
	 *
	 * @param modelName
	 * @param loadType
	 * @return commonModel Object
	 */
	var __loadCommonModel__ = tipJS.loadCommonModel = function(modelName, loadType) {
		var _models = __TIPJS_TEMPLATE__.common.models;
		if (!_models[modelName] || _models[modelName] == undefined) {
			throw "Could not find commonModel: " + modelName;
		};
		// synchronized model
		if (loadType === true) {
			var _syncModels = __TIPJS_TEMPLATE__.common.syncModels;
			if (!_syncModels) {
				_syncModels = __TIPJS_TEMPLATE__.common.syncModels = {};
			}
			if (!_syncModels[modelName]) {
				_syncModels[modelName] = __cloneObject__(_models[modelName]);
				_syncModels[modelName].loadCommonModel = __loadCommonModel__;
			}
			return _syncModels[modelName];
		};
		var _ret = {};
		_ret = __cloneObject__(_models[modelName]);
		_ret.loadCommonModel = __loadCommonModel__;
		return _ret;
	};

	/**
	 * tipJS 의 define file 에 정의된 Application Model 을 작성 후 반환
	 *
	 * @param modelName
	 * @param loadType
	 * @param appName
	 * @return Application Model Object
	 */
	var __loadModel__ = function(modelName, loadType, appName) {
		var _models, _appName;
		// if not exist application name
		if (!appName)
			_appName = this.__appName__;
		// if exist application name
		else
			_appName = appName;

		_models = __TIPJS_TEMPLATE__.department[_appName].models;

		if (!_models[modelName] || _models[modelName] == undefined) {
			throw "Could not find model: " + modelName;
		};
		// synchronized model
		if (loadType === true) {
			var _syncModels = __TIPJS_TEMPLATE__.department[_appName].syncModels;
			if (!_syncModels) {
				_syncModels = __TIPJS_TEMPLATE__.department[_appName].syncModels = {};
			};
			if (!_syncModels[modelName]) {
				_syncModels[modelName] = __cloneObject__(_models[modelName]);
				_syncModels[modelName].loadCommonModel = __loadCommonModel__;
				_syncModels[modelName].loadModel = __loadModel__;
			};
			return _syncModels[modelName];
		};
		var _ret = {};
		_ret = __cloneObject__(_models[modelName]);
		_ret.loadCommonModel = __loadCommonModel__;
		_ret.loadModel = __loadModel__;
		return _ret;
	};

	/**
	 * tipJS 의 define file 에 정의된 Application Model 을 작성 후 반환
	 *
	 * @param modelName
	 * @param loadType
	 * @param appName
	 * @return Application Model Object
	 */
	var __loadAppModel__ = tipJS.loadModel = function(appModelName, loadType) {
		var _loadType = ( typeof (loadType) === "boolean") ? loadType : false;
		try {
			var _arrName = appModelName.split("."), _appName = _arrName[0], _ModelName = _arrName[1];
			return __loadModel__(_ModelName, _loadType, _appName);
		} catch(e) {
			throw "tipJS.loadModel : invalid parameter";
		}
	};

	/**
	 * tipJS 의 Application Object 를 반환
	 *
	 * @param appName
	 * @return Application Object
	 */
	var __getApp__ = function(appName) {
		return __application__[appName];
	};

	/**
	 * tipJS 의 Application 정의 Object 를 반환
	 *
	 * @param appName
	 * @return Application 정의 Object
	 */
	var __getAppDefine__ = function(appName) {
		return __application__[appName].define;
	};

	/**
	 * Application 의 NoCache 설정정보 Object 를 반환
	 *
	 * @param appName
	 * @return NoCache 정보 Object
	 */
	var __getAppNoCacheInfo__ = function(appName) {
		var _ret = {};
		var _define = __getAppDefine__(appName);
		if (_define) {
			var _nocacheVersion = _define.noCacheVersion;
			if (_define.noCacheAuto && _define.noCacheAuto === true) {
				_nocacheVersion = "" + Math.random();
			}
			_ret.nocache = _define.noCache;
			_ret.version = _nocacheVersion;
			_ret.paramName = _define.noCacheParam;
		};
		return _ret;
	};

	/**
	 * Application 이 모두 load 된후 실행되는 메소드
	 * Application 의 모든 Controller 의 재정의 후 define file 에서 정의된 onLoad 메소드 호출
	 *
	 * @param appName
	 */
	var __afterApplicationLoaded__ = function(appName) {
		var _application = __getApp__(appName);
		if (_application.loadOrder.isLastOrder() === false) {
			var _nextDepart = _application.loadOrder.nextOrder();
			__loadDepart__(appName, _nextDepart);
			return;
		};
		var _loadCommonView = function(viewName) {
			var _views = __TIPJS_TEMPLATE__.common.views;
			if (!_views[viewName] || _views[viewName] == undefined) {
				throw "Could not find commonView: " + viewName;
			}
			var _ret = {};
			_ret = __cloneObject__(_views[viewName]);
			_ret.loadCommonView = _loadCommonView;
			_ret.renderTemplate = __getTemplate__;
			return _ret;
		};
		var _loadView = function(viewName) {
			var _views = __TIPJS_TEMPLATE__.department[this.__appName__].views;
			if (!_views[viewName] || _views[viewName] == undefined) {
				throw "Could not find view: " + viewName;
			}
			var _ret = {};
			_ret = __cloneObject__(_views[viewName]);
			_ret.loadCommonView = _loadCommonView;
			_ret.loadView = _loadView;
			_ret.renderTemplate = __getTemplate__;
			return _ret;
		};
		var _controllers = _application.controller = __TIPJS_TEMPLATE__.department[appName].controllers;
		if (_controllers) {
			for (var k in _controllers) {
				if (__TIPJS_TEMPLATE__.common.models) {
					_controllers[k].loadCommonModel = __loadCommonModel__;
				};
				if (__TIPJS_TEMPLATE__.common.views) {
					_controllers[k].loadCommonView = _loadCommonView;
				};
				if (__TIPJS_TEMPLATE__.department[appName].models) {
					_controllers[k].loadModel = __loadModel__;
				};
				if (__TIPJS_TEMPLATE__.department[appName].views) {
					_controllers[k].loadView = _loadView;
				};
				_controllers[k].renderTemplate = __getTemplate__;
			};
		};
		(function(appName) {
			var _application = __getApp__(appName);
			_application.define.onLoad(_application.onLoadParam);
			if (__reservedStack__ && __reservedStack__[appName]) {
				var _reservedAction = __reservedStack__[appName];
				for (var i = 0, actionLen = _reservedAction.length; i < actionLen; i++) {
					var _actionObj = _reservedAction[i];
					tipJS.action(_actionObj.name, _actionObj.param);
				};
				delete __reservedStack__[appName];
			};
		})(appName);
	};

	/**
	 * Application 의 각 part 의 모든 File 이 load 되었는지 확인
	 *
	 * @param appName
	 * @param depart
	 * @param src
	 * @return load 확인 Flag
	 */
	var __checkAppFileAllLoaded__ = function(appName, depart, src) {
		var _requireList = __TIPJS_TEMPLATE__[appName][depart].requireList;

		for (var i = 0, reqLen = _requireList.length; i < reqLen; i++) {
			if (_requireList[i] === true)
				continue;
			if (src.indexOf(_requireList[i]) >= 0) {
				_requireList[i] = true;
				break;
			};
		};
		for (var i = 0, reqLen = _requireList.length; i < reqLen; i++) {
			if (_requireList[i] !== true) {
				return false;
			};
		};
		return true;
	};

	/**
	 * File 경로에 대한 Wrapper
	 *
	 * @param path
	 * @return ex) /path/
	 */
	var __wrapPath__ = function(path) {
		return __const__.pathDiv + path + __const__.pathDiv;
	};

	/**
	 * 인수로 들어온 Object 의 복제를 반환
	 *
	 * @param target
	 * @return Object Clone
	 */
	var __cloneObject__ = tipJS.cloneObject = function(target) {
		if ( typeof target == "boolean" || typeof target == "number" || typeof target == "string") {
			return target;
		}
		var _clone = ( target instanceof Array) ? [] : {};
		for (var k in target) {
			if (target[k] && typeof target[k] == "object") {
				_clone[k] = __cloneObject__(target[k]);
			} else {
				_clone[k] = target[k];
			};
		};
		return _clone;
	};

	/**
	 * 인수로 들어온 target object 의 내용을 console에 출력
	 *
	 * @param target
	 * @param filter
	 * @param parentName
	 */
	var __echo__ = tipJS.echo = function(target, filter, parentName) {
		if (!filter) filter = "";
		if (parentName && (typeof parentName != "string" || typeof parentName == "string" && parentName.split(".").length > 5)) return;
		if ( typeof target == "boolean" || typeof target == "number" || typeof target == "string") {
			if (typeof target == filter || filter == "") console.log(((parentName)?parentName+".":"") + target);
			return;
		};
		for (var k in target) {
			if (target[k] && target[k] instanceof Array) {
				console.log(((parentName)?parentName+".":"") + k + ":Array");
				__echo__(target[k], filter, ((parentName)?parentName+".":"")+k);
			} else if (target[k] && typeof target[k] == "object") {
				console.log(((parentName)?parentName+".":"") + k + ":Object");
				__echo__(target[k], filter, ((parentName)?parentName+".":"")+k);
			} else
				if (typeof target[k] == filter || filter == "") console.log(((parentName)?parentName+".":"") + k + ":" + target[k]);
		};
	};

	/**
	 * 인수로 들어온 array 의 요소들을 중복되지 않는 요소로 재작성 후 반환
	 *
	 * @param arr
	 * @return unique 한 요소를 갖는 array
	 */
	var __uniqueArray__ = function(arr) {
		var ret = [], len = arr.length;
		for (var i = 0; i < len; i++) {
			for (var j = i + 1; j < len; j++) {
				if (arr[i] === arr[j])
					j = ++i;
			};
			ret.push(arr[i]);
		};
		return ret;
	};

	/**
	 * Application 별 __TIPJS_TEMPLATE__ Object 의 초기화
	 *
	 * @param appName
	 * @param depart
	 */
	var __initAppTemplateNS__ = function(appName, depart) {
		__TIPJS_TEMPLATE__[appName] = __TIPJS_TEMPLATE__[appName] || {};
		__TIPJS_TEMPLATE__[appName][depart] = __TIPJS_TEMPLATE__[appName][depart] || {};
	};

	/**
	 * tipJS 의 config file 에 정의되어 있는 공통 JS File 을 읽어들임
	 *
	 * @param config
	 * @param arrayJS
	 */
	var __loadCommonJSFiles__ = function(config, arrayJS) {
		for (var i = 0, len = arrayJS.length; i < len; i++) {
			var src = arrayJS[i];
			if (config.noCache && config.noCache === true) {
				src = (src.indexOf("?") < 0) ? src + "?" : src + "&";
				src = src + (config.noCacheParam ? config.noCacheParam : __config__.noCacheParam) + "=";
				if (config.noCacheAuto && config.noCacheAuto === true)
					src = src + Math.random();
				else
					src = src + (config.noCacheVersion ? config.noCacheVersion : __config__.noCacheVersion);
			};
			document.write('<script type="text/javascript" charset="' + (config.charSet ? config.charSet : __config__.charSet) + '" src="' + src + '"></script>');
		};
	};

	/**
	 * tipJS 의 config file 에 정의되어 있는 내용을 tipJS에 반영
	 *
	 * @param config
	 */
	tipJS.config = function(config) {
		if (config.commonLib) {
			__loadCommonJSFiles__(config, config.commonLib);
			delete config.commonLib;
		};
		if (config.commonModel) {
			__loadCommonJSFiles__(config, config.commonModel);
			delete config.commonModel;
		};
		if (config.commonView) {
			__loadCommonJSFiles__(config, config.commonView);
			delete config.commonView;
		};
		__config__ = __mergeObject__(config, __TIPJS_TEMPLATE__.OBJECT_TEMPLATE.config);
		if (tipJS.isDevelopment === null) {
			var _hostname = window.location.hostname;
			for (var i = 0, _localhostLen = __config__.developmentHostList.length; i < _localhostLen; i++) {
				if (_hostname.match(__config__.developmentHostList[i]) !== null) {
					tipJS.isDevelopment = true;
					break;
				};
			};
		};
	};
	
	/**
	 * Benchmark용 초단위 반환
	 *
	 * @return seconds
	 */
	var __getSeconds__ = function(){
		var _now = new Date();
		return (_now.getHours()*60*60 + _now.getMinutes()*60 + _now.getSeconds()) + (_now.getMilliseconds() / 1000);
	};
	
	/**
	 * Benchmark Object
	 *
	 * @return seconds
	 */
	tipJS.benchmark = {};
	var __bechmarkRecords__ = {};
	/**
	 * Benchmark 용 키를 등록
	 *
	 * @param markName
	 */
	tipJS.benchmark.mark = function(markName){
		__bechmarkRecords__[markName] = __getSeconds__();
	}
	
	/**
	 * Benchmark 용 키에 따라 경과시간을 출력
	 * 
	 * @param startName
	 * @param endName
	 * @param callbackFn
	 */
	tipJS.benchmark.elapsedTime = function(startName, endName, callbackFn){
		var _startTime = __bechmarkRecords__[startName],
		_endTime = __bechmarkRecords__[endName],
		_elapsedTime = _endTime - _startTime;
		// if exist callback function
		if (callbackFn)
			callbackFn(startName, endName, _startTime, _endTime, _elapsedTime);
		else
			tipJS.log("elapsed time["+ startName + " to " + endName + "] : " + _elapsedTime + " seconds", "[BENCHMARK]");
	}
	
	/* Template */
	/**
	 * XML Request 객체의 생성 후 반환
	 *
	 * @return XML Request Object
	 */
	// function from http://www-128.ibm.com/developerworks/kr/library/j-ajax1/index.html
	var __getXMLRequest__ = function() {
		var _xmlreq = false;
		if (window.XMLHttpRequest) {
			_xmlreq = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				_xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e1) {
				try {
					_xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2) {};
			};
		};
		return _xmlreq;
	};

	/**
	 * HTML Template File 을 읽어들인 후 file 내용을 반환
	 *
	 * @param config
	 * @return Template string
	 */
	var __getTemplate__ = function(config) {
		var _appNoCacheInfo = __getAppNoCacheInfo__(this.__appName__);
		var _fileUrl = __makeNocacheString__(config.url, _appNoCacheInfo);
		var _xmlhttp = __getXMLRequest__();
		_xmlhttp.open("GET", _fileUrl, false);
		try {
			_xmlhttp.send(null);
		} catch(e) {
			return null;
		};
		
		if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200) {
			var _retTxt = _xmlhttp.responseText;
			_retTxt = __renderTemplate__(_retTxt, config.data);
			if (typeof config.renderTo == "string")
				document.getElementById(config.renderTo).innerHTML += _retTxt;
			return _retTxt;
		} else {
			throw "Could not find template file:" + _fileUrl;
		}
	};

	/**
	 * HTML Template 의 내용과 표시될 Data의 병합처리
	 *
	 * @param html
	 * @param data
	 */
	var __renderTemplate__ = function(html, data) {
		html = html.replace(/\r\n/g, "\n");
		html = html.replace(/\r/g, "\n");
		html = html.replace(/\\/g, '\\\\');
		html = html.replace(/\n/g, '\\n');
		html = html.replace(/"/g, '\\"');

		var _tokens = html.split("\\n");
		var _evalString = __compileTemplate__(_tokens);
		var _evalFunc = new Function("data", _evalString);

		return _evalFunc(data);
	};

	/**
	 * HTML Template 의 내용을 Parsing
	 *
	 * @param tokens
	 */
	var __compileTemplate__ = function(tokens) {
		var _ret = [], _types = [];
		_ret.push('var __temp_HTML__ = [];');
		var _TYPE_PLANE = "PLANE", _TYPE_VALUE = "VALUE", _TYPE_PARSE = "PARSE";
		var _cmdPush = '__temp_HTML__.push(';
		for (var i = 0, len = tokens.length; i < len; i++) {
			var _token = tokens[i];
			_types.push(_TYPE_PLANE);
			if (_token.indexOf("@>") > -1) {
				if (_token.indexOf("<@=") > -1)
					_types[i] = _TYPE_VALUE;
				else if (_token.indexOf("<@") > -1)
					_types[i] = _TYPE_PARSE;
				else {
					for (var j = _types.length - 1; j >= 0; j--) {
						if (tokens[j].indexOf("<@") > -1 && _types[j] == _TYPE_PLANE) {
							for (var k = j; k <= i; k++) {
								_types[k] = _TYPE_PARSE;
							}
							break;
						}
					} // for j
				}
			}
		} // for i
		for (var i = 0, len = _types.length; i < len; i++) {
			var _token = tokens[i];
			if (_types[i] == _TYPE_VALUE) {
				_token = '"' + _token + '"';
				_token = _token.replace(/<@=/g, '\"+');
				_token = _token.replace(/@>/g, '+\"');
				_ret.push(_cmdPush + _token + ");");
			} else if (_types[i] == _TYPE_PARSE) {
				_token = _token.replace(/<@/g, '');
				_token = _token.replace(/@>/g, '');
				_ret.push(_token);
			} else {
				_token = '"' + _token + '"';
				_ret.push(_cmdPush + _token + ");");
			};
		};
		_ret.push("return __temp_HTML__.join('');");
		return _ret.join("");
	};

	/**
	 * tipJS 의 commonModel 을 정의
	 *
	 * @param commonModel
	 */
	tipJS.commonModel = function(commonModel) {
		if (commonModel.name) {
			__TIPJS_TEMPLATE__.common.models[commonModel.name] = commonModel;
		} else {
			throw "Please Check commonModel name";
		};
	};

	/**
	 * tipJS 의 commonView 를 정의
	 *
	 * @param commonView
	 */
	tipJS.commonView = function(commonView) {
		if (commonView.name) {
			__TIPJS_TEMPLATE__.common.views[commonView.name] = commonView;
		} else {
			throw "Please Check commonView name";
		};
	};

	var __const__ = (function() {
		var _const = {
			pathDiv : "/",
			blank : "",
			extJS : "js",
			extDiv : "."
		};
		return _const;
	})();

	/**
	 * tipJS 의 console logger
	 *
	 * @param msg
	 * @param prefix
	 */
	tipJS.log = function(msg, prefix) {
		window.console = window.console || {
			log : function() {},
			error : function() {}
		};
		var _today = new Date(), _yyyy = _today.getFullYear(), _mm = _today.getMonth() + 1, _dd = _today.getDate(), _hh = _today.getHours(), _mi = _today.getMinutes(), _ss = _today.getSeconds(), _ms = _today.getMilliseconds();
		console.log(((prefix) ? prefix : "") + _yyyy + '/' + _mm + '/' + _dd + ' ' + _hh + ':' + _mi + ':' + _ss + '.' + _ms + ' ' + msg);
	};

	/**
	 * tipJS 의 console debugger
	 *
	 * @param msg
	 */
	tipJS.debug = function(msg) {
		if (tipJS.isDevelopment) {
			tipJS.log(msg, "[DEBUG]");
		};
	};

	/**
	 * tipJS 의 Controller 정의 메소드
	 *
	 * @param controller
	 */
	tipJS.controller = function(controller) {
		__registDepartment__("controllers", controller);
	};

	/**
	 * tipJS 의 Application Model 정의 메소드
	 *
	 * @param model
	 */
	tipJS.model = function(model) {
		__registDepartment__("models", model);
	};

	/**
	 * tipJS 의 Application View 정의 메소드
	 *
	 * @param view
	 */
	tipJS.view = function(view) {
		__registDepartment__("views", view);
	};

	/**
	 * tipJS 의 Application Controller 호출 메소드
	 *
	 * @param controllerName
	 * @param params
	 */
	tipJS.action = function(controllerName, params) {
		var _arrName, _appName, _ctrlerName;
		try {
			_arrName = controllerName.split(".");
			_appName = _arrName[0];
			_ctrlerName = _arrName[1];
		} catch(e) {
			throw "tipJS.action : invalid parameter";
		}

		var _application = __getApp__(_appName);
		if (!_application || !_application.loadOrder || !_application.loadOrder.isLastOrder()) {
			__reservedStack__ = __reservedStack__ || {};
			__reservedStack__[_appName] = __reservedStack__[_appName] || [];
			__reservedStack__[_appName].push({
				name : controllerName,
				param : params
			});
			return;
		};

		if (!_application || !_application.controller || !_application.controller[_ctrlerName]) {
			throw "Could not find controller: " + controllerName;
		};

		var _controllerStartTime;
		if (tipJS.isDevelopment === true) {
			_controllerStartTime = __getSeconds__();
		}
		var _controller = __cloneObject__(_application.controller[_ctrlerName]);
		var _beforeController = _application.define.beforeController;
		var _afterController = _application.define.afterController;

		if (_controller) {
			if (_beforeController)
					_beforeController(params);
			var _doController = function(){
				
				try {
					var _invoke2 = function() {
						if (_controller.afterInvoke)
							_controller.afterInvoke(params);
					};
					var _invoke1 = function() {
						var _retValue = true;
						if (_controller.invoke)
							_retValue = _controller.invoke(params);
	
						if (_retValue !== false)
							_invoke2();
					};
					var _invoke = function() {
						var _retValue = true;
						if (_controller.beforeInvoke)
							_retValue = _controller.beforeInvoke(params);
	
						if (_retValue !== false)
							_invoke1();
					};
					_invoke();
				} catch (e) {
					if (_controller.exceptionInvoke)
						_controller.exceptionInvoke(e, params);
					else
						throw e;
				}
				if (_afterController)
					_afterController(params);
	
				if (tipJS.isDevelopment === true)
					tipJS.debug(controllerName + " completed in " + (__getSeconds__() - _controllerStartTime) + " seconds");
	
				/*if (_controller.returnResult) {
					var _returnResult = _controller.returnResult;
					return _returnResult;
				};*/
				delete _controller;
			};
			if (_controller.async === true) 
				setTimeout(_doController, 0);
			else 
				_doController();
		} else
			throw "Could not find controller";
	};

	/**
	 * tipJS 의 Application Load 메소드
	 *
	 * @param appNames
	 * @param params
	 */
	tipJS.loadApp = function(appNames, params) {
		for (var i = 0, appLen = appNames.length; i < appLen; i++) {
			var _appName = appNames[i], _filepath = [];
			if (params) {
				__application__[_appName] = __application__[_appName] || {};
				__application__[_appName].onLoadParam = params;
			};
			_filepath.push(__config__.applicationPath[_appName]);
			_filepath.push(__const__.pathDiv);
			_filepath.push(__config__.defineFileName);
			_filepath.push(__const__.extDiv);
			_filepath.push(__const__.extJS);
			setTimeout(function() {
				if (!__application__[_appName].define) {
					throw "Could not find application: " + _appName;
				}
			}, 1000);
			__loadJsFile__(_filepath.join(__const__.blank), {
				nocache : true,
				version : Math.random(),
				paramName : __config__.noCacheParam
			});
		};
	};

	/**
	 * tipJS 의 Application 정의 메소드
	 *
	 * @param define
	 */
	tipJS.define = function(define) {
		define = __mergeObject__(define, __TIPJS_TEMPLATE__.OBJECT_TEMPLATE.define);
		if (define.noCache === undefined) {
			define.noCache = __config__.noCache;
			define.noCacheVersion = __config__.noCacheVersion;
			define.noCacheParam = __config__.noCacheParam;
			define.noCacheAuto = __config__.noCacheAuto;
		} else {
			if (define.noCache === true) {
				if (define.noCacheVersion === undefined) {
					define.noCacheVersion = __config__.noCacheVersion;
				};
				if (define.noCacheParam === undefined) {
					define.noCacheParam = __config__.noCacheParam;
				};
				if (define.noCacheAuto === undefined) {
					define.noCacheAuto = __config__.noCacheAuto;
				};
			};
		};
		var _appName = define.name;
		__application__[_appName] = __application__[_appName] || {};
		__application__[_appName].loadOrder = {};
		__application__[_appName].loadOrder = __mergeObject__(__application__[_appName].loadOrder, __TIPJS_TEMPLATE__.OBJECT_TEMPLATE.loadOrder);

		var _depart = __application__[_appName].loadOrder.presentOrder();
		__initAppTemplateNS__(_appName, _depart);
		__application__[_appName].define = define;
		__loadDepart__(_appName, _depart);
	};

	/*
	 * Booting tipJS
	 */
	/**
	 * tipJS 의 TEMPLATE Object
	 */
	var __TIPJS_TEMPLATE__ = {};
	__TIPJS_TEMPLATE__.OBJECT_TEMPLATE = {
		config : {
			noCache : false,
			noCacheVersion : 1.000,
			noCacheParam : "noCacheVersion",
			noCacheAuto : false,
			charSet : "utf-8",
			defineFileName : "define",
			path : {
				controllers : "controllers",
				models : "models",
				views : "views"
			},
			developmentHostList : [],
			applicationPath : {}
		},
		define : {
			extLib : [],
			controllers : [],
			models : [],
			views : [],
			templates : [],
			onLoad : function() {
			},
			beforeController : function() {
			},
			afterController : function() {
			}
		},
		loadOrder : {
			index : 0,
			init : function() {
				this.index = 0;
			},
			presentOrder : function() {
				return this.order[this.index];
			},
			nextOrder : function() {
				return this.order[++this.index];
			},
			isLastOrder : function() {
				return (this.index + 1) == this.order.length;
			},
			order : ["extLib", "controllers", "models", "views"]
		}
	};
	__TIPJS_TEMPLATE__.department = __TIPJS_TEMPLATE__.department || {};
	__TIPJS_TEMPLATE__.common = __TIPJS_TEMPLATE__.common || {};
	__TIPJS_TEMPLATE__.common.models = __TIPJS_TEMPLATE__.common.models || {};
	__TIPJS_TEMPLATE__.common.views = __TIPJS_TEMPLATE__.common.views || {};
	var __application__ = {};
	var __reservedStack__ = {};
	var __config__ = __mergeObject__({}, __TIPJS_TEMPLATE__.OBJECT_TEMPLATE.config);
	var _pathname = window.location.pathname, _queryString = window.location.search, _scripts = document.getElementsByTagName('script'), _filepath, _scriptSrc, _match, _localhostLen, _isDevelopment = null, _developmentHostList = __config__.developmentHostList;

	for (var i = 0, scriptLen = _scripts.length; i < scriptLen; i++) {
		_scriptSrc = _scripts[i].src;
		_match = _scriptSrc.match(/tipJS-MVC-1\.20-dev\.js$/);
		if (_match) {
			_filepath = _scriptSrc.substring(0, _scriptSrc.length - _match[0].length);
			break;
		};
	};

	document.write('<script type="text/javascript" charset="UTF-8" src="' + _filepath + 'tipJS.config.js?' + __config__.noCacheParam + '=' + Math.random() + '"></script>');

	if (_queryString.match('(\\?|&)debug') !== null || _pathname.match('debug') !== null)
		_isDevelopment = true;
	else if (_queryString.match('(\\?|&)nodebug') !== null || _pathname.match('nodebug') !== null)
		_isDevelopment = false;

	tipJS.isDevelopment = _isDevelopment;
})();

