let overlay = document.querySelector('.overlay');

overlay.addEventListener('click', () => {
    overlay.classList.remove('overlay');
});


$(window).scroll(function() {
    if ($(this).scrollTop() > 1200) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

const canvasEl = document.querySelector('#canvas');

const w = canvasEl.width = window.innerWidth;
const h = canvasEl.height = window.innerHeight * 2;

function loop() {
  requestAnimationFrame(loop);
	ctx.clearRect(0,0,w,h);
  
  confs.forEach((conf) => {
    conf.update();
    conf.draw();
  })
}

function Confetti () {
  //construct confetti
  const colours = ['#fde132', '#009bde', '#ff6b00', '#ffffff'];
  
  this.x = Math.round(Math.random(10) * w);
  this.y = Math.round(Math.random(10) * h)-(h/2);
  this.rotation = Math.random(10)*360;

  const size = Math.random(10)*(w/60);
  this.size = size < 15 ? 15 : size;

  this.color = colours[Math.round(Math.random(colours.length)*10-1)]

  this.speed = this.size/2;
  
  this.opacity = Math.random(10);

  this.shiftDirection = Math.random(10) > 0.5 ? 1 : -1;
}

Confetti.prototype.border = function() {
  if (this.y >= h) {
    this.y = h;
  }
}

Confetti.prototype.update = function() {
  this.y += this.speed;
  
  if (this.y <= h) {
    this.x += this.shiftDirection/5;
    this.rotation += this.shiftDirection*this.speed/100;
  }

  this.border();
};

Confetti.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
  ctx.lineTo(this.x, this.y);
  ctx.closePath();
  ctx.globalAlpha = this.opacity;
  ctx.fillStyle = this.color;
  ctx.fill();
};

const ctx = canvasEl.getContext('2d');
const confNum = Math.floor(w / 5);
const confs = new Array(confNum).fill().map(_ => new Confetti());

loop();
