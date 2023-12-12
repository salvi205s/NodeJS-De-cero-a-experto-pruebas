import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';

import { of, throwError, EMPTY, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Describimos el componente de Médicos
xdescribe('MedicosComponent', () => {
  // Declaramos las variables que vamos a utilizar
  let componente: MedicosComponent;
  let servicio: MedicosService;

  // Antes de cada prueba, inicializamos el servicio y el componente
  beforeEach(() => {
    const httpMock = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
    ]);
    servicio = new MedicosService(httpMock as HttpClient);
    componente = new MedicosComponent(servicio);
  });

  // Prueba para verificar que se carguen los médicos al iniciar
  it('Init: Debe de cargar los médicos', () => {
    const medicos = ['medico1', 'medico2', 'medico3'];

    // Simulamos la respuesta del servicio
    spyOn(servicio, 'getMedicos').and.callFake(() => {
      return of([medicos]);
    });

    // Iniciamos el componente
    componente.ngOnInit();

    // Verificamos que la longitud de los médicos sea mayor que 0
    expect(componente.medicos.length).toBeGreaterThan(0);
  });

  // Prueba para verificar que se llame al servidor para agregar un médico
  it('Debe de llamar al servidor para agregar un médico', () => {
    const espia = spyOn(servicio, 'agregarMedico').and.returnValue(EMPTY);

    // Llamamos a la función para agregar un médico
    componente.agregarMedico();

    // Verificamos que se haya llamado al servicio
    expect(espia).toHaveBeenCalled();
  });

  // Prueba para verificar que se agregue un nuevo médico al arreglo de médicos
  it('Debe de agregar un nuevo médico al arreglo de médicos', () => {
    const medico = { id: 1, nombre: 'Juan' };

    // Simulamos la respuesta del servicio
    spyOn(servicio, 'agregarMedico').and.returnValue(from([medico]));

    // Llamamos a la función para agregar un médico
    componente.agregarMedico();

    // Verificamos que el médico esté en el arreglo de médicos
    expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
  });

  // Prueba para verificar que si falla la adición, el mensaje de error sea el correcto
  it('Si falla la adicion, la propiedad mensajeError, debe ser igual al error del servicio', () => {
    const miError = 'Nose pudo agregar el médico';

    // Simulamos un error en la respuesta del servicio
    spyOn(servicio, 'agregarMedico').and.returnValue(throwError(miError));

    // Llamamos a la función para agregar un médico
    componente.agregarMedico();

    // Verificamos que el mensaje de error sea el correcto
    expect(componente.mensajeError).toBe(miError);
  });

  // Prueba para verificar que se llame al servidor para borrar un médico
  it('Debe de llamar al servidor para borrar un médico', () => {
    // Simulamos la confirmación del usuario
    spyOn(window, 'confirm').and.returnValue(true);

    // Simulamos la respuesta del servicio
    const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

    // Llamamos a la función para borrar un médico
    componente.borrarMedico('1');

    // Verificamos que se haya llamado al servicio con el id correcto
    expect(espia).toHaveBeenCalledWith('1');
  });

  // Prueba para verificar que no se llame al servidor para borrar un médico si el usuario no confirma
  it('NO debe de llamar al servidor para borrar un médico', () => {
    // Simulamos la cancelación del usuario
    spyOn(window, 'confirm').and.returnValue(false);

    // Simulamos la respuesta del servicio
    const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);

    // Llamamos a la función para borrar un médico
    componente.borrarMedico('1');

    // Verificamos que no se haya llamado al servicio
    expect(espia).not.toHaveBeenCalledWith('1');
  });
});
