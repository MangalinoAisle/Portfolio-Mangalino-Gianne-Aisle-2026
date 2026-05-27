import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Gianne Aisle Mangalino | Front-End Developer & UI/UX Designer');
    this.metaService.updateTag({ name: 'description', content: 'Portfolio of Gianne Aisle Mangalino, an IT student specializing in Front-End Development, Angular, and UX/UI Design.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Gianne Mangalino, Front-End Developer, UI/UX Designer, Web Developer Philippines' });
  }

  techStack = [
    'Angular', 'TypeScript', 'JavaScript',
    'HTML5', 'CSS3', 'Figma', 'Git/GitHub', 'Tailwind CSS'
  ];

  processSteps = [
    {
      icon: 'fas fa-search',
      title: 'Discover',
      desc: 'Research users, understand goals, and define the problem worth solving.'
    },
    {
      icon: 'fab fa-figma',
      title: 'Design',
      desc: 'Wireframe, prototype, and refine high-fidelity UI in Figma.'
    },
    {
      icon: 'fas fa-code',
      title: 'Build',
      desc: 'Translate designs into clean, responsive Angular code.'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Launch',
      desc: 'Test, optimise, and ship a polished, performant product.'
    }
  ];

  // UPDATED: Now featuring your 3 actual projects!
  // UPDATED: Now featuring live links!
  featuredProjects = [
  {
    title: 'Traventure',
    tech: 'React · Vite · Tailwind CSS',
    description: 'A modern travel-oriented web application designed to provide a seamless and engaging travel planning experience for users with a focus on intuitive UI/UX.',
    link: 'https://traventure-jet.vercel.app/',
    image: 'assets/t1.png'
  },
  {
    title: 'PickleHub',
    tech: 'HTML5 · CSS3 · JavaScript',
    description: 'A comprehensive platform for a premium pickleball destination, featuring real-time booking, equipment rental, and an integrated staff administrative dashboard.',
    link: 'https://pickle-hub-snowy.vercel.app/',
    image: 'assets/picklehub-1.png'
  },
  {
    title: 'Little Oven',
    tech: 'HTML5 · CSS3 · JavaScript',
    description: 'A charming web interface for a bakery, focusing on presenting baked goods with an inviting, warm aesthetic and smooth user navigation.',
    link: 'https://little-oven-cab1.vercel.app/',
    image: 'assets/little-oven-1.png'
  }
];
  testimonials = [
    {
      quote: "Gianne's attention to detail in UI design is exceptional. She consistently delivers interfaces that are both beautiful and functional.",
      author: "Web Development Instructor",
      role: "Holy Angel University"
    },
    {
      quote: "A highly motivated developer who understands the balance between clean code and user-first design principles.",
      author: "Project Lead",
      role: "Digital Transformation Team"
    }
  ];

  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  // ── Scroll Reveal ─────────────────────────────────────────────
  private initScrollReveal() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      this.observer.observe(el);
    });
  }

  // ── 3D Tilt on Project Cards ──────────────────────────────────
  onTilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.transition = 'transform 0.1s ease';
  }

  onTiltReset(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }
}