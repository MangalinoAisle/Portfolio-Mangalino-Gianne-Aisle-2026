import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs = [
    {
      id: 'my-journey',
      title: 'My Journey as a Web Developer',
      category: 'Career',
      date: 'Feb 22, 2026',
      readTime: '5 min read',
      tags: ['Angular', 'Frontend', 'Student Life'],
      pullQuote: 'The best developers are perpetual students. The landscape shifts every year — the skill isn\'t knowing everything; it\'s knowing how to learn anything.',
      content: `Starting as an IT student at Holy Angel University, I never expected a single elective course to completely redirect my career path. The moment I built my first interactive webpage and saw it come alive in the browser, something clicked.

My journey began with the basics — HTML structure, CSS styling, vanilla JavaScript. But the deeper I went, the more I realized that web development is less about memorizing syntax and more about learning to think systematically. Every bug I fixed taught me how to reason through problems. Every design I built taught me the value of empathy for the user.

Transitioning to Angular was a turning point. Component-based architecture forced me to think in abstractions. Services, dependency injection, routing — concepts that seemed intimidating on paper became second nature through practice. I started building projects not just for grades, but for myself.

What I've learned is that the best developers are perpetual students. The landscape shifts every year — new frameworks, new patterns, new tools. The skill isn't knowing everything; it's knowing how to learn anything.

If you're just starting out: embrace the confusion. The moments where nothing makes sense are exactly when the most growth is happening. Keep building. Keep shipping. Keep asking why.`
    },
    {
      id: 'responsive-tips',
      title: 'Tips for Building Responsive Websites',
      category: 'Tutorial',
      date: 'Feb 20, 2026',
      readTime: '4 min read',
      tags: ['CSS', 'Responsive', 'Best Practices'],
      pullQuote: 'Responsive design is really about respect — respect for the fact that your users come from everywhere, on every device imaginable.',
      content: `Responsive design is one of those topics that sounds simple until you're debugging a layout that looks perfect on desktop but completely breaks on a 375px screen at 2am. I've been there more times than I can count.

Mobile-First is not optional. Start your CSS for the smallest screen, then use min-width media queries to scale up. It forces you to prioritize content and removes the habit of cramming a desktop layout down to mobile. Your code will be leaner and your thinking will be sharper.

Use relative units everywhere. Replace px with rem for font sizes, clamp() for fluid typography, and % or vw/vh for container sizing. Your layout will breathe naturally across screen sizes instead of snapping between rigid breakpoints.

CSS Grid and Flexbox are a team, not competitors. Grid handles two-dimensional layout — rows AND columns. Flexbox is for one-dimensional flows. A common pattern: Grid for the overall page structure, Flexbox for individual card contents. Using both together gives you extraordinary control.

Test on real devices, not just DevTools. Browser DevTools' responsive mode is a starting point, not a final check. Real devices have real quirks — iOS Safari, in particular, has its own opinions about viewport height. Always test on physical hardware before shipping to users.

Responsive design is really about respect — respect for the fact that your users come from everywhere, on every device imaginable. When you build with that mindset, the technical decisions become obvious.`
    },
    {
      id: 'design-systems',
      title: 'Why Every Developer Should Understand Design',
      category: 'Design',
      date: 'Feb 15, 2026',
      readTime: '6 min read',
      tags: ['UI/UX', 'Design Systems', 'Workflow'],
      pullQuote: 'Understanding design doesn\'t mean you need to master Figma. It means understanding why decisions are made — why spacing creates hierarchy, why contrast guides the eye.',
      content: `There's a common divide in tech: designers who can't code and developers who can't design. I've spent the past year deliberately trying to bridge that gap, and it has changed how I build everything.

Understanding design doesn't mean you need to master Figma or have an eye for color theory, though both certainly help. It means understanding why decisions are made — why spacing creates hierarchy, why contrast guides the eye, why consistency builds trust in an interface.

Design systems were my entry point. When I started applying consistent spacing scales, type scales, and color tokens to my projects, the quality jumped immediately. Not because I became a better programmer, but because I started thinking about the user's experience as a cohesive whole rather than a collection of individual components.

The biggest unlock was learning about visual hierarchy. Every screen communicates something. Good design makes the priority obvious. Bad design makes the user work to figure out what matters. As a developer, understanding this changes how you write markup — the structure you create in HTML should mirror the hierarchy of importance.

Accessibility is where design and development intersect most powerfully. Sufficient contrast ratios, logical focus order, meaningful alt text — these are simultaneously design decisions and engineering decisions. Getting them right requires both hats.

The next time you're building a UI, ask yourself: where does the eye go first? Is that where you want it to go? If the answer is no, something needs to change. That question alone will make you a dramatically better developer.`
    }
  ];

  getBlogs() { return this.blogs; }
  getBlogById(id: string) { return this.blogs.find(b => b.id === id); }
}