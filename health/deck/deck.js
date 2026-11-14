/* Dweller Health deck renderer. Draws window.DECK into a container as 1600×900 slides scaled to fit.
   renderDeck(container, {imgBase:"img/", hash:true}) → {go(n), count} */
(function(){
"use strict";
var KIND={Fact:"Fact",Estimate:"Estimate",Forecast:"Forecast",Quote:"Quote",Pending:"To verify"};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fmtDate(iso){var m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],p=iso.split("-");return m[+p[1]-1]+" "+(+p[2])+", "+p[0]}
function pill(k){return '<span class="dk-pill dk-'+esc(k)+'">'+esc(KIND[k]||k)+'</span>'}
function bullets(b){return b&&b.length?'<ul class="dk-bul">'+b.map(function(x){return '<li>'+pill(x.k)+'<span>'+esc(x.t)+'</span></li>'}).join("")+'</ul>':""}
function big(b){return b?'<div class="dk-big"><div class="dk-bigv">'+esc(b.v)+'</div><div class="dk-bigl">'+esc(b.label)+'</div>'+pill(b.k)+'</div>':""}
function img(v,base){return v?'<div class="dk-art"><img src="'+base+v+'.webp" alt=""></div>':""}
function quote(q){return q?'<blockquote class="dk-q"><p>“'+esc(q.t)+'”</p><cite>'+esc(q.who)+'</cite></blockquote>':""}
function head(s){return '<div class="dk-kick">'+esc(s.kicker)+'</div><h2 class="dk-h">'+esc(s.headline)+'</h2>'+(s.sub?'<p class="dk-sub">'+esc(s.sub)+'</p>':"")}
function body(s,base){
  switch(s.layout){
  case "cover": return '<div class="dk-cover">'+img(s.visual,base)+'<div class="dk-covertext"><div class="dk-brand">Dweller <b>Health</b></div>'+head(s)+'<p class="dk-based">'+esc(DECK.basedOn)+'</p></div></div>';
  case "stats": return '<div class="dk-row">'+'<div class="dk-col">'+head(s)+'<div class="dk-stats">'+s.stats.map(function(x){return '<div class="dk-stat"><div class="dk-statv">'+esc(x.v)+'</div><div class="dk-bigl">'+esc(x.label)+'</div>'+pill(x.k)+'</div>'}).join("")+'</div></div>'+(s.visual?'<div class="dk-col dk-narrow">'+img(s.visual,base)+'</div>':"")+'</div>';
  case "compare": return head(s)+'<div class="dk-compare">'+s.compare.map(function(x,i){return '<div class="dk-card'+(i?' dk-hi':'')+'"><div class="dk-statv">'+esc(x.v)+'</div><div class="dk-bigl">'+esc(x.label)+'</div>'+pill(x.k)+'</div>'}).join('<div class="dk-vs">vs.</div>')+'</div>';
  case "table": return head(s)+'<div class="dk-row dk-top">'+'<div class="dk-col dk-narrow">'+big(s.big)+quote(s.quote)+'</div><div class="dk-col"><table class="dk-tbl"><thead><tr>'+s.table.head.map(function(h){return '<th>'+esc(h)+'</th>'}).join("")+'</tr></thead><tbody>'+s.table.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+esc(c)+'</td>'}).join("")+'</tr>'}).join("")+'</tbody></table><div class="dk-note">'+pill(s.table.k)+' '+esc(s.table.note)+'</div></div></div>';
  case "timeline": return head(s)+'<ol class="dk-tl">'+s.timeline.map(function(x){return '<li><div class="dk-tld">'+esc(x.d)+'</div><div class="dk-tlt">'+esc(x.t)+'</div></li>'}).join("")+'</ol>';
  case "sources": return head(s)+'<ul class="dk-src">'+s.list.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul>';
  case "action": return '<div class="dk-row"><div class="dk-col">'+head(s)+big(s.big)+bullets(s.bullets)+'</div>'+(s.visual?'<div class="dk-col dk-narrow">'+img(s.visual,base)+'</div>':"")+'</div>';
  default: // split, bignum
    var left=head(s)+big(s.big)+bullets(s.bullets)+quote(s.quote);
    return s.visual?'<div class="dk-row"><div class="dk-col">'+left+'</div><div class="dk-col dk-narrow">'+img(s.visual,base)+'</div></div>':'<div class="dk-solo">'+left+'</div>';
  }
}
window.renderDeck=function(host,opt){
  opt=opt||{};var base=opt.imgBase||"img/",S=DECK.slides,n=S.length,cur=0;
  host.classList.add("dk-host");
  host.innerHTML='<div class="dk-frame" tabindex="0" role="region" aria-roledescription="slide show" aria-label="'+esc(DECK.title)+'"><div class="dk-stage"></div></div>';
  var frame=host.querySelector(".dk-frame"),stage=host.querySelector(".dk-stage");
  stage.innerHTML=S.map(function(s,i){
    return '<section class="dk-slide dk-L-'+s.layout+'" id="dk-'+s.id+'" aria-label="Slide '+(i+1)+' of '+n+'"><div class="dk-in">'+body(s,base)+'</div>'+
      '<div class="dk-foot">'+(s.response?'<div class="dk-resp">Insurers’ response: being sourced</div>':'')+(s.source?'<div class="dk-source">Source: '+esc(s.source)+'</div>':'')+
      '<div class="dk-bar"><span>Dweller Health · '+esc(DECK.title)+'</span>'+(s.orig?'<span class="dk-orig">Original slide title: “'+esc(s.orig)+'” (T. States, 2024)</span>':'<span></span>')+'<span>Updated '+fmtDate(s.updated||DECK.updated)+' · '+(i+1)+'/'+n+'</span></div></div></section>'}).join("");
  var slides=[].slice.call(stage.children);
  function fit(){var w=frame.clientWidth;stage.style.transform="scale("+(w/1600)+")"}
  function go(i){cur=(i+n)%n;slides.forEach(function(s,j){s.classList.toggle("dk-on",j===cur)});if(opt.hash)history.replaceState(null,"","#slide-"+(cur+1));if(opt.onchange)opt.onchange(cur,n)}
  frame.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" "){go(cur+1);e.preventDefault()}if(e.key==="ArrowLeft"||e.key==="PageUp"){go(cur-1);e.preventDefault()}if(e.key==="Home"){go(0)}if(e.key==="End"){go(n-1)}});
  window.addEventListener("resize",fit);
  if(window.ResizeObserver)new ResizeObserver(fit).observe(frame);
  fit();
  var start=0;if(opt.hash){var m=location.hash.match(/slide-(\d+)/);if(m)start=Math.min(n,Math.max(1,+m[1]))-1}
  go(start);
  return {go:go,next:function(){go(cur+1)},prev:function(){go(cur-1)},count:n,get index(){return cur},slides:S};
};
})();
