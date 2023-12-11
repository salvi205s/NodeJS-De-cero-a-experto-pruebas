import { Jugador } from './clase';

xdescribe('Pruebas de clase', () => {
  // const jugador = new Jugador();
  let jugador: Jugador;

  // beforeAll( () => {
  // console.warn('BeforeAll');
  //     jugador.puntos_vida = 100;
  // });

  beforeEach(() => {
    // console.warn('BeforeEach');
    // jugador.puntos_vida = 100;
    jugador = new Jugador();
  });

  afterAll(() => {
    // console.warn('AfterAll');
  });

  afterEach(() => {
    // console.warn('AfterEach');
    // jugador.puntos_vida = 100;
  });

  it('Debe de retornar 80 de puntos_vida, si recibe 20 de daño', () => {
    // const jugador = new Jugador();
    const resp = jugador.recibeDanio(20);

    expect(resp).toBe(80);
  });

  it('Debe de retornar 50 de puntos_vida, si recibe 50 de daño', () => {
    // const jugador = new Jugador();
    const resp = jugador.recibeDanio(50);

    expect(resp).toBe(50);
  });

  it('Debe de retornar 0 de puntos_vida, si recibe 100 de daño o más', () => {
    // const jugador = new Jugador();
    const resp = jugador.recibeDanio(100);

    expect(resp).toBe(0);
  });
});
