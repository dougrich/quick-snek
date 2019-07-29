!function(t,e){function s(i){return t[i]||function(i){var n={},r={exports:n};return e[i].call(n,window,s,r,n),t[i]=r.exports}(i)}var i=s(0);i.__esModule&&i.default}([],[function(t,e,s,i){"use strict";const{Engine:n,SIZE:r,DIRECTION:o}=e(1),{Renderer:h}=e(2);window.onload=()=>{const t=document.createElement("canvas"),e=new n,s=new h(e,t);document.body.appendChild(t),document.body.onkeydown=t=>{o.LIST.includes(t.keyCode)?e.setDirection(t.keyCode):13===t.keyCode&&e.lost?e.reset():console.log(t.keyCode)},setTimeout(function(){requestAnimationFrame(s.render),setInterval(()=>{e.lost||e.tick()},100)})}},function(t,e,s,i){"use strict";const n=32;i.SIZE=n;const r={LEFT:37,RIGHT:39,UP:38,DOWN:40,LIST:[39,37,38,40]};i.DIRECTION=r;i.Engine=class{constructor(){this.reset()}reset(){this.state=new Array(n*n).fill(0),this.size=n,this.direction=r.RIGHT,this.length=2,this.lost=!1,this.head={x:0,y:0},this.set(0,0,this.length),this.tick=this.tick.bind(this),this.reward=this.populate()}get(t,e){return this.state[e*n+t]}set(t,e,s){this.state[e*n+t]=s}populate(){const t=Math.floor(Math.random()*n),e=Math.floor(Math.random()*n);return this.get(t,e)>0&&this.populate(),{x:t,y:e}}setDirection(t){this.direction=t}tick(){for(let t=0;t<this.state.length;t++)this.state[t]>0&&(this.state[t]=this.state[t]-1);const{x:t,y:e}=this.head,s={[r.LEFT]:()=>({x:t-1,y:e}),[r.RIGHT]:()=>({x:t+1,y:e}),[r.UP]:()=>({x:t,y:e-1}),[r.DOWN]:()=>({x:t,y:e+1})}[this.direction]();s.x<0||s.x>=n||s.y<0||s.y>=n||this.get(s.x,s.y)>0?this.lost=!0:(s.x===this.reward.x&&s.y===this.reward.y&&(this.length++,this.reward=this.populate()),this.head=s,this.set(s.x,s.y,this.length))}}},function(t,e,s,i){"use strict";const n=8;i.SCALE=n;i.Renderer=class{constructor(t,e){this.engine=t,this.render=this.render.bind(this),this.ctx=e.getContext("2d"),e.width=t.size*n,e.height=t.size*n}stop(){this.render=()=>{}}render(){const{engine:t,render:e,ctx:s}=this;s.clearRect(0,0,t.size*n,t.size*n),s.fillStyle="#D00";for(let e=0;e<t.size;e++)for(let i=0;i<t.size;i++)t.get(i,e)>0&&s.fillRect(i*n,e*n,n,n);const{x:i,y:r}=t.reward;s.fillStyle="#0D0",s.fillRect(i*n,r*n,n,n),requestAnimationFrame(e)}}}]);