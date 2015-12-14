/*  PageDown Markdown Editor : https://github.com/timmyomahony/pagedown */
var Markdown;Markdown="object"==typeof exports&&"function"==typeof require?exports:{},function(){function e(e){return e}function t(){return!1}function n(){}function r(){}n.prototype={chain:function(t,n){var r=this[t];if(!r)throw Error("unknown hook "+t);this[t]=r===e?n:function(e){return n(r(e))}},set:function(e,t){if(!this[e])throw Error("unknown hook "+e);this[e]=t},addNoop:function(t){this[t]=e},addFalse:function(e){this[e]=t}},Markdown.HookCollection=n,r.prototype={set:function(e,t){this["s_"+e]=t},get:function(e){return this["s_"+e]}},Markdown.Converter=function(){function e(e){return e=e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(e,t,n,r,o,a){return t=t.toLowerCase(),R.set(t,T(n)),o?r:(a&&I.set(t,a.replace(/"/g,"&quot;")),"")})}function t(e){return e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,o),e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,o),e=e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,o),e=e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,o),e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,o)}function o(e,t){var n=t;return n=n.replace(/^\n+/,""),n=n.replace(/\n+$/g,""),n="\n\n~K"+(A.push(n)-1)+"K\n\n"}function a(e,n){e=g(e);var r="<hr />\n";return e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,r),e=e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,r),e=e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,r),e=d(e),e=v(e),e=k(e),e=t(e),e=C(e,n)}function i(e){return e=w(e),e=c(e),e=x(e),e=s(e),e=l(e),e=y(e),e=e.replace(/~P/g,"://"),e=T(e),e=b(e),e=e.replace(/  +\n/g," <br>\n")}function c(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;return e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");return t=H(t,"!"==e.charAt(1)?"\\`*_/":"\\`*_")})}function l(e){return e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,u),e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,u),e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,u)}function u(e,t,n,r,o,a,i,c){void 0==c&&(c="");var l=t,u=n.replace(/:\/\//g,"~P"),s=r.toLowerCase(),f=o,g=c;if(""==f)if(""==s&&(s=u.toLowerCase().replace(/ ?\n/g," ")),f="#"+s,void 0!=R.get(s))f=R.get(s),void 0!=I.get(s)&&(g=I.get(s));else{if(l.search(/\(\s*\)$/m)<=-1)return l;f=""}f=L(f),f=H(f,"*_");var d='<a href="'+f+'"';return""!=g&&(g=p(g),g=H(g,"*_"),d+=' title="'+g+'"'),d+=">"+u+"</a>"}function s(e){return e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,f),e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,f)}function p(e){return e.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function f(e,t,n,r,o,a,i,c){var l=t,u=n,s=r.toLowerCase(),f=o,g=c;if(g||(g=""),""==f){if(""==s&&(s=u.toLowerCase().replace(/ ?\n/g," ")),f="#"+s,void 0==R.get(s))return l;f=R.get(s),void 0!=I.get(s)&&(g=I.get(s))}u=H(p(u),"*_[]()"),f=H(f,"*_");var d='<img src="'+f+'" alt="'+u+'"';return g=p(g),g=H(g,"*_"),d+=' title="'+g+'"',d+=" />"}function g(e){return e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return"<h1>"+i(t)+"</h1>\n\n"}),e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return"<h2>"+i(t)+"</h2>\n\n"}),e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return"<h"+r+">"+i(n)+"</h"+r+">\n\n"})}function d(e){e+="~0";var t=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return W?e=e.replace(t,function(e,t,n){var r=t,o=n.search(/[*+-]/g)>-1?"ul":"ol",a=h(r,o);return a=a.replace(/\s+$/,""),a="<"+o+">"+a+"</"+o+">\n"}):(t=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,e=e.replace(t,function(e,t,n,r){var o=t,a=n,i=r.search(/[*+-]/g)>-1?"ul":"ol",c=h(a,i);return c=o+"<"+i+">\n"+c+"</"+i+">\n"})),e=e.replace(/~0/,"")}function h(e,t){W++,e=e.replace(/\n{2,}$/,"\n"),e+="~0";var n=B[t],r=RegExp("(^[ \\t]*)("+n+")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1("+n+")[ \\t]+))","gm"),o=!1;return e=e.replace(r,function(e,t,n,r){var c=r,l=/\n\n$/.test(c),u=l||c.search(/\n{2,}/)>-1;return u||o?c=a(S(c),!0):(c=d(S(c)),c=c.replace(/\n$/,""),c=i(c)),o=l,"<li>"+c+"</li>\n"}),e=e.replace(/~0/g,""),W--,e}function v(e){return e+="~0",e=e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t,o=n;return r=$(S(r)),r=_(r),r=r.replace(/^\n+/g,""),r=r.replace(/\n+$/g,""),r="<pre><code>"+r+"\n</code></pre>","\n\n"+r+"\n\n"+o}),e=e.replace(/~0/,"")}function m(e){return e=e.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(A.push(e)-1)+"K\n\n"}function w(e){return e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r){var o=r;return o=o.replace(/^([ \t]*)/g,""),o=o.replace(/[ \t]*$/g,""),o=$(o),o=o.replace(/:\/\//g,"~P"),t+"<code>"+o+"</code>"})}function $(e){return e=e.replace(/&/g,"&amp;"),e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=H(e,"*_{}[]\\",!1)}function b(e){return e=e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,"$1<strong>$3</strong>$4"),e=e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,"$1<em>$3</em>$4")}function k(e){return e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;return n=n.replace(/^[ \t]*>[ \t]?/gm,"~0"),n=n.replace(/~0/g,""),n=n.replace(/^[ \t]+$/gm,""),n=a(n),n=n.replace(/(^|\n)/g,"$1  "),n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;return n=n.replace(/^  /gm,"~0"),n=n.replace(/~0/g,"")}),m("<blockquote>\n"+n+"\n</blockquote>")})}function C(e,t){e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,"");for(var n=e.split(/\n{2,}/g),r=[],o=/~K(\d+)K/,a=n.length,c=0;a>c;c++){var l=n[c];o.test(l)?r.push(l):/\S/.test(l)&&(l=i(l),l=l.replace(/^([ \t]*)/g,"<p>"),l+="</p>",r.push(l))}if(!t){a=r.length;for(var c=0;a>c;c++)for(var u=!0;u;)u=!1,r[c]=r[c].replace(/~K(\d+)K/g,function(e,t){return u=!0,A[t]})}return r.join("\n\n")}function T(e){return e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;")}function x(e){return e=e.replace(/\\(\\)/g,K),e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,K)}function y(e){e=e.replace(/(^|\s)(https?|ftp)(:\/\/[-A-Z0-9+&@#\/%?=~_|\[\]\(\)!:,\.;]*[-A-Z0-9+&@#\/%=~_|\[\]])($|\W)/gi,"$1<$2$3>$4");var t=function(e,t){return'<a href="'+t+'">'+q.plainLinkText(t)+"</a>"};return e=e.replace(/<((https?|ftp):[^'">\s]+)>/gi,t)}function E(e){return e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)})}function S(e){return e=e.replace(/^(\t|[ ]{1,4})/gm,"~0"),e=e.replace(/~0/g,"")}function _(e){if(!/\t/.test(e))return e;var t,n=["    ","   ","  "," "],r=0;return e.replace(/[\n\t]/g,function(e,o){return"\n"===e?(r=o+1,e):(t=(o-r)%4,r=o+1,n[t])})}function L(e){if(!e)return"";var t=e.length;return e.replace(D,function(n,r){return"~D"==n?"%24":":"!=n||r!=t-1&&!/[0-9\/]/.test(e.charAt(r+1))?"%"+n.charCodeAt(0).toString(16):":"})}function H(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";n&&(r="\\\\"+r);var o=RegExp(r,"g");return e=e.replace(o,K)}function K(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}var q=this.hooks=new n;q.addNoop("plainLinkText"),q.addNoop("preConversion"),q.addNoop("postConversion");var R,I,A,W;this.makeHtml=function(n){if(R)throw Error("Recursive call to converter.makeHtml");return R=new r,I=new r,A=[],W=0,n=q.preConversion(n),n=n.replace(/~/g,"~T"),n=n.replace(/\$/g,"~D"),n=n.replace(/\r\n/g,"\n"),n=n.replace(/\r/g,"\n"),n="\n\n"+n+"\n\n",n=_(n),n=n.replace(/^[ \t]+$/gm,""),n=t(n),n=e(n),n=a(n),n=E(n),n=n.replace(/~D/g,"$$"),n=n.replace(/~T/g,"~"),n=q.postConversion(n),A=I=R=null,n};var B={ol:"\\d+[.]",ul:"[*+-]"},D=/(?:["'*()[\]:]|~D)/g}}(),function(){function e(){}function t(e,t,n,r){this.buttonBar=p.getElementById(e+r),this.preview=p.getElementById(t+r),this.input=p.getElementById(n+r)}function n(e,t){var n,o,a,i=this,c=[],u=0,s="none",p=function(e,t){s!=e&&(s=e,t||g()),h.isIE&&"moving"==s?a=null:o=setTimeout(f,1)},f=function(e){a=new r(t,e),o=void 0};this.setCommandMode=function(){s="command",g(),o=setTimeout(f,0)},this.canUndo=function(){return u>1},this.canRedo=function(){return c[u+1]?!0:!1},this.undo=function(){i.canUndo()&&(n?(n.restore(),n=null):(c[u]=new r(t),c[--u].restore(),e&&e())),s="none",t.input.focus(),f()},this.redo=function(){i.canRedo()&&(c[++u].restore(),e&&e()),s="none",t.input.focus(),f()};var g=function(){var o=a||new r(t);return o?"moving"==s?void(n||(n=o)):(n&&(c[u-1].text!=n.text&&(c[u++]=n),n=null),c[u++]=o,c[u+1]=null,void(e&&e())):!1},d=function(e){var t=!1;if(e.ctrlKey||e.metaKey){var n=e.charCode||e.keyCode,r=String.fromCharCode(n);switch(r.toLowerCase()){case"y":i.redo(),t=!0;break;case"z":e.shiftKey?i.redo():i.undo(),t=!0}}return t?(e.preventDefault&&e.preventDefault(),void(window.event&&(window.event.returnValue=!1))):void 0},v=function(e){if(!e.ctrlKey&&!e.metaKey){var t=e.keyCode;t>=33&&40>=t||t>=63232&&63235>=t?p("moving"):8==t||46==t||127==t?p("deleting"):13==t?p("newlines"):27==t?p("escape"):(16>t||t>20)&&91!=t&&p("typing")}},m=function(){l.addEvent(t.input,"keypress",function(e){!e.ctrlKey&&!e.metaKey||89!=e.keyCode&&90!=e.keyCode||e.preventDefault()});var e=function(){(h.isIE||a&&a.text!=t.input.value)&&void 0==o&&(s="paste",g(),f())};l.addEvent(t.input,"keydown",d),l.addEvent(t.input,"keydown",v),l.addEvent(t.input,"mousedown",function(){p("moving")}),t.input.onpaste=e,t.input.ondrop=e},w=function(){m(),f(!0),g()};w()}function r(t,n){var r=this,o=t.input;this.init=function(){l.isVisible(o)&&(n||!p.activeElement||p.activeElement===o)&&(this.setInputAreaSelectionStartEnd(),this.scrollTop=o.scrollTop,(!this.text&&o.selectionStart||0===o.selectionStart)&&(this.text=o.value))},this.setInputAreaSelection=function(){if(l.isVisible(o))if(void 0===o.selectionStart||h.isOpera){if(p.selection){if(p.activeElement&&p.activeElement!==o)return;o.focus();var e=o.createTextRange();e.moveStart("character",-o.value.length),e.moveEnd("character",-o.value.length),e.moveEnd("character",r.end),e.moveStart("character",r.start),e.select()}}else o.focus(),o.selectionStart=r.start,o.selectionEnd=r.end,o.scrollTop=r.scrollTop},this.setInputAreaSelectionStartEnd=function(){if(t.ieCachedRange||!o.selectionStart&&0!==o.selectionStart){if(p.selection){r.text=l.fixEolChars(o.value);var e=t.ieCachedRange||p.selection.createRange(),n=l.fixEolChars(e.text),a="",i=a+n+a;e.text=i;var c=l.fixEolChars(o.value);e.moveStart("character",-i.length),e.text=n,r.start=c.indexOf(a),r.end=c.lastIndexOf(a)-a.length;var u=r.text.length-l.fixEolChars(o.value).length;if(u){for(e.moveStart("character",-n.length);u--;)n+="\n",r.end+=1;e.text=n}t.ieCachedRange&&(r.scrollTop=t.ieCachedScrollTop),t.ieCachedRange=null,this.setInputAreaSelection()}}else r.start=o.selectionStart,r.end=o.selectionEnd},this.restore=function(){void 0!=r.text&&r.text!=o.value&&(o.value=r.text),this.setInputAreaSelection(),o.scrollTop=r.scrollTop},this.getChunks=function(){var t=new e;return t.before=l.fixEolChars(r.text.substring(0,r.start)),t.startTag="",t.selection=l.fixEolChars(r.text.substring(r.start,r.end)),t.endTag="",t.after=l.fixEolChars(r.text.substring(r.end)),t.scrollTop=r.scrollTop,t},this.setChunks=function(e){e.before=e.before+e.startTag,e.after=e.endTag+e.after,this.start=e.before.length,this.end=e.before.length+e.selection.length,this.text=e.before+e.selection+e.after,this.scrollTop=e.scrollTop},this.init()}function o(e,t,n){var r,o,a,i=3e3,c="delayed",s=function(e,t){l.addEvent(e,"input",t),e.onpaste=t,e.ondrop=t,l.addEvent(e,"keypress",t),l.addEvent(e,"keydown",t)},f=function(){var e=0;return window.innerHeight?e=window.pageYOffset:p.documentElement&&p.documentElement.scrollTop?e=p.documentElement.scrollTop:p.body&&(e=p.body.scrollTop),e},g=function(){if(t.preview){var n=t.input.value;if(!n||n!=a){a=n;var r=(new Date).getTime();n=e.makeHtml(n);var i=(new Date).getTime();o=i-r,T(n)}}},d=function(){if(r&&(clearTimeout(r),r=void 0),"manual"!==c){var e=0;"delayed"===c&&(e=o),e>i&&(e=i),r=setTimeout(g,e)}},v=function(e){return e.scrollHeight>e.clientHeight?e.scrollTop/(e.scrollHeight-e.clientHeight):1},m=function(){t.preview&&(t.preview.scrollTop=(t.preview.scrollHeight-t.preview.clientHeight)*v(t.preview))};this.refresh=function(e){e?(a="",g()):d()},this.processingTime=function(){return o};var w,$=!0,b=function(e){var n=t.preview,r=n.parentNode,o=n.nextSibling;r.removeChild(n),n.innerHTML=e,o?r.insertBefore(n,o):r.appendChild(n)},k=function(e){t.preview.innerHTML=e},C=function(e){if(w)return w(e);try{k(e),w=k}catch(t){w=b,w(e)}},T=function(e){var r=u.getTop(t.input)-f();if(t.preview&&(C(e),n()),m(),$)return void($=!1);var o=u.getTop(t.input)-f();h.isIE?setTimeout(function(){window.scrollBy(0,o-r)},0):window.scrollBy(0,o-r)},x=function(){s(t.input,d),g(),t.preview&&(t.preview.scrollTop=0)};x()}function a(e,t,n,o,a,i,c){function u(e){if(m.focus(),e.textOp){n&&n.setCommandMode();var a=new r(t);if(!a)return;var i=a.getChunks(),c=function(){m.focus(),i&&a.setChunks(i),a.restore(),o.refresh()},l=e.textOp(i,c);l||c()}e.execute&&e.execute(n)}function s(e,n){var r="0px",o="-20px",a="-40px",i=e.getElementsByTagName("span")[0];n?(i.style.backgroundPosition=e.XShift+" "+r,e.onmouseover=function(){i.style.backgroundPosition=this.XShift+" "+a},e.onmouseout=function(){i.style.backgroundPosition=this.XShift+" "+r},h.isIE&&(e.onmousedown=function(){p.activeElement&&p.activeElement!==t.input||(t.ieCachedRange=document.selection.createRange(),t.ieCachedScrollTop=t.input.scrollTop)}),e.isHelp||(e.onclick=function(){return this.onmouseout&&this.onmouseout(),u(this),!1})):(i.style.backgroundPosition=e.XShift+" "+o,e.onmouseover=e.onmouseout=e.onclick=function(){})}function f(e){return"string"==typeof e&&(e=a[e]),function(){e.apply(a,arguments)}}function d(){var n=t.buttonBar,r=document.createElement("ul");r.id="wmd-button-row"+e,r.className="wmd-button-row",r=n.appendChild(r);var o=0,a=function(t,n,a,i){var c=document.createElement("li");c.className="wmd-button",c.style.left=o+"px",o+=25;var l=document.createElement("span");return c.id=t+e,c.appendChild(l),c.title=n,c.XShift=a,i&&(c.textOp=i),s(c,!0),r.appendChild(c),c},l=function(t){var n=document.createElement("li");n.className="wmd-spacer wmd-spacer"+t,n.id="wmd-spacer"+t+e,r.appendChild(n),o+=25};w.bold=a("wmd-bold-button",c("bold"),"0px",f("doBold")),w.italic=a("wmd-italic-button",c("italic"),"-20px",f("doItalic")),l(1),w.link=a("wmd-link-button",c("link"),"-40px",f(function(e,t){return this.doLinkOrImage(e,t,!1)})),w.quote=a("wmd-quote-button",c("quote"),"-60px",f("doBlockquote")),w.code=a("wmd-code-button",c("code"),"-80px",f("doCode")),w.image=a("wmd-image-button",c("image"),"-100px",f(function(e,t){return this.doLinkOrImage(e,t,!0)})),l(2),w.olist=a("wmd-olist-button",c("olist"),"-120px",f(function(e,t){this.doList(e,t,!0)})),w.ulist=a("wmd-ulist-button",c("ulist"),"-140px",f(function(e,t){this.doList(e,t,!1)})),w.heading=a("wmd-heading-button",c("heading"),"-160px",f("doHeading")),w.hr=a("wmd-hr-button",c("hr"),"-180px",f("doHorizontalRule")),l(3),w.undo=a("wmd-undo-button",c("undo"),"-200px",null),w.undo.execute=function(e){e&&e.undo()};var u=c(/win/.test(g.platform.toLowerCase())?"redo":"redomac");if(w.redo=a("wmd-redo-button",u,"-220px",null),w.redo.execute=function(e){e&&e.redo()},i){var p=document.createElement("li"),d=document.createElement("span");p.appendChild(d),p.className="wmd-button wmd-help-button",p.id="wmd-help-button"+e,p.XShift="-240px",p.isHelp=!0,p.style.right="0px",p.title=c("help"),p.onclick=i.handler,s(p,!0),r.appendChild(p),w.help=p}v()}function v(){n&&(s(w.undo,n.canUndo()),s(w.redo,n.canRedo()))}var m=t.input,w={};d();var $="keydown";h.isOpera&&($="keypress"),l.addEvent(m,$,function(e){if((e.ctrlKey||e.metaKey)&&!e.altKey&&!e.shiftKey){var t=e.charCode||e.keyCode,n=String.fromCharCode(t).toLowerCase();switch(n){case"b":u(w.bold);break;case"i":u(w.italic);break;case"l":u(w.link);break;case"q":u(w.quote);break;case"k":u(w.code);break;case"g":u(w.image);break;case"o":u(w.olist);break;case"u":u(w.ulist);break;case"h":u(w.heading);break;case"r":u(w.hr);break;case"y":u(w.redo);break;case"z":u(e.shiftKey?w.redo:w.undo);break;default:return}e.preventDefault&&e.preventDefault(),window.event&&(window.event.returnValue=!1)}}),l.addEvent(m,"keyup",function(e){if(e.shiftKey&&!e.ctrlKey&&!e.metaKey){var t=e.charCode||e.keyCode;if(13===t){var n={};n.textOp=f("doAutoindent"),u(n)}}}),h.isIE&&l.addEvent(m,"keydown",function(e){var t=e.keyCode;return 27===t?!1:void 0}),this.setUndoRedoButtonStates=v}function i(e,t){this.hooks=e,this.getString=t}function c(e){return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/,function(e,t,n){return t=t.replace(/\?.*$/,function(e){return e.replace(/\+/g," ")}),t=decodeURIComponent(t),t=encodeURI(t).replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29"),t=t.replace(/\?.*$/,function(e){return e.replace(/\+/g,"%2b")}),n&&(n=n.trim?n.trim():n.replace(/^\s*/,"").replace(/\s*$/,""),n=n.replace(/"/g,"quot;").replace(/\(/g,"&#40;").replace(/\)/g,"&#41;").replace(/</g,"&lt;").replace(/>/g,"&gt;")),n?t+' "'+n+'"':t})}var l={},u={},s={},p=window.document,f=window.RegExp,g=window.navigator,d={lineLength:72},h={isIE:/msie/.test(g.userAgent.toLowerCase()),isIE_5or6:/msie 6/.test(g.userAgent.toLowerCase())||/msie 5/.test(g.userAgent.toLowerCase()),isOpera:/opera/.test(g.userAgent.toLowerCase())},v={bold:"Strong <strong> Ctrl+B",boldexample:"strong text",italic:"Emphasis <em> Ctrl+I",italicexample:"emphasized text",link:"Hyperlink <a> Ctrl+L",linkdescription:"enter link description here",linkdialog:'<p><b>Insert Hyperlink</b></p><p>http://example.com/ "optional title"</p>',quote:"Blockquote <blockquote> Ctrl+Q",quoteexample:"Blockquote",code:"Code Sample <pre><code> Ctrl+K",codeexample:"enter code here",image:"Image <img> Ctrl+G",imagedescription:"enter image description here",imagedialog:"<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg \"optional title\"<br><br>Need <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a></p>",olist:"Numbered List <ol> Ctrl+O",ulist:"Bulleted List <ul> Ctrl+U",litem:"List item",heading:"Heading <h1>/<h2> Ctrl+H",headingexample:"Heading",hr:"Horizontal Rule <hr> Ctrl+R",undo:"Undo - Ctrl+Z",redo:"Redo - Ctrl+Y",redomac:"Redo - Ctrl+Shift+Z",help:"Markdown Editing Help"},m="http://",w="http://";Markdown.Editor=function(e,r,c){c=c||{},"function"==typeof c.handler&&(c={helpButton:c}),c.strings=c.strings||{},c.helpButton&&(c.strings.help=c.strings.help||c.helpButton.title);var l=function(e){return c.strings[e]||v[e]};r=r||"",idButton="wmd-button-bar",idPreview="wmd-preview",idInput="wmd-input",c&&(c.hasOwnProperty("button")&&(idButton=c.button),c.hasOwnProperty("preview")&&(idPreview=c.preview),c.hasOwnProperty("input")&&(idInput=c.input));var u=this.hooks=new Markdown.HookCollection;u.addNoop("onPreviewRefresh"),u.addNoop("postBlockquoteCreation"),u.addFalse("insertImageDialog"),this.getConverter=function(){return e};var s,f=this;this.run=function(){if(!s){s=new t(idButton,idPreview,idInput,r);var g,d,h=new i(u,l),v=new o(e,s,function(){u.onPreviewRefresh()});/\?noundo/.test(p.location.href)||(g=new n(function(){v.refresh(),d&&d.setUndoRedoButtonStates()},s),this.textOperation=function(e){g.setCommandMode(),e(),f.refreshPreview()}),d=new a(r,s,g,v,h,c.helpButton,l),d.setUndoRedoButtonStates();var m=f.refreshPreview=function(){v.refresh(!0)};m()}}},e.prototype.findTags=function(e,t){var n,r=this;e&&(n=l.extendRegExp(e,"","$"),this.before=this.before.replace(n,function(e){return r.startTag=r.startTag+e,""}),n=l.extendRegExp(e,"^",""),this.selection=this.selection.replace(n,function(e){return r.startTag=r.startTag+e,""})),t&&(n=l.extendRegExp(t,"","$"),this.selection=this.selection.replace(n,function(e){return r.endTag=e+r.endTag,""}),n=l.extendRegExp(t,"^",""),this.after=this.after.replace(n,function(e){return r.endTag=e+r.endTag,""}))},e.prototype.trimWhitespace=function(e){var t,n,r=this;e?t=n="":(t=function(e){return r.before+=e,""},n=function(e){return r.after=e+r.after,""}),this.selection=this.selection.replace(/^(\s*)/,t).replace(/(\s*)$/,n)},e.prototype.skipLines=function(e,t,n){void 0===e&&(e=1),void 0===t&&(t=1),e++,t++;var r,o;if(navigator.userAgent.match(/Chrome/)&&"X".match(/()./),this.selection=this.selection.replace(/(^\n*)/,""),this.startTag=this.startTag+f.$1,this.selection=this.selection.replace(/(\n*$)/,""),this.endTag=this.endTag+f.$1,this.startTag=this.startTag.replace(/(^\n*)/,""),this.before=this.before+f.$1,this.endTag=this.endTag.replace(/(\n*$)/,""),this.after=this.after+f.$1,this.before){for(r=o="";e--;)r+="\\n?",o+="\n";n&&(r="\\n*"),this.before=this.before.replace(new f(r+"$",""),o)}if(this.after){for(r=o="";t--;)r+="\\n?",o+="\n";n&&(r="\\n*"),this.after=this.after.replace(new f(r,""),o)}},l.isVisible=function(e){return window.getComputedStyle?"none"!==window.getComputedStyle(e,null).getPropertyValue("display"):e.currentStyle?"none"!==e.currentStyle.display:void 0},l.addEvent=function(e,t,n){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)},l.removeEvent=function(e,t,n){e.detachEvent?e.detachEvent("on"+t,n):e.removeEventListener(t,n,!1)},l.fixEolChars=function(e){return e=e.replace(/\r\n/g,"\n"),e=e.replace(/\r/g,"\n")},l.extendRegExp=function(e,t,n){(null===t||void 0===t)&&(t=""),(null===n||void 0===n)&&(n="");var r,o=""+e;return o=o.replace(/\/([gim]*)$/,function(e,t){return r=t,""}),o=o.replace(/(^\/|\/$)/g,""),o=t+o+n,new f(o,r)},u.getTop=function(e,t){var n=e.offsetTop;if(!t)for(;e=e.offsetParent;)n+=e.offsetTop;return n},u.getHeight=function(e){return e.offsetHeight||e.scrollHeight},u.getWidth=function(e){return e.offsetWidth||e.scrollWidth},u.getPageSize=function(){var e,t,n,r;self.innerHeight&&self.scrollMaxY?(e=p.body.scrollWidth,t=self.innerHeight+self.scrollMaxY):p.body.scrollHeight>p.body.offsetHeight?(e=p.body.scrollWidth,t=p.body.scrollHeight):(e=p.body.offsetWidth,t=p.body.offsetHeight),self.innerHeight?(n=self.innerWidth,r=self.innerHeight):p.documentElement&&p.documentElement.clientHeight?(n=p.documentElement.clientWidth,r=p.documentElement.clientHeight):p.body&&(n=p.body.clientWidth,r=p.body.clientHeight);var o=Math.max(e,n),a=Math.max(t,r);return[o,a,n,r]},s.createBackground=function(){var e=p.createElement("div"),t=e.style;e.className="wmd-prompt-background",t.position="absolute",t.top="0",t.zIndex="1000",h.isIE?t.filter="alpha(opacity=50)":t.opacity="0.5";var n=u.getPageSize();return t.height=n[1]+"px",h.isIE?(t.left=p.documentElement.scrollLeft,t.width=p.documentElement.clientWidth):(t.left="0",t.width="100%"),p.body.appendChild(e),e},s.prompt=function(e,t,n){var r,o;void 0===t&&(t="");var a=function(e){var t=e.charCode||e.keyCode;27===t&&i(!0)},i=function(e){l.removeEvent(p.body,"keydown",a);var t=o.value;return e?t=null:(t=t.replace(/^http:\/\/(https?|ftp):\/\//,"$1://"),/^(?:https?|ftp):\/\//.test(t)||(t="http://"+t)),r.parentNode.removeChild(r),n(t),!1},c=function(){r=p.createElement("div"),r.className="wmd-prompt-dialog",r.style.padding="10px;",r.style.position="fixed",r.style.width="400px",r.style.zIndex="1001";var n=p.createElement("div");n.innerHTML=e,n.style.padding="5px",r.appendChild(n);var c=p.createElement("form"),s=c.style;c.onsubmit=function(){return i(!1)},s.padding="0",s.margin="0",s.cssFloat="left",s.width="100%",s.textAlign="center",s.position="relative",r.appendChild(c),o=p.createElement("input"),o.type="text",o.value=t,s=o.style,s.display="block",s.width="80%",s.marginLeft=s.marginRight="auto",c.appendChild(o);var f=p.createElement("input");f.type="button",f.onclick=function(){return i(!1)},f.value="OK",s=f.style,s.margin="10px",s.display="inline",s.width="7em";var g=p.createElement("input");g.type="button",g.onclick=function(){return i(!0)},g.value="Cancel",s=g.style,s.margin="10px",s.display="inline",s.width="7em",c.appendChild(f),c.appendChild(g),l.addEvent(p.body,"keydown",a),r.style.top="50%",r.style.left="50%",r.style.display="block",h.isIE_5or6&&(r.style.position="absolute",r.style.top=p.documentElement.scrollTop+200+"px",r.style.left="50%"),p.body.appendChild(r),r.style.marginTop=-(u.getHeight(r)/2)+"px",r.style.marginLeft=-(u.getWidth(r)/2)+"px"};setTimeout(function(){c();var e=t.length;if(void 0!==o.selectionStart)o.selectionStart=0,o.selectionEnd=e;else if(o.createTextRange){var n=o.createTextRange();n.collapse(!1),n.moveStart("character",-e),n.moveEnd("character",e),n.select()}o.focus()},0)};var $=i.prototype;$.prefixes="(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)",$.unwrap=function(e){var t=new f("([^\\n])\\n(?!(\\n|"+this.prefixes+"))","g");e.selection=e.selection.replace(t,"$1 $2")},$.wrap=function(e,t){this.unwrap(e);var n=new f("(.{1,"+t+"})( +|$\\n?)","gm"),r=this;e.selection=e.selection.replace(n,function(e,t){return new f("^"+r.prefixes,"").test(e)?e:t+"\n"}),e.selection=e.selection.replace(/\s+$/,"")},$.doBold=function(e,t){return this.doBorI(e,t,2,this.getString("boldexample"))},$.doItalic=function(e,t){return this.doBorI(e,t,1,this.getString("italicexample"))},$.doBorI=function(e,t,n,r){e.trimWhitespace(),e.selection=e.selection.replace(/\n{2,}/g,"\n");var o=/(\**$)/.exec(e.before)[0],a=/(^\**)/.exec(e.after)[0],i=Math.min(o.length,a.length);if(i<n||2==i&&1==n)if(!e.selection&&a){e.after=e.after.replace(/^([*_]*)/,""),e.before=e.before.replace(/(\s?)$/,"");var c=f.$1;e.before=e.before+a+c}else{e.selection||a||(e.selection=r);var l=n>1?"**":"*";e.before=e.before+l,e.after=l+e.after}else e.before=e.before.replace(f("[*]{"+n+"}$",""),""),e.after=e.after.replace(f("^[*]{"+n+"}",""),"")},$.stripLinkDefs=function(e,t){return e=e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm,function(e,n,r,o,a){return t[n]=e.replace(/\s*$/,""),o?(t[n]=e.replace(/["(](.+?)[")]$/,""),o+a):""})},$.addLinkDef=function(e,t){var n=0,r={};e.before=this.stripLinkDefs(e.before,r),e.selection=this.stripLinkDefs(e.selection,r),e.after=this.stripLinkDefs(e.after,r);var o="",a=/(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g,i=function(e){n++,e=e.replace(/^[ ]{0,3}\[(\d+)\]:/,"  ["+n+"]:"),o+="\n"+e},c=function(e,t,o,l,u,s){return o=o.replace(a,c),r[u]?(i(r[u]),t+o+l+n+s):e};e.before=e.before.replace(a,c),t?i(t):e.selection=e.selection.replace(a,c);var l=n;return e.after=e.after.replace(a,c),e.after&&(e.after=e.after.replace(/\n*$/,"")),e.after||(e.selection=e.selection.replace(/\n*$/,"")),e.after+="\n\n"+o,l},$.doLinkOrImage=function(e,t,n){e.trimWhitespace(),e.findTags(/\s*!?\[/,/\][ ]?(?:\n[ ]*)?(\[.*?\])?/);var r;if(e.endTag.length<=1||e.startTag.length<=0){if(e.selection=e.startTag+e.selection+e.endTag,e.startTag=e.endTag="",/\n\n/.test(e.selection))return void this.addLinkDef(e,null);var o=this,a=function(a){if(r.parentNode.removeChild(r),null!==a){e.selection=(" "+e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g,"$1\\").substr(1);var i=" [999]: "+c(a),l=o.addLinkDef(e,i);e.startTag=n?"![":"[",e.endTag="]["+l+"]",e.selection||(e.selection=o.getString(n?"imagedescription":"linkdescription"))}t()};return r=s.createBackground(),n?this.hooks.insertImageDialog(a)||s.prompt(this.getString("imagedialog"),m,a):s.prompt(this.getString("linkdialog"),w,a),!0}e.startTag=e.startTag.replace(/!?\[/,""),e.endTag="",this.addLinkDef(e,null)},$.doAutoindent=function(e){var t=this,n=!1;e.before=e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/,"\n\n"),e.before=e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/,"\n\n"),e.before=e.before.replace(/(\n|^)[ \t]+\n$/,"\n\n"),e.selection||/^[ \t]*(?:\n|$)/.test(e.after)||(e.after=e.after.replace(/^[^\n]*/,function(t){return e.selection=t,""}),n=!0),/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before)&&t.doList&&t.doList(e),/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before)&&t.doBlockquote&&t.doBlockquote(e),/(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before)&&t.doCode&&t.doCode(e),n&&(e.after=e.selection+e.after,e.selection="")},$.doBlockquote=function(e){e.selection=e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/,function(t,n,r,o){return e.before+=n,e.after=o+e.after,r}),e.before=e.before.replace(/(>[ \t]*)$/,function(t,n){return e.selection=n+e.selection,""}),e.selection=e.selection.replace(/^(\s|>)+$/,""),e.selection=e.selection||this.getString("quoteexample");var t,n="",r="";if(e.before){for(var o=e.before.replace(/\n$/,"").split("\n"),a=!1,i=0;i<o.length;i++){var c=!1;t=o[i],a=a&&t.length>0,/^>/.test(t)?(c=!0,!a&&t.length>1&&(a=!0)):c=/^[ \t]*$/.test(t)?!0:a,c?n+=t+"\n":(r+=n+t,n="\n")}/(^|\n)>/.test(n)||(r+=n,n="")}e.startTag=n,e.before=r,e.after&&(e.after=e.after.replace(/^\n?/,"\n")),e.after=e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/,function(t){return e.endTag=t,""});var l=function(t){var n=t?"> ":"";e.startTag&&(e.startTag=e.startTag.replace(/\n((>|\s)*)\n$/,function(e,t){return"\n"+t.replace(/^[ ]{0,3}>?[ \t]*$/gm,n)+"\n"})),e.endTag&&(e.endTag=e.endTag.replace(/^\n((>|\s)*)\n/,function(e,t){return"\n"+t.replace(/^[ ]{0,3}>?[ \t]*$/gm,n)+"\n"}))};/^(?![ ]{0,3}>)/m.test(e.selection)?(this.wrap(e,d.lineLength-2),e.selection=e.selection.replace(/^/gm,"> "),l(!0),e.skipLines()):(e.selection=e.selection.replace(/^[ ]{0,3}> ?/gm,""),this.unwrap(e),l(!1),!/^(\n|^)[ ]{0,3}>/.test(e.selection)&&e.startTag&&(e.startTag=e.startTag.replace(/\n{0,2}$/,"\n\n")),!/(\n|^)[ ]{0,3}>.*$/.test(e.selection)&&e.endTag&&(e.endTag=e.endTag.replace(/^\n{0,2}/,"\n\n"))),e.selection=this.hooks.postBlockquoteCreation(e.selection),/\n/.test(e.selection)||(e.selection=e.selection.replace(/^(> *)/,function(t,n){return e.startTag+=n,""}))},$.doCode=function(e){var t=/\S[ ]*$/.test(e.before),n=/^[ ]*\S/.test(e.after);if(!n&&!t||/\n/.test(e.selection)){e.before=e.before.replace(/[ ]{4}$/,function(t){return e.selection=t+e.selection,""});var r=1,o=1;/(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before)&&(r=0),/^\n(\t|[ ]{4,})/.test(e.after)&&(o=0),e.skipLines(r,o),e.selection?/^[ ]{0,3}\S/m.test(e.selection)?/\n/.test(e.selection)?e.selection=e.selection.replace(/^/gm,"    "):e.before+="    ":e.selection=e.selection.replace(/^[ ]{4}/gm,""):(e.startTag="    ",e.selection=this.getString("codeexample"))}else e.trimWhitespace(),e.findTags(/`/,/`/),e.startTag||e.endTag?e.endTag&&!e.startTag?(e.before+=e.endTag,e.endTag=""):e.startTag=e.endTag="":(e.startTag=e.endTag="`",e.selection||(e.selection=this.getString("codeexample")))},$.doList=function(e,t,n){var r=/(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/,o=/^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/,a="-",i=1,c=function(){var e;return n?(e=" "+i+". ",i++):e=" "+a+" ",e},l=function(e){return void 0===n&&(n=/^\s*\d/.test(e)),e=e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm,function(){return c()})};if(e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/,null),!e.before||/\n$/.test(e.before)||/^\n/.test(e.startTag)||(e.before+=e.startTag,e.startTag=""),e.startTag){var u=/\d+[.]/.test(e.startTag);if(e.startTag="",e.selection=e.selection.replace(/\n[ ]{4}/g,"\n"),this.unwrap(e),e.skipLines(),u&&(e.after=e.after.replace(o,l)),n==u)return}var s=1;e.before=e.before.replace(r,function(e){return/^\s*([*+-])/.test(e)&&(a=f.$1),s=/[^\n]\n\n[^\n]/.test(e)?1:0,l(e)}),e.selection||(e.selection=this.getString("litem"));var p=c(),g=1;e.after=e.after.replace(o,function(e){return g=/[^\n]\n\n[^\n]/.test(e)?1:0,l(e)}),e.trimWhitespace(!0),e.skipLines(s,g,!0),e.startTag=p;var h=p.replace(/./g," ");this.wrap(e,d.lineLength-h.length),e.selection=e.selection.replace(/\n/g,"\n"+h)},$.doHeading=function(e){if(e.selection=e.selection.replace(/\s+/g," "),e.selection=e.selection.replace(/(^\s+|\s+$)/g,""),!e.selection)return e.startTag="## ",e.selection=this.getString("headingexample"),void(e.endTag=" ##");
var t=0;e.findTags(/#+[ ]*/,/[ ]*#+/),/#+/.test(e.startTag)&&(t=f.lastMatch.length),e.startTag=e.endTag="",e.findTags(null,/\s?(-+|=+)/),/=+/.test(e.endTag)&&(t=1),/-+/.test(e.endTag)&&(t=2),e.startTag=e.endTag="",e.skipLines(1,1);var n=0==t?2:t-1;if(n>0){var r=2>n?"=":"-",o=e.selection.length;for(o>d.lineLength&&(o=d.lineLength),e.endTag="\n";o--;)e.endTag+=r}},$.doHorizontalRule=function(e){e.startTag="----------\n",e.selection="",e.skipLines(2,1,!0)}}();

/* Weasel CMS */
(function() {

	var remover = document.querySelector('#page-remove-form');
	if (!!remover) {
		remover.onsubmit = function() {
			return confirm('You are about to remove the page, are you sure?!');
		}
	}
	var message = document.querySelector('#message');
	if (!!message) {
		setTimeout(function(){ message.style.display = 'none' }, 2000);
	}

    var fileremover = document.querySelectorAll('.remove-file-button');
	if (!!fileremover) {
		console.log('items');
		for ( var i=0; i<fileremover.length; i++) {
			fileremover[i].onclick = function() {
				return confirm('You are about to remove the file, are you sure?!');
			}
		}
	}

	/* Markdown Editor */
	var converter = new Markdown.Converter();
		converter.hooks.chain("plainLinkText", function (url) { return "This is a link to " + url.replace(/^https?:\/\//, ""); });
	var options = { strings: { quoteexample: "whatever you're quoting, put it right here" } };
	var editor = new Markdown.Editor(converter, '', options);
	editor.run();


})();
