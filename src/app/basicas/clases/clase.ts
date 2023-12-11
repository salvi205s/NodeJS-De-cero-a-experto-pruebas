export class Jugador {
  puntos_vida: number;

  constructor() {
    this.puntos_vida = 100;
  }

  recibeDanio(danio: number) {
    if (danio >= this.puntos_vida) {
      this.puntos_vida = 0;
    } else {
      this.puntos_vida = this.puntos_vida - danio;
    }

    return this.puntos_vida;
  }
}
