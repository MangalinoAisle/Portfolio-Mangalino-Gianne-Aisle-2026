import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume implements OnInit {
  
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Resume | Gianne Aisle Mangalino');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Professional resume and qualifications of Gianne Aisle Mangalino, an IT student specializing in Front-End Development and UI/UX Design.' 
    });
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'Gianne Mangalino Resume, Front-End Developer Resume, UI/UX Designer CV, IT Student Portfolio, Web Development' 
    });
    this.metaService.updateTag({ 
      name: 'author', 
      content: 'Gianne Aisle Mangalino' 
    });
  }

  contactInfo = {
    email: 'gaislemangalino@gmail.com',
    phone: '0999-489-9536',
    linkedin: 'linkedin.com/in/gianne-aisle'
  };

  professionalSummary = `Highly motivated IT student specializing in Front-End Development and UX/UI Design. Passionate about leveraging technical expertise and a startup mindset to build responsive, accessible interfaces and support digital transformation.`;

  technicalSkills = [
    { category: 'Frontend Development', skills: ['Angular', 'HTML5', 'CSS3', 'JavaScript (ES6+)'] },
    { category: 'UI/UX Design', skills: ['Figma', 'Wireframing', 'Rapid Prototyping', 'User Research'] },
    { category: 'Tools & Workflows', skills: ['Git / GitHub', 'VS Code', 'Responsive Design', 'REST APIs'] }
  ];

  softSkills = ['Time Management', 'Under-Pressure Performance', 'Patience', 'Team Collaboration'];
  
  languages = ['English (Professional)', 'Tagalog (Native)', 'Kapampangan (Fluent)'];

  education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Holy Angel University',
      note: 'Major in Web Development',
      courses: 'Relevant Courses: Web Systems and Technologies, Mobile Programming, Object Oriented Programming'
    }
  ];

  experiences = [
    {
      role: 'Student Assistant (Dental Clinic)',
      company: 'Holy Angel University',
      date: 'July 2025 – Present | Jan 2025 – Mar 2025',
      desc: [
        'Managed scheduling for 20+ daily appointments and patient inquiries, sharpening organizational skills and maintaining 100% accuracy in record-keeping.',
        'Facilitated clinic sessions for 2 resident doctors, ensuring professional communication and a 15% increase in daily patient workflow efficiency.'
      ]
    },
    {
      role: 'Student Assistant (Center for Kapampangan Studies)',
      company: 'Holy Angel University',
      date: 'April 2025 – June 2025',
      desc: [
        'Led guided tours for groups of up to 50+ visitors and managed the reception desk, enhancing public speaking and client-facing confidence.',
        'Coordinated daily operations for 50+ visitor arrivals, demonstrating adaptability and strong teamwork in a fast-paced setting.'
      ]
    }
  ];
}