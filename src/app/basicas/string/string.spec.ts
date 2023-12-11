import { mensaje } from './string';

describe('Pruebas de strings', () => {

  it('Debe de regresar un string', () => {
    const resp = mensaje('Fernando');
    expect(typeof resp).toBe('string');
  });

  it('Debe de retornar un saludo con el nombre enviado', () => {
    const nombre = 'Juan';
    const resp = mensaje(nombre);

    expect(resp).toContain(nombre); //toContain porque tambien tiene el texto saludo en el string
  });

  //----------------------------------------------------------------
});
