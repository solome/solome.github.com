"use strict";(self.webpackChunksolome_js_org=self.webpackChunksolome_js_org||[]).push([[748],{1407:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h});var n=a(7294),r=a(7961),l=a(5742),i=a(1207),o=a(1262);let s=function(e){return e.Week="Week",e.Month="Month",e.BarChart="BarChart",e}({});new Map([[1,"\u661f\u671f\u4e00"],[2,"\u661f\u671f\u4e8c"],[3,"\u661f\u671f\u4e09"],[4,"\u661f\u671f\u56db"],[5,"\u661f\u671f\u4e94"],[6,"\u661f\u671f\u516d"],[0,"\u661f\u671f\u65e5"]]);function c(e){const t=[],a=function(e){if(e<0)throw new Error("illegal year");const t=new Date(e,0,1,0,0,0,0),a=new Map([[1,1],[2,0],[3,-1],[4,-2],[5,-3],[6,3],[0,2]]),n=t.getDay();return new Date(e,0,a.get(n),0,0,0,0)}(e);for(;a.getFullYear()===e;){const e=new Date(a);a.setDate(a.getDate()+6);const n=new Date(a);t.push([e,n]),a.setDate(a.getDate()+1)}return t}function d(e){const t=[],a=new Date(e,0,1,0,0,0,0);for(;a.getFullYear()===e;){const e=new Date(a);a.setMonth(a.getMonth()+1);const n=new Date(a);n.setDate(n.getDate()-1),t.push([e,n])}return t}var u=a(1893);function m(e){const t=e.dataset,a=n.useRef(null),[r,l]=n.useState(0),i=n.useRef(null);return n.useEffect((()=>{if(!a.current)return;i.current?.dispose();const e=t[r];i.current=function(e,t){const a=u.S1(e),n=t.cycle===s.BarChart?t.xAxisData:t.cycle===s.Month?d(2023).map(((e,t)=>`M${t+1}`)):c(2023).map(((e,t)=>`W${t+1}`)),r={title:{text:"WPR"},tooltip:[{trigger:"axis"},{trigger:"item"}],legend:t.legend,grid:{left:"2%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",axisLabel:{rotate:0,inside:!1},boundaryGap:!0,data:n,axisTick:{alignWithLabel:!0}},yAxis:{type:"value"},series:t.series,plotOptions:{series:{connectNulls:!0}}};return a.setOption(r),a.resize(),a}(a.current,{cycle:e.cycle,legend:{data:e.cycle===s.BarChart?void 0:e.items.map((e=>e.title))},xAxisData:e.cycle!==s.BarChart?void 0:e.items.map((e=>e.title)),series:e.cycle===s.BarChart?[{type:"bar",data:e.items.map((e=>({value:e.data[0].value,itemStyle:{color:e.data[0].extend.color}}))),barMaxWidth:80,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)"}}]:e.items.map((t=>{const a=e.cycle===s.Month?d(t.year).map((()=>"-")):c(t.year).map((()=>"-"));return t.data.map((e=>a[e.index-1]=e.value)),{name:t.title,type:"line",data:a}}))});const n=()=>{i.current?.resize()};return window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n),i.current?.dispose()}}),[r]),n.createElement("div",{className:"group"},n.createElement("div",{className:"group-nav"},e.dataset.map(((e,t)=>n.createElement("div",{key:e.name,onClick:()=>l(t),className:"group-item"+(r===t?" group-item--selected":"")},n.createElement("div",{className:"group-item-title"},e.name))))),n.createElement("div",{className:"group-panel",ref:a}))}const p={cycle:s.Week,name:"\u9605\u8bfb\u7bc7\u5e45",unit:"\u7bc7",items:[{title:"\u9605\u8bfb\u7bc7\u5e45(2023)",year:2023,data:[{index:42,value:0,extend:{}}]}]},y={cycle:s.Month,name:"\u63ac\u4e00\u6367's \u521b\u4f5c",unit:"\u7bc7",items:[{title:"\u521b\u4f5c\u7bc7\u5e45(2023)",year:2023,data:[{index:10,value:0,extend:{}}]}]},x={cycle:s.BarChart,name:"\u6e38\u620f\u4eba\u751f",unit:"h",items:[{title:"Dota2",year:2023,type:"bar",data:[{index:0,value:100,extend:{color:"#f1d4d4"}}]},{title:"\u585e\u5c14\u8fbe\u4f20\u8bf4\u30fb\u8352\u91ce\u4e4b\u606f",year:2023,type:"bar",data:[{index:0,value:265,extend:{color:"#ddb6c6"}}]},{title:"\u585e\u5c14\u8fbe\u4f20\u8bf4\u30fb\u738b\u56fd\u4e4b\u6cea",year:2023,type:"bar",data:[{index:0,value:0,extend:{color:"#ac8daf"}}]},{title:"\u56da\u7981\n(INSIDE)",year:2023,type:"bar",data:[{index:0,value:16,extend:{color:"#484c7f"}}]},{title:"\u5730\u72f1\u8fb9\u5883\n(LIMBO)",year:2023,type:"bar",data:[{index:0,value:6,extend:{color:"#AACD6E"}}]},{title:"\u7a7a\u6d1e\u9a91\u58eb\n(Hollow Knight)",year:2023,type:"bar",data:[{index:0,value:1,extend:{color:"#3C3530"}}]},{title:"\u54c8\u8fea\u65af\n(Hades)",year:2023,type:"bar",data:[{index:0,value:1,extend:{color:"#F16B6F"}}]},{title:"\u4e0d\u6b7b\u9e1f\u4f20\u8bf4\uff1a\u89c9\u9192\n(Phoenotopia: Awakening)",year:2023,type:"bar",data:[{index:0,value:1,extend:{color:"#C5C6B6"}}]},{title:"\u5f02\u5ea6\u795e\u52513\n(Xenoblade Chronicles 3)",year:2023,type:"bar",data:[{index:0,value:1,extend:{color:"#31464f"}}]}]},g=[p,y,{cycle:s.Month,name:"\u5927\u5927\u7684\u4e16\u754c\uff0c\u5c0f\u5c0f\u7684\u6211",unit:"\u8d9f",items:[{title:"\u6e38\u8bb0\u7bc7\u5e45(2023)",year:2023,data:[{index:10,value:0,extend:{}}]}]},x];function h(){return n.createElement(n.Fragment,null,n.createElement(l.Z,null,n.createElement("script",{src:"/three/examples/js/libs/ammo.wasm.js"})),n.createElement(r.Z,{title:"\u63ac\u4e00\u6367\u6e05\u6c34\u7aa5\u660e\u6708",description:"\u6bcf\u4e2a\u4eba\u90fd\u4f1a\u9047\u5230\u7684\u4e00\u4e2a\u670b\u53cb\uff0c\u4ed6\u7684\u601d\u60f3\uff0c\u4ed6\u7684\u4ef7\u503c\u89c2\uff0c\u90fd\u4f1a\u8ba9\u4f60\u5f88\u6b23\u8d4f\u4ed6\uff0c\u4f46\u662f\u56e0\u4e3a\u5229\u76ca\u51fa\u5356\u4e86\u4f60...",wrapperClassName:i.Z["main-wrapper"]},n.createElement("main",{className:i.Z.main+" "+i.Z["main-wpr"]},n.createElement(o.Z,null,(()=>n.createElement(m,{dataset:g}))))))}},1207:(e,t,a)=>{a.d(t,{Z:()=>n});const n={heroBanner:"heroBanner_qdFl",buttons:"buttons_AeoN","main-wrapper":"main-wrapper_AjrE",main:"main_iUjq","main-wpr":"main-wpr_Tera",HatsuneMiku:"HatsuneMiku_Xa8o"}}}]);