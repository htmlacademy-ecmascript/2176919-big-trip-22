(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",d="quarter",c="year",u="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},y={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",$={};$[_]=m;var b="$isDayjsObject",g=function(t){return t instanceof S||!(!t||!t[b])},w=function t(e,n,i){var s;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();$[r]&&(s=r),n&&($[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;$[o]=e,s=o}return!i&&s&&(_=s),s||!i&&_},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},D=y;D.l=w,D.i=g,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function m(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[b]=!0}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(h);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return D},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return M(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<M(t)},v.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,d=!!D.u(e)||e,f=D.p(t),h=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return d?i:i.endOf(a)},p=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,y=this.$D,_="set"+(this.$u?"UTC":"");switch(f){case c:return d?h(1,0):h(31,11);case l:return d?h(1,v):h(0,v+1);case o:var $=this.$locale().weekStart||0,b=(m<$?m+7:m)-$;return h(d?y-b:y+(6-b),v);case a:case u:return p(_+"Hours",0);case r:return p(_+"Minutes",1);case s:return p(_+"Seconds",2);case i:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var o,d=D.p(t),f="set"+(this.$u?"UTC":""),h=(o={},o[a]=f+"Date",o[u]=f+"Date",o[l]=f+"Month",o[c]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[d],p=d===a?this.$D+(e-this.$W):e;if(d===l||d===c){var m=this.clone().set(u,1);m.$d[h](p),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[D.p(t)]()},v.add=function(n,d){var u,f=this;n=Number(n);var h=D.p(d),p=function(t){var e=M(f);return D.w(e.date(e.date()+Math.round(t*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===c)return this.set(c,this.$y+n);if(h===a)return p(1);if(h===o)return p(7);var m=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[h]||1,v=this.$d.getTime()+n*m;return D.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,d=n.months,c=n.meridiem,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},h=function(t){return D.s(r%12||12,t,"0")},m=c||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(p,(function(t,i){return i||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return D.s(e.$y,4,"0");case"M":return o+1;case"MM":return D.s(o+1,2,"0");case"MMM":return u(n.monthsShort,o,d,3);case"MMMM":return u(d,o);case"D":return e.$D;case"DD":return D.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return u(n.weekdaysMin,e.$W,l,2);case"ddd":return u(n.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(r);case"HH":return D.s(r,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return m(r,a,!0);case"A":return m(r,a,!1);case"m":return String(a);case"mm":return D.s(a,2,"0");case"s":return String(e.$s);case"ss":return D.s(e.$s,2,"0");case"SSS":return D.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,u,f){var h,p=this,m=D.p(u),v=M(n),y=(v.utcOffset()-this.utcOffset())*t,_=this-v,$=function(){return D.m(p,v)};switch(m){case c:h=$()/12;break;case l:h=$();break;case d:h=$()/3;break;case o:h=(_-y)/6048e5;break;case a:h=(_-y)/864e5;break;case r:h=_/e;break;case s:h=_/t;break;case i:h=_/1e3;break;default:h=_}return f?h:D.a(h)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return $[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=w(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return D.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),O=S.prototype;return M.prototype=O,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",c],["$D",u]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,S,M),t.$i=!0),M},M.locale=w,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=$[_],M.Ls=$,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2628e6,d=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:o,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},u=function(t){return t instanceof _},f=function(t,e,n){return new _(t,n,e.$l)},h=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},y=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function p(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*c[h(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[h(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(d);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/o),t%=o,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/i),t%=i,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=y(this.$d.years,"Y"),e=y(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=y(n,"D"),s=y(this.$d.hours,"H"),r=y(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var o=y(a,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||o.negative,d=s.format||r.format||o.format?"T":"",c=(l?"-":"")+"P"+t.format+e.format+i.format+d+s.format+r.format+o.format;return"P"===c||"-P"===c?"P0D":c},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(i[t])}))},v.as=function(t){return this.$ms/c[h(t)]},v.get=function(t){var e=this.$ms,n=h(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/c[n]):this.$d[n],e||0},v.add=function(t,e,n){var i;return i=e?t*c[h(e)]:u(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return f(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.valueOf=function(){return this.asMilliseconds()},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}(),$=function(t,e,n){return t.add(e.years()*n,"y").add(e.months()*n,"M").add(e.days()*n,"d").add(e.hours()*n,"h").add(e.minutes()*n,"m").add(e.seconds()*n,"s").add(e.milliseconds()*n,"ms")};return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return f(t,{$l:n},e)},s.isDuration=u;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(t,e){return u(t)?$(this,t,1):r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return u(t)?$(this,t,-1):a.bind(this)(t,e)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}var i=n(484),s=n.n(i),r=n(646),a=n.n(r);s().extend(a());const o=(t=0,e=50)=>{const n=Math.ceil(Math.min(t,e)),i=Math.floor(Math.max(t,e)),s=Math.random()*(i-n+1)+n;return Math.floor(s)},l=t=>t[o(0,t.length-1)],d=(t,e)=>t?s()(t).format(e):"",c=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],u=["Amsterdam","Chamonix","Geneva"],f=["Located on the ocean with white sandy beaches and crystal clear water","Ancient castle with towers and a moat around it","Mountain resort with beautiful views and skiing opportunities","Huge park with diverse flora and fauna","Historic city center with many landmarks"],h="https://loremflickr.com/248/152?random=",p=["Add luggage","Switch to comfort class","Add meal","Choose seats","Travel by train","Order Uber"],m="HH:mm",v="DD/MM/YY HH:mm",y={"Add luggage":"luggage","Switch to comfort class":"comfort","Add meal":"meal","Choose seats":"seats","Travel by train":"train","Order Uber":"uber"};class _{constructor({waypoint:t,offers:e,destination:n,offersType:i,destinationAll:s}){this.waypoint=t,this.offers=e,this.description=n,this.offersType=i,this.destinationAll=s}getTemplate(){return function(t,e,n,i,s){const r=e.map((t=>t.id)),{type:a,dateFrom:o,dateTo:l,basePrice:u,id:f}=t,{name:h,description:p,photos:m}=n;return`<form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-${f}">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${a}.png" alt="Event ${a} icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${f}" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n            ${c.map((t=>`<div class="event__type-item">\n              <input id="event-type-${t}-${f}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n              <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${f}">${t}</label>\n            </div>`)).join("")}\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-${f}">\n          ${a}\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-${f}" type="text" name="event-destination" value="${h}" list="destination-list-${f}">\n        <datalist id="destination-list-${f}">\n        ${s.map((({name:t})=>`<option value="${t}"></option>`)).join("")}\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-${f}">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-${f}" type="text" name="event-start-time" value="${d(o,v)}">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-${f}">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-${f}" type="text" name="event-end-time" value="${d(l,v)}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-${f}">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-${f}" type="text" name="event-price" value="${u}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n    <section class="event__details">\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n        ${i.offers.map((({title:t,id:e,price:n})=>`<div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${y[t]}-${e}" type="checkbox" name="event-offer-${y[t]}" ${r.includes(e)?"checked":""}>\n            <label class="event__offer-label" for="event-offer-${y[t]}-${e}">\n              <span class="event__offer-title">${t}</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">${n}</span>\n            </label>\n          </div>`)).join("")}\n\n        </div>\n      </section>\n\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${p}</p>\n        <div class="event__photos-container">\n          <div class="event__photos-tape">\n          ${m.map((({description:t,src:e})=>`<img class="event__photo" src="${e}" alt="${t}">`)).join("")}\n          </div>\n        </div>\n      </section>\n    </section>\n  </form>`}(this.waypoint,this.offers,this.description,this.offersType,this.destinationAll)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class ${getTemplate(){return'<div class="trip-main__trip-controls  trip-controls">\n  <div class="trip-controls__filters">\n    <h2 class="visually-hidden">Filter events</h2>\n    <form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>\n  </div>\n</div>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class g{constructor({waypoint:t,offers:e,destination:n}){this.waypoint=t,this.offers=e,this.destination=n}getTemplate(){return function(t,e,n){const{basePrice:i,type:r,dateFrom:a,dateTo:o,favorite:l}=t,{name:c}=n;return`<div class="event">\n  <time class="event__date" datetime="${d(a,"YYYY-MM-DD")}">${d(a,"MMM D")}</time>\n  <div class="event__type">\n    <img class="event__type-icon" width="42" height="42" src="img/icons/${r}.png" alt="Event type icon">\n  </div>\n  <h3 class="event__title">${r} ${c}</h3>\n  <div class="event__schedule">\n    <p class="event__time">\n      <time class="event__start-time" datetime="2019-03-18T10:30">${d(a,m)}</time>\n      &mdash;\n      <time class="event__end-time" datetime="2019-03-18T11:00">${d(o,m)}</time>\n    </p>\n    <p class="event__duration">${((t,e)=>{const n=s().duration(s()(e).diff(s()(t)));return n.days()?n.format("DD[d] HH[h] mm[m]"):n.hours()?n.format("HH[h] mm[m]"):n.format("mm[m]")})(a,o)}</p>\n  </div>\n  <p class="event__price">\n    &euro;&nbsp;<span class="event__price-value">${i}</span>\n  </p>\n  <h4 class="visually-hidden">Offers:</h4>\n  <ul class="event__selected-offers">\n  ${e.map((({title:t,price:e})=>`<li class="event__offer" >\n      <span class="event__offer-title">${t}</span>\n      +€&nbsp;\n      <span class="event__offer-price">${e}</span>\n    </li> `)).join("")}\n  </ul>\n  <button class="event__favorite-btn ${l?"event__favorite-btn--active":""}" type="button">\n    <span class="visually-hidden">Add to favorite</span>\n    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n    </svg>\n  </button>\n  <button class="event__rollup-btn" type="button">\n    <span class="visually-hidden">Open event</span>\n  </button>\n</div>`}(this.waypoint,this.offers,this.destination)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const w={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let M;const D=new Uint8Array(16);function S(){if(!M&&(M="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!M))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return M(D)}const O=[];for(let t=0;t<256;++t)O.push((t+256).toString(16).slice(1));const T=function(t,e,n){if(w.randomUUID&&!e&&!t)return w.randomUUID();const i=(t=t||{}).random||(t.rng||S)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e){n=n||0;for(let t=0;t<16;++t)e[n+t]=i[t];return e}return function(t,e=0){return O[t[e+0]]+O[t[e+1]]+O[t[e+2]]+O[t[e+3]]+"-"+O[t[e+4]]+O[t[e+5]]+"-"+O[t[e+6]]+O[t[e+7]]+"-"+O[t[e+8]]+O[t[e+9]]+"-"+O[t[e+10]]+O[t[e+11]]+O[t[e+12]]+O[t[e+13]]+O[t[e+14]]+O[t[e+15]]}(i)},k=[{type:c[0],offers:[{title:p[2],price:o(50,200),id:"4177b75b-1c97-4544-a999-c541892f3f27"}]},{type:c[1],offers:[{title:p[4],price:o(50,200),id:"1fb1cfd4-aa23-4435-88b3-456328036fb3"},{title:p[5],price:o(50,200),id:"201a92e8-51cd-4e83-90c5-be0721473d1a"}]},{type:c[2],offers:[{title:p[3],price:o(50,200),id:"90696055-db8f-4757-b73f-556217b0024b"}]},{type:c[3],offers:[{title:p[0],price:o(50,200),id:"80f50628-d0a9-4f93-b074-dc93f2accd7a"},{title:p[1],price:o(50,200),id:"11f50ad8-6f5f-49b2-a49d-3e173228e5f0"},{title:p[5],price:o(50,200),id:"ce533be2-b9a0-4e58-b2ea-ae65c07b3ce3"}]},{type:c[4],offers:[{title:p[0],price:o(50,200),id:"3b7ff65d-ab07-488c-bac0-2b069355329d"},{title:p[3],price:o(50,200),id:"9d4e0d09-c883-4abc-a7fd-0bbec34884c3"}]},{type:c[5],offers:[{title:p[0],price:o(50,200),id:"2bc0e069-d88a-4441-8ffb-92abcd598310"},{title:p[2],price:o(50,200),id:"240c7b91-98a2-45c1-b389-a06e0fc2b4d7"},{title:p[3],price:o(50,200),id:"7702eafb-8ad9-4db7-ada9-a8d300ba9fdb"}]},{type:c[6],offers:[{title:p[0],price:o(50,200),id:"609a24b3-38e4-48f1-85d2-272c1ca97a49"},{title:p[2],price:o(50,200),id:"cec108dc-894d-4908-b9fa-f8f5ba892ca2"},{title:p[3],price:o(50,200),id:"bf8238b1-4d8f-4627-9b09-f0abdcc38832"}]},{type:c[7],offers:[{title:p[1],price:o(50,200),id:"4296ac31-d7bc-4b73-9ccf-21c24f2a6d01"}]},{type:c[8],offers:[{title:p[0],price:o(50,200),id:"195eae39-a4d5-4286-a89a-f33c3168c00d"},{title:p[1],price:o(50,200),id:"44cb5cc9-a412-4dbc-87da-036a16867a56"},{title:p[2],price:o(50,200),id:"db6e9c9f-b04e-435a-b5ac-62131e9e76b1"},{title:p[3],price:o(50,200),id:"1ce4e34c-1574-4d6c-8586-e45ffaa6bfd6"}]}],Y=[{id:T(),description:`${f[0]}. ${f[2]}`,name:u[0],photos:[]},{id:T(),description:`${f[1]}. ${f[3]}. ${f[2]}`,name:u[1],photos:[{src:`${h}${o(1,20)}`,description:`${f[1]}`},{src:`${h}${o(1,20)}`,description:`${f[3]}`},{src:`${h}${o(1,20)}`,description:`${f[2]}`}]},{id:T(),description:`${f[4]}. ${f[2]}. ${f[3]}. ${f[1]}`,name:u[2],photos:[{src:`${h}${o(1,20)}`,description:`${f[4]}`},{src:`${h}${o(1,20)}`,description:`${f[2]}`},{src:`${h}${o(1,20)}`,description:`${f[3]}`},{src:`${h}${o(1,20)}`,description:`${f[1]}`}]}],H=[{"date-from":"2023-12-15T06:57:04.116Z","date-to":"2023-12-15T17:50:04.116Z","is-favorite":!1},{"date-from":"2023-12-28T22:42:04.116Z","date-to":"2023-12-30T22:55:04.116Z","is-favorite":!0},{"date-from":"2023-12-15T06:57:04.116Z","date-to":"2023-12-15T17:50:04.116Z","is-favorite":!0}],x=()=>{const t=l(k),e=l(H),n=l(Y),{type:i,offers:s}=t,r=s.map((t=>t.id)).slice(0,o(0,s.length));return[{id:T(),basePrice:o(100,2e3),dateFrom:e["date-from"],dateTo:e["date-to"],destination:n.id,favorite:e["is-favorite"],offersId:r,type:i}]},A=document.querySelector(".trip-controls__filters"),C=document.querySelector(".trip-events"),I=new class{waypoints=Array.from({length:3},x);offers=k;destination=Y;getWaypoints(){return this.waypoints}getOffers(){return this.offers}getOffersByType(t){return this.getOffers().find((e=>e.type===t))}getOffersById(t,e){return this.getOffersByType(t).offers.filter((t=>e.find((e=>t.id===e))))}getDestinations(){return this.destination}getDestinationsById(t){return this.getDestinations().find((e=>e.id===t))}},E=new class{constructor({headerContainer:t,mainContainer:e,waypointModel:n}){this.headerContainer=t,this.mainContainer=e,this.waypointModel=n}init(){this.waypoints=[...this.waypointModel.getWaypoints()],e(new $,this.headerContainer),e(new b,this.mainContainer),e(new _({waypoint:this.waypoints[0][0],offersType:this.waypointModel.getOffersByType(this.waypoints[0][0].type),offers:[...this.waypointModel.getOffersById(this.waypoints[0][0].type,this.waypoints[0][0].offersId)],destination:this.waypointModel.getDestinationsById(this.waypoints[0][0].destination),destinationAll:this.waypointModel.getDestinations()}),this.mainContainer);for(let t=0;t<this.waypoints.length;t++)e(new g({waypoint:this.waypoints[t][0],offers:[...this.waypointModel.getOffersById(this.waypoints[t][0].type,this.waypoints[t][0].offersId)],destination:this.waypointModel.getDestinationsById(this.waypoints[t][0].destination)}),this.mainContainer)}}({headerContainer:A,mainContainer:C,waypointModel:I});E.init()})()})();
//# sourceMappingURL=bundle.ce0f7bb56d0fce3157f8.js.map