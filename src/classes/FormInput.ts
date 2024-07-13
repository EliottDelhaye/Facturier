import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { HasRender } from "../interfaces/HasRender.js";
import { Datas } from "./Data.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";




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
  private submitFormListener() {
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
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
    this.btnStoredInvoices.addEventListener(
      "click",
      this.getItems.bind(this, "invoice")
    );
    this.btnStoredEstimates.addEventListener(
      "click",
      this.getItems.bind(this, "estimate")
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
  private handleFormSubmit(e: Event) {
    e.preventDefault();

    this.hideListDocuments()

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
  private hideListDocuments(){
    this.btnStoredInvoices.setAttribute("style","visibility: hidden")
    this.btnStoredEstimates.setAttribute("style","visibility: hidden")
    this.storedDataDiv.setAttribute("style","visibility: hidden")
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
