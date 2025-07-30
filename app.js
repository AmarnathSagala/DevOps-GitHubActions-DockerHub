/* DevOps + Agentic AI Workshop JS - FULLY FIXED VERSION */

// ======= WAIT FOR DOM TO BE READY =======
document.addEventListener('DOMContentLoaded', function() {
  
  // ======= NAVBAR & HAMBURGER - FIXED =======
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("open");
      }
    });
  }

  // ======= SMOOTH SCROLL FOR NAVIGATION - COMPLETELY FIXED =======
  function setupSmoothScroll() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const heroButtons = document.querySelectorAll('.hero-cta a[href^="#"]');
    
    // Combine all internal links
    const allInternalLinks = [...navLinks, ...heroButtons];
    
    allInternalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" 
        if (href === '#' || href.length <= 1) {
          return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          // Close mobile menu if open
          if (navMenu) {
            navMenu.classList.remove("open");
          }
          
          // Calculate proper offset
          const navbar = document.querySelector('.navbar');
          const navHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = targetElement.offsetTop - navHeight;
          
          // Smooth scroll with fallback
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          } else {
            // Fallback for older browsers
            window.scrollTo(0, targetPosition);
          }
        }
      });
    });
  }
  
  setupSmoothScroll();

  // ======= EXTERNAL LINKS - FIXED =======
  function setupExternalLinks() {
    // Registration form links
    const registrationLinks = [
      'https://docs.google.com/forms/d/e/1FAIpQLSfnOBgnom2rzoLJ3kkVcmZ0Ck6C_HdP5Djob8Ovae7eUg8CvA/alreadyresponded',
      'https://chat.whatsapp.com/LlreibRYa8B2PuhQXkXUCJ?mode=ac_c',
      'https://www.google.com/maps/place/Centre+for+Cultural+Resources+and+Training/@17.4585971,78.3710966,2156m/data=!3m1!1e3!4m6!3m5!1s0x3bcb93d05cae589f:0x718df731fce6e6bd!8m2!3d17.4577991!4d78.3745038!16s%2Fg%2F1tfzkszd?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D'
    ];
    
    // Handle all external links
    document.querySelectorAll('a[href^="http"], a[href^="https://"], a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
        const href = this.getAttribute('href');
        
        if (href.startsWith('tel:')) {
          // Phone links
          window.location.href = href;
          return;
        }
        
        // External links - force open in new tab
        if (href.startsWith('http')) {
          e.preventDefault();
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }
  
  setupExternalLinks();

  // ======= ANIMATE ON SCROLL =======
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
          setTimeout(() => {
            el.classList.add("animate");
          }, delay);
          revealObserver.unobserve(el);
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-animation]").forEach((el) => {
      revealObserver.observe(el);
    });
  }
  
  setupScrollAnimations();

  // ======= STAT COUNTERS =======
  function setupCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number[data-target]");
          if (counters.length > 0) {
            animateCounters(counters);
          }
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector(".hero-stats");
    if (heroStats) {
      counterObserver.observe(heroStats);
    }
  }
  
  setupCounters();

  // ======= INITIALIZE VISUAL EFFECTS =======
  initParticleSystem();
  initCodeRain();
  setupScrollEffects();
  setupInteractiveEffects();
  
  // ======= MARK AS LOADED =======
  setTimeout(() => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      }, index * 150);
    });
  }, 300);

});

// ======= COUNTER ANIMATION FUNCTION =======
function animateCounters(counters) {
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target, 10);
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      }
    };
    updateCounter();
  });
}

// ======= PARTICLES BACKGROUND =======
function initParticleSystem() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;';
  
  const ctx = canvas.getContext("2d");
  particlesContainer.appendChild(canvas);

  const particles = [];
  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 80);

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Draw particle
      ctx.fillStyle = 'rgba(50, 184, 198, 0.4)';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();

  // Handle resize
  const resizeHandler = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeHandler);

  return { canvas, container: particlesContainer };
}

// ======= CODE RAIN EFFECT =======
function initCodeRain() {
  const container = document.getElementById("code-rain");
  if (!container) return;

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;';
  
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  
  const chars = "01DEVOPSAI🚀⚡🔄🐳☁️🤖";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "rgba(50, 184, 198, 0.3)";
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    
    requestAnimationFrame(drawMatrix);
  }
  
  drawMatrix();

  const resizeHandler = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = Math.floor(canvas.width / fontSize);
    drops.length = newColumns;
    drops.fill(1);
  };
  window.addEventListener("resize", resizeHandler);

  return { canvas, container };
}

// ======= NAVBAR SCROLL EFFECTS =======
function setupScrollEffects() {
  let ticking = false;
  
  const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (navbar) {
      if (scrollY > 50) {
        navbar.style.background = 'rgba(38, 40, 40, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      } else {
        navbar.style.background = 'var(--color-surface)';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'var(--shadow-xs)';
      }
    }
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
}

// ======= INTERACTIVE EFFECTS =======
function setupInteractiveEffects() {
  // Tech card hover effects
  const techCards = document.querySelectorAll('.tech-card');
  techCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.05)';
      this.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ======= UTILITY: THROTTLE FUNCTION =======
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}