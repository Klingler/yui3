YUI.add("autocomplete-base",function(f){var i=f.Lang,p=f.Array,h=f.Object,r=i.isArray,d=i.isFunction,q=i.isObject,s=i.isString,v=i.trim,l=f.Attribute.INVALID_VALUE,n="_functionValidator",y="_sourceSuccess",c="allowBrowserAutocomplete",g="inputNode",x="query",e="queryDelimiter",b="requestTemplate",k="results",m="resultListLocator",j="value",t="valueChange",a="clear",u=x,o=k;function w(){f.before(this._bindUIACBase,this,"bindUI");f.before(this._destructorACBase,this,"destructor");f.before(this._syncUIACBase,this,"syncUI");this.publish(a,{defaultFn:this._defClearFn,queueable:true});this.publish(u,{defaultFn:this._defQueryFn,queueable:true});this.publish(o,{defaultFn:this._defResultsFn,queueable:true});}w.ATTRS={allowBrowserAutocomplete:{value:false},inputNode:{setter:f.one,writeOnce:"initOnly"},maxResults:{value:0},minQueryLength:{value:1},query:{readOnly:true,value:null},queryDelay:{value:100},queryDelimiter:{value:null},requestTemplate:{setter:"_setRequestTemplate",value:null},resultFilters:{setter:"_setResultFilters",value:[]},resultFormatter:{validator:n},resultHighlighter:{setter:"_setResultHighlighter"},resultListLocator:{setter:"_setLocator"},results:{readOnly:true,value:[]},resultTextLocator:{setter:"_setLocator"},source:{setter:"_setSource"},value:{value:""}};w.CSS_PREFIX="ac";w.UI_SRC=(f.Widget&&f.Widget.UI_SRC)||"ui";w.prototype={sendRequest:function(B,C){var z,A=this.get("source");if(A){if(B||B===""){this._set(x,B);}else{B=this.get(x);}if(!C){C=this.get(b);}z=C?C(B):B;A.sendRequest({request:z,callback:{success:f.bind(this._onResponse,this,B)}});}return this;},_bindUIACBase:function(){var z=this.get(g);if(!z){f.error("No inputNode specified.");}this._acBaseEvents=[z.on(t,this._onInputValueChange,this),this.after(c+"Change",this._syncBrowserAutocomplete),this.after(t,this._afterValueChange)];},_destructorACBase:function(){var z=this._acBaseEvents;while(z&&z.length){z.pop().detach();}},_syncUIACBase:function(){this._syncBrowserAutocomplete();this.set(j,this.get(g).get(j));},_createArraySource:function(A){var z=this;return{sendRequest:function(B){z[y](A.concat(),B);}};},_createJSONPSource:function(D){var A={},B={},C=this,z,E;B.sendRequest=function(G){var F=function(H){var I=H.request;if(A[I]){C[y](A[I],H);}else{D._config.on.success=function(J){A[I]=J;C[y](J,H);};D.send(I);}};z=G;if(!E){E=true;f.use("jsonp",function(){if(!(D instanceof f.JSONPRequest)){D=new f.JSONPRequest(D,{format:f.bind(C._jsonpFormatter,C)});}B.sendRequest=F;F(z);});}};return B;},_createObjectSource:function(z){return{sendRequest:function(B){var C=B.request,A=this;A[y](h.owns(z,C)?z[C]:[],B);}};},_createStringSource:function(z){if(/^(?:select|use|set)\s+/i.test(z)){return this._createYQLSource(z);}else{return this._createJSONPSource(z);}},_createYQLSource:function(C){var A={},D={},B=this,z,E;if(!this.get(m)){this.set(m,this._defaultYQLLocator);}D.sendRequest=function(G){var F=function(H){var I=H.request;if(!B.get(b)){I=encodeURIComponent(I);}if(A[I]){B[y](A[I],H);}else{f.YQL(i.sub(C,{query:I}),function(J){A[I]=J;B[y](J,H);});}};z=G;if(!E){E=true;f.use("yql",function(){D.sendRequest=F;F(z);});}};return D;},_defaultYQLLocator:function(A){var B=A&&A.query&&A.query.results,z;if(B&&q(B)){z=h.values(B)||[];B=z.length===1?z[0]:z;}else{B=[];}return B;},_functionValidator:function(z){return z===null||d(z);},_getObjectValue:function(C,B){if(!C){return;}for(var A=0,z=B.length;C&&A<z;A++){C=C[B[A]];}return C;},_jsonpFormatter:function(z,A,B){var C=this.get(b);if(C){z=z+C(B);}return i.sub(z,{callback:A,query:C?B:encodeURIComponent(B)});},_parseResponse:function(B,z,Q){var G={data:Q,query:B,results:[]},A,E,N,F=z&&z.results,H=[],C,J,P,K,L,I=this.get(m),M,O,D;if(F&&I){F=I(F);}if(F){C=this.get("resultFilters");J=this.get("resultFormatter");P=this.get("resultHighlighter");M=this.get("maxResults");O=this.get("resultTextLocator");if(O){E=p.map(F,O);D=p.hash(E,F);}else{E=F;}for(K=0,L=C.length;K<L;++K){E=C[K](B,E);if(!E||!E.length){break;}}if(O){N=E;E=[];for(K=0,L=N.length;K<L;++K){E.push(D[N[K]]);}}else{N=[].concat(E);}A=P?P(B,N):[].concat(N);if(J){A=J(B,E,A,N);}L=M>0?Math.min(M,A.length):A.length;for(K=0;K<L;++K){H[K]={display:A[K],raw:E[K],text:N[K]};}G.results=H;}this.fire(o,G);},_parseValue:function(z){var A=this.get(e);if(A){z=z.split(A);z=z[z.length-1];}return i.trimLeft(z);},_setLocator:function(z){if(this[n](z)){return z;}var A=this;z=z.toString().split(".");return function(B){return B&&A._getObjectValue(B,z);};},_setRequestTemplate:function(z){if(this[n](z)){return z;}z=z.toString();return function(A){return i.sub(z,{query:encodeURIComponent(A)});};},_setResultFilters:function(B){var z,A;if(B===null){return[];}z=f.AutoCompleteFilters;A=function(C){if(d(C)){return C;}if(s(C)&&z&&d(z[C])){return z[C];}return false;};if(r(B)){B=p.map(B,A);return p.every(B,function(C){return !!C;})?B:l;}else{B=A(B);return B?[B]:l;}},_setResultHighlighter:function(z){var A;if(this._functionValidator(z)){return z;}A=f.AutoCompleteHighlighters;if(s(z)&&A&&d(A[z])){return A[z];}return l;},_setSource:function(z){if((z&&d(z.sendRequest))||z===null){return z;}else{if(s(z)){return this._createStringSource(z);}else{if(r(z)){return this._createArraySource(z);}else{if(q(z)){return this._createObjectSource(z);}else{if(f.JSONPRequest&&z instanceof f.JSONPRequest){return this._createJSONPSource(z);}}}}}return l;},_sourceSuccess:function(A,z){z.callback.success({data:A,response:{results:A}});},_syncBrowserAutocomplete:function(){var z=this.get(g);if(z.get("nodeName").toLowerCase()==="input"){z.setAttribute("autocomplete",this.get(c)?"on":"off");}},_updateValue:function(A){var C=this.get(e),B,z,D;A=i.trimLeft(A);if(C){B=v(C);D=p.map(v(this.get(j)).split(C),v);z=D.length;if(z>1){D[z-1]=A;A=D.join(B+" ");}A=A+B+" ";}this.set(j,A);},_afterValueChange:function(E){var A,B,z=E.newVal,D,C;if(E.src!==w.UI_SRC){this._inputNode.set(j,z);return;}D=this._parseValue(z)||"";if(D.length>=this.get("minQueryLength")){A=this.get("queryDelay");C=this;B=function(){C.fire(u,{inputValue:z,query:D});
};if(A){clearTimeout(this._delay);this._delay=setTimeout(B,A);}else{B();}}else{clearTimeout(this._delay);this.fire(a);}},_onInputValueChange:function(A){var z=A.newVal;if(z===this.get(j)){return;}this.set(j,z,{src:w.UI_SRC});},_onResponse:function(z,A){if(z===this.get(x)){this._parseResponse(z,A.response,A.data);}},_defClearFn:function(){this._set(x,null);this._set(k,[]);},_defQueryFn:function(A){var z=A.query;this.sendRequest(z);},_defResultsFn:function(z){this._set(k,z[k]);}};f.AutoCompleteBase=w;},"@VERSION@",{requires:["array-extras","base-build","event-valuechange","node-base"],optional:["jsonp","yql"]});