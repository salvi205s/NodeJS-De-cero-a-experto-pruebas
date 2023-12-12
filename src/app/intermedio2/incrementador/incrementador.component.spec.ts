// Importación de módulos y utilidades de testing de Angular
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Bloque principal de pruebas para el componente IncrementadorComponent
xdescribe('Incrementador Component', () => {
  let component: IncrementadorComponent;
  let fixture: ComponentFixture<IncrementadorComponent>;

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    // Configuración del módulo de testing de Angular
    TestBed.configureTestingModule({
      declarations: [IncrementadorComponent], // Componentes que se usarán en las pruebas
      imports: [FormsModule], // Módulos adicionales necesarios (en este caso, FormsModule)
    });

    // Creación del componente y fixture para las pruebas
    fixture = TestBed.createComponent(IncrementadorComponent);
    component = fixture.componentInstance;
  });

  // Prueba: Verificar que la leyenda se muestra correctamente
  it('Debe de mostrar la leyenda', () => {
    // Asignar un valor a la propiedad 'leyenda' del componente
    component.leyenda = 'Progreso de carga';

    // Disparar la detección de cambios en el componente
    fixture.detectChanges();

    // Obtener el elemento HTML que contiene la leyenda
    const elem: HTMLElement = fixture.debugElement.query(
      By.css('h3')
    ).nativeElement;

    // Verificar que la leyenda se encuentra en el contenido del elemento
    expect(elem.innerHTML).toContain('Progreso de carga');
  });

  // Prueba: Verificar que el valor del progreso se muestra correctamente en el input
  it('Debe de mostrar en el input el valor del progreso', () => {
    // Llamar al método 'cambiarValor' del componente para cambiar el valor de progreso
    component.cambiarValor(5);

    // Disparar la detección de cambios en el componente
    fixture.detectChanges();

    // Esperar hasta que todas las tareas asíncronas se completen
    fixture.whenStable().then(() => {
      // Obtener el input del DOM
      const input = fixture.debugElement.query(By.css('input'));
      const elem = input.nativeElement;

      // Verificar que el valor del input sea el esperado
      expect(elem.value).toBe('55');
    });
  });

  it('Debe de incrementar/decrementar en 5, con un click en el botón', () => {
    // Obtener los botones del DOM
    const botones = fixture.debugElement.queryAll(By.css('.btn-primary'));

    // Simular un clic en el primer botón (decrementar)
    botones[0].triggerEventHandler('click', null);
    // Verificar que el progreso se ha decrementado en 5
    expect(component.progreso).toBe(45);

    // Simular un clic en el segundo botón (incrementar)
    botones[1].triggerEventHandler('click', null);
    // Verificar que el progreso se ha incrementado en 5
    expect(component.progreso).toBe(50);
  });

  it('En el titulo del componente, debe de mostrar el progreso', () => {
    // Obtener los botones del DOM y simular un clic para cambiar el progreso
    const botones = fixture.debugElement.queryAll(By.css('.btn-primary'));
    botones[0].triggerEventHandler('click', null);

    // Disparar la detección de cambios en el componente
    fixture.detectChanges();

    // Obtener el elemento HTML que contiene el título
    const element = fixture.debugElement.query(By.css('h3')).nativeElement;

    console.log(element);

    // Verificar que el título contiene el progreso actualizado
    expect(element.innerHTML).toContain('45');
  });
});
