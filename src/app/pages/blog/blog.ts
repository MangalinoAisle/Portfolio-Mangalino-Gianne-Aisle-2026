import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // <-- Added Title and Meta imports
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit, AfterViewInit, OnDestroy {
  allBlogs: any[] = [];
  filteredBlogs: any[] = [];
  featuredPost: any;
  activeFilter = 'all';

  private mouseMoveHandler!: (e: MouseEvent) => void;
  private animFrame!: number;
  private cursorX = 0;
  private cursorY = 0;
  private ringX = 0;
  private ringY = 0;

  // <-- Updated constructor to inject Title and Meta services
  constructor(
    private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    // <-- Added SEO Titles and Metadata
    this.titleService.setTitle('Blog | Gianne Aisle Mangalino');
    this.metaService.updateTag({ name: 'description', content: 'Read the latest thoughts, tutorials, and insights on Front-End Development and UI/UX Design by Gianne Aisle Mangalino.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Gianne Mangalino Blog, Web Development Blog, UI/UX Design Articles, Front-End Development Insights' });

    this.allBlogs = this.blogService.getBlogs();
    this.featuredPost = this.allBlogs[0];
    this.filteredBlogs = this.allBlogs.slice(1);
  }

  ngAfterViewInit() {
    this.initCursor();
    this.animateCounters();
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    cancelAnimationFrame(this.animFrame);
    const cursor = document.getElementById('blogCursor');
    const ring = document.getElementById('blogCursorRing');
    if (cursor) cursor.style.display = 'none';
    if (ring) ring.style.display = 'none';
  }

  // ── Custom Cursor ─────────────────────────────────────────────
  private initCursor() {
    const cursor = document.getElementById('blogCursor');
    const ring = document.getElementById('blogCursorRing');
    if (!cursor || !ring) return;

    cursor.style.display = 'block';
    ring.style.display = 'block';

    this.mouseMoveHandler = (e: MouseEvent) => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    };

    document.addEventListener('mousemove', this.mouseMoveHandler);

    // Smooth ring follow
    const animateRing = () => {
      this.ringX += (this.cursorX - this.ringX) * 0.14;
      this.ringY += (this.cursorY - this.ringY) * 0.14;
      ring.style.left = this.ringX + 'px';
      ring.style.top  = this.ringY + 'px';
      this.animFrame = requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover state on interactive elements
    const hoverEls = document.querySelectorAll(
      'a, button, .blog-card, .blog-card-featured, .filter-btn'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        ring.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        ring.classList.remove('hovering');
      });
    });
  }

  // ── Animated Counters ─────────────────────────────────────────
  private animateCounters() {
    const counters = document.querySelectorAll<HTMLElement>('.stat-number[data-count]');
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-count') || '0');
      const duration = 1400;
      const start = performance.now();
      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target).toString();
        if (progress < 1) requestAnimationFrame(update);
      };
      // Start after a short delay
      setTimeout(() => requestAnimationFrame(update), 700);
    });
  }

  // ── Card spotlight follow ─────────────────────────────────────
  onCardMouseMove(event: MouseEvent) {
    const card = (event.currentTarget as HTMLElement);
    const spotlight = card.querySelector<HTMLElement>('.card-spotlight');
    if (!spotlight) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    spotlight.style.left = x + 'px';
    spotlight.style.top  = y + 'px';
  }

  onCardMouseLeave(event: MouseEvent) {
    const card = (event.currentTarget as HTMLElement);
    const spotlight = card.querySelector<HTMLElement>('.card-spotlight');
    if (spotlight) spotlight.style.opacity = '0';
  }

  // ── Filter ────────────────────────────────────────────────────
  setFilter(category: string) {
    this.activeFilter = category;
    const rest = this.allBlogs.slice(1);
    this.filteredBlogs = category === 'all'
      ? rest
      : rest.filter(p => p.category === category);
  }
}