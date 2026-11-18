/* Source-backed overview, accessible direct-label charts and corrected coverage controls. */
(function(){
  'use strict';
  var selectedYear='25';
  var money=function(v){return (v<0?'−':'')+'$'+(Math.abs(v)>=1e9?(Math.abs(v)/1e9).toFixed(2)+'B':(Math.abs(v)/1e6).toFixed(1)+'M');};
  var sign=function(v){return v>0?'+':'';};
  var esc=function(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  var sum=function(rows,key){return rows.reduce(function(t,r){return t+(typeof r[key]==='number'?r[key]:0);},0);};
  function sourceLink(url,title){return '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+' ↗</a>';}
  function panel(title,sub,body,source){return '<article class="obs-panel"><h3>'+title+'</h3><p class="obs-sub">'+sub+'</p>'+body+'<div class="obs-source">'+source+'</div></article>';}
  function bar(value,max,cls){return '<div class="obs-track" aria-hidden="true"><i class="'+(cls||'')+'" style="width:'+(value/max*100).toFixed(5)+'%"></i></div>';}
  function annualBars(){
    var a=PLANILLA.market.FY24,b=PLANILLA.market.FY25,max=Math.ceil(Math.max(a.prem,b.prem)/1e9)*1e9;
    var h='<div class="obs-legend"><span><i></i>Premiums written</span><span><i class="claims"></i>Claims paid</span></div>';
    [['FY2024',a],['FY2025',b]].forEach(function(v){h+='<div class="obs-pair"><b>'+v[0]+'</b><div class="obs-pair-bars"><div class="obs-barline" aria-label="'+v[0]+' premiums '+v[1].prem+' dollars">'+bar(v[1].prem,max)+'<strong>'+money(v[1].prem)+'</strong></div><div class="obs-barline" aria-label="'+v[0]+' claims '+v[1].claims+' dollars">'+bar(v[1].claims,max,'claims')+'<strong>'+money(v[1].claims)+'</strong></div></div></div>';});
    h+='<div class="obs-scale"><span>$0</span><span>$'+max/2e9+'B</span><span>$'+max/1e9+'B</span></div><div class="obs-statline"><div>Premium growth<strong>'+((b.prem/a.prem-1)*100).toFixed(1)+'%</strong></div><div>Claims growth<strong>'+((b.claims/a.claims-1)*100).toFixed(1)+'%</strong></div><div>Covered lives growth<strong>'+((b.lives/a.lives-1)*100).toFixed(1)+'%</strong></div></div>';
    return h;
  }
  function profitBars(year,change){
    var rows=D.slice().sort(function(a,b){return (change?b.ni25-b.ni24:b['ni'+year])-(change?a.ni25-a.ni24:a['ni'+year]);});
    var values=rows.map(function(d){return change?d.ni25-d.ni24:d['ni'+year];});
    var max=Math.ceil(Math.max.apply(null,values.map(Math.abs))/25e6)*25e6;
    var h='<div class="obs-profit-scale"><span>−$'+max/1e6+'M</span><span>0</span><span>+$'+max/1e6+'M</span></div>';
    rows.forEach(function(d,i){var v=values[i],w=Math.abs(v)/max*50;h+='<div class="obs-profit-row"><a class="obs-profit-label" href="'+esc(d['s'+year])+'" target="_blank" rel="noopener noreferrer">'+esc(d.n)+'</a><div class="obs-diverging" aria-hidden="true"><i class="'+(v<0?'loss':'')+'" style="left:'+(v<0?50-w:50)+'%;width:'+w+'%"></i></div><strong>'+money(v)+'</strong></div>';});return h;
  }
  function coverageBars(year){
    var rows=PLANILLA.coverage['FY'+year].slice().sort(function(a,b){return b.prem-a.prem;}),max=Math.max.apply(null,rows.map(function(r){return r.prem;}));
    return rows.map(function(r){return '<div class="obs-cover-row"><span class="obs-cover-name">'+esc(r.t)+'</span>'+bar(r.prem,max)+'<strong>'+money(r.prem)+'</strong></div>';}).join('');
  }
  function claimsPanel(year){var m=PLANILLA.market['FY'+year],ratio=m.claims/m.prem*100,prior=PLANILLA.market.FY24.claims/PLANILLA.market.FY24.prem*100;
    return '<div class="obs-flow-number">'+ratio.toFixed(1)+'<span style="font-size:.55em">¢</span></div><div class="obs-flow-note">Claims paid for each $1 of premiums written</div><div class="obs-flow" aria-label="Claims paid '+ratio.toFixed(1)+' percent of premium"><i style="width:'+ratio+'%"></i></div><div class="obs-statline"><div>Claims paid<strong>'+money(m.claims)+'</strong></div><div>Premiums written<strong>'+money(m.prem)+'</strong></div></div><p class="obs-note">'+(year==='25'?'Up '+(ratio-prior).toFixed(1)+' percentage points from FY2024. ':'')+'This paid-claims ratio is sensitive to payment timing and coverage mix. It is not the regulatory MLR or a measure of net profit.</p><p class="obs-note">'+(year==='25'?'The FY2025 detailed and summary pages differ by $196,246 in claims. This view uses detailed page 2.':'OCS Health Report annual reporting basis; covered lives are the source-period count.')+'</p>';
  }
  buildGlance=function(){
    var y=selectedYear,m=PLANILLA.market['FY'+y],prior=PLANILLA.market.FY24,ni=sum(D,'ni'+y),profitable=D.filter(function(d){return d['ni'+y]>0;}).length;
    var src=sourceLink(y==='25'?PLANILLA.sourceAnnual2025:PLANILLA.sourceAnnual2024,'OCS Health Report FY20'+y),both=sourceLink(PLANILLA.sourceAnnual2024,'FY2024')+' · '+sourceLink(PLANILLA.sourceAnnual2025,'FY2025');
    var h='<div class="obs-heading"><div><h2>Market overview</h2><p>Puerto Rico health insurance · OCS annual financial data</p></div><div class="obs-control"><label for="overviewYear">Reporting year</label><select id="overviewYear"><option value="25"'+(y==='25'?' selected':'')+'>Full year 2025</option><option value="24"'+(y==='24'?' selected':'')+'>Full year 2024</option></select></div></div>';
    var cards=[['Market premiums',money(m.prem),y==='25'?'+'+((m.prem/prior.prem-1)*100).toFixed(1)+'% vs FY2024':'OCS Health Report · annual'],['Claims paid / premiums',(m.claims/m.prem*100).toFixed(1)+'%',y==='25'?'+'+((m.mlr-prior.mlr)*100).toFixed(1)+' pp vs FY2024':'Paid claims ÷ written premiums'],['Covered lives',m.lives.toLocaleString('en-US'),'OCS source-period count'],['Core 9 net income',money(ni),profitable+' of 9 entities profitable']];
    h+='<div class="obs-kpis">'+cards.map(function(c){return '<div class="obs-kpi"><label>'+c[0]+'</label><strong>'+c[1]+'</strong><small>'+c[2]+'</small></div>';}).join('')+'</div>';
    h+='<div class="obs-grid">'+panel('Premiums and claims','Annual market totals · shared scale in US dollars',annualBars(),both)+panel('Insurer profit and loss','FY20'+y+' net income · nine statutory legal entities',profitBars(y,false),sourceLink('https://www.ocs.pr.gov/regulados/informes-anuales','OCS annual statements')+' · Insurer names open the corresponding filing')+'</div>';
    h+='<p class="obs-keyline">Market totals use the OCS medical-expense Planilla. Core 9 figures use individual statutory filings, including MCS Life’s Life blank. These are different reporting universes.</p>';
    h+='<div class="obs-grid">'+panel('Premiums by coverage','FY20'+y+' · all 10 OCS coverage categories',coverageBars(y),src)+panel('How much goes to paid claims?','FY20'+y+' · OCS Health Report medical-expense market',claimsPanel(y),src+' · <button class="obs-detail-trigger" onclick="go(\'meth\')">View methodology</button>')+'</div>';
    var q=PLANILLA.market.Q1_2026;h+='<div class="obs-quarter"><div><small>Latest available quarter</small><strong>Q1 2026</strong><small>Quarter ended March 31</small></div><div><small>Premiums written</small><strong>'+money(q.prem)+'</strong></div><div><small>Claims paid</small><strong>'+money(q.claims)+'</strong></div><div><small>Covered lives</small><strong>'+q.lives.toLocaleString('en-US')+'</strong></div><div>'+sourceLink(PLANILLA.sourceQ12026,'OCS quarterly PDF')+'<small>Quarterly figures are not annualized.</small></div></div>';
    return h;
  };
  var originalInsurerBlock=insurerBlock;
  insurerBlock=function(){var content=originalInsurerBlock.apply(this,arguments);var p=content.indexOf('<div class="c"><h3>All nine insurers');if(p<0)return content;
    var rows=D.slice().sort(function(a,b){return b.p25-a.p25;}),max=Math.max.apply(null,rows.map(function(d){return Math.max(d.p25,d.p24);}));
    var bars='<div class="obs-legend"><span><i class="prior"></i>FY2024</span><span><i></i>FY2025</span></div>';
    rows.forEach(function(d){bars+='<div class="obs-cover-row"><span class="obs-cover-name">'+esc(d.n)+'</span><div><div style="margin-bottom:4px">'+bar(d.p24,max,'prior')+'</div>'+bar(d.p25,max)+'</div><strong>'+money(d.p25)+'</strong></div>';});
    bars+='<p class="obs-note">Shared dollar scale from $0 to '+money(max)+'. Exact annual values are available in each insurer’s expandable statement below.</p>';
    var visual='<div class="obs-grid obs-ins-compare">'+panel('Premiums by insurer','Both annual periods on the same scale',bars,sourceLink('https://www.ocs.pr.gov/regulados/informes-anuales','OCS statutory filings'))+panel('What changed in profitability?','Change in net income · FY2025 minus FY2024',profitBars('25',true),sourceLink('https://www.ocs.pr.gov/regulados/informes-anuales','OCS statutory filings')+' · Prior year as originally filed')+'</div>';
    return content.slice(0,p)+visual+content.slice(p);
  };
  var originalRenderLOB=renderLOB;
  renderLOB=function(){
    ['chLobCvgP','chLobCvgM'].forEach(function(id){if(CH[id]){CH[id].destroy();delete CH[id];}});
    originalRenderLOB();
    var year=document.getElementById('lobYr').value,key=year==='2024'?'FY24':'FY25',rows=PLANILLA.coverage[key];
    [['chLobCvgP','Premiums written',function(r){return r.prem/1e6;},'$M'],['chLobCvgM','Paid claims / premiums',function(r){return r.claims/r.prem*100;},'%']].forEach(function(c){
      var el=document.getElementById(c[0]);if(!el||!window.Chart)return;
      var old=Chart.getChart(el);if(old)old.destroy();
      CH[c[0]]=new Chart(el,{
        type:'bar',
        data:{labels:rows.map(function(r){return r.t;}),datasets:[{label:c[1],data:rows.map(c[2]),backgroundColor:getCSS('--ac'),borderRadius:3}]},
        options:{
          indexAxis:'y',responsive:true,maintainAspectRatio:false,animation:false,
          plugins:{legend:{display:false},tooltip:{callbacks:{label:function(ctx){return c[1]+': '+ctx.parsed.x.toFixed(2)+' '+c[3];}}}},
          scales:{
            x:{beginAtZero:true,title:{display:true,text:c[3]},ticks:{color:getCSS('--t2')},grid:{color:getCSS('--bs')}},
            y:{ticks:{color:getCSS('--t2'),font:{size:12}},grid:{display:false}}
          }
        }
      });
    });
  };
  var originalRender=render;
  function bindOverview(){var sel=document.getElementById('overviewYear');if(sel)sel.addEventListener('change',function(){selectedYear=sel.value;document.getElementById('p-glance').innerHTML=buildGlance();bindOverview();});}
  render=function(){var oldYear=document.getElementById('lobYr');var keepYear=oldYear?oldYear.value:'2025';originalRender();if(keepYear==='2024'){document.getElementById('lobYr').value=keepYear;renderLOB();}bindOverview();};
  // Native labels expose all figures to keyboard, touch, print and screen readers.
  animateCountUps=function(){};
  var navFoot=document.createElement('div');navFoot.className='nav-footer';navFoot.innerHTML='<strong>Puerto Rico</strong>Insurance market intelligence<br><a href="https://www.ocs.pr.gov/regulados/informes-anuales" target="_blank" rel="noopener noreferrer">OCS source documents ↗</a>';document.querySelector('.navwrap').appendChild(navFoot);
  document.getElementById('nav').setAttribute('aria-label','Observatory sections');
  // Resolve existing anchors on first load, including direct source/validation links.
  render();a11yPass();attachSources();
  var review=document.createElement('article');review.className='c';review.innerHTML='<h3>Independent OCS recheck · September 14, 2026</h3><p>18 annual statements and 3 Planillas were read again. 127 insurer fields and 9 market aggregates matched the cited source pages. A separate primary-source recheck matched 62 targeted CMS, HRSA and SEC figures. The records identify the exact fields checked and their limitations.</p><p class="obs-note">Calculation corrections: include financially active zero-premium lines in statutory totals; use the same eight Health filers in both parts of medical and administrative ratios; calculate share changes before rounding; distinguish paid-claims ratios from regulatory MLR.</p><p class="obs-note">Firecrawl and Apify both confirmed the three cited Planilla documents on OCS’s index. The annual-statement index did not expose its PDF links through either capture. The 18 individual statement PDFs were downloaded and checked directly.</p><p class="obs-source"><a href="validation/independent_ocs_recheck.json" target="_blank" rel="noopener noreferrer">OCS recheck and source references ↗</a> · <a href="validation/federal_recheck.json" target="_blank" rel="noopener noreferrer">Federal recheck and source references ↗</a></p>';document.getElementById('p-val').prepend(review);
  if(location.hash){var section=location.hash.slice(1);if(SEC_OF[section])go(section);}
  var originalGo=go;go=function(id){originalGo(id);try{history.replaceState(null,'','#'+id);}catch(e){}document.querySelectorAll('#nav button').forEach(function(b){b.setAttribute('aria-current',b.classList.contains('on')?'page':'false');});};
})();
