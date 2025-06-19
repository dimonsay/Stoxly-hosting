import{B as w,c as p,a as l,R as h,S as r,a9 as T,a3 as C,aB as f,aC as K,E as g,aD as V,aw as b,J as z,ag as k,a7 as N,l as $,h as L,b as v,j as m,V as y,a5 as O,N as E,af as d,k as I,n as R}from"./index-BnF8l7AT.js";import{s as D}from"./index-BDpDIWdb.js";import{s as F}from"./index-BLAYFmGR.js";import{R as P}from"./index-zgDmictm.js";var W=({dt:t})=>`
.p-tabs {
    display: flex;
    flex-direction: column;
}

.p-tablist {
    display: flex;
    position: relative;
}

.p-tabs-scrollable > .p-tablist {
    overflow: hidden;
}

.p-tablist-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tablist-viewport::-webkit-scrollbar {
    display: none;
}

.p-tablist-tab-list {
    position: relative;
    display: flex;
    background: ${t("tabs.tablist.background")};
    border-style: solid;
    border-color: ${t("tabs.tablist.border.color")};
    border-width: ${t("tabs.tablist.border.width")};
}

.p-tablist-content {
    flex-grow: 1;
}

.p-tablist-nav-button {
    all: unset;
    position: absolute !important;
    flex-shrink: 0;
    inset-block-start: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${t("tabs.nav.button.background")};
    color: ${t("tabs.nav.button.color")};
    width: ${t("tabs.nav.button.width")};
    transition: color ${t("tabs.transition.duration")}, outline-color ${t("tabs.transition.duration")}, box-shadow ${t("tabs.transition.duration")};
    box-shadow: ${t("tabs.nav.button.shadow")};
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: ${t("tabs.nav.button.focus.ring.shadow")};
    outline: ${t("tabs.nav.button.focus.ring.width")} ${t("tabs.nav.button.focus.ring.style")} ${t("tabs.nav.button.focus.ring.color")};
    outline-offset: ${t("tabs.nav.button.focus.ring.offset")};
}

.p-tablist-nav-button:hover {
    color: ${t("tabs.nav.button.hover.color")};
}

.p-tablist-prev-button {
    inset-inline-start: 0;
}

.p-tablist-next-button {
    inset-inline-end: 0;
}

.p-tablist-prev-button:dir(rtl),
.p-tablist-next-button:dir(rtl) {
    transform: rotate(180deg);
}

.p-tab {
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-style: solid;
    white-space: nowrap;
    gap: ${t("tabs.tab.gap")};
    background: ${t("tabs.tab.background")};
    border-width: ${t("tabs.tab.border.width")};
    border-color: ${t("tabs.tab.border.color")};
    color: ${t("tabs.tab.color")};
    padding: ${t("tabs.tab.padding")};
    font-weight: ${t("tabs.tab.font.weight")};
    transition: background ${t("tabs.transition.duration")}, border-color ${t("tabs.transition.duration")}, color ${t("tabs.transition.duration")}, outline-color ${t("tabs.transition.duration")}, box-shadow ${t("tabs.transition.duration")};
    margin: ${t("tabs.tab.margin")};
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: ${t("tabs.tab.focus.ring.shadow")};
    outline: ${t("tabs.tab.focus.ring.width")} ${t("tabs.tab.focus.ring.style")} ${t("tabs.tab.focus.ring.color")};
    outline-offset: ${t("tabs.tab.focus.ring.offset")};
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: ${t("tabs.tab.hover.background")};
    border-color: ${t("tabs.tab.hover.border.color")};
    color: ${t("tabs.tab.hover.color")};
}

.p-tab-active {
    background: ${t("tabs.tab.active.background")};
    border-color: ${t("tabs.tab.active.border.color")};
    color: ${t("tabs.tab.active.color")};
}

.p-tabpanels {
    background: ${t("tabs.tabpanel.background")};
    color: ${t("tabs.tabpanel.color")};
    padding: ${t("tabs.tabpanel.padding")};
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: ${t("tabs.tabpanel.focus.ring.shadow")};
    outline: ${t("tabs.tabpanel.focus.ring.width")} ${t("tabs.tabpanel.focus.ring.style")} ${t("tabs.tabpanel.focus.ring.color")};
    outline-offset: ${t("tabs.tabpanel.focus.ring.offset")};
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    inset-block-end: ${t("tabs.active.bar.bottom")};
    height: ${t("tabs.active.bar.height")};
    background: ${t("tabs.active.bar.background")};
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`,H={root:function(e){var a=e.props;return["p-tabs p-component",{"p-tabs-scrollable":a.scrollable}]}},_=w.extend({name:"tabs",style:W,classes:H}),U={name:"BaseTabs",extends:T,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:_,provide:function(){return{$pcTabs:this,$parentInstance:this}}},j={name:"Tabs",extends:U,inheritAttrs:!1,emits:["update:value"],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{updateValue:function(e){this.d_value!==e&&(this.d_value=e,this.$emit("update:value",e))},isVertical:function(){return this.orientation==="vertical"}}};function M(t,e,a,n,i,s){return l(),p("div",r({class:t.cx("root")},t.ptmi("root")),[h(t.$slots,"default")],16)}j.render=M;var q={root:"p-tablist",content:function(e){var a=e.instance;return["p-tablist-content",{"p-tablist-viewport":a.$pcTabs.scrollable}]},tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},J=w.extend({name:"tablist",classes:q}),G={name:"BaseTabList",extends:T,props:{},style:J,provide:function(){return{$pcTabList:this,$parentInstance:this}}},Q={name:"TabList",extends:G,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,watch:{showNavigators:function(e){e?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar()}}},mounted:function(){var e=this;setTimeout(function(){e.updateInkBar()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver()},methods:{onScroll:function(e){this.showNavigators&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,a=this.getVisibleButtonWidths(),n=f(e)-a,i=Math.abs(e.scrollLeft),s=n*.8,o=i-s,c=Math.max(o,0);e.scrollLeft=k(e)?-1*c:c},onNextButtonClick:function(){var e=this.$refs.content,a=this.getVisibleButtonWidths(),n=f(e)-a,i=Math.abs(e.scrollLeft),s=n*.8,o=i+s,c=e.scrollWidth-n,u=Math.min(o,c);e.scrollLeft=k(e)?-1*u:u},bindResizeObserver:function(){var e=this;this.resizeObserver=new ResizeObserver(function(){return e.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var e;(e=this.resizeObserver)===null||e===void 0||e.unobserve(this.$refs.list),this.resizeObserver=void 0},updateInkBar:function(){var e=this.$refs,a=e.content,n=e.inkbar,i=e.tabs;if(n){var s=g(a,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(n.style.height=V(s)+"px",n.style.top=b(s).top-b(i).top+"px"):(n.style.width=z(s)+"px",n.style.left=b(s).left-b(i).left+"px")}},updateButtonState:function(){var e=this.$refs,a=e.list,n=e.content,i=n.scrollTop,s=n.scrollWidth,o=n.scrollHeight,c=n.offsetWidth,u=n.offsetHeight,B=Math.abs(n.scrollLeft),x=[f(n),K(n)],A=x[0],S=x[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=i!==0,this.isNextButtonEnabled=a.offsetHeight>=u&&parseInt(i)!==o-S):(this.isPrevButtonEnabled=B!==0,this.isNextButtonEnabled=a.offsetWidth>=c&&parseInt(B)!==s-A)},getVisibleButtonWidths:function(){var e=this.$refs,a=e.prevButton,n=e.nextButton,i=0;return this.showNavigators&&(i=((a==null?void 0:a.offsetWidth)||0)+((n==null?void 0:n.offsetWidth)||0)),i}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.scrollable&&this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return C({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:D,ChevronRightIcon:F},directives:{ripple:P}},X=["data-p"],Y=["aria-label","tabindex"],Z=["data-p"],tt=["aria-orientation"],et=["aria-label","tabindex"];function at(t,e,a,n,i,s){var o=N("ripple");return l(),p("div",r({ref:"list",class:t.cx("root"),"data-p":s.dataP},t.ptmi("root")),[s.showNavigators&&i.isPrevButtonEnabled?$((l(),p("button",r({key:0,ref:"prevButton",type:"button",class:t.cx("prevButton"),"aria-label":s.prevButtonAriaLabel,tabindex:s.$pcTabs.tabindex,onClick:e[0]||(e[0]=function(){return s.onPrevButtonClick&&s.onPrevButtonClick.apply(s,arguments)})},t.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(l(),m(y(s.templates.previcon||"ChevronLeftIcon"),r({"aria-hidden":"true"},t.ptm("prevIcon")),null,16))],16,Y)),[[o]]):L("",!0),v("div",r({ref:"content",class:t.cx("content"),onScroll:e[1]||(e[1]=function(){return s.onScroll&&s.onScroll.apply(s,arguments)}),"data-p":s.dataP},t.ptm("content")),[v("div",r({ref:"tabs",class:t.cx("tabList"),role:"tablist","aria-orientation":s.$pcTabs.orientation||"horizontal"},t.ptm("tabList")),[h(t.$slots,"default"),v("span",r({ref:"inkbar",class:t.cx("activeBar"),role:"presentation","aria-hidden":"true"},t.ptm("activeBar")),null,16)],16,tt)],16,Z),s.showNavigators&&i.isNextButtonEnabled?$((l(),p("button",r({key:1,ref:"nextButton",type:"button",class:t.cx("nextButton"),"aria-label":s.nextButtonAriaLabel,tabindex:s.$pcTabs.tabindex,onClick:e[2]||(e[2]=function(){return s.onNextButtonClick&&s.onNextButtonClick.apply(s,arguments)})},t.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(l(),m(y(s.templates.nexticon||"ChevronRightIcon"),r({"aria-hidden":"true"},t.ptm("nextIcon")),null,16))],16,et)),[[o]]):L("",!0)],16,X)}Q.render=at;var nt={root:function(e){var a=e.instance,n=e.props;return["p-tab",{"p-tab-active":a.active,"p-disabled":n.disabled}]}},st=w.extend({name:"tab",classes:nt}),it={name:"BaseTab",extends:T,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:st,provide:function(){return{$pcTab:this,$parentInstance:this}}},rt={name:"Tab",extends:it,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(e){switch(e.code){case"ArrowRight":this.onArrowRightKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(e);break}},onArrowRightKey:function(e){var a=this.findNextTab(e.currentTarget);a?this.changeFocusedTab(e,a):this.onHomeKey(e),e.preventDefault()},onArrowLeftKey:function(e){var a=this.findPrevTab(e.currentTarget);a?this.changeFocusedTab(e,a):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var a=this.findFirstTab();this.changeFocusedTab(e,a),e.preventDefault()},onEndKey:function(e){var a=this.findLastTab();this.changeFocusedTab(e,a),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.findLastTab()),e.preventDefault()},onPageUpKey:function(e){this.scrollInView(this.findFirstTab()),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue(),e.preventDefault()},findNextTab:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?e:e.nextElementSibling;return n?d(n,"data-p-disabled")||d(n,"data-pc-section")==="activebar"?this.findNextTab(n):g(n,'[data-pc-name="tab"]'):null},findPrevTab:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=a?e:e.previousElementSibling;return n?d(n,"data-p-disabled")||d(n,"data-pc-section")==="activebar"?this.findPrevTab(n):g(n,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(e,a){E(a),this.scrollInView(a)},scrollInView:function(e){var a;e==null||(a=e.scrollIntoView)===null||a===void 0||a.call(e,{block:"nearest"})}},computed:{active:function(){var e;return O((e=this.$pcTabs)===null||e===void 0?void 0:e.d_value,this.value)},id:function(){var e;return"".concat((e=this.$pcTabs)===null||e===void 0?void 0:e.$id,"_tab_").concat(this.value)},ariaControls:function(){var e;return"".concat((e=this.$pcTabs)===null||e===void 0?void 0:e.$id,"_tabpanel_").concat(this.value)},attrs:function(){return r(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return C({active:this.active})}},directives:{ripple:P}};function ot(t,e,a,n,i,s){var o=N("ripple");return t.asChild?h(t.$slots,"default",{key:1,dataP:s.dataP,class:R(t.cx("root")),active:s.active,a11yAttrs:s.a11yAttrs,onClick:s.onClick}):$((l(),m(y(t.as),r({key:0,class:t.cx("root"),"data-p":s.dataP,onClick:s.onClick},s.attrs),{default:I(function(){return[h(t.$slots,"default")]}),_:3},16,["class","data-p","onClick"])),[[o]])}rt.render=ot;export{Q as a,rt as b,j as s};
