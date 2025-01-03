import { Form } from "../common/Form";
import { IContactsData, IContactsSettings } from "../../../types/components/view/partial/Contacts";
import { ensureElement } from "../../../utils/utils";

export class Contacts extends Form<IContactsData, IContactsSettings> {
    protected _phone: HTMLInputElement;
    protected _email: HTMLInputElement;

    protected _settings: IContactsSettings;

    constructor(container: HTMLFormElement, setting: IContactsSettings) {
        super(container, setting);

        this._email = ensureElement(setting.email, container) as HTMLInputElement;
        this._phone = ensureElement(setting.phone, container) as HTMLInputElement;

        this._settings = setting;
    }

    set email(value: string) {
        this._email.value = value;
    }

    get email() {
        return this._email.value;
    }

    set phone(value: string) {
        this._phone.value = value;
    }

    get phone() {
        return this._phone.value;
    }

    validate() {
        this.valid = true;
        this.errors = '';
        if (this.email === '') {
            this.valid = false;
            this.errors = this._settings.emailError;
        } else if (this.phone === '') {
            this.valid = false;
            this.errors = this._settings.phoneError;
        }
    }
}