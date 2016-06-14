!function(n,e,t){"use strict";function r(n){function e(n,e){return n?a(n)?n.indexOf(e)>=0:n.hasOwnProperty(e):void 0}return["$animate",function(n){return{restrict:"AE",transclude:"element",terminal:!0,require:"^^ngMessages",link:function(t,r,i,o,s){var u,l=r[0],c=i.ngMessage||i.when,f=i.ngMessageExp||i.whenExp,d=function(n){u=n?a(n)?n:n.split(/[\s,]+/):null,o.reRender()};f?(d(t.$eval(f)),t.$watchCollection(f,d)):d(c);var m,v;o.register(l,v={test:function(n){return e(u,n)},attach:function(){m||s(t,function(e){n.enter(e,null,r),m=e;var t=m.$$attachId=o.getAttachId();m.on("$destroy",function(){m&&m.$$attachId===t&&(o.deregister(l),v.detach())})})},detach:function(){if(m){var e=m;m=null,n.leave(e)}}})}}}]}var a=e.isArray,i=e.forEach,o=e.isString,s=e.element;e.module("ngMessages",[]).directive("ngMessages",["$animate",function(n){function e(n,e){return o(e)&&0===e.length||t(n.$eval(e))}function t(n){return o(n)?n.length:!!n}var r="ng-active",a="ng-inactive";return{require:"ngMessages",restrict:"AE",controller:["$element","$scope","$attrs",function(o,s,u){function l(n,e){for(var t=e,r=[];t&&t!==n;){var a=t.$$ngMessageNode;if(a&&a.length)return g[a];t.childNodes.length&&-1==r.indexOf(t)?(r.push(t),t=t.childNodes[t.childNodes.length-1]):t=t.previousSibling||t.parentNode}}function c(n,e,t){var r=g[t];if(d.head){var a=l(n,e);a?(r.next=a.next,a.next=r):(r.next=d.head,d.head=r)}else d.head=r}function f(n,e,t){var r=g[t],a=l(n,e);a?a.next=r.next:d.head=r.next}var d=this,m=0,v=0;this.getAttachId=function(){return v++};var p,h,g=this.messages={};this.render=function(l){l=l||{},p=!1,h=l;for(var c=e(s,u.ngMessagesMultiple)||e(s,u.multiple),f=[],m={},v=d.head,g=!1,$=0;null!=v;){$++;var C=v.message,y=!1;g||i(l,function(n,e){if(!y&&t(n)&&C.test(e)){if(m[e])return;m[e]=!0,y=!0,C.attach()}}),y?g=!c:f.push(C),v=v.next}i(f,function(n){n.detach()}),f.length!==$?n.setClass(o,r,a):n.setClass(o,a,r)},s.$watchCollection(u.ngMessages||u["for"],d.render),this.reRender=function(){p||(p=!0,s.$evalAsync(function(){p&&h&&d.render(h)}))},this.register=function(n,e){var t=m.toString();g[t]={message:e},c(o[0],n,t),n.$$ngMessageNode=t,m++,d.reRender()},this.deregister=function(n){var e=n.$$ngMessageNode;delete n.$$ngMessageNode,f(o[0],n,e),delete g[e],d.reRender()}}]}}]).directive("ngMessagesInclude",["$templateRequest","$document","$compile",function(n,e,t){return{restrict:"AE",require:"^^ngMessages",link:function(r,a,i){var o=i.ngMessagesInclude||i.src;n(o).then(function(n){t(n)(r,function(n){a.after(n);var t=s(e[0].createComment(" ngMessagesInclude: "+o+" "));a.after(t),a.remove()})})}}}]).directive("ngMessage",r("AE")).directive("ngMessageExp",r("A"))}(window,window.angular),function(n,e,t){"use strict";function r(n,e,t){if(!n)throw gn("areq","Argument '{0}' is {1}",e||"?",t||"required");return n}function a(n,e){return n||e?n?e?(J(n)&&(n=n.join(" ")),J(e)&&(e=e.join(" ")),n+" "+e):n:e:""}function i(n){var e={};return n&&(n.to||n.from)&&(e.to=n.to,e.from=n.from),e}function o(n,e,t){var r="";return n=J(n)?n:n&&K(n)&&n.length?n.split(/\s+/):[],H(n,function(n,a){n&&n.length>0&&(r+=a>0?" ":"",r+=t?e+n:n+e)}),r}function s(n,e){var t=n.indexOf(e);e>=0&&n.splice(t,1)}function u(n){if(n instanceof L)switch(n.length){case 0:return[];case 1:if(n[0].nodeType===X)return n;break;default:return L(l(n))}return n.nodeType===X?L(n):void 0}function l(n){if(!n[0])return n;for(var e=0;e<n.length;e++){var t=n[e];if(t.nodeType==X)return t}}function c(n,e,t){H(e,function(e){n.addClass(e,t)})}function f(n,e,t){H(e,function(e){n.removeClass(e,t)})}function d(n){return function(e,t){t.addClass&&(c(n,e,t.addClass),t.addClass=null),t.removeClass&&(f(n,e,t.removeClass),t.removeClass=null)}}function m(n){if(n=n||{},!n.$$prepared){var e=n.domOperation||R;n.domOperation=function(){n.$$domOperationFired=!0,e(),e=R},n.$$prepared=!0}return n}function v(n,e){p(n,e),h(n,e)}function p(n,e){e.from&&(n.css(e.from),e.from=null)}function h(n,e){e.to&&(n.css(e.to),e.to=null)}function g(n,e,t){var r=e.options||{},a=t.options||{},i=(r.addClass||"")+" "+(a.addClass||""),o=(r.removeClass||"")+" "+(a.removeClass||""),s=$(n.attr("class"),i,o);a.preparationClasses&&(r.preparationClasses=M(a.preparationClasses,r.preparationClasses),delete a.preparationClasses);var u=r.domOperation!==R?r.domOperation:null;return Q(r,a),u&&(r.domOperation=u),s.addClass?r.addClass=s.addClass:r.addClass=null,s.removeClass?r.removeClass=s.removeClass:r.removeClass=null,e.addClass=r.addClass,e.removeClass=r.removeClass,r}function $(n,e,t){function r(n){K(n)&&(n=n.split(" "));var e={};return H(n,function(n){n.length&&(e[n]=!0)}),e}var a=1,i=-1,o={};n=r(n),e=r(e),H(e,function(n,e){o[e]=a}),t=r(t),H(t,function(n,e){o[e]=o[e]===a?null:i});var s={addClass:"",removeClass:""};return H(o,function(e,t){var r,o;e===a?(r="addClass",o=!n[t]):e===i&&(r="removeClass",o=n[t]),o&&(s[r].length&&(s[r]+=" "),s[r]+=t)}),s}function C(n){return n instanceof e.element?n[0]:n}function y(n,e,t){var r="";e&&(r=o(e,_,!0)),t.addClass&&(r=M(r,o(t.addClass,Y))),t.removeClass&&(r=M(r,o(t.removeClass,Z))),r.length&&(t.preparationClasses=r,n.addClass(r))}function w(n,e){e.preparationClasses&&(n.removeClass(e.preparationClasses),e.preparationClasses=null),e.activeClasses&&(n.removeClass(e.activeClasses),e.activeClasses=null)}function b(n,e){var t=e?"-"+e+"s":"";return A(n,[pn,t]),[pn,t]}function D(n,e){var t=e?"paused":"",r=E+fn;return A(n,[r,t]),[r,t]}function A(n,e){var t=e[0],r=e[1];n.style[t]=r}function M(n,e){return n?e?n+" "+e:n:e}function k(n){return[vn,n+"s"]}function O(n,e){var t=e?mn:pn;return[t,n+"s"]}function x(n,e,t){var r=Object.create(null),a=n.getComputedStyle(e)||{};return H(t,function(n,e){var t=a[n];if(t){var i=t.charAt(0);("-"===i||"+"===i||i>=0)&&(t=S(t)),0===t&&(t=null),r[e]=t}}),r}function S(n){var e=0,t=n.split(/\s*,\s*/);return H(t,function(n){"s"==n.charAt(n.length-1)&&(n=n.substring(0,n.length-1)),n=parseFloat(n)||0,e=e?Math.max(n,e):n}),e}function I(n){return 0===n||null!=n}function T(n,e){var t=j,r=n+"s";return e?t+=on:r+=" linear all",[t,r]}function P(){var n=Object.create(null);return{flush:function(){n=Object.create(null)},count:function(e){var t=n[e];return t?t.total:0},get:function(e){var t=n[e];return t&&t.value},put:function(e,t){n[e]?n[e].total++:n[e]={total:1,value:t}}}}function N(n,e,t){H(t,function(t){n[t]=G(n[t])?n[t]:e.style.getPropertyValue(t)})}var j,q,E,F,R=e.noop,B=e.copy,Q=e.extend,L=e.element,H=e.forEach,J=e.isArray,K=e.isString,U=e.isObject,W=e.isUndefined,G=e.isDefined,V=e.isFunction,z=e.isElement,X=1,Y="-add",Z="-remove",_="ng-",nn="-active",en="-prepare",tn="ng-animate",rn="$$ngAnimateChildren",an="";W(n.ontransitionend)&&G(n.onwebkittransitionend)?(an="-webkit-",j="WebkitTransition",q="webkitTransitionEnd transitionend"):(j="transition",q="transitionend"),W(n.onanimationend)&&G(n.onwebkitanimationend)?(an="-webkit-",E="WebkitAnimation",F="webkitAnimationEnd animationend"):(E="animation",F="animationend");var on="Duration",sn="Property",un="Delay",ln="TimingFunction",cn="IterationCount",fn="PlayState",dn=9999,mn=E+un,vn=E+on,pn=j+un,hn=j+on,gn=e.$$minErr("ng"),$n=["$$rAF",function(n){function e(n){r=r.concat(n),t()}function t(){if(r.length){for(var e=r.shift(),i=0;i<e.length;i++)e[i]();a||n(function(){a||t()})}}var r,a;return r=e.queue=[],e.waitUntilQuiet=function(e){a&&a(),a=n(function(){a=null,e(),t()})},e}],Cn=["$interpolate",function(n){return{link:function(t,r,a){function i(n){n="on"===n||"true"===n,r.data(rn,n)}var o=a.ngAnimateChildren;e.isString(o)&&0===o.length?r.data(rn,!0):(i(n(o)(t)),a.$observe("ngAnimateChildren",i))}}}],yn="$$animateCss",wn=1e3,bn=3,Dn=1.5,An={transitionDuration:hn,transitionDelay:pn,transitionProperty:j+sn,animationDuration:vn,animationDelay:mn,animationIterationCount:E+cn},Mn={transitionDuration:hn,transitionDelay:pn,animationDuration:vn,animationDelay:mn},kn=["$animateProvider",function(n){var e=P(),t=P();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(n,r,a,u,l,c,f,g){function $(n,e){var t="$$ngAnimateParentKey",r=n.parentNode,a=r[t]||(r[t]=++Q);return a+"-"+n.getAttribute("class")+"-"+e}function y(t,r,a,i){var o=e.get(a);return o||(o=x(n,t,i),"infinite"===o.animationIterationCount&&(o.animationIterationCount=1)),e.put(a,o),o}function w(a,i,s,u){var l;if(e.count(s)>0&&(l=t.get(s),!l)){var c=o(i,"-stagger");r.addClass(a,c),l=x(n,a,u),l.animationDuration=Math.max(l.animationDuration,0),l.transitionDuration=Math.max(l.transitionDuration,0),r.removeClass(a,c),t.put(s,l)}return l||{}}function M(n){L.push(n),f.waitUntilQuiet(function(){e.flush(),t.flush();for(var n=l(),r=0;r<L.length;r++)L[r](n);L.length=0})}function S(n,e,t){var r=y(n,e,t,An),a=r.animationDelay,i=r.transitionDelay;return r.maxDelay=a&&i?Math.max(a,i):a||i,r.maxDuration=Math.max(r.animationDuration*r.animationIterationCount,r.transitionDuration),r}var P=d(r),Q=0,L=[];return function(n,t){function l(){d()}function f(){d(!0)}function d(e){if(!(G||z&&V)){G=!0,V=!1,K.$$skipPreparationClasses||r.removeClass(n,Cn),r.removeClass(n,kn),D(W,!1),b(W,!1),H(cn,function(n){W.style[n[0]]=""}),P(n,K),v(n,K),Object.keys(U).length&&H(U,function(n,e){n?W.style.setProperty(e,n):W.style.removeProperty(e)}),K.onDone&&K.onDone(),vn&&vn.length&&n.off(vn.join(" "),Q);var t=n.data(yn);t&&(u.cancel(t[0].timer),n.removeData(yn)),X&&X.complete(!e)}}function y(n){Qn.blockTransition&&b(W,n),Qn.blockKeyframeAnimation&&D(W,!!n)}function x(){return X=new a({end:l,cancel:f}),M(R),d(),{$$willAnimate:!1,start:function(){return X},end:l}}function Q(n){n.stopPropagation();var e=n.originalEvent||n,t=e.$manualTimeStamp||Date.now(),r=parseFloat(e.elapsedTime.toFixed(bn));Math.max(t-un,0)>=rn&&r>=an&&(z=!0,d())}function L(){function e(){if(!G){if(y(!1),H(cn,function(n){var e=n[0],t=n[1];W.style[e]=t}),P(n,K),r.addClass(n,kn),Qn.recalculateTimingStyles){if(An=W.className+" "+Cn,Sn=$(W,An),Rn=S(W,An,Sn),Bn=Rn.maxDelay,tn=Math.max(Bn,0),an=Rn.maxDuration,0===an)return void d();Qn.hasTransitions=Rn.transitionDuration>0,Qn.hasAnimations=Rn.animationDuration>0}if(Qn.applyAnimationDelay&&(Bn="boolean"!=typeof K.delay&&I(K.delay)?parseFloat(K.delay):Bn,tn=Math.max(Bn,0),Rn.animationDelay=Bn,Ln=O(Bn,!0),cn.push(Ln),W.style[Ln[0]]=Ln[1]),rn=tn*wn,on=an*wn,K.easing){var e,a=K.easing;Qn.hasTransitions&&(e=j+ln,cn.push([e,a]),W.style[e]=a),Qn.hasAnimations&&(e=E+ln,cn.push([e,a]),W.style[e]=a)}Rn.transitionDuration&&vn.push(q),Rn.animationDuration&&vn.push(F),un=Date.now();var i=rn+Dn*on,o=un+i,s=n.data(yn)||[],l=!0;if(s.length){var c=s[0];l=o>c.expectedEndTime,l?u.cancel(c.timer):s.push(d)}if(l){var f=u(t,i,!1);s[0]={timer:f,expectedEndTime:o},s.push(d),n.data(yn,s)}vn.length&&n.on(vn.join(" "),Q),K.to&&(K.cleanupStyles&&N(U,W,Object.keys(K.to)),h(n,K))}}function t(){var e=n.data(yn);if(e){for(var t=1;t<e.length;t++)e[t]();n.removeData(yn)}}if(!G){if(!W.parentNode)return void d();var a=function(n){if(z)V&&n&&(V=!1,d());else if(V=!n,Rn.animationDuration){var e=D(W,V);V?cn.push(e):s(cn,e)}},i=En>0&&(Rn.transitionDuration&&0===In.transitionDuration||Rn.animationDuration&&0===In.animationDuration)&&Math.max(In.animationDelay,In.transitionDelay);i?u(e,Math.floor(i*En*wn),!1):e(),en.resume=function(){a(!0)},en.pause=function(){a(!1)}}}var K=t||{};K.$$prepared||(K=m(B(K)));var U={},W=C(n);if(!W||!W.parentNode||!g.enabled())return x();var G,V,z,X,en,tn,rn,an,on,un,cn=[],fn=n.attr("class"),mn=i(K),vn=[];if(0===K.duration||!c.animations&&!c.transitions)return x();var pn=K.event&&J(K.event)?K.event.join(" "):K.event,hn=pn&&K.structural,gn="",$n="";hn?gn=o(pn,_,!0):pn&&(gn=pn),K.addClass&&($n+=o(K.addClass,Y)),K.removeClass&&($n.length&&($n+=" "),$n+=o(K.removeClass,Z)),K.applyClassesEarly&&$n.length&&P(n,K);var Cn=[gn,$n].join(" ").trim(),An=fn+" "+Cn,kn=o(Cn,nn),On=mn.to&&Object.keys(mn.to).length>0,xn=(K.keyframeStyle||"").length>0;if(!xn&&!On&&!Cn)return x();var Sn,In;if(K.stagger>0){var Tn=parseFloat(K.stagger);In={transitionDelay:Tn,animationDelay:Tn,transitionDuration:0,animationDuration:0}}else Sn=$(W,An),In=w(W,Cn,Sn,Mn);K.$$skipPreparationClasses||r.addClass(n,Cn);var Pn;if(K.transitionStyle){var Nn=[j,K.transitionStyle];A(W,Nn),cn.push(Nn)}if(K.duration>=0){Pn=W.style[j].length>0;var jn=T(K.duration,Pn);A(W,jn),cn.push(jn)}if(K.keyframeStyle){var qn=[E,K.keyframeStyle];A(W,qn),cn.push(qn)}var En=In?K.staggerIndex>=0?K.staggerIndex:e.count(Sn):0,Fn=0===En;Fn&&!K.skipBlocking&&b(W,dn);var Rn=S(W,An,Sn),Bn=Rn.maxDelay;tn=Math.max(Bn,0),an=Rn.maxDuration;var Qn={};if(Qn.hasTransitions=Rn.transitionDuration>0,Qn.hasAnimations=Rn.animationDuration>0,Qn.hasTransitionAll=Qn.hasTransitions&&"all"==Rn.transitionProperty,Qn.applyTransitionDuration=On&&(Qn.hasTransitions&&!Qn.hasTransitionAll||Qn.hasAnimations&&!Qn.hasTransitions),Qn.applyAnimationDuration=K.duration&&Qn.hasAnimations,Qn.applyTransitionDelay=I(K.delay)&&(Qn.applyTransitionDuration||Qn.hasTransitions),Qn.applyAnimationDelay=I(K.delay)&&Qn.hasAnimations,Qn.recalculateTimingStyles=$n.length>0,(Qn.applyTransitionDuration||Qn.applyAnimationDuration)&&(an=K.duration?parseFloat(K.duration):an,Qn.applyTransitionDuration&&(Qn.hasTransitions=!0,Rn.transitionDuration=an,Pn=W.style[j+sn].length>0,cn.push(T(an,Pn))),Qn.applyAnimationDuration&&(Qn.hasAnimations=!0,Rn.animationDuration=an,cn.push(k(an)))),0===an&&!Qn.recalculateTimingStyles)return x();if(null!=K.delay){var Ln;"boolean"!=typeof K.delay&&(Ln=parseFloat(K.delay),tn=Math.max(Ln,0)),Qn.applyTransitionDelay&&cn.push(O(Ln)),Qn.applyAnimationDelay&&cn.push(O(Ln,!0))}return null==K.duration&&Rn.transitionDuration>0&&(Qn.recalculateTimingStyles=Qn.recalculateTimingStyles||Fn),rn=tn*wn,on=an*wn,K.skipBlocking||(Qn.blockTransition=Rn.transitionDuration>0,Qn.blockKeyframeAnimation=Rn.animationDuration>0&&In.animationDelay>0&&0===In.animationDuration),K.from&&(K.cleanupStyles&&N(U,W,Object.keys(K.from)),p(n,K)),Qn.blockTransition||Qn.blockKeyframeAnimation?y(an):K.skipBlocking||b(W,!1),{$$willAnimate:!0,end:l,start:function(){return G?void 0:(en={end:l,cancel:f,resume:null,pause:null},X=new a(en),M(L),X)}}}}]}],On=["$$animationProvider",function(n){function e(n){return n.parentNode&&11===n.parentNode.nodeType}n.drivers.push("$$animateCssDriver");var t="ng-animate-shim",r="ng-anchor",a="ng-anchor-out",i="ng-anchor-in";this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(n,o,s,u,l,c,f){function m(n){return n.replace(/\bng-\S+\b/g,"")}function v(n,e){return K(n)&&(n=n.split(" ")),K(e)&&(e=e.split(" ")),n.filter(function(n){return-1===e.indexOf(n)}).join(" ")}function p(e,o,u){function l(n){var e={},t=C(n).getBoundingClientRect();return H(["width","height","top","left"],function(n){var r=t[n];switch(n){case"top":r+=$.scrollTop;break;case"left":r+=$.scrollLeft}e[n]=Math.floor(r)+"px"}),e}function c(){var e=n(h,{addClass:a,delay:!0,from:l(o)});return e.$$willAnimate?e:null}function f(n){return n.attr("class")||""}function d(){var e=m(f(u)),t=v(e,g),r=v(g,e),o=n(h,{to:l(u),addClass:i+" "+t,removeClass:a+" "+r,delay:!0});return o.$$willAnimate?o:null}function p(){h.remove(),o.removeClass(t),u.removeClass(t)}var h=L(C(o).cloneNode(!0)),g=m(f(h));o.addClass(t),u.addClass(t),h.addClass(r),w.append(h);var y,b=c();if(!b&&(y=d(),!y))return p();var D=b||y;return{start:function(){function n(){t&&t.end()}var e,t=D.start();return t.done(function(){return t=null,!y&&(y=d())?(t=y.start(),t.done(function(){t=null,p(),e.complete()}),t):(p(),void e.complete())}),e=new s({end:n,cancel:n})}}}function h(n,e,t,r){var a=g(n,R),i=g(e,R),o=[];return H(r,function(n){var e=n.out,r=n["in"],a=p(t,e,r);a&&o.push(a)}),a||i||0!==o.length?{start:function(){function n(){H(e,function(n){n.end()})}var e=[];a&&e.push(a.start()),i&&e.push(i.start()),H(o,function(n){e.push(n.start())});var t=new s({end:n,cancel:n});return s.all(e,function(n){t.complete(n)}),t}}:void 0}function g(e){var t=e.element,r=e.options||{};e.structural&&(r.event=e.event,r.structural=!0,r.applyClassesEarly=!0,"leave"===e.event&&(r.onDone=r.domOperation)),r.preparationClasses&&(r.event=M(r.event,r.preparationClasses));var a=n(t,r);return a.$$willAnimate?a:null}if(!l.animations&&!l.transitions)return R;var $=f[0].body,y=C(u),w=L(e(y)||$.contains(y)?y:$);d(c);return function(n){return n.from&&n.to?h(n.from,n.to,n.classes,n.anchors):g(n)}}]}],xn=["$animateProvider",function(n){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(e,t,r){function a(t){t=J(t)?t:t.split(" ");for(var r=[],a={},i=0;i<t.length;i++){var o=t[i],s=n.$$registeredAnimations[o];s&&!a[o]&&(r.push(e.get(s)),a[o]=!0)}return r}var i=d(r);return function(n,e,r,o){function s(){o.domOperation(),i(n,o)}function u(){d=!0,s(),v(n,o)}function l(n,e,r,a,i){var o;switch(r){case"animate":o=[e,a.from,a.to,i];break;case"setClass":o=[e,g,$,i];break;case"addClass":o=[e,g,i];break;case"removeClass":o=[e,$,i];break;default:o=[e,i]}o.push(a);var s=n.apply(n,o);if(s)if(V(s.start)&&(s=s.start()),s instanceof t)s.done(i);else if(V(s))return s;return R}function c(n,e,r,a,i){var o=[];return H(a,function(a){var s=a[i];s&&o.push(function(){var a,i,o=!1,u=function(n){o||(o=!0,(i||R)(n),a.complete(!n))};return a=new t({end:function(){u()},cancel:function(){u(!0)}}),i=l(s,n,e,r,function(n){var e=n===!1;u(e)}),a})}),o}function f(n,e,r,a,i){var o=c(n,e,r,a,i);if(0===o.length){var s,u;"beforeSetClass"===i?(s=c(n,"removeClass",r,a,"beforeRemoveClass"),u=c(n,"addClass",r,a,"beforeAddClass")):"setClass"===i&&(s=c(n,"removeClass",r,a,"removeClass"),u=c(n,"addClass",r,a,"addClass")),s&&(o=o.concat(s)),u&&(o=o.concat(u))}if(0!==o.length)return function(n){var e=[];return o.length&&H(o,function(n){e.push(n())}),e.length?t.all(e,n):n(),function(n){H(e,function(e){n?e.cancel():e.end()})}}}var d=!1;3===arguments.length&&U(r)&&(o=r,r=null),o=m(o),r||(r=n.attr("class")||"",o.addClass&&(r+=" "+o.addClass),o.removeClass&&(r+=" "+o.removeClass));var p,h,g=o.addClass,$=o.removeClass,C=a(r);if(C.length){var y,w;"leave"==e?(w="leave",y="afterLeave"):(w="before"+e.charAt(0).toUpperCase()+e.substr(1),y=e),"enter"!==e&&"move"!==e&&(p=f(n,e,o,C,w)),h=f(n,e,o,C,y)}if(p||h){var b;return{$$willAnimate:!0,end:function(){return b?b.end():(u(),b=new t,b.complete(!0)),b},start:function(){function n(n){u(n),b.complete(n)}function e(e){d||((r||R)(e),n(e))}if(b)return b;b=new t;var r,a=[];return p&&a.push(function(n){r=p(n)}),a.length?a.push(function(n){s(),n(!0)}):s(),h&&a.push(function(n){r=h(n)}),b.setHost({end:function(){e()},cancel:function(){e(!0)}}),t.chain(a,n),b}}}}}]}],Sn=["$$animationProvider",function(n){n.drivers.push("$$animateJsDriver"),this.$get=["$$animateJs","$$AnimateRunner",function(n,e){function t(e){var t=e.element,r=e.event,a=e.options,i=e.classes;return n(t,r,i,a)}return function(n){if(n.from&&n.to){var r=t(n.from),a=t(n.to);if(!r&&!a)return;return{start:function(){function n(){return function(){H(i,function(n){n.end()})}}function t(n){o.complete(n)}var i=[];r&&i.push(r.start()),a&&i.push(a.start()),e.all(i,t);var o=new e({end:n(),cancel:n()});return o}}}return t(n)}}]}],In="data-ng-animate",Tn="$ngAnimatePin",Pn=["$animateProvider",function(n){function e(n){if(!n)return null;var e=n.split(c),t=Object.create(null);return H(e,function(n){t[n]=!0}),t}function t(n,t){if(n&&t){var r=e(t);return n.split(c).some(function(n){return r[n]})}}function a(n,e,t,r){return f[n].some(function(n){return n(e,t,r)})}function i(n,e){var t=(n.addClass||"").length>0,r=(n.removeClass||"").length>0;return e?t&&r:t||r}var o=1,s=2,c=" ",f=this.rules={skip:[],cancel:[],join:[]};f.join.push(function(n,e,t){return!e.structural&&i(e)}),f.skip.push(function(n,e,t){return!e.structural&&!i(e)}),f.skip.push(function(n,e,t){return"leave"==t.event&&e.structural}),f.skip.push(function(n,e,t){return t.structural&&t.state===s&&!e.structural}),f.cancel.push(function(n,e,t){return t.structural&&e.structural}),f.cancel.push(function(n,e,t){return t.state===s&&e.structural}),f.cancel.push(function(n,e,r){if(r.structural)return!1;var a=e.addClass,i=e.removeClass,o=r.addClass,s=r.removeClass;return W(a)&&W(i)||W(o)&&W(s)?!1:t(a,s)||t(i,o)}),this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(e,t,c,f,p,h,$,b,D,A){function M(){var n=!1;return function(e){n?e():t.$$postDigest(function(){n=!0,e()})}}function k(n,e){return g(n,e,{})}function O(n,e,t){var r=C(e),a=C(n),i=[],o=R[t];return o&&H(o,function(n){_.call(n.node,r)?i.push(n.callback):"leave"===t&&_.call(n.node,a)&&i.push(n.callback)}),i}function x(n,r,l){function c(t,r,a,i){x(function(){var t=O(b,n,r);t.length&&e(function(){H(t,function(e){e(n,a,i)})})}),t.progress(r,a,i)}function d(e){w(n,D),Z(n,D),v(n,D),D.domOperation(),A.complete(!e)}var p,b,D=B(l);n=u(n),n&&(p=C(n),b=n.parent()),D=m(D);var A=new $,x=M();if(J(D.addClass)&&(D.addClass=D.addClass.join(" ")),D.addClass&&!K(D.addClass)&&(D.addClass=null),J(D.removeClass)&&(D.removeClass=D.removeClass.join(" ")),D.removeClass&&!K(D.removeClass)&&(D.removeClass=null),D.from&&!U(D.from)&&(D.from=null),D.to&&!U(D.to)&&(D.to=null),!p)return d(),A;var T=[p.className,D.addClass,D.removeClass].join(" ");if(!Y(T))return d(),A;var F=["enter","move","leave"].indexOf(r)>=0,R=!E||f[0].hidden||q.get(p),Q=!R&&j.get(p)||{},L=!!Q.state;if(R||L&&Q.state==o||(R=!P(n,b,r)),R)return d(),A;F&&S(n);var W={structural:F,element:n,event:r,addClass:D.addClass,removeClass:D.removeClass,close:d,options:D,runner:A};if(L){var G=a("skip",n,W,Q);if(G)return Q.state===s?(d(),A):(g(n,Q,W),Q.runner);var V=a("cancel",n,W,Q);if(V)if(Q.state===s)Q.runner.end();else{if(!Q.structural)return g(n,Q,W),Q.runner;Q.close()}else{var z=a("join",n,W,Q);if(z){if(Q.state!==s)return y(n,F?r:null,D),r=W.event=Q.event,D=g(n,Q,W),Q.runner;k(n,W)}}}else k(n,W);var X=W.structural;if(X||(X="animate"===W.event&&Object.keys(W.options.to||{}).length>0||i(W)),!X)return d(),I(n),A;var _=(Q.counter||0)+1;return W.counter=_,N(n,o,W),t.$$postDigest(function(){var e=j.get(p),t=!e;e=e||{};var a=n.parent()||[],o=a.length>0&&("animate"===e.event||e.structural||i(e));if(t||e.counter!==_||!o)return t&&(Z(n,D),v(n,D)),(t||F&&e.event!==r)&&(D.domOperation(),A.end()),void(o||I(n));r=!e.structural&&i(e,!0)?"setClass":e.event,N(n,s);var u=h(n,r,e.options);u.done(function(e){d(!e);var t=j.get(p);t&&t.counter===_&&I(C(n)),c(A,r,"close",{})}),A.setHost(u),c(A,r,"start",{})}),A}function S(n){var e=C(n),t=e.querySelectorAll("["+In+"]");H(t,function(n){var e=parseInt(n.getAttribute(In)),t=j.get(n);if(t)switch(e){case s:t.runner.end();case o:j.remove(n)}})}function I(n){var e=C(n);e.removeAttribute(In),j.remove(e)}function T(n,e){return C(n)===C(e)}function P(n,e,t){var r,a=L(f[0].body),i=T(n,a)||"HTML"===n[0].nodeName,o=T(n,c),s=!1,u=q.get(C(n)),l=L.data(n[0],Tn);for(l&&(e=l),e=C(e);e&&(o||(o=T(e,c)),e.nodeType===X);){var d=j.get(e)||{};if(!s){var m=q.get(e);if(m===!0&&u!==!1){u=!0;break}m===!1&&(u=!1),s=d.structural}if(W(r)||r===!0){var v=L.data(e,rn);G(v)&&(r=v)}if(s&&r===!1)break;if(i||(i=T(e,a)),i&&o)break;e=o||!(l=L.data(e,Tn))?e.parentNode:C(l)}var p=(!s||r)&&u!==!0;return p&&o&&i}function N(n,e,t){t=t||{},t.state=e;var r=C(n);r.setAttribute(In,e);var a=j.get(r),i=a?Q(a,t):t;j.put(r,i)}var j=new p,q=new p,E=null,F=t.$watch(function(){return 0===b.totalPendingRequests},function(n){n&&(F(),t.$$postDigest(function(){t.$$postDigest(function(){null===E&&(E=!0)})}))}),R={},V=n.classNameFilter(),Y=V?function(n){return V.test(n)}:function(){return!0},Z=d(D),_=Node.prototype.contains||function(n){return this===n||!!(16&this.compareDocumentPosition(n))},nn={on:function(n,e,t){var r=l(e);R[n]=R[n]||[],R[n].push({node:r,callback:t}),L(e).on("$destroy",function(){nn.off(n,e,t)})},off:function(n,e,t){function r(n,e,t){var r=l(e);return n.filter(function(n){var e=n.node===r&&(!t||n.callback===t);return!e})}var a=R[n];a&&(R[n]=1===arguments.length?null:r(a,e,t))},pin:function(n,e){r(z(n),"element","not an element"),r(z(e),"parentElement","not an element"),n.data(Tn,e)},push:function(n,e,t,r){return t=t||{},t.domOperation=r,x(n,e,t)},enabled:function(n,e){var t=arguments.length;if(0===t)e=!!E;else{var r=z(n);if(r){var a=C(n),i=q.get(a);1===t?e=!i:q.put(a,!e)}else e=E=!!n}return e}};return nn}]}],Nn=["$animateProvider",function(n){function e(n,e){n.data(s,e)}function t(n){n.removeData(s)}function r(n){return n.data(s)}var i="ng-animate-ref",o=this.drivers=[],s="$$animationRunner";this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(n,s,u,l,c,f){function p(n){function e(n){if(n.processed)return n;n.processed=!0;var t=n.domNode,r=t.parentNode;i.put(t,n);for(var o;r;){if(o=i.get(r)){o.processed||(o=e(o));break}r=r.parentNode}return(o||a).children.push(n),n}function t(n){var e,t=[],r=[];for(e=0;e<n.children.length;e++)r.push(n.children[e]);var a=r.length,i=0,o=[];for(e=0;e<r.length;e++){var s=r[e];0>=a&&(a=i,i=0,t.push(o),o=[]),o.push(s.fn),s.children.forEach(function(n){i++,r.push(n)}),a--}return o.length&&t.push(o),t}var r,a={children:[]},i=new c;for(r=0;r<n.length;r++){var o=n[r];i.put(o.domNode,n[r]={domNode:o.domNode,fn:o.fn,children:[]})}for(r=0;r<n.length;r++)e(n[r]);return t(a)}var h=[],g=d(n);return function(c,d,$){function y(n){var e="["+i+"]",t=n.hasAttribute(i)?[n]:n.querySelectorAll(e),r=[];return H(t,function(n){var e=n.getAttribute(i);e&&e.length&&r.push(n)}),r}function w(n){var e=[],t={};H(n,function(n,r){var a=n.element,o=C(a),s=n.event,u=["enter","move"].indexOf(s)>=0,l=n.structural?y(o):[];if(l.length){var c=u?"to":"from";H(l,function(n){var e=n.getAttribute(i);t[e]=t[e]||{},t[e][c]={animationID:r,element:L(n)}})}else e.push(n)});var r={},a={};return H(t,function(t,i){var o=t.from,s=t.to;if(!o||!s){var u=o?o.animationID:s.animationID,l=u.toString();return void(r[l]||(r[l]=!0,e.push(n[u])))}var c=n[o.animationID],f=n[s.animationID],d=o.animationID.toString();if(!a[d]){var m=a[d]={structural:!0,beforeStart:function(){c.beforeStart(),f.beforeStart()},close:function(){c.close(),f.close()},classes:b(c.classes,f.classes),from:c,to:f,anchors:[]};m.classes.length?e.push(m):(e.push(c),e.push(f))}a[d].anchors.push({out:o.element,"in":s.element})}),e}function b(n,e){n=n.split(" "),e=e.split(" ");for(var t=[],r=0;r<n.length;r++){var a=n[r];if("ng-"!==a.substring(0,3))for(var i=0;i<e.length;i++)if(a===e[i]){t.push(a);break}}return t.join(" ")}function D(n){for(var e=o.length-1;e>=0;e--){var t=o[e];if(u.has(t)){var r=u.get(t),a=r(n);if(a)return a}}}function A(){c.addClass(tn),T&&n.addClass(c,T),P&&(n.removeClass(c,P),P=null)}function M(n,e){function t(n){r(n).setHost(e)}n.from&&n.to?(t(n.from.element),t(n.to.element)):t(n.element)}function k(){var n=r(c);!n||"leave"===d&&$.$$domOperationFired||n.end()}function O(e){c.off("$destroy",k),t(c),g(c,$),v(c,$),$.domOperation(),T&&n.removeClass(c,T),c.removeClass(tn),S.complete(!e)}$=m($);var x=["enter","move","leave"].indexOf(d)>=0,S=new l({end:function(){O()},cancel:function(){O(!0)}});if(!o.length)return O(),S;e(c,S);var I=a(c.attr("class"),a($.addClass,$.removeClass)),T=$.tempClasses;T&&(I+=" "+T,$.tempClasses=null);var P;return x&&(P="ng-"+d+en,n.addClass(c,P)),h.push({element:c,classes:I,event:d,structural:x,options:$,beforeStart:A,close:O}),c.on("$destroy",k),h.length>1?S:(s.$$postDigest(function(){var n=[];H(h,function(e){r(e.element)?n.push(e):e.close()}),h.length=0;var e=w(n),t=[];H(e,function(n){t.push({domNode:C(n.from?n.from.element:n.element),fn:function(){n.beforeStart();var e,t=n.close,a=n.anchors?n.from.element||n.to.element:n.element;if(r(a)){var i=D(n);i&&(e=i.start)}if(e){var o=e();o.done(function(n){t(!n)}),M(n,o)}else t()}})}),f(p(t))}),S)}}]}],jn=["$animate","$rootScope",function(n,e){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(e,t,r,a,i){var o,s;e.$watchCollection(r.ngAnimateSwap||r["for"],function(r){o&&n.leave(o),s&&(s.$destroy(),s=null),(r||0===r)&&(s=e.$new(),i(s,function(e){o=e,n.enter(e,null,t)}))})}}}];e.module("ngAnimate",[]).directive("ngAnimateSwap",jn).directive("ngAnimateChildren",Cn).factory("$$rAFScheduler",$n).provider("$$animateQueue",Pn).provider("$$animation",Nn).provider("$animateCss",kn).provider("$$animateCssDriver",On).provider("$$animateJs",xn).provider("$$animateJsDriver",Sn)}(window,window.angular),function(n){angular.module("ionic.closePopup",["ionic"]).service("IonicClosePopupService",[function(){var n,e=angular.element(document.querySelector("html"));e.on("click",function(e){"HTML"===e.target.nodeName&&n&&n.close()}),this.register=function(e){n=e}}])}(window.ionic),!function(){for(var n=0,e=["webkit","moz"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var t=(new Date).getTime(),r=Math.max(0,16-(t-n)),a=window.setTimeout(function(){e(t+r)},r);return n=t+r,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){window.clearTimeout(n)})}(),angular.module("angular-svg-round-progressbar",[]),angular.module("angular-svg-round-progressbar").constant("roundProgressConfig",{max:50,semi:!1,rounded:!1,responsive:!1,clockwise:!0,radius:100,color:"#45ccce",bgcolor:"#eaeaea",stroke:15,duration:800,animation:"easeOutCubic",animationDelay:0,offset:0}),angular.module("angular-svg-round-progressbar").service("roundProgressService",["$window",function(n){function e(n,e,t,r){var a=(r-90)*Math.PI/180,i=n+t*Math.cos(a),o=e+t*Math.sin(a);return i+" "+o}var t={},r=angular.isNumber,a=document.head.querySelector("base");return t.isSupported=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),t.resolveColor=a&&a.href?function(n){var e=n.indexOf("#");return e>-1&&n.indexOf("url")>-1?n.slice(0,e)+window.location.href+n.slice(e):n}:function(n){return n},t.toNumber=function(n){return r(n)?n:parseFloat((n+"").replace(",","."))},t.getOffset=function(n,e){var t=+e.offset||0;if("inherit"===e.offset)for(var r=n.$parent;r;){if(r.hasOwnProperty("$$getRoundProgressOptions")){var a=r.$$getRoundProgressOptions();t+=(+a.offset||0)+(+a.stroke||0)}r=r.$parent}return t},t.getTimestamp=n.performance&&n.performance.now&&angular.isNumber(n.performance.now())?function(){return n.performance.now()}:function(){return(new n.Date).getTime()},t.updateState=function(n,t,r,a,i,o){if(!i)return a;var s=n>0?Math.min(n,t):0,u=o?180:359.9999,l=0===t?0:s/t*u,c=e(i,i,r,l),f=e(i,i,r,0),d=180>=l?0:1,m="M "+c+" A "+r+" "+r+" 0 "+d+" 0 "+f;return a.attr("d",m)},t.animations={linearEase:function(n,e,t,r){return t*n/r+e},easeInQuad:function(n,e,t,r){return t*(n/=r)*n+e},easeOutQuad:function(n,e,t,r){return-t*(n/=r)*(n-2)+e},easeInOutQuad:function(n,e,t,r){return(n/=r/2)<1?t/2*n*n+e:-t/2*(--n*(n-2)-1)+e},easeInCubic:function(n,e,t,r){return t*(n/=r)*n*n+e},easeOutCubic:function(n,e,t,r){return t*((n=n/r-1)*n*n+1)+e},easeInOutCubic:function(n,e,t,r){return(n/=r/2)<1?t/2*n*n*n+e:t/2*((n-=2)*n*n+2)+e},easeInQuart:function(n,e,t,r){return t*(n/=r)*n*n*n+e},easeOutQuart:function(n,e,t,r){return-t*((n=n/r-1)*n*n*n-1)+e},easeInOutQuart:function(n,e,t,r){return(n/=r/2)<1?t/2*n*n*n*n+e:-t/2*((n-=2)*n*n*n-2)+e},easeInQuint:function(n,e,t,r){return t*(n/=r)*n*n*n*n+e},easeOutQuint:function(n,e,t,r){return t*((n=n/r-1)*n*n*n*n+1)+e},easeInOutQuint:function(n,e,t,r){return(n/=r/2)<1?t/2*n*n*n*n*n+e:t/2*((n-=2)*n*n*n*n+2)+e},easeInSine:function(n,e,t,r){return-t*Math.cos(n/r*(Math.PI/2))+t+e},easeOutSine:function(n,e,t,r){return t*Math.sin(n/r*(Math.PI/2))+e},easeInOutSine:function(n,e,t,r){return-t/2*(Math.cos(Math.PI*n/r)-1)+e},easeInExpo:function(n,e,t,r){return 0==n?e:t*Math.pow(2,10*(n/r-1))+e},easeOutExpo:function(n,e,t,r){return n==r?e+t:t*(-Math.pow(2,-10*n/r)+1)+e},easeInOutExpo:function(n,e,t,r){return 0==n?e:n==r?e+t:(n/=r/2)<1?t/2*Math.pow(2,10*(n-1))+e:t/2*(-Math.pow(2,-10*--n)+2)+e;
},easeInCirc:function(n,e,t,r){return-t*(Math.sqrt(1-(n/=r)*n)-1)+e},easeOutCirc:function(n,e,t,r){return t*Math.sqrt(1-(n=n/r-1)*n)+e},easeInOutCirc:function(n,e,t,r){return(n/=r/2)<1?-t/2*(Math.sqrt(1-n*n)-1)+e:t/2*(Math.sqrt(1-(n-=2)*n)+1)+e},easeInElastic:function(n,e,t,r){var a=1.70158,i=0,o=t;return 0==n?e:1==(n/=r)?e+t:(i||(i=.3*r),o<Math.abs(t)?(o=t,a=i/4):a=i/(2*Math.PI)*Math.asin(t/o),-(o*Math.pow(2,10*(n-=1))*Math.sin((n*r-a)*(2*Math.PI)/i))+e)},easeOutElastic:function(n,e,t,r){var a=1.70158,i=0,o=t;return 0==n?e:1==(n/=r)?e+t:(i||(i=.3*r),o<Math.abs(t)?(o=t,a=i/4):a=i/(2*Math.PI)*Math.asin(t/o),o*Math.pow(2,-10*n)*Math.sin((n*r-a)*(2*Math.PI)/i)+t+e)},easeInOutElastic:function(n,e,t,r){var a=1.70158,i=0,o=t;return 0==n?e:2==(n/=r/2)?e+t:(i||(i=r*(.3*1.5)),o<Math.abs(t)?(o=t,a=i/4):a=i/(2*Math.PI)*Math.asin(t/o),1>n?-.5*(o*Math.pow(2,10*(n-=1))*Math.sin((n*r-a)*(2*Math.PI)/i))+e:o*Math.pow(2,-10*(n-=1))*Math.sin((n*r-a)*(2*Math.PI)/i)*.5+t+e)},easeInBack:function(n,e,t,r,a){return void 0==a&&(a=1.70158),t*(n/=r)*n*((a+1)*n-a)+e},easeOutBack:function(n,e,t,r,a){return void 0==a&&(a=1.70158),t*((n=n/r-1)*n*((a+1)*n+a)+1)+e},easeInOutBack:function(n,e,t,r,a){return void 0==a&&(a=1.70158),(n/=r/2)<1?t/2*(n*n*(((a*=1.525)+1)*n-a))+e:t/2*((n-=2)*n*(((a*=1.525)+1)*n+a)+2)+e},easeInBounce:function(n,e,r,a){return r-t.animations.easeOutBounce(a-n,0,r,a)+e},easeOutBounce:function(n,e,t,r){return(n/=r)<1/2.75?t*(7.5625*n*n)+e:2/2.75>n?t*(7.5625*(n-=1.5/2.75)*n+.75)+e:2.5/2.75>n?t*(7.5625*(n-=2.25/2.75)*n+.9375)+e:t*(7.5625*(n-=2.625/2.75)*n+.984375)+e},easeInOutBounce:function(n,e,r,a){return a/2>n?.5*t.animations.easeInBounce(2*n,0,r,a)+e:.5*t.animations.easeOutBounce(2*n-a,0,r,a)+.5*r+e}},t}]),angular.module("angular-svg-round-progressbar").directive("roundProgress",["$window","roundProgressService","roundProgressConfig",function(n,e,t){var r={restrict:"EA",replace:!0,transclude:!0,scope:{current:"=",max:"=",semi:"=",rounded:"=",clockwise:"=",responsive:"=",onRender:"=",radius:"@",color:"@",bgcolor:"@",stroke:"@",duration:"@",animation:"@",offset:"@",animationDelay:"@"}};return e.isSupported?angular.extend(r,{link:function(a,i){var o,s,u=!i.hasClass("round-progress-wrapper"),l=u?i:i.find("svg").eq(0),c=l.find("path").eq(0),f=l.find("circle").eq(0),d=angular.copy(t),m=0;a.$$getRoundProgressOptions=function(){return d};var v=function(){var n=d.semi,t=d.responsive,r=+d.radius||0,o=+d.stroke,s=2*r,m=r-o/2-e.getOffset(a,d);l.css({top:0,left:0,position:t?"absolute":"static",width:t?"100%":s+"px",height:t?"100%":(n?r:s)+"px",overflow:"hidden"}),u||l[0].setAttribute("viewBox","0 0 "+s+" "+(n?r:s)),i.css({width:t?"100%":"auto",position:"relative",paddingBottom:t?n?"50%":"100%":0}),c.css({stroke:e.resolveColor(d.color),strokeWidth:o,strokeLinecap:d.rounded?"round":"butt"}),n?c.attr("transform",d.clockwise?"translate(0, "+s+") rotate(-90)":"translate("+s+", "+s+") rotate(90) scale(-1, 1)"):c.attr("transform",d.clockwise?"":"scale(-1, 1) translate("+-s+" 0)"),f.attr({cx:r,cy:r,r:m>=0?m:0}).css({stroke:e.resolveColor(d.bgcolor),strokeWidth:o})},p=function(t,r,s){var u=e.toNumber(d.max||0),f=t>0?n.Math.min(t,u):0,v=r===f||0>r?0:r||0,p=f-v,h=e.animations[d.animation],g=+d.duration||0,$=s||t>u&&r>u||0>t&&0>r||25>g,C=e.toNumber(d.radius),y=C-d.stroke/2-e.getOffset(a,d),w=d.semi;l.attr({"aria-valuemax":u,"aria-valuenow":f});var b=function(){if($)e.updateState(f,u,y,c,C,w),d.onRender&&d.onRender(f,d,i);else{var t=e.getTimestamp(),r=++m;n.requestAnimationFrame(function a(){var o=n.Math.min(e.getTimestamp()-t,g),s=h(o,v,p,g);e.updateState(s,u,y,c,C,w),d.onRender&&d.onRender(s,d,i),r===m&&g>o&&n.requestAnimationFrame(a)})}};d.animationDelay>0?(n.clearTimeout(o),n.setTimeout(b,d.animationDelay)):b()},h=Object.keys(r.scope).filter(function(n){return"current"!==n});a.$watchGroup(h,function(n){for(var e=0;e<n.length;e++)"undefined"!=typeof n[e]&&(d[h[e]]=n[e]);v(),a.$broadcast("$parentOffsetChanged"),"inherit"!==d.offset||s?"inherit"!==d.offset&&s&&s():s=a.$on("$parentOffsetChanged",function(){p(a.current,a.current,!0),v()})}),a.$watchGroup(["current","max","radius","stroke","semi","offset"],function(n,t){p(e.toNumber(n[0]),e.toNumber(t[0]))})},template:function(n){for(var e=n.parent(),t="round-progress",r=['<svg class="'+t+'" xmlns="http://www.w3.org/2000/svg" role="progressbar" aria-valuemin="0">','<circle fill="none"/>','<path fill="none"/>',"<g ng-transclude></g>","</svg>"];e.length&&e[0].nodeName.toLowerCase()!==t&&"undefined"==typeof e.attr(t);)e=e.parent();return e&&e.length||(r.unshift('<div class="round-progress-wrapper">'),r.push("</div>")),r.join("\n")}}):angular.extend(r,{template:'<div class="round-progress" ng-transclude></div>'})}]);