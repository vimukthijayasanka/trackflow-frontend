import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-left-panel',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  images = [
    'url("/left-panel-animate-1.jpg")',
    'url("/left-panel-animate-2.jpg")',
    'url("/left-panel-animate-3.jpg")'
  ];

  text: string[] = [
    'Every small effort counts, let’s move forward together',
    'Great things start here',
    'Dream it. Plan it. Do it.'
  ];

  currentIndex: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }

  get backgroundImageStyle() {
    return {
      'background-image': this.images[this.currentIndex]
    };
  }
}
