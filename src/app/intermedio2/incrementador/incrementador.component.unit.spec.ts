import { IncrementadorComponent } from "./incrementador.component";

describe('Incrementador Component Unit', () => {
  let component: IncrementadorComponent;

  beforeEach(() => {
    // Se crea una nueva instancia del componente antes de cada prueba
    component = new IncrementadorComponent();
  });

  it('No debe de pasar de 100 el progreso', () => {
    // Arrange: Configurar el estado inicial del componente
    component.progreso = 50;

    // Act: Realizar la acción que se va a probar
    component.cambiarValor(100);

    // Assert: Verificar que el progreso no exceda el límite de 100
    expect(component.progreso).toBe(100);
  });
});
