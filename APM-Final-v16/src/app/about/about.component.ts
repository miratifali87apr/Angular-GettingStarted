import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pm-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  angularVersion = '16';
  appVersion = '2.0.0';
  lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
