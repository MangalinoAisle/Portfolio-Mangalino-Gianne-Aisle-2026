import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_jtc28bl';
const EMAILJS_TEMPLATE_ID = 'template_lo8gig8';
const EMAILJS_PUBLIC_KEY  = 'xQaY13PxsnUCG8qXS';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit, AfterViewInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Contact | Gianne Aisle Mangalino');
    this.metaService.updateTag({
      name: 'description',
      content: 'Get in touch with Gianne Aisle Mangalino for freelance web development and UI/UX design opportunities.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Contact Gianne Mangalino, Hire Web Developer, UI/UX Designer Philippines, Freelance Developer'
    });
    this.metaService.updateTag({
      name: 'author',
      content: 'Gianne Aisle Mangalino'
    });

    // Load EmailJS SDK dynamically (no npm install needed)
    if (isPlatformBrowser(this.platformId)) {
      this.loadEmailJS();
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollReveal();
  }

  // ─── Load EmailJS SDK from CDN ────────────────────────────────────────────
  private loadEmailJS(): void {
    if ((window as any).emailjs) return; // already loaded

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      (window as any).emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    };
    document.head.appendChild(script);
  }

  // ─── Contact Info ─────────────────────────────────────────────────────────
  email     = 'gaislemangalino@gmail.com';
  phone     = '0999-489-9536';
  emailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=gaislemangalino@gmail.com';
  phoneLink = 'tel:09994899536';
  location  = 'Mabalacat City, Philippines';
  githubLink   = 'https://github.com/MangalinoAisle';
  linkedinLink = 'https://www.linkedin.com/in/gianne-aisle';

  // ─── Form State ───────────────────────────────────────────────────────────
  formData = {
    name: '',
    senderEmail: '',
    subject: '',
    message: ''
  };

  isSent       = false;
  isLoading    = false;
  hasError     = false;
  errorMessage = '';
  charCount    = 0;

  updateCharCount(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.charCount = textarea.value.length;
  }

  // ─── Send via EmailJS ────────────────────────────────────────────────────
  async sendMessage() {
    const { name, senderEmail, message } = this.formData;
    if (!name || !senderEmail || !message) return;

    this.isLoading = true;
    this.hasError  = false;

    try {
      const emailjs = (window as any).emailjs;

      if (!emailjs) {
        throw new Error('EmailJS not loaded. Please check your internet connection.');
      }

      // Real send bypassing the demo mode check entirely
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  name,
          from_email: senderEmail,
          subject:    this.formData.subject || '(No subject)',
          message:    message,
          reply_to:   senderEmail,
          to_email:   'gaislemangalino@gmail.com'
        }
      );

      this.isLoading = false;
      this.isSent    = true;
      this.showToast('success');

      // Reset after 4 seconds
      setTimeout(() => {
        this.isSent   = false;
        this.formData = { name: '', senderEmail: '', subject: '', message: '' };
        this.charCount = 0;
      }, 4000);

    } catch (err: any) {
      this.isLoading    = false;
      this.hasError     = true;
      this.errorMessage = err?.text || err?.message || 'Something went wrong. Please try again.';
      this.showToast('error');

      setTimeout(() => {
        this.hasError     = false;
        this.errorMessage = '';
      }, 5000);
    }
  }

  // ─── Toast ────────────────────────────────────────────────────────────────
  showToast(type: 'success' | 'error' = 'success') {
    if (!isPlatformBrowser(this.platformId)) return;
    const toast = document.getElementById('successToast');
    if (!toast) return;

    // Swap icon + text for error state
    const icon = toast.querySelector('i');
    const span = toast.querySelector('span');
    if (type === 'error') {
      toast.classList.add('toast-error');
      if (icon) icon.className = 'fas fa-exclamation-circle';
      if (span) span.textContent = this.errorMessage;
    } else {
      toast.classList.remove('toast-error');
      if (icon) icon.className = 'fas fa-check-circle';
      if (span) span.textContent = "Message sent! I'll get back to you soon.";
    }

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  // ─── Scroll Reveal ────────────────────────────────────────────────────────
  initScrollReveal() {
    const panels = document.querySelectorAll<HTMLElement>('.glass-panel');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    panels.forEach(p => observer.observe(p));
  }
}