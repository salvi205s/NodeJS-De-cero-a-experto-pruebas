import { Component, OnInit } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  medicos: any[] = [];

  constructor(public _medicoService: MedicoService) {}

  ngOnInit() {}

  saludarMedico(nombre: string) {
    return `Hola ${nombre}`;
  }

  obtenerMedicos() {
    this._medicoService
      .getMedicos()
      .subscribe((medicos) => (this.medicos = medicos as any));
  }

  // obtenerMedicos() {
  //   this._medicoService.getMedicos().subscribe({
  //     next: (medicos) => {
  //       this.medicos = medicos as any[];
  //     },
  //     error: (error: any) => {
  //       console.log('error');
  //     },
  //     complete: () => {
  //       console.log('completado');
  //     },
  //   });
  // }
}
