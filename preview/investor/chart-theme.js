(function(){
const C={ink:'#20242A',muted:'#656762',grid:'#E4E3DD',teal:'#344B62',loss:'#923D3A',prior:'#A6ADB2',selected:'#20242A'};
function base(reduced){return {backgroundColor:'transparent',animation:!reduced,animationDuration:550,animationDurationUpdate:0,textStyle:{fontFamily:'Inter, Arial, sans-serif',fontSize:12,color:C.ink},tooltip:{confine:true,backgroundColor:'#20242A',borderColor:'#20242A',textStyle:{color:'#fff',fontSize:13},showDelay:0,extraCssText:'line-height:1.65;max-width:320px;white-space:normal;border-radius:6px;'},grid:{left:65,right:35,top:32,bottom:57}};}
function axis(type){return {type,axisLine:{show:false},axisTick:{show:false},axisLabel:{color:C.muted,fontSize:11},splitLine:{show:type==='value',lineStyle:{color:C.grid,type:'solid'}}};}
window.INSURANCE_CHART_THEME=Object.freeze({colors:C,base,axis});
})();
