import { HasHtmlFormat } from "../interfaces/HasHtmlFormat";
import { HasPrint } from "../interfaces/HasPrint";
import { HasRender } from "../interfaces/HasRender";
import { bind } from "../decorators/Bind";
import { Datas } from "./Data";
import { Display } from "./Display";
import { Print } from "./Print";

export class FormInput {
  form: HTMLFormElement;
  type: HTMLSelectElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  address: HTMLInputElement;
  country: HTMLInputElement;
  town: HTMLInputElement;
  zip: HTMLInputElement;
  product: HTMLInputElement;
  price: HTMLInputElement;
  quantity: HTMLInputElement;
  tva: HTMLInputElement;

  docContainer: HTMLDivElement;
  hiddenDiv: HTMLDivElement;
  storedDataDiv: HTMLDivElement;

  btnPrint: HTMLButtonElement;
  btnReload: HTMLButtonElement;
  btnStoredInvoices: HTMLButtonElement;
  btnStoredEstimates: HTMLButtonElement;

  constructor() {
    this.form = document.getElementById("form") as HTMLFormElement;
    this.type = document.getElementById("type") as HTMLSelectElement;
    this.firstName = document.getElementById("firstName") as HTMLInputElement;
    this.lastName = document.getElementById("lastName") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.country = document.getElementById("country") as HTMLInputElement;
    this.town = document.getElementById("town") as HTMLInputElement;
    this.zip = document.getElementById("zip") as HTMLInputElement;
    this.product = document.getElementById("product") as HTMLInputElement;
    this.price = document.getElementById("price") as HTMLInputElement;
    this.quantity = document.getElementById("quantity") as HTMLInputElement;
    this.tva = document.getElementById("tva") as HTMLInputElement;

    this.docContainer = document.getElementById(
      "aspect-ratio-container"
    ) as HTMLDivElement;
    this.hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
    this.storedDataDiv = document.getElementById(
      "stored-data"
    ) as HTMLDivElement;

    this.btnPrint = document.getElementById("print") as HTMLButtonElement;
    this.btnReload = document.getElementById("reload") as HTMLButtonElement;
    this.btnStoredInvoices = document.getElementById(
      "stored-invoices"
    ) as HTMLButtonElement;
    this.btnStoredEstimates = document.getElementById(
      "stored-estimates"
    ) as HTMLButtonElement;

    // Listener
    this.submitFormListener();
    this.printListener();
    this.reloadListener();
    this.getStoredDocsListener();
  }

  // Listener
  @bind // Permet de ne pas perdre le contexte de la méthode
  private submitFormListener() {
    this.form.addEventListener("submit", this.handleFormSubmit); // Grâce au décorateur bind il n'est pas nécessaire de bind la méthode
  }
  private printListener() {
    this.btnPrint.addEventListener("click", () => {
      let availableDoc: HasPrint;
      availableDoc = new Print(this.docContainer);
      availableDoc.print();
    });
  }
  private reloadListener() {
    this.btnReload.addEventListener("click", () => {
      document.location.reload();
      window.scrollTo(0, 0);
    });
  }
  private getStoredDocsListener(): void {
    // Dans cet exemple, les fonctions fléchées () => this.getItems("invoice") et () => this.getItems("estimate") conservent le contexte de this sans avoir besoin d'utiliser bind().
    // Cela fonctionne parce que les fonctions fléchées n'ont pas leur propre contexte this, elles le prennent de l'enclos englobant.
    this.btnStoredInvoices.addEventListener("click", () =>
      this.getItems("invoice")
    );
    this.btnStoredEstimates.addEventListener("click", () =>
      this.getItems("estimate")
    );
  }

  // Récupére les facture/devis du local storage pour les afficher
  private getItems(docType: string) {
    if (this.storedDataDiv.hasChildNodes()) {
      this.storedDataDiv.innerHTML = "";
    }

    if (localStorage.getItem(docType)) {
      let array: string | null;
      array = localStorage.getItem(docType);

      if (array !== null && array.length > 2) {
        let arrayData: string[];
        arrayData = JSON.parse(array);
        arrayData.map((doc: string) => {
          let card: HTMLDivElement = document.createElement("div");
          let cardBody: HTMLDivElement = document.createElement("div");
          let cardBodyClasses: string = "card-body";
          card.classList.add("card-classes");
          cardBody.classList.add(cardBodyClasses);

          cardBody.innerHTML = doc;
          card.append(cardBody);
          this.storedDataDiv.append(card);
        });
      } else {
        this.storedDataDiv.innerHTML = `<div>Aucun${
          docType === "invoice" ? "e facture" : " devis"
        } disponible !</div>`;
      }
    }
  }

  // Handle Form
  @bind
  private handleFormSubmit(e: Event) {
    e.preventDefault();

    this.hideListDocuments();

    const inputs = this.inputDatas(); // Array ou Undefined

    if (Array.isArray(inputs)) {
      const [
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
      ] = inputs;

      let docData: HasHtmlFormat;
      let date: Date = new Date();
      docData = new Datas(...inputs, date);

      let template: HasRender;
      template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
      template.render(docData, type);
    }
  }
  private hideListDocuments() {
    this.btnStoredInvoices.setAttribute("style", "display: none");
    this.btnStoredEstimates.setAttribute("style", "display: none");
    this.storedDataDiv.setAttribute("style", "display: none");
  }

  // Tuple
  private inputDatas():
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        string,
        number,
        number,
        number
      ]
    | void {
    const type = this.type.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const address = this.address.value;
    const country = this.country.value;
    const town = this.town.value;
    const zip = this.zip.valueAsNumber;
    const product = this.product.value;
    const price = this.price.valueAsNumber;
    const quantity = this.quantity.valueAsNumber;
    const tva = this.tva.valueAsNumber;

    if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
      return [
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
      ];
    } else {
      alert("Les valeurs numériques doivent être supérieur à zéro !");
      return;
    }
  }
}
