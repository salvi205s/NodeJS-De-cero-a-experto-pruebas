import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MedicosService {
  constructor(private http: HttpClient) {}

  getMedicos(): Observable<any[]> {
    return this.http.get<any>('...').pipe(map((resp) => resp.medicos));
  }

  agregarMedico(medico: any): Observable<any> {
    return this.http.post<any>('...', medico).pipe(map((resp) => resp.medico));
  }

  borrarMedico(id: string): Observable<any> {
    return this.http.delete<any>('...').pipe(map((resp) => resp.medico));
  }
}
