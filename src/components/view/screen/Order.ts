import { IOrderData, IOrderSettings } from "../../../types/components/view/screen/Order";
import { TPaymentType } from "../../../types/components/model/LarekApi";
import { ensureElement, isEmpty, cloneTemplate} from "../../../utils/utils";
import { Form } from "../common/Form";

export class Order extends Form<IOrderData, IOrderSettings> {
    protected _payment: {
        card: HTMLButtonElement,
        cash: HTMLButtonElement
    }
    protected _address: HTMLInputElement;
    
    protected _settings: IOrderSettings;

    constructor(template: string, settings: IOrderSettings) {
        const container: HTMLFormElement = cloneTemplate(ensureElement<HTMLTemplateElement>(template));
        super(container, settings);
        
        this._payment = {
            card: ensureElement<HTMLButtonElement>(settings.paymentCard, container),
            cash: ensureElement<HTMLButtonElement>(settings.paymentCash, container)
        };
        this._payment.card.addEventListener('click', settings.onClick);
        this._payment.cash.addEventListener('click', settings.onClick);
        this._address = ensureElement<HTMLInputElement>(settings.address, container);

        this._settings = settings;
    }

    set address(value: string) {
        this._address.value = value;
    }

    get address() {
        return this._address.value;
    }

    set payment(value: TPaymentType) {
        if (value === TPaymentType.card) {
            this._payment.card.classList.add(this._settings.paymentActive);
            this._payment.cash.classList.remove(this._settings.paymentActive);
        } else if (value === TPaymentType.cash) {
            this._payment.card.classList.remove(this._settings.paymentActive);
            this._payment.cash.classList.add(this._settings.paymentActive);
        }
    }

    get payment(): TPaymentType | null {
        let retVal = null;
        if (this._payment.card.classList.contains(this._settings.paymentActive)) {
            retVal = TPaymentType.card;
        } else if (this._payment.cash.classList.contains(this._settings.paymentActive)) {
            retVal = TPaymentType.cash;
        }
        return retVal;
    }

    validate() {
        this.valid = true;
        this.errors = '';
        if (isEmpty(this.payment)) {
            this.valid = false;
            this.errors = this._settings.paymentError;
        } else if (this.address === '') {
            this.valid = false;
            this.errors = this._settings.addressError;
        }
    }
}