import { Component, OnInit, OnDestroy, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {

  private observers: IntersectionObserver[] = [];
  private animFrameId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private trailX = 0;
  private trailY = 0;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Projects | Gianne Aisle Mangalino');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Explore the web development and UI/UX design projects created by Gianne Aisle Mangalino, including Rhode Skincare Clone, Scoop Ice Cream, and Soda Pop.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'Gianne Mangalino Projects, Web Development Portfolio, Angular Projects, UI/UX Design Portfolio' 
    });
    this.metaService.updateTag({ 
      name: 'author', 
      content: 'Gianne Aisle Mangalino' 
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initParticles();
    this.initCursorGlow();
    this.initScrollReveal();
    this.initCardTilt();
    this.animateCounters();
  }

  ngOnDestroy() {
    this.observers.forEach(o => o.disconnect());
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    // Clean up event listeners
    document.removeEventListener('mousemove', this._mouseMoveHandler);
  }

  // ===================== CURSOR GLOW =====================
  private _mouseMoveHandler = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    const glow = document.getElementById('cursorGlow');
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
  };

  initCursorGlow() {
    document.addEventListener('mousemove', this._mouseMoveHandler);
    this.animateTrail();
  }

  animateTrail() {
    const trail = document.getElementById('cursorTrail');
    const tick = () => {
      this.trailX += (this.mouseX - this.trailX) * 0.15;
      this.trailY += (this.mouseY - this.trailY) * 0.15;
      if (trail) {
        trail.style.left = this.trailX + 'px';
        trail.style.top = this.trailY + 'px';
      }
      this.animFrameId = requestAnimationFrame(tick);
    };
    tick();
  }

  // ===================== PARTICLES =====================
  initParticles() {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const NUM = 80;

    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,210,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,210,255,${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();
  }

  // ===================== SCROLL REVEAL =====================
  initScrollReveal() {
    const cards = document.querySelectorAll<HTMLElement>('.detailed-project-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          card.classList.add('visible');
          // Animate progress bars
          const bars = card.querySelectorAll<HTMLElement>('.progress-bar-fill');
          bars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '0';
            setTimeout(() => { bar.style.width = width + '%'; }, 300);
          });
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
      observer.observe(card);
    });

    this.observers.push(observer);
  }

  // ===================== 3D CARD TILT =====================
  initCardTilt() {
    const cards = document.querySelectorAll<HTMLElement>('.detailed-project-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        const maxTilt = 6;
        const rotateX = -dy * maxTilt;
        const rotateY = dx * maxTilt;

        card.classList.add('tilt-active');
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-active');
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
        setTimeout(() => {
          if (!card.classList.contains('tilt-active')) {
            card.style.transform = '';
          }
        }, 300);
      });
    });
  }

  // ===================== COUNTER ANIMATION =====================
  animateCounters() {
    const counters = document.querySelectorAll<HTMLElement>('.num[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.getAttribute('data-count') || '0', 10);
          let current = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 30));

          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current.toString();
            if (current >= target) clearInterval(timer);
          }, 30);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
    this.observers.push(observer);
  }
// ===================== UPDATED PROJECTS DATA =====================
projects = [
  {
    title: 'Traventure',
    purpose: 'A modern travel-oriented web application designed to provide a seamless and engaging travel planning experience for users.',
    features: 'Responsive design, intuitive UI/UX navigation, and optimized performance using React and Vite.',
    tools: ['React', 'Vite', 'Tailwind CSS'],
    metrics: [
      { label: 'Design', value: 94 },
      { label: 'Frontend', value: 93 },
      { label: 'UX Flow', value: 92 },
    ],
    images: ['assets/t1.png', 'assets/t2.png', 'assets/t3.png'], 
    demoLink: 'https://traventure-jet.vercel.app/',
    githubLink: 'https://github.com/MangalinoAisle/Traventure'
  },
    {
    title: 'PickleHub',
    purpose: 'A comprehensive web platform dedicated to a premium pickleball destination, allowing players to effortlessly reserve private courts, rent equipment, and book coaching sessions..',
    features: 'Responsive interface, modern UI/UX design, and a real-time live online booking calendar with automated time-conflict evaluation. It also includes an integrated staff administrative dashboard to monitor daily schedules, track gross revenue, and manage customer reservations.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'], // Adjust tools based on what you actually used
    metrics: [
      { label: 'Design', value: 94 },
      { label: 'Frontend', value: 92 },
      { label: 'UX Flow', value: 90 },
    ],
    // Make sure you upload 3 screenshots to your src/assets/ folder!
    images: ['assets/picklehub-1.png', 'assets/picklehub-2.png', 'assets/picklehub-3.png'], 
    demoLink: 'https://pickle-hub-snowy.vercel.app/',
    
    // Note: You provided a GitHub Pages link, but usually the GitHub button 
    // points to the source code repository. I've updated it to the repo link:
    githubLink: 'https://github.com/mangalinoaisle/PickleHub' 
  },
  {
    title: 'Pure Smile',
    purpose: 'A professional and clean landing page for dental or healthcare services, focusing on trust and clarity.',
    features: 'Sleek UI, clear call-to-action sections, and a mobile-responsive interface.',
    tools: ['HTML5', 'CSS3', 'JavaScript'],
    metrics: [
      { label: 'Design', value: 95 },
      { label: 'Frontend', value: 92 },
      { label: 'UX Flow', value: 91 },
    ],
    images: ['assets/puresmile-1.png', 'assets/puresmile2.png', 'assets/puresmile-3.png'], 
    demoLink: 'https://pure-smile-landing-page.netlify.app',
    githubLink: 'https://github.com/mangalinoaisle/Pure-Smile/'
  },
{
    title: 'Little Oven',
    purpose: 'A charming web interface for a bakery, focusing on presenting baked goods with an inviting and warm aesthetic.',
    features: 'Responsive layout, product gallery, and smooth navigation for a seamless user experience.',
    tools: ['HTML5', 'CSS3', 'JavaScript'],
    metrics: [
      { label: 'Design', value: 94 },
      { label: 'Frontend', value: 90 },
      { label: 'UX Flow', value: 89 },
    ],
    images: ['assets/little-oven-1.png', 'assets/little-oven-2.png', 'assets/little-oven-3.png'],
    demoLink: 'https://little-oven-cab1.vercel.app//',
    githubLink: 'https://github.com/MangalinoAisle/Little-Oven'
  },
    {
    title: 'Melody Motion Academy',
    purpose: 'An educational platform designed for a music and dance academy, emphasizing course discovery and student engagement.',
    features: 'Dynamic content sections, course listings, and a responsive design tailored for various devices.',
    tools: ['HTML5', 'CSS3', 'JavaScript'],
    metrics: [
      { label: 'Design', value: 92 },
      { label: 'Frontend', value: 93 },
      { label: 'UX Flow', value: 90 },
    ],
    images: ['assets/melody1.png', 'assets/melody2.png', 'assets/melody3.png'],
    demoLink: 'https://melody-motion-academy.vercel.app/',
    githubLink: 'https://github.com/mangalinoaisle/melody-motion-academy/'
  },
  /*
  {
    title: 'Rhode Skincare Clone',
    purpose: 'To demonstrate proficiency in translating high-end, minimalist e-commerce web designs into fully functional, responsive front-end interfaces.',
    features: 'Multi-page e-commerce flow, minimalist UI/UX mimicry, high-quality product showcase grid layouts, and seamless responsive design.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Design'],
    metrics: [
      { label: 'Fidelity', value: 98 },
      { label: 'Frontend', value: 95 },
      { label: 'Responsive', value: 92 },
    ],
    images: ['assets/r1.png', 'assets/r2.png', 'assets/r3.png'],
    demoLink: 'https://rhodedupelandingpage.netlify.app',
    githubLink: 'https://github.com/MangalinoAisle/Rhode-Dupe-Landing-Page'
  },
  */
  {
    title: 'Scoop Ice Cream',
    purpose: 'To design and build a vibrant, interactive e-commerce website for a handcrafted ice cream shop utilizing a highly engaging scrapbook aesthetic.',
    features: 'Fully functional vanilla JS shopping cart using sessionStorage, interactive 3D polaroid hover effects, custom CSS blob shapes, and dynamic category filtering.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    metrics: [
      { label: 'Design', value: 98 },
      { label: 'Frontend', value: 95 },
      { label: 'UX Flow', value: 92 },
    ],
    images: ['assets/scoop1.png', 'assets/scoop2.png', 'assets/scoop3.png'],
    demoLink: 'https://scoop-ice-cream.vercel.app/',
    githubLink: 'https://github.com/MangalinoAisle/scoop-ice-cream'
  },
  /*
  {
    title: 'Soda Pop',
    purpose: 'To design and develop a vibrant promotional e-commerce interface for a healthy, plant-based soda brand, emphasizing modern aesthetics and interactive user experiences.',
    features: 'Custom CSS animations (floating elements, organic shape blobs, infinite marquees), responsive Tailwind CSS grid layouts, dynamic Angular routing, and service-driven data fetching.',
    tools: ['Angular', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'UI/UX Design'],
    metrics: [
      { label: 'Design', value: 95 },
      { label: 'Frontend', value: 90 },
      { label: 'UX Flow', value: 88 },
    ],
    images: ['assets/sodapop-1.png', 'assets/sodapop-2.png', 'assets/sodapop-3.png'],
    demoLink: 'https://sodapopph.netlify.app',
    githubLink: 'https://github.com/MangalinoAisle/Soda-Pop'
  }
    */
];
}