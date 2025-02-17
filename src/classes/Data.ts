import { HasHtmlFormat } from "../interfaces/HasHtmlFormat";

export class Datas implements HasHtmlFormat {
  constructor(
    private documentType: string,
    private firstName: string,
    private lastName: string,
    private address: string,
    private country: string,
    private town: string,
    private zip: number,
    private product: string,
    private price: number,
    private quantity: number,
    private tva: number,
    private date: Date
  ) {}

  private subTotal(price: number, quantity: number, tva: number): number {
    const tvaPercent = tva / 100; // 20% = 0,2
    const totalTva = price * tvaPercent;
    return (price + totalTva) * quantity;
  }

  htmlFormat(): string {
    const totalPrice = this.subTotal(this.price, this.quantity, this.tva);
    return `
        <div id="document-container">
          <div class="document-header">
            <div>
              <img class="logo-ed" src="./medias/Logo ED SVG.svg">
            </div>
            <div>
              <p>${
                this.documentType === "invoice" ? "Facture" : "Devis"
              }<span> N° ${Math.floor(Math.random() * 101)}</span></p>
              <p>Date <span>${this.date.toLocaleDateString()}</span></p>
            </div>
          </div>
        
          <div class="document-informations">
            <div>
              <p>ED</p>
              <p>22 rue des Champs-Élysées</p>
              <p>75008 Paris</p>
              <p>Tel: +33 6 36 37 89 27</p>
            </div>
            <div>
              <p>Informations du client</p>
              <p>${this.lastName} ${this.firstName}</p>
              <p>${this.address} </p>
              <p>${this.zip}</p>
              <p>${this.town}</p>
              <p>${this.country}</p>
            </div>
          </div>
        
          <div class="document-product">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Produit/Service</th>
                    <th>Prix unitaire</th>
                    <th>Quantité</th>
                    <th>Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${this.product}</td>
                    <td>${this.price} €</td>
                    <td>${this.quantity}</td>
                    <td>${this.price * this.quantity} € HT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="document-total">
            <div>
              <div>TOTAL TTC</div>
              <div>${totalPrice.toFixed(2)} €</div>
            </div>
          </div>
        </div>

    `;
  }
}
