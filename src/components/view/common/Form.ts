import { IFormState, IFormSettings } from "../../../types/components/view/common/Form"

import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
//TODO: Refactor on parametrization via settings;
export class Form<T, S extends IFormSettings> extends Component<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, settings: S) {
        super(container);

        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', settings.onInputChange);
        this.container.addEventListener('submit', settings.onSubmit);
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state;
        super.render({valid, errors});
        Object.assign(this, inputs);
        return this.container;
    }
}