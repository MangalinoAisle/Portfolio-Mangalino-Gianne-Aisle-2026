import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetail implements OnInit, AfterViewInit, OnDestroy {
  blog: any;
  private scrollHandler!: () => void;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    // This grabs the ID from the URL (e.g., 'my-journey') when you click a card
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.blog = this.blogService.getBlogById(blogId);
      window.scrollTo(0, 0); // Scroll to top when opening a new blog
    }
  }

  ngAfterViewInit() {
    this.initReadingProgress();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
    const bar = document.getElementById('readingProgress');
    if (bar) bar.style.width = '0%';
  }

  // --- Immersive Reading Progress Bar ---
  private initReadingProgress() {
    const bar = document.getElementById('readingProgress');
    if (!bar) return;

    this.scrollHandler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = scrollPct + '%';
    };

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  // --- Formatting Helpers ---
  getIntro(): string {
    if (!this.blog?.content) return '';
    const paragraphs = this.blog.content.split('\n\n').filter((p: string) => p.trim());
    return paragraphs[0] || '';
  }

  getParagraphs(): string[] {
    if (!this.blog?.content) return [];
    const paragraphs = this.blog.content.split('\n\n').filter((p: string) => p.trim());
    return paragraphs.slice(1);
  }
}