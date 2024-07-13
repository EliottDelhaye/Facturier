export class Print {
    constructor(el) {
        this.el = el;
    }
    print() {
        document.body.innerHTML = this.el.innerHTML; // Remplace tout le contenu de la page par la facture/devis
        window.print(); // Imprime le contenu de la page
        document.location.reload(); // Recharge la page pour réafficher le formulaire
    }
}
