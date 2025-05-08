import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticleComponent } from './particle/particle.component';
import {NgxParticlesModule} from "@tsparticles/angular";
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    ParticleComponent,
    ConfirmationModalComponent
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
