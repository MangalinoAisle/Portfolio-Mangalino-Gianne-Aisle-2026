import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  // Property to track current theme state
  isDarkMode = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private scrollHandler = () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  private hamburger: HTMLElement | null = null;
  private navLinks: HTMLElement | null = null;

  /**
   * Toggles the 'light-theme' class on the document body 
   * and updates the local state.
   */
  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    this.hamburger = document.getElementById('hamburger');
    this.navLinks  = document.getElementById('navLinks');

    this.hamburger?.addEventListener('click', () => {
      this.hamburger!.classList.toggle('open');
      this.navLinks!.classList.toggle('open');
    });

    // Close menu on link click
    this.navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.hamburger?.classList.remove('open');
        this.navLinks?.classList.remove('open');
      });
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}