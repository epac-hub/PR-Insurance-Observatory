(function(){
const C={ink:'#172b37',muted:'#5c6d78',grid:'#e0e8ea',teal:'#087d70',loss:'#bd3450',prior:'#8da2ae',selected:'#db9b36'};
function base(reduced){return {backgroundColor:'transparent',animation:!reduced,animationDuration:550,animationDurationUpdate:0,textStyle:{fontFamily:'Inter, Arial, sans-serif',fontSize:12,color:C.ink},tooltip:{confine:true,backgroundColor:'#132935',borderColor:'#132935',textStyle:{color:'#fff',fontSize:13},showDelay:0,extraCssText:'line-height:1.65;max-width:320px;white-space:normal;border-radius:6px;'},grid:{left:65,right:35,top:32,bottom:57}};}
function axis(type){return {type,axisLine:{show:false},axisTick:{show:false},axisLabel:{color:C.muted,fontSize:11},splitLine:{show:type==='value',lineStyle:{color:C.grid,type:'dashed'}}};}
window.INSURANCE_CHART_THEME=Object.freeze({colors:C,base,axis});
})();
