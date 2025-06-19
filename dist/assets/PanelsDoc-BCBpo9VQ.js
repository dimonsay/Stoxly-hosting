import{B as w,c as g,a as c,F as C,d as fe,j as D,h as b,V as B,S as d,b as s,a9 as x,a3 as O,au as K,aA as ge,ag as he,aB as ve,aC as be,J as P,aD as z,C as ye,R as h,a7 as Se,f as r,l as M,t as k,n as F,k as a,am as V,W,s as $e,i as I,U as v}from"./index-BnF8l7AT.js";import{s as Pe}from"./index-Cg76EpyR.js";import{s as ze}from"./index-BZ-PKrjf.js";import{s as we}from"./index-CbBKQ2l_.js";import{s as X}from"./index-CHXuy6Qz.js";import{s as J}from"./index-Cd0tL7SR.js";import{R as Y}from"./index-zgDmictm.js";import{s as Q}from"./index-BRlZ3SBp.js";import{s as xe,a as Le,b as Ee}from"./index-BIr0DM1f.js";import{s as Te,a as _e}from"./index-CbrLtmk6.js";import{s as qe,a as Ie,b as Me,c as ke}from"./index-BiBC7FdK.js";import{s as Ae}from"./index-D2-GGaa3.js";import{s as De}from"./index-B_8H1xIh.js";import{s as Be,a as Oe}from"./index-D3Syt0LG.js";import{s as je}from"./index-DYxEU3Wq.js";import"./index-6EaRLu2w.js";import"./index-BFZwT1Qq.js";import"./index-CQH9gJwO.js";import"./index-BDpDIWdb.js";import"./index-BLAYFmGR.js";import"./index-Cbn3qvmt.js";import"./index-Dk0ZL192.js";import"./index-8WJt7ERw.js";import"./index-TjWDhc1m.js";var Re=({dt:e})=>`
.p-splitter {
    display: flex;
    flex-wrap: nowrap;
    border: 1px solid ${e("splitter.border.color")};
    background: ${e("splitter.background")};
    border-radius: ${e("border.radius.md")};
    color: ${e("splitter.color")};
}

.p-splitter-vertical {
    flex-direction: column;
}

.p-splitter-gutter {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background: ${e("splitter.gutter.background")};
}

.p-splitter-gutter-handle {
    border-radius: ${e("splitter.handle.border.radius")};
    background: ${e("splitter.handle.background")};
    transition: outline-color ${e("splitter.transition.duration")}, box-shadow ${e("splitter.transition.duration")};
    outline-color: transparent;
}

.p-splitter-gutter-handle:focus-visible {
    box-shadow: ${e("splitter.handle.focus.ring.shadow")};
    outline: ${e("splitter.handle.focus.ring.width")} ${e("splitter.handle.focus.ring.style")} ${e("splitter.handle.focus.ring.color")};
    outline-offset: ${e("splitter.handle.focus.ring.offset")};
}

.p-splitter-horizontal.p-splitter-resizing {
    cursor: col-resize;
    user-select: none;
}

.p-splitter-vertical.p-splitter-resizing {
    cursor: row-resize;
    user-select: none;
}

.p-splitter-horizontal > .p-splitter-gutter > .p-splitter-gutter-handle {
    height: ${e("splitter.handle.size")};
    width: 100%;
}

.p-splitter-vertical > .p-splitter-gutter > .p-splitter-gutter-handle {
    width: ${e("splitter.handle.size")};
    height: 100%;
}

.p-splitter-horizontal > .p-splitter-gutter {
    cursor: col-resize;
}

.p-splitter-vertical > .p-splitter-gutter {
    cursor: row-resize;
}

.p-splitterpanel {
    flex-grow: 1;
    overflow: hidden;
}

.p-splitterpanel-nested {
    display: flex;
}

.p-splitterpanel .p-splitter {
    flex-grow: 1;
    border: 0 none;
}
`,Ce={root:function(t){var n=t.props;return["p-splitter p-component","p-splitter-"+n.layout]},gutter:"p-splitter-gutter",gutterHandle:"p-splitter-gutter-handle"},Ke={root:function(t){var n=t.props;return[{display:"flex","flex-wrap":"nowrap"},n.layout==="vertical"?{"flex-direction":"column"}:""]}},Ne=w.extend({name:"splitter",style:Re,classes:Ce,inlineStyles:Ke}),Ue={name:"BaseSplitter",extends:x,props:{layout:{type:String,default:"horizontal"},gutterSize:{type:Number,default:4},stateKey:{type:String,default:null},stateStorage:{type:String,default:"session"},step:{type:Number,default:5}},style:Ne,provide:function(){return{$pcSplitter:this,$parentInstance:this}}};function y(e){"@babel/helpers - typeof";return y=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(e)}function N(e,t,n){return(t=Ge(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ge(e){var t=He(e,"string");return y(t)=="symbol"?t:t+""}function He(e,t){if(y(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var l=n.call(e,t);if(y(l)!="object")return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function U(e){return Xe(e)||We(e)||Ve(e)||Fe()}function Fe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ve(e,t){if(e){if(typeof e=="string")return A(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(e,t):void 0}}function We(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Xe(e){if(Array.isArray(e))return A(e)}function A(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,l=Array(t);n<t;n++)l[n]=e[n];return l}var Z={name:"Splitter",extends:Ue,inheritAttrs:!1,emits:["resizestart","resizeend","resize"],dragging:!1,mouseMoveListener:null,mouseUpListener:null,touchMoveListener:null,touchEndListener:null,size:null,gutterElement:null,startPos:null,prevPanelElement:null,nextPanelElement:null,nextPanelSize:null,prevPanelSize:null,panelSizes:null,prevPanelIndex:null,timer:null,data:function(){return{prevSize:null}},mounted:function(){this.initializePanels()},beforeUnmount:function(){this.clear(),this.unbindMouseListeners()},methods:{isSplitterPanel:function(t){return t.type.name==="SplitterPanel"},initializePanels:function(){var t=this;if(this.panels&&this.panels.length){var n=!1;if(this.isStateful()&&(n=this.restoreState()),!n){var l=U(this.$el.children).filter(function(o){return o.getAttribute("data-pc-name")==="splitterpanel"}),u=[];this.panels.map(function(o,i){var p=o.props&&ye(o.props.size)?o.props.size:null,m=p||100/t.panels.length;u[i]=m,l[i].style.flexBasis="calc("+m+"% - "+(t.panels.length-1)*t.gutterSize+"px)"}),this.panelSizes=u,this.prevSize=parseFloat(u[0]).toFixed(4)}}},onResizeStart:function(t,n,l){this.gutterElement=t.currentTarget||t.target.parentElement,this.size=this.horizontal?ve(this.$el):be(this.$el),l||(this.dragging=!0,this.startPos=this.layout==="horizontal"?t.pageX||t.changedTouches[0].pageX:t.pageY||t.changedTouches[0].pageY),this.prevPanelElement=this.gutterElement.previousElementSibling,this.nextPanelElement=this.gutterElement.nextElementSibling,l?(this.prevPanelSize=this.horizontal?P(this.prevPanelElement,!0):z(this.prevPanelElement,!0),this.nextPanelSize=this.horizontal?P(this.nextPanelElement,!0):z(this.nextPanelElement,!0)):(this.prevPanelSize=100*(this.horizontal?P(this.prevPanelElement,!0):z(this.prevPanelElement,!0))/this.size,this.nextPanelSize=100*(this.horizontal?P(this.nextPanelElement,!0):z(this.nextPanelElement,!0))/this.size),this.prevPanelIndex=n,this.$emit("resizestart",{originalEvent:t,sizes:this.panelSizes}),this.$refs.gutter[n].setAttribute("data-p-gutter-resizing",!0),this.$el.setAttribute("data-p-resizing",!0)},onResize:function(t,n,l){var u,o,i;l?this.horizontal?(o=100*(this.prevPanelSize+n)/this.size,i=100*(this.nextPanelSize-n)/this.size):(o=100*(this.prevPanelSize-n)/this.size,i=100*(this.nextPanelSize+n)/this.size):(this.horizontal?he(this.$el)?u=(this.startPos-t.pageX)*100/this.size:u=(t.pageX-this.startPos)*100/this.size:u=(t.pageY-this.startPos)*100/this.size,o=this.prevPanelSize+u,i=this.nextPanelSize-u),this.validateResize(o,i)||(o=Math.min(Math.max(this.prevPanelMinSize,o),100-this.nextPanelMinSize),i=Math.min(Math.max(this.nextPanelMinSize,i),100-this.prevPanelMinSize)),this.prevPanelElement.style.flexBasis="calc("+o+"% - "+(this.panels.length-1)*this.gutterSize+"px)",this.nextPanelElement.style.flexBasis="calc("+i+"% - "+(this.panels.length-1)*this.gutterSize+"px)",this.panelSizes[this.prevPanelIndex]=o,this.panelSizes[this.prevPanelIndex+1]=i,this.prevSize=parseFloat(o).toFixed(4),this.$emit("resize",{originalEvent:t,sizes:this.panelSizes})},onResizeEnd:function(t){this.isStateful()&&this.saveState(),this.$emit("resizeend",{originalEvent:t,sizes:this.panelSizes}),this.$refs.gutter.forEach(function(n){return n.setAttribute("data-p-gutter-resizing",!1)}),this.$el.setAttribute("data-p-resizing",!1),this.clear()},repeat:function(t,n,l){this.onResizeStart(t,n,!0),this.onResize(t,l,!0)},setTimer:function(t,n,l){var u=this;this.timer||(this.timer=setInterval(function(){u.repeat(t,n,l)},40))},clearTimer:function(){this.timer&&(clearInterval(this.timer),this.timer=null)},onGutterKeyUp:function(){this.clearTimer(),this.onResizeEnd()},onGutterKeyDown:function(t,n){switch(t.code){case"ArrowLeft":{this.layout==="horizontal"&&this.setTimer(t,n,this.step*-1),t.preventDefault();break}case"ArrowRight":{this.layout==="horizontal"&&this.setTimer(t,n,this.step),t.preventDefault();break}case"ArrowDown":{this.layout==="vertical"&&this.setTimer(t,n,this.step*-1),t.preventDefault();break}case"ArrowUp":{this.layout==="vertical"&&this.setTimer(t,n,this.step),t.preventDefault();break}}},onGutterMouseDown:function(t,n){this.onResizeStart(t,n),this.bindMouseListeners()},onGutterTouchStart:function(t,n){this.onResizeStart(t,n),this.bindTouchListeners(),t.preventDefault()},onGutterTouchMove:function(t){this.onResize(t),t.preventDefault()},onGutterTouchEnd:function(t){this.onResizeEnd(t),this.unbindTouchListeners(),t.preventDefault()},bindMouseListeners:function(){var t=this;this.mouseMoveListener||(this.mouseMoveListener=function(n){return t.onResize(n)},document.addEventListener("mousemove",this.mouseMoveListener)),this.mouseUpListener||(this.mouseUpListener=function(n){t.onResizeEnd(n),t.unbindMouseListeners()},document.addEventListener("mouseup",this.mouseUpListener))},bindTouchListeners:function(){var t=this;this.touchMoveListener||(this.touchMoveListener=function(n){return t.onResize(n.changedTouches[0])},document.addEventListener("touchmove",this.touchMoveListener)),this.touchEndListener||(this.touchEndListener=function(n){t.resizeEnd(n),t.unbindTouchListeners()},document.addEventListener("touchend",this.touchEndListener))},validateResize:function(t,n){return!(t>100||t<0||n>100||n<0||this.prevPanelMinSize>t||this.nextPanelMinSize>n)},unbindMouseListeners:function(){this.mouseMoveListener&&(document.removeEventListener("mousemove",this.mouseMoveListener),this.mouseMoveListener=null),this.mouseUpListener&&(document.removeEventListener("mouseup",this.mouseUpListener),this.mouseUpListener=null)},unbindTouchListeners:function(){this.touchMoveListener&&(document.removeEventListener("touchmove",this.touchMoveListener),this.touchMoveListener=null),this.touchEndListener&&(document.removeEventListener("touchend",this.touchEndListener),this.touchEndListener=null)},clear:function(){this.dragging=!1,this.size=null,this.startPos=null,this.prevPanelElement=null,this.nextPanelElement=null,this.prevPanelSize=null,this.nextPanelSize=null,this.gutterElement=null,this.prevPanelIndex=null},isStateful:function(){return this.stateKey!=null},getStorage:function(){switch(this.stateStorage){case"local":return window.localStorage;case"session":return window.sessionStorage;default:throw new Error(this.stateStorage+' is not a valid value for the state storage, supported values are "local" and "session".')}},saveState:function(){ge(this.panelSizes)&&this.getStorage().setItem(this.stateKey,JSON.stringify(this.panelSizes))},restoreState:function(){var t=this,n=this.getStorage(),l=n.getItem(this.stateKey);if(l){this.panelSizes=JSON.parse(l);var u=U(this.$el.children).filter(function(o){return o.getAttribute("data-pc-name")==="splitterpanel"});return u.forEach(function(o,i){o.style.flexBasis="calc("+t.panelSizes[i]+"% - "+(t.panels.length-1)*t.gutterSize+"px)"}),!0}return!1},resetState:function(){this.initializePanels()}},computed:{panels:function(){var t=this,n=[];return this.$slots.default().forEach(function(l){t.isSplitterPanel(l)?n.push(l):l.children instanceof Array&&l.children.forEach(function(u){t.isSplitterPanel(u)&&n.push(u)})}),n},gutterStyle:function(){return this.horizontal?{width:this.gutterSize+"px"}:{height:this.gutterSize+"px"}},horizontal:function(){return this.layout==="horizontal"},getPTOptions:function(){var t;return{context:{nested:(t=this.$parentInstance)===null||t===void 0?void 0:t.nestedState}}},prevPanelMinSize:function(){var t=K(this.panels[this.prevPanelIndex],"minSize");return this.panels[this.prevPanelIndex].props&&t?t:0},nextPanelMinSize:function(){var t=K(this.panels[this.prevPanelIndex+1],"minSize");return this.panels[this.prevPanelIndex+1].props&&t?t:0},dataP:function(){var t;return O(N(N({},this.layout,this.layout),"nested",((t=this.$parentInstance)===null||t===void 0?void 0:t.nestedState)!=null))}}},Je=["data-p"],Ye=["onMousedown","onTouchstart","onTouchmove","onTouchend","data-p"],Qe=["aria-orientation","aria-valuenow","onKeydown","data-p"];function Ze(e,t,n,l,u,o){return c(),g("div",d({class:e.cx("root"),style:e.sx("root"),"data-p-resizing":!1,"data-p":o.dataP},e.ptmi("root",o.getPTOptions)),[(c(!0),g(C,null,fe(o.panels,function(i,p){return c(),g(C,{key:p},[(c(),D(B(i),{tabindex:"-1"})),p!==o.panels.length-1?(c(),g("div",d({key:0,ref_for:!0,ref:"gutter",class:e.cx("gutter"),role:"separator",tabindex:"-1",onMousedown:function(f){return o.onGutterMouseDown(f,p)},onTouchstart:function(f){return o.onGutterTouchStart(f,p)},onTouchmove:function(f){return o.onGutterTouchMove(f,p)},onTouchend:function(f){return o.onGutterTouchEnd(f,p)},"data-p-gutter-resizing":!1,"data-p":o.dataP},e.ptm("gutter")),[s("div",d({class:e.cx("gutterHandle"),tabindex:"0",style:[o.gutterStyle],"aria-orientation":e.layout,"aria-valuenow":u.prevSize,onKeyup:t[0]||(t[0]=function(){return o.onGutterKeyUp&&o.onGutterKeyUp.apply(o,arguments)}),onKeydown:function(f){return o.onGutterKeyDown(f,p)},"data-p":o.dataP,ref_for:!0},e.ptm("gutterHandle")),null,16,Qe)],16,Ye)):b("",!0)],64)}),128))],16,Je)}Z.render=Ze;var et={root:function(t){var n=t.instance;return["p-splitterpanel",{"p-splitterpanel-nested":n.isNested}]}},tt=w.extend({name:"splitterpanel",classes:et}),nt={name:"BaseSplitterPanel",extends:x,props:{size:{type:Number,default:null},minSize:{type:Number,default:null}},style:tt,provide:function(){return{$pcSplitterPanel:this,$parentInstance:this}}},ee={name:"SplitterPanel",extends:nt,inheritAttrs:!1,data:function(){return{nestedState:null}},computed:{isNested:function(){var t=this;return this.$slots.default().some(function(n){return t.nestedState=n.type.name==="Splitter"?!0:null,t.nestedState})},getPTOptions:function(){return{context:{nested:this.isNested}}}}};function it(e,t,n,l,u,o){return c(),g("div",d({ref:"container",class:e.cx("root")},e.ptmi("root",o.getPTOptions)),[h(e.$slots,"default")],16)}ee.render=it;var ot=({dt:e})=>`
.p-fieldset {
    background: ${e("fieldset.background")};
    border: 1px solid ${e("fieldset.border.color")};
    border-radius: ${e("fieldset.border.radius")};
    color: ${e("fieldset.color")};
    padding: ${e("fieldset.padding")};
    margin: 0;
}

.p-fieldset-legend {
    background: ${e("fieldset.legend.background")};
    border-radius: ${e("fieldset.legend.border.radius")};
    border-width: ${e("fieldset.legend.border.width")};
    border-style: solid;
    border-color: ${e("fieldset.legend.border.color")};
    padding: ${e("fieldset.legend.padding")};
    transition: background ${e("fieldset.transition.duration")}, color ${e("fieldset.transition.duration")}, outline-color ${e("fieldset.transition.duration")}, box-shadow ${e("fieldset.transition.duration")};
}

.p-fieldset-toggleable > .p-fieldset-legend {
    padding: 0;
}

.p-fieldset-toggle-button {
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    display: flex;
    gap: ${e("fieldset.legend.gap")};
    align-items: center;
    justify-content: center;
    padding: ${e("fieldset.legend.padding")};
    background: transparent;
    border: 0 none;
    border-radius: ${e("fieldset.legend.border.radius")};
    transition: background ${e("fieldset.transition.duration")}, color ${e("fieldset.transition.duration")}, outline-color ${e("fieldset.transition.duration")}, box-shadow ${e("fieldset.transition.duration")};
    outline-color: transparent;
}

.p-fieldset-legend-label {
    font-weight: ${e("fieldset.legend.font.weight")};
}

.p-fieldset-toggle-button:focus-visible {
    box-shadow: ${e("fieldset.legend.focus.ring.shadow")};
    outline: ${e("fieldset.legend.focus.ring.width")} ${e("fieldset.legend.focus.ring.style")} ${e("fieldset.legend.focus.ring.color")};
    outline-offset: ${e("fieldset.legend.focus.ring.offset")};
}

.p-fieldset-toggleable > .p-fieldset-legend:hover {
    color: ${e("fieldset.legend.hover.color")};
    background: ${e("fieldset.legend.hover.background")};
}

.p-fieldset-toggle-icon {
    color: ${e("fieldset.toggle.icon.color")};
    transition: color ${e("fieldset.transition.duration")};
}

.p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
    color: ${e("fieldset.toggle.icon.hover.color")};
}

.p-fieldset .p-fieldset-content {
    padding: ${e("fieldset.content.padding")};
}
`,st={root:function(t){var n=t.props;return["p-fieldset p-component",{"p-fieldset-toggleable":n.toggleable}]},legend:"p-fieldset-legend",legendLabel:"p-fieldset-legend-label",toggleButton:"p-fieldset-toggle-button",toggleIcon:"p-fieldset-toggle-icon",contentContainer:"p-fieldset-content-container",content:"p-fieldset-content"},rt=w.extend({name:"fieldset",style:ot,classes:st}),lt={name:"BaseFieldset",extends:x,props:{legend:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:null,default:null}},style:rt,provide:function(){return{$pcFieldset:this,$parentInstance:this}}},te={name:"Fieldset",extends:lt,inheritAttrs:!1,emits:["update:collapsed","toggle"],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(t){this.d_collapsed=t}},methods:{toggle:function(t){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:t,value:this.d_collapsed})},onKeyDown:function(t){(t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.toggle(t),t.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.legend},dataP:function(){return O({toggleable:this.toggleable})}},directives:{ripple:Y},components:{PlusIcon:J,MinusIcon:X}};function S(e){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(e)}function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter(function(u){return Object.getOwnPropertyDescriptor(e,u).enumerable})),n.push.apply(n,l)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?G(Object(n),!0).forEach(function(l){at(e,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach(function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(n,l))})}return e}function at(e,t,n){return(t=ut(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ut(e){var t=dt(e,"string");return S(t)=="symbol"?t:t+""}function dt(e,t){if(S(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var l=n.call(e,t);if(S(l)!="object")return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var pt=["data-p"],ct=["data-p"],mt=["id"],ft=["id","aria-controls","aria-expanded","aria-label"],gt=["id","aria-labelledby"];function ht(e,t,n,l,u,o){var i=Se("ripple");return c(),g("fieldset",d({class:e.cx("root"),"data-p":o.dataP},e.ptmi("root")),[s("legend",d({class:e.cx("legend"),"data-p":o.dataP},e.ptm("legend")),[h(e.$slots,"legend",{toggleCallback:o.toggle},function(){return[e.toggleable?b("",!0):(c(),g("span",d({key:0,id:e.$id+"_header",class:e.cx("legendLabel")},e.ptm("legendLabel")),k(e.legend),17,mt)),e.toggleable?M((c(),g("button",d({key:1,id:e.$id+"_header",type:"button","aria-controls":e.$id+"_content","aria-expanded":!u.d_collapsed,"aria-label":o.buttonAriaLabel,class:e.cx("toggleButton"),onClick:t[0]||(t[0]=function(){return o.toggle&&o.toggle.apply(o,arguments)}),onKeydown:t[1]||(t[1]=function(){return o.onKeyDown&&o.onKeyDown.apply(o,arguments)})},H(H({},e.toggleButtonProps),e.ptm("toggleButton"))),[h(e.$slots,e.$slots.toggleicon?"toggleicon":"togglericon",{collapsed:u.d_collapsed,class:F(e.cx("toggleIcon"))},function(){return[(c(),D(B(u.d_collapsed?"PlusIcon":"MinusIcon"),d({class:e.cx("toggleIcon")},e.ptm("toggleIcon")),null,16,["class"]))]}),s("span",d({class:e.cx("legendLabel")},e.ptm("legendLabel")),k(e.legend),17)],16,ft)),[[i]]):b("",!0)]})],16,ct),r(W,d({name:"p-toggleable-content"},e.ptm("transition")),{default:a(function(){return[M(s("div",d({id:e.$id+"_content",class:e.cx("contentContainer"),role:"region","aria-labelledby":e.$id+"_header"},e.ptm("contentContainer")),[s("div",d({class:e.cx("content")},e.ptm("content")),[h(e.$slots,"default")],16)],16,gt),[[V,!u.d_collapsed]])]}),_:3},16)],16,pt)}te.render=ht;var vt=({dt:e})=>`
.p-panel {
    border: 1px solid ${e("panel.border.color")};
    border-radius: ${e("panel.border.radius")};
    background: ${e("panel.background")};
    color: ${e("panel.color")};
}

.p-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${e("panel.header.padding")};
    background: ${e("panel.header.background")};
    color: ${e("panel.header.color")};
    border-style: solid;
    border-width: ${e("panel.header.border.width")};
    border-color: ${e("panel.header.border.color")};
    border-radius: ${e("panel.header.border.radius")};
}

.p-panel-toggleable .p-panel-header {
    padding: ${e("panel.toggleable.header.padding")};
}

.p-panel-title {
    line-height: 1;
    font-weight: ${e("panel.title.font.weight")};
}

.p-panel-content {
    padding: ${e("panel.content.padding")};
}

.p-panel-footer {
    padding: ${e("panel.footer.padding")};
}
`,bt={root:function(t){var n=t.props;return["p-panel p-component",{"p-panel-toggleable":n.toggleable}]},header:"p-panel-header",title:"p-panel-title",headerActions:"p-panel-header-actions",pcToggleButton:"p-panel-toggle-button",contentContainer:"p-panel-content-container",content:"p-panel-content",footer:"p-panel-footer"},yt=w.extend({name:"panel",style:vt,classes:bt}),St={name:"BasePanel",extends:x,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}}},style:yt,provide:function(){return{$pcPanel:this,$parentInstance:this}}},ne={name:"Panel",extends:St,inheritAttrs:!1,emits:["update:collapsed","toggle"],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(t){this.d_collapsed=t}},methods:{toggle:function(t){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:t,value:this.d_collapsed})},onKeyDown:function(t){(t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.toggle(t),t.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header},dataP:function(){return O({toggleable:this.toggleable})}},components:{PlusIcon:J,MinusIcon:X,Button:Q},directives:{ripple:Y}},$t=["data-p"],Pt=["data-p"],zt=["id"],wt=["id","aria-labelledby"];function xt(e,t,n,l,u,o){var i=$e("Button");return c(),g("div",d({class:e.cx("root"),"data-p":o.dataP},e.ptmi("root")),[s("div",d({class:e.cx("header"),"data-p":o.dataP},e.ptm("header")),[h(e.$slots,"header",{id:e.$id+"_header",class:F(e.cx("title"))},function(){return[e.header?(c(),g("span",d({key:0,id:e.$id+"_header",class:e.cx("title")},e.ptm("title")),k(e.header),17,zt)):b("",!0)]}),s("div",d({class:e.cx("headerActions")},e.ptm("headerActions")),[h(e.$slots,"icons"),e.toggleable?h(e.$slots,"togglebutton",{key:0,collapsed:u.d_collapsed,toggleCallback:function(m){return o.toggle(m)},keydownCallback:function(m){return o.onKeyDown(m)}},function(){return[r(i,d({id:e.$id+"_header",class:e.cx("pcToggleButton"),"aria-label":o.buttonAriaLabel,"aria-controls":e.$id+"_content","aria-expanded":!u.d_collapsed,unstyled:e.unstyled,onClick:t[0]||(t[0]=function(p){return o.toggle(e.event)}),onKeydown:t[1]||(t[1]=function(p){return o.onKeyDown(e.event)})},e.toggleButtonProps,{pt:e.ptm("pcToggleButton")}),{icon:a(function(p){return[h(e.$slots,e.$slots.toggleicon?"toggleicon":"togglericon",{collapsed:u.d_collapsed},function(){return[(c(),D(B(u.d_collapsed?"PlusIcon":"MinusIcon"),d({class:p.class},e.ptm("pcToggleButton").icon),null,16,["class"]))]})]}),_:3},16,["id","class","aria-label","aria-controls","aria-expanded","unstyled","pt"])]}):b("",!0)],16)],16,Pt),r(W,d({name:"p-toggleable-content"},e.ptm("transition")),{default:a(function(){return[M(s("div",d({id:e.$id+"_content",class:e.cx("contentContainer"),role:"region","aria-labelledby":e.$id+"_header"},e.ptm("contentContainer")),[s("div",d({class:e.cx("content")},e.ptm("content")),[h(e.$slots,"default")],16),e.$slots.footer?(c(),g("div",d({key:0,class:e.cx("footer")},e.ptm("footer")),[h(e.$slots,"footer")],16)):b("",!0)],16,wt),[[V,!u.d_collapsed]])]}),_:3},16)],16,$t)}ne.render=xt;const Lt={class:"flex flex-col"},Et={class:"card"},Tt={class:"flex flex-col md:flex-row gap-8"},_t={class:"md:w-1/2"},qt={class:"card"},It={class:"card"},Mt={class:"md:w-1/2 mt-6 md:mt-0"},kt={class:"card"},At={class:"card"},Dt={class:"flex items-center justify-between mb-0"},Bt={class:"card mt-8"},Ot={class:"flex flex-col md:flex-row"},jt={class:"w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5"},Rt={class:"flex flex-col gap-2"},Ct={class:"flex flex-col gap-2"},Kt={class:"flex"},Nt={class:"w-full md:w-2/12"},Ut={class:"w-full md:w-5/12 flex items-center justify-center py-5"},Gt={class:"card"},hn={__name:"PanelsDoc",setup(e){const t=I([{label:"Save",icon:"pi pi-check"},{label:"Update",icon:"pi pi-upload"},{label:"Delete",icon:"pi pi-trash"},{label:"Home Page",icon:"pi pi-home"}]),n=I([{label:"Save",icon:"pi pi-fw pi-check"},{label:"Update",icon:"pi pi-fw pi-refresh"},{label:"Delete",icon:"pi pi-fw pi-trash"}]),l=I(null);function u(){l.value.toggle(event)}return(o,i)=>{const p=Q,m=Oe,f=je,ie=Be,oe=De,se=Ae,L=Me,E=ke,T=Ie,re=qe,_=Ee,le=Le,q=_e,ae=Te,ue=xe,de=ne,pe=te,ce=we,me=ze,j=Pe,$=ee,R=Z;return c(),g("div",Lt,[s("div",Et,[i[1]||(i[1]=s("div",{class:"font-semibold text-xl mb-4"},"Toolbar",-1)),r(se,null,{start:a(()=>[r(p,{icon:"pi pi-plus",class:"mr-2",severity:"secondary",text:""}),r(p,{icon:"pi pi-print",class:"mr-2",severity:"secondary",text:""}),r(p,{icon:"pi pi-upload",severity:"secondary",text:""})]),center:a(()=>[r(ie,null,{default:a(()=>[r(m,null,{default:a(()=>i[0]||(i[0]=[s("i",{class:"pi pi-search"},null,-1)])),_:1}),r(f,{placeholder:"Search"})]),_:1})]),end:a(()=>[r(oe,{label:"Save",model:t.value},null,8,["model"])]),_:1})]),s("div",Tt,[s("div",_t,[s("div",qt,[i[8]||(i[8]=s("div",{class:"font-semibold text-xl mb-4"},"Accordion",-1)),r(re,{value:"0"},{default:a(()=>[r(T,{value:"0"},{default:a(()=>[r(L,null,{default:a(()=>i[2]||(i[2]=[v("Header I")])),_:1}),r(E,null,{default:a(()=>i[3]||(i[3]=[s("p",{class:"m-0"}," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",-1)])),_:1})]),_:1}),r(T,{value:"1"},{default:a(()=>[r(L,null,{default:a(()=>i[4]||(i[4]=[v("Header II")])),_:1}),r(E,null,{default:a(()=>i[5]||(i[5]=[s("p",{class:"m-0"}," Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi. ",-1)])),_:1})]),_:1}),r(T,{value:"2"},{default:a(()=>[r(L,null,{default:a(()=>i[6]||(i[6]=[v("Header III")])),_:1}),r(E,null,{default:a(()=>i[7]||(i[7]=[s("p",{class:"m-0"}," At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus. ",-1)])),_:1})]),_:1})]),_:1})]),s("div",It,[i[15]||(i[15]=s("div",{class:"font-semibold text-xl mb-4"},"Tabs",-1)),r(ue,{value:"0"},{default:a(()=>[r(le,null,{default:a(()=>[r(_,{value:"0"},{default:a(()=>i[9]||(i[9]=[v("Header I")])),_:1}),r(_,{value:"1"},{default:a(()=>i[10]||(i[10]=[v("Header II")])),_:1}),r(_,{value:"2"},{default:a(()=>i[11]||(i[11]=[v("Header III")])),_:1})]),_:1}),r(ae,null,{default:a(()=>[r(q,{value:"0"},{default:a(()=>i[12]||(i[12]=[s("p",{class:"m-0"}," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",-1)])),_:1}),r(q,{value:"1"},{default:a(()=>i[13]||(i[13]=[s("p",{class:"m-0"}," Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi. ",-1)])),_:1}),r(q,{value:"2"},{default:a(()=>i[14]||(i[14]=[s("p",{class:"m-0"}," At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus. ",-1)])),_:1})]),_:1})]),_:1})])]),s("div",Mt,[s("div",kt,[i[17]||(i[17]=s("div",{class:"font-semibold text-xl mb-4"},"Panel",-1)),r(de,{header:"Header",toggleable:!0},{default:a(()=>i[16]||(i[16]=[s("p",{class:"leading-normal m-0"}," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",-1)])),_:1})]),s("div",At,[i[19]||(i[19]=s("div",{class:"font-semibold text-xl mb-4"},"Fieldset",-1)),r(pe,{legend:"Legend",toggleable:!0},{default:a(()=>i[18]||(i[18]=[s("p",{class:"leading-normal m-0"}," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",-1)])),_:1})]),r(me,null,{title:a(()=>[s("div",Dt,[i[20]||(i[20]=s("div",{class:"font-semibold text-xl mb-4"},"Card",-1)),r(p,{icon:"pi pi-plus",class:"p-button-text",onClick:u})]),r(ce,{id:"config_menu",ref_key:"menuRef",ref:l,model:n.value,popup:!0},null,8,["model"])]),content:a(()=>i[21]||(i[21]=[s("p",{class:"leading-normal m-0"}," Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",-1)])),_:1})])]),s("div",Bt,[i[26]||(i[26]=s("div",{class:"font-semibold text-xl mb-4"},"Divider",-1)),s("div",Ot,[s("div",jt,[s("div",Rt,[i[22]||(i[22]=s("label",{for:"username"},"Username",-1)),r(f,{id:"username",type:"text"})]),s("div",Ct,[i[23]||(i[23]=s("label",{for:"password"},"Password",-1)),r(f,{id:"password",type:"password"})]),s("div",Kt,[r(p,{label:"Login",icon:"pi pi-user",class:"w-full max-w-[17.35rem] mx-auto"})])]),s("div",Nt,[r(j,{layout:"vertical",class:"!hidden md:!flex"},{default:a(()=>i[24]||(i[24]=[s("b",null,"OR",-1)])),_:1}),r(j,{layout:"horizontal",class:"!flex md:!hidden",align:"center"},{default:a(()=>i[25]||(i[25]=[s("b",null,"OR",-1)])),_:1})]),s("div",Ut,[r(p,{label:"Sign Up",icon:"pi pi-user-plus",severity:"success",class:"w-full max-w-[17.35rem] mx-auto"})])])]),s("div",Gt,[i[30]||(i[30]=s("div",{class:"font-semibold text-xl mb-4"},"Splitter",-1)),r(R,{style:{height:"300px"},class:"mb-8"},{default:a(()=>[r($,{size:30,minSize:10},{default:a(()=>i[27]||(i[27]=[s("div",{className:"h-full flex items-center justify-center"},"Panel 1",-1)])),_:1}),r($,{size:70},{default:a(()=>[r(R,{layout:"vertical"},{default:a(()=>[r($,{size:15},{default:a(()=>i[28]||(i[28]=[s("div",{className:"h-full flex items-center justify-center"},"Panel 2",-1)])),_:1}),r($,{size:50},{default:a(()=>i[29]||(i[29]=[s("div",{className:"h-full flex items-center justify-center"},"Panel 3",-1)])),_:1})]),_:1})]),_:1})]),_:1})])])}}};export{hn as default};
