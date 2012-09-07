YUI.add("datatype-date-format",function(e,t){var n=function(e,t,n){typeof n=="undefined"&&(n=10),t+="";for(;parseInt(e,10)<n&&n>1;n/=10)e=t+e;return e.toString()},r={formats:{a:function(e,t){return t.a[e.getDay()]},A:function(e,t){return t.A[e.getDay()]},b:function(e,t){return t.b[e.getMonth()]},B:function(e,t){return t.B[e.getMonth()]},C:function(e){return n(parseInt(e.getFullYear()/100,10),0)},d:["getDate","0"],e:["getDate"," "],g:function(e){return n(parseInt(r.formats.G(e)%100,10),0)},G:function(e){var t=e.getFullYear(),n=parseInt(r.formats.V(e),10),i=parseInt(r.formats.W(e),10);return i>n?t++:i===0&&n>=52&&t--,t},H:["getHours","0"],I:function(e){var t=e.getHours()%12;return n(t===0?12:t,0)},j:function(e){var t=new Date(""+e.getFullYear()+"/1/1 GMT"),r=new Date(""+e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()+" GMT"),i=r-t,s=parseInt(i/6e4/60/24,10)+1;return n(s,0,100)},k:["getHours"," "],l:function(e){var t=e.getHours()%12;return n(t===0?12:t," ")},m:function(e){return n(e.getMonth()+1,0)},M:["getMinutes","0"],p:function(e,t){return t.p[e.getHours()>=12?1:0]},P:function(e,t){return t.P[e.getHours()>=12?1:0]},s:function(e,t){return parseInt(e.getTime()/1e3,10)},S:["getSeconds","0"],u:function(e){var t=e.getDay();return t===0?7:t},U:function(e){var t=parseInt(r.formats.j(e),10),i=6-e.getDay(),s=parseInt((t+i)/7,10);return n(s,0)},V:function(e){var t=parseInt(r.formats.W(e),10),i=(new Date(""+e.getFullYear()+"/1/1")).getDay(),s=t+(i>4||i<=1?0:1);return s===53&&(new Date(""+e.getFullYear()+"/12/31")).getDay()<4?s=1:s===0&&(s=r.formats.V(new Date(""+(e.getFullYear()-1)+"/12/31"))),n(s,0)},w:"getDay",W:function(e){var t=parseInt(r.formats.j(e),10),i=7-r.formats.u(e),s=parseInt((t+i)/7,10);return n(s,0,10)},y:function(e){return n(e.getFullYear()%100,0)},Y:"getFullYear",z:function(e){var t=e.getTimezoneOffset(),r=n(parseInt(Math.abs(t/60),10),0),i=n(Math.abs(t%60),0);return(t>0?"-":"+")+r+i},Z:function(e){var t=e.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/,"$2").replace(/[a-z ]/g,"");return t.length>4&&(t=r.formats.z(e)),t},"%":function(e){return"%"}},aggregates:{c:"locale",D:"%m/%d/%y",F:"%Y-%m-%d",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"	",T:"%H:%M:%S",x:"locale",X:"locale"},format:function(t,i){i=i||{};if(!e.Lang.isDate(t))return e.Lang.isValue(t)?t:"";var s,o,u,a,f;s=i.format||e.config.dateFormat||"%Y-%m-%d",u=e.Lang.isUndefined(e.config.lang)&&(e.Lang.isValue(i.locale)||e.Lang.isValue(e.config.locale));if(u){a=i.locale||e.config.locale,f=e.DataType.Date.Locale,a=a.replace(/_/g,"-");if(!f[a]){var l=a.replace(/-[a-zA-Z]+$/,"");l in f?a=l:e.config.locale in f?a=e.config.locale:a="en"}o=f[a]}else o=e.Intl.get("datatype-date-format");var c=function(e,t){if(u&&t==="r")return o[t];var n=r.aggregates[t];return n==="locale"?o[t]:n},h=function(i,s){var u=r.formats[s];switch(e.Lang.type(u)){case"string":return t[u]();case"function":return u.call(t,t,o);case"array":if(e.Lang.type(u[0])==="string")return n(t[u[0]](),u[1]);default:return s}};while(s.match(/%[cDFhnrRtTxX]/))s=s.replace(/%([cDFhnrRtTxX])/g,c);var p=s.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g,h);return c=h=undefined,p}};e.mix(e.namespace("DataType.Date"),r);var i={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],r:"%I:%M:%S %p",x:"%d/%m/%y",X:"%T"};e.namespace("DataType.Date.Locale"),e.DataType.Date.Locale.en=i,e.DataType.Date.Locale["en-US"]=e.merge(i,{c:"%a %d %b %Y %I:%M:%S %p %Z",x:"%m/%d/%Y",X:"%I:%M:%S %p"}),e.DataType.Date.Locale["en-GB"]=e.merge(i,{r:"%l:%M:%S %P %Z"}),e.DataType.Date.Locale["en-AU"]=e.merge(i)},"@VERSION@",{lang:["ar","ar-JO","ca","ca-ES","da","da-DK","de","de-AT","de-DE","el","el-GR","en","en-AU","en-CA","en-GB","en-IE","en-IN","en-JO","en-MY","en-NZ","en-PH","en-SG","en-US","es","es-AR","es-BO","es-CL","es-CO","es-EC","es-ES","es-MX","es-PE","es-PY","es-US","es-UY","es-VE","fi","fi-FI","fr","fr-BE","fr-CA","fr-FR","hi","hi-IN","id","id-ID","it","it-IT","ja","ja-JP","ko","ko-KR","ms","ms-MY","nb","nb-NO","nl","nl-BE","nl-NL","pl","pl-PL","pt","pt-BR","ro","ro-RO","ru","ru-RU","sv","sv-SE","th","th-TH","tr","tr-TR","vi","vi-VN","zh-Hans","zh-Hans-CN","zh-Hant","zh-Hant-HK","zh-Hant-TW"]})