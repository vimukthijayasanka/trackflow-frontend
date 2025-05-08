import {Component, OnInit} from '@angular/core';
import {Container, Engine, IOptions, RecursivePartial} from '@tsparticles/engine';
import {NgParticlesService} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';

@Component({
  selector: 'app-particle',
  standalone: false,
  template: `<ngx-particles
    [id]="id"
    [options]="particlesOptions"
    (particlesLoaded)="particlesLoaded($event)"
  >
  </ngx-particles>
  `,
})
export class ParticleComponent implements OnInit {

  id = "tsparticles";

  particlesUrl = "http://foo.bar/particles.json";

  particlesOptions: RecursivePartial<IOptions> = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    })
  }

  particlesLoaded(container: Container): void {
    console.log(container);
  }
}
