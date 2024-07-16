import { HasPrint } from "../interfaces/HasPrint";

export class Print implements HasPrint {
  constructor(private el: HTMLDivElement) {}
  print() {
    document.body.innerHTML = this.el.innerHTML; // Remplace le contenu de la page par le contenu du devis
    window.print() // Imprime le contenu de la page c'est-à-dire le devis
    document.location.reload() // Recharge la page pour revenir à l'état initial
  }
}
