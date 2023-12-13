// Importaciones necesarias para las pruebas unitarias en Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Importar el componente que se va a probar
import { RouterMedicoComponent } from './router-medico.component';

// Importar las clases de enrutador de Angular
import { Router, ActivatedRoute } from '@angular/router';

// Importar Subject de RxJS para simular el Observable de ActivatedRoute
import { Subject } from 'rxjs';

// Definir una clase falsa para simular el Router de Angular
class FakeRouter {
  navigate(params: any) {} // Puedes reemplazar 'any' con el tipo correcto si lo conoces
}

// Definir una clase falsa para simular ActivatedRoute
class FakeActivatedRoute {
  // Observable simulado para los parámetros de la ruta
  private subject = new Subject();

  // Método para simular la actualización de parámetros en la ruta
  push(valor: any) {
    this.subject.next(valor);
  }

  // Propiedad que devuelve el observable simulado de parámetros
  get params() {
    return this.subject.asObservable();
  }
}

// Suite de pruebas unitarias para el componente RouterMedicoComponent
describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  // Configuración antes de cada prueba asincrónica
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // Declarar el componente a probar
      declarations: [RouterMedicoComponent],

      // Proporcionar las clases falsas como proveedores para Router y ActivatedRoute
      providers: [
        { provide: Router, useClass: FakeRouter },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
      ],
    }).compileComponents(); // Compilar el componente antes de las pruebas
  }));

  // Configuración antes de cada prueba
  beforeEach(() => {
    // Crear una instancia del componente y su fixture
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;

    // Detectar cambios en el componente
    fixture.detectChanges();
  });

  it('Debe de redireccionar a Médico cuando se guarde', () => {
    // Obtener el servicio de enrutador simulado
    const router = TestBed.inject(Router);

    // Espiar la función navigate del enrutador simulado
    const spy = spyOn(router, 'navigate');

    // Llamar al método del componente que se está probando
    component.guardarMedico();

    // Verificar si la función navigate fue llamada con los parámetros esperados
    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Debe de colocar el id = nuevo', () => {
    // Crear una instancia del componente (esto puede no ser necesario)
    // component = fixture.componentInstance;

    // Obtener la instancia de ActivatedRoute simulado
    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);

    // Llamar al método push para simular la actualización de parámetros en la ruta
    activatedRoute.push({ id: 'nuevo' });

    // Verificar si la propiedad id del componente se actualizó correctamente
    expect(component.id).toBe('nuevo');
  });
});
