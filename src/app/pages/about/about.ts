import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('certCarousel') certCarousel!: ElementRef;
  private observer!: IntersectionObserver;

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('About | Gianne Aisle Mangalino');
    
    this.metaService.updateTag({
      name: 'description',
      content: 'Learn more about Gianne Aisle Mangalino, an IT student at Holy Angel University specializing in Front-End Development, Angular, and UI/UX Design.'
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'About Gianne Mangalino, Front-End Developer, UI/UX Designer, IT Student, Web Development, Holy Angel University' 
    });
    this.metaService.updateTag({ 
      name: 'author', 
      content: 'Gianne Aisle Mangalino' 
    });
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => this.observer.observe(el));
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  // --- 3D INTERACTIVE MOUSE TRACKING ---
  onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--tz', `30px`);
  }

  onMouseLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.setProperty('--rx', `0deg`);
    card.style.setProperty('--ry', `0deg`);
    card.style.setProperty('--tz', `0px`);
  }

  // --- CAROUSEL NAVIGATION ---
  scrollLeft() {
    if (this.certCarousel) {
      this.certCarousel.nativeElement.scrollBy({ left: -380, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.certCarousel) {
      this.certCarousel.nativeElement.scrollBy({ left: 380, behavior: 'smooth' });
    }
  }

  // --- DATA ---
  intro = {
    name: 'Gianne Aisle B. Mangalino',
    title: 'Front-End Developer & UX/UI Designer',
    location: 'Mabalacat City, Philippines',
    bio: `I am a highly motivated IT student at Holy Angel University, majoring in Web Development, with a specialized focus on Front-End Development and UX/UI Design. My passion lies in building responsive, user-first interfaces by bridging technical expertise in Angular and Figma with a proactive startup mindset. Beyond core development, I am deeply invested in deconstructing modern design systems to understand visual consistency and 'interaction hunting' to study the micro-animations that define great user experiences. Whether I am sketching wireframe hierarchies in a notebook or exploring open-source logic on GitHub, I am driven by the goal of supporting digital transformation through intentional and beautiful design.`
  };

  philosophy = `I believe that technology should be as beautiful as it is functional. My principle is grounded in "User-First Design."`;

  technicalSkills = [
    { name: 'HTML5 & CSS3',       level: '95%' },
    { name: 'JavaScript (ES6+)',   level: '85%' },
    { name: 'Angular',             level: '80%' },
    { name: 'Figma',               level: '90%' },
    { name: 'Git / GitHub',        level: '85%' }
  ];

  softSkills = [
    'Time-management', 'Works under pressure',
    'Patience', 'Teamwork', 'Attention to Detail', 'Problem Solving'
  ];


  certifications = [
    {
      title: 'HubSpot SEO II Certified',
      issuer: 'HubSpot',
      desc: 'Advanced SEO strategies, keyword research, and on-page optimization.',
      icon: 'fa-search',
      image: 'assets/HubSpot SEO II Certified .png',
      downloadLink: 'assets/Hubspot'
    },
    {
      title: 'Digital Advertising Certification',
      issuer: 'HubSpot',
      desc: 'Comprehensive training in digital advertising campaigns and strategy.',
      icon: 'fa-ad',
      image: 'assets/Digital Advertising Certification.png',
      downloadLink: 'assets/Digital Advertising Certification (FreeCodeCamp).pdf'
    },
    {
      title: 'Introduction to PHP',
      issuer: 'SimpliLearn',
      desc: 'Fundamental concepts of PHP programming for backend web development.',
      icon: 'fa-php',
      image: 'assets/Introduction to PHP.png',
      downloadLink: 'assets/Introduction to PHP.pdf'
    },
    {
      title: 'Intro to Graphic Design & Basics of UI/UX',
      issuer: 'SimpliLearn',
      desc: 'Core principles of graphic design, user interface layout, and user experience.',
      icon: 'fa-pen-nib',
      image: 'assets/Introduction to Graphic Design Basics of UI UX.png',
      downloadLink: 'assets/IntroductiontoGraphicDesignBasicsofUIUX.pdf'
    },
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      desc: 'Completed 300 hours of coursework in HTML5, CSS3, Flexbox, and Grid.',
      icon: 'fa-laptop-code',
      image: '',
      downloadLink: 'assets/Responsive Web Design.pdf'
    },
    {
      title: 'JavaScript Algorithms & Data Structures',
      issuer: 'freeCodeCamp',
      desc: 'Mastered ES6+, object-oriented programming, and complex algorithm scripting.',
      icon: 'fa-code-branch',
      image: '',
      downloadLink: 'assets/JavaScript Algorithms.pdf'
    }
  ];

  selectedImage: string | null = null;

  openLightbox(imageUrl: string) {
    this.selectedImage = imageUrl;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }
}