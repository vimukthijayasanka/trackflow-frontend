import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticleComponent } from './particle/particle.component';
import {NgxParticlesModule} from "@tsparticles/angular";

@NgModule({
  declarations: [
    ParticleComponent
  ],
    imports: [
        CommonModule,
        NgxParticlesModule
    ],
    exports: [
      ParticleComponent
    ]
})
export class SharedModule { }
