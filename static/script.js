// ---------------------
// Utilities and init
// ---------------------

// Unavailable action handler
function unavailable(){
  alert('Información no disponible por el momento.');
}

// Update CDMX time every second (client-side)
function updateCDMX(){
  const el = document.getElementById('cdmx-time');
  if(!el) return;
  try {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City' });
  } catch(e) {
    el.textContent = new Date().toUTCString();
  }
}

// Countdown until next Jan 1st (client)
function updateCountdown(){
  const el = document.getElementById('time-left');
  if(!el) return;
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const target = new Date(nextYear, 0, 1, 0, 0, 0); // local midnight Jan 1 next year
  let diff = target - now;
  if(diff <= 0){ el.textContent = '¡Feliz Año Nuevo!'; return; }
  const days = Math.floor(diff / (1000*60*60*24)); diff -= days*(1000*60*60*24);
  const hours = Math.floor(diff / (1000*60*60)); diff -= hours*(1000*60*60);
  const minutes = Math.floor(diff / (1000*60)); diff -= minutes*(1000*60);
  const seconds = Math.floor(diff / 1000);
  el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Decorative lightweight particles (subtle)
(function particles(){
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-3';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const particles = [];
  const count = Math.max(24, Math.floor(w/48));
  function rand(a,b){return Math.random()*(b-a)+a}
  for(let i=0;i<count;i++){
    particles.push({x:Math.random()*w,y:Math.random()*h,vx:rand(-0.18,0.18),vy:rand(-0.25,0.25),r:rand(0.6,2.2)});
  }
  window.addEventListener('resize', ()=>{w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight});
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -20) p.x = w+20;
      if(p.x > w+20) p.x = -20;
      if(p.y < -20) p.y = h+20;
      if(p.y > h+20) p.y = -20;
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      g.addColorStop(0,'rgba(0,230,255,0.04)');
      g.addColorStop(0.6,'rgba(255,59,122,0.01)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Init timers
updateCDMX();
updateCountdown();
setInterval(updateCDMX, 1000);
setInterval(updateCountdown, 1000);

// Prevent mobile double-tap zoom issues
let lastTouch = 0;
document.addEventListener('touchend', function(e){
  const now = Date.now();
  if(now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });
