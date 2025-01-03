import { Component } from "../../base/Component";
import { ISuccessData, ISuccessSettings } from "../../../types/components/view/screen/Success";
import { ensureElement } from "../../../utils/utils";

export class Success extends Component<ISuccessData> {
    protected _message: HTMLElement;
    protected _settings: ISuccessSettings;

    constructor(container: HTMLElement, settings: ISuccessSettings) {
        super(container);
        const closeButton = ensureElement<HTMLButtonElement>(settings.closeButton, this.container);
        closeButton.addEventListener('click', settings.onClose);

        this._message = ensureElement(settings.descripion, this.container);
    }

    set message(value: string) {
        this.setText(this._message, value);
    }
}