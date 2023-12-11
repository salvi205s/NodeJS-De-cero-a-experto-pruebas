import { FormularioRegister } from './formulario';
import { FormBuilder } from '@angular/forms';

xdescribe('Formularios', () => {
  let componente: FormularioRegister;

  beforeEach(() => {
    componente = new FormularioRegister(new FormBuilder());
  });

  it('Debe de crear un formulario con dos campos, email y password', () => {
    expect(componente.form.contains('email')).toBeTruthy();
    expect(componente.form.contains('password')).toBeTruthy();
  });

  it('El email debe de ser obligatorio', () => {
    const control = componente.form.get('email');
    // Verificar que el control no sea nulo antes de intentar establecer el valor
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    } else {
      fail('El control de email es nulo');
    }
  });

  it('El email debe de ser un correo válido', () => {
    const control = componente.form.get('email');
    if (control) {
      control.setValue('fernando@gmail.com');
      expect(control.valid).toBeTruthy();
    }
  });
});
