

document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.accordion-header');
  
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const currentlyActive = document.querySelector('.accordion-item.active');
  
        if (currentlyActive && currentlyActive !== item) {
          currentlyActive.classList.remove('active');
          currentlyActive.querySelector('.toggle-icon').textContent = '+';
        }
  
        const isActive = item.classList.toggle('active');
        header.querySelector('.toggle-icon').textContent = isActive ? '–' : '+';
      });
    });
  });
  
//   document.querySelectorAll('.nav_links a').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault();
  
//       const target = document.querySelector(this.getAttribute('href'));
  
//       if (target) {
//         window.scrollTo({
//           top: target.offsetTop,
//           behavior: 'smooth'
//         });
//       }
//     });
//   });




const container = document.querySelector('.industries_served_cards');
const leftArrow = document.querySelector('.slider_arrows img:first-child');
const rightArrow = document.querySelector('.slider_arrows img:last-child');
const dotsContainer = document.querySelector('.slider_dots');
const cards = document.querySelectorAll('.industries_served_cards .card');
let currentIndex = 0;


const totalDots = 4;
for (let i = 0; i < totalDots; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
}

// Update active dot
function updateDots() {
  const dots = document.querySelectorAll('.slider_dots .dot');
  const activeDotIndex = Math.floor(currentIndex / (cards.length / totalDots));
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[activeDotIndex]) {
    dots[activeDotIndex].classList.add('active');
  }
}

// Scroll left
leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    container.scrollBy({
      left: -270, // card width + gap
      behavior: 'smooth'
    });
    updateDots();
  }
});

// Scroll right
rightArrow.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    container.scrollBy({
      left: 270, // card width + gap
      behavior: 'smooth'
    });
    updateDots();
  }
});


const headlines = [
  `Say Hello to Tech Zink — <br><span class="thinks_ahead_txt">Smart Tech, Real Impact.</span>`,
  `Crafting Technology That <br><span class="thinks_ahead_txt">Thinks Ahead.</span>`,
  `From Complex Challenges <br><span class="thinks_ahead_txt">to Clear Solutions.</span>`
];

const subtexts = [
  `We partner with you to design and build scalable <br> digital systems that are thoughtful, robust, and ready <br> for the future.`,
  `A team of seasoned engineers and product minds, we <br> build smart, scalable digital systems - ready for <br> what’s next.`,
  `We bring structure, speed, and clarity to every <br> product we build — no matter the scale.`
];

const headingEl = document.querySelector(".crafting_technology_txt");
const subtextEl = document.getElementById("subtext");
const dots = document.querySelectorAll(".three_dots_banner .dot");

let index = 0;

function typeText(element, html, speed = 30, callback) {
  let i = 0;
  element.innerHTML = ""; // clear content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const fullHTML = tempDiv.innerHTML;

  function typeChar() {
    element.innerHTML = fullHTML.slice(0, i++) + "<span class='cursor'>|</span>";
    if (i <= fullHTML.length) {
      setTimeout(typeChar, speed); // slower speed here
    } else {
      element.innerHTML = fullHTML;
      if (callback) callback();
    }
  }

  typeChar();
}

function updateBanner() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  typeText(headingEl, headlines[index], 35, () => {
    typeText(subtextEl, subtexts[index], 35);
  });

  index = (index + 1) % headlines.length;
}

updateBanner();
setInterval(updateBanner, 15000); // increased interval to give more time for animation


const canvas = document.getElementById('stickCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particleCount = 70;
const maxDistance = 120;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Draw particles
  for (let i = 0; i < particleCount; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  // Draw lines
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const a = particles[i];
      const b = particles[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);

      if (dist < maxDistance) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / maxDistance)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});