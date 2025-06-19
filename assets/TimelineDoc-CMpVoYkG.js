import{s as $}from"./index-BZ-PKrjf.js";import{s as w}from"./index-BRlZ3SBp.js";import{B as z,c as u,a as f,F as P,d as S,S as v,b as n,R as b,h as x,a9 as T,a3 as O,a6 as C,_ as B,i as y,f as m,k as s,U as p,t as d,a8 as A,n as q}from"./index-BnF8l7AT.js";import"./index-CQH9gJwO.js";import"./index-zgDmictm.js";var K=({dt:e})=>`
.p-timeline {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    direction: ltr;
}

.p-timeline-left .p-timeline-event-opposite {
    text-align: right;
}

.p-timeline-left .p-timeline-event-content {
    text-align: left;
}

.p-timeline-right .p-timeline-event {
    flex-direction: row-reverse;
}

.p-timeline-right .p-timeline-event-opposite {
    text-align: left;
}

.p-timeline-right .p-timeline-event-content {
    text-align: right;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: row-reverse;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {
    text-align: right;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {
    text-align: left;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {
    text-align: left;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
    text-align: right;
}

.p-timeline-vertical .p-timeline-event-opposite,
.p-timeline-vertical .p-timeline-event-content {
    padding: ${e("timeline.vertical.event.content.padding")};
}

.p-timeline-vertical .p-timeline-event-connector {
    width: ${e("timeline.event.connector.size")};
}

.p-timeline-event {
    display: flex;
    position: relative;
    min-height: ${e("timeline.event.min.height")};
}

.p-timeline-event:last-child {
    min-height: 0;
}

.p-timeline-event-opposite {
    flex: 1;
}

.p-timeline-event-content {
    flex: 1;
}

.p-timeline-event-separator {
    flex: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.p-timeline-event-marker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    align-self: baseline;
    border-width: ${e("timeline.event.marker.border.width")};
    border-style: solid;
    border-color: ${e("timeline.event.marker.border.color")};
    border-radius: ${e("timeline.event.marker.border.radius")};
    width: ${e("timeline.event.marker.size")};
    height: ${e("timeline.event.marker.size")};
    background: ${e("timeline.event.marker.background")};
}

.p-timeline-event-marker::before {
    content: " ";
    border-radius: ${e("timeline.event.marker.content.border.radius")};
    width: ${e("timeline.event.marker.content.size")};
    height:${e("timeline.event.marker.content.size")};
    background: ${e("timeline.event.marker.content.background")};
}

.p-timeline-event-marker::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${e("timeline.event.marker.border.radius")};
    box-shadow: ${e("timeline.event.marker.content.inset.shadow")};
}

.p-timeline-event-connector {
    flex-grow: 1;
    background: ${e("timeline.event.connector.color")};
}

.p-timeline-horizontal {
    flex-direction: row;
}

.p-timeline-horizontal .p-timeline-event {
    flex-direction: column;
    flex: 1;
}

.p-timeline-horizontal .p-timeline-event:last-child {
    flex: 0;
}

.p-timeline-horizontal .p-timeline-event-separator {
    flex-direction: row;
}

.p-timeline-horizontal .p-timeline-event-connector {
    width: 100%;
    height: ${e("timeline.event.connector.size")};
}

.p-timeline-horizontal .p-timeline-event-opposite,
.p-timeline-horizontal .p-timeline-event-content {
    padding: ${e("timeline.horizontal.event.content.padding")};
}

.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: column-reverse;
}

.p-timeline-bottom .p-timeline-event {
    flex-direction: column-reverse;
}
`,j={root:function(t){var r=t.props;return["p-timeline p-component","p-timeline-"+r.align,"p-timeline-"+r.layout]},event:"p-timeline-event",eventOpposite:"p-timeline-event-opposite",eventSeparator:"p-timeline-event-separator",eventMarker:"p-timeline-event-marker",eventConnector:"p-timeline-event-connector",eventContent:"p-timeline-event-content"},D=z.extend({name:"timeline",style:K,classes:j}),F={name:"BaseTimeline",extends:T,props:{value:null,align:{mode:String,default:"left"},layout:{mode:String,default:"vertical"},dataKey:null},style:D,provide:function(){return{$pcTimeline:this,$parentInstance:this}}};function g(e){"@babel/helpers - typeof";return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(e)}function _(e,t,r){return(t=N(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function N(e){var t=V(e,"string");return g(t)=="symbol"?t:t+""}function V(e,t){if(g(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var h=r.call(e,t);if(g(h)!="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var k={name:"Timeline",extends:F,inheritAttrs:!1,methods:{getKey:function(t,r){return this.dataKey?C(t,this.dataKey):r},getPTOptions:function(t,r){return this.ptm(t,{context:{index:r,count:this.value.length}})}},computed:{dataP:function(){return O(_(_({},this.layout,this.layout),this.align,this.align))}}},E=["data-p"],I=["data-p"],L=["data-p"],M=["data-p"],R=["data-p"],H=["data-p"],U=["data-p"];function G(e,t,r,h,l,o){return f(),u("div",v({class:e.cx("root")},e.ptmi("root"),{"data-p":o.dataP}),[(f(!0),u(P,null,S(e.value,function(c,a){return f(),u("div",v({key:o.getKey(c,a),class:e.cx("event"),ref_for:!0},o.getPTOptions("event",a),{"data-p":o.dataP}),[n("div",v({class:e.cx("eventOpposite",{index:a}),ref_for:!0},o.getPTOptions("eventOpposite",a),{"data-p":o.dataP}),[b(e.$slots,"opposite",{item:c,index:a})],16,L),n("div",v({class:e.cx("eventSeparator"),ref_for:!0},o.getPTOptions("eventSeparator",a),{"data-p":o.dataP}),[b(e.$slots,"marker",{item:c,index:a},function(){return[n("div",v({class:e.cx("eventMarker"),ref_for:!0},o.getPTOptions("eventMarker",a),{"data-p":o.dataP}),null,16,R)]}),a!==e.value.length-1?b(e.$slots,"connector",{key:0,item:c,index:a},function(){return[n("div",v({class:e.cx("eventConnector"),ref_for:!0},o.getPTOptions("eventConnector",a),{"data-p":o.dataP}),null,16,H)]}):x("",!0)],16,M),n("div",v({class:e.cx("eventContent"),ref_for:!0},o.getPTOptions("eventContent",a),{"data-p":o.dataP}),[b(e.$slots,"content",{item:c,index:a})],16,U)],16,I)}),128))],16,E)}k.render=G;const J={class:"grid grid-cols-12 gap-8"},Q={class:"col-span-6"},W={class:"card"},X={class:"col-span-6"},Y={class:"card"},Z={class:"col-span-6"},ee={class:"card"},te={class:"col-span-6"},ne={class:"card"},ie={class:"text-muted-color"},le={class:"col-span-full"},oe={class:"card"},re=["src","alt"],ae={class:"col-span-full"},se={class:"card"},me={__name:"TimelineDoc",setup(e){const t=y([{status:"Ordered",date:"15/10/2020 10:30",icon:"pi pi-shopping-cart",color:"#9C27B0",image:"game-controller.jpg"},{status:"Processing",date:"15/10/2020 14:00",icon:"pi pi-cog",color:"#673AB7"},{status:"Shipped",date:"15/10/2020 16:15",icon:"pi pi-envelope",color:"#FF9800"},{status:"Delivered",date:"16/10/2020 10:00",icon:"pi pi-check",color:"#607D8B"}]),r=y(["2020","2021","2022","2023"]);return(h,l)=>{const o=k,c=w,a=$;return f(),u("div",J,[n("div",Q,[n("div",W,[l[0]||(l[0]=n("div",{class:"font-semibold text-xl mb-4"},"Left Align",-1)),m(o,{value:t.value},{content:s(i=>[p(d(i.item.status),1)]),_:1},8,["value"])])]),n("div",X,[n("div",Y,[l[1]||(l[1]=n("div",{class:"font-semibold text-xl mb-4"},"Right Align",-1)),m(o,{value:t.value,align:"right"},{content:s(i=>[p(d(i.item.status),1)]),_:1},8,["value"])])]),n("div",Z,[n("div",ee,[l[2]||(l[2]=n("div",{class:"font-semibold text-xl mb-4"},"Alternate Align",-1)),m(o,{value:t.value,align:"alternate"},{content:s(i=>[p(d(i.item.status),1)]),_:1},8,["value"])])]),n("div",te,[n("div",ne,[l[3]||(l[3]=n("div",{class:"font-semibold text-xl mb-4"},"Opposite Content",-1)),m(o,{value:t.value},{opposite:s(i=>[n("small",ie,d(i.item.date),1)]),content:s(i=>[p(d(i.item.status),1)]),_:1},8,["value"])])]),n("div",le,[n("div",oe,[l[5]||(l[5]=n("div",{class:"font-semibold text-xl mb-4"},"Templating",-1)),m(o,{value:t.value,align:"alternate",class:"customized-timeline"},{marker:s(i=>[n("span",{class:"flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm",style:A({backgroundColor:i.item.color})},[n("i",{class:q(i.item.icon)},null,2)],4)]),content:s(i=>[m(a,{class:"mt-4"},{title:s(()=>[p(d(i.item.status),1)]),subtitle:s(()=>[p(d(i.item.date),1)]),content:s(()=>[i.item.image?(f(),u("img",{key:0,src:`https://primefaces.org/cdn/primevue/images/product/${i.item.image}`,alt:i.item.name,width:"200",class:"shadow-sm"},null,8,re)):x("",!0),l[4]||(l[4]=n("p",null," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas! ",-1)),m(c,{label:"Read more",text:""})]),_:2},1024)]),_:1},8,["value"])])]),n("div",ae,[n("div",se,[l[7]||(l[7]=n("div",{class:"font-semibold text-xl mb-4"},"Horizontal",-1)),l[8]||(l[8]=n("div",{class:"font-semibold mb-2"},"Top Align",-1)),m(o,{value:r.value,layout:"horizontal",align:"top"},{content:s(i=>[p(d(i.item),1)]),_:1},8,["value"]),l[9]||(l[9]=n("div",{class:"font-semibold mt-4 mb-2"},"Bottom Align",-1)),m(o,{value:r.value,layout:"horizontal",align:"bottom"},{content:s(i=>[p(d(i.item),1)]),_:1},8,["value"]),l[10]||(l[10]=n("div",{class:"font-semibold mt-4 mb-2"},"Alternate Align",-1)),m(o,{value:r.value,layout:"horizontal",align:"alternate"},{opposite:s(()=>l[6]||(l[6]=[p("   ")])),content:s(i=>[p(d(i.item),1)]),_:1},8,["value"])])])])}}},fe=B(me,[["__scopeId","data-v-6669d0cb"]]);export{fe as default};
