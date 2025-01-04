import { IModalData, IModalSettings } from "../../../types/components/view/common/Modal";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

//TODO: Refactor on parametrization via settings;
export class Modal<T, S extends IModalSettings> extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
    protected _settings: IModalSettings;

    constructor(container: HTMLElement, settings?: S) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>(settings.close, container);
        this._content = ensureElement<HTMLElement>(settings.content, container);

        this._closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());

        this._settings = settings;
    }

    set content(value: HTMLElement) {
         this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add(this._settings.activeClass);
    }

    close() {
        this.container.classList.remove(this._settings.activeClass);
        this.content = null;
        this._settings.onClose();
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}