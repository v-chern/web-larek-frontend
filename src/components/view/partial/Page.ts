import { IPageData, IPageSettings } from "../../../types/components/view/partial/Page";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export class Page extends Component<IPageData> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;
    protected _settings: IPageSettings;

    constructor(container: HTMLElement, settings: IPageSettings) {
        super(container);

        this._counter = ensureElement<HTMLElement>(settings.counter);
        this._catalog = ensureElement<HTMLElement>(settings.gallery);
        this._wrapper = ensureElement<HTMLElement>(settings.wrapper);
        this._basket = ensureElement<HTMLElement>(settings.basket);

        this._basket.addEventListener('click', settings.onClick);

        this._settings = settings;
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
         if (value) {
            this._wrapper.classList.add(this._settings.lockedClass);
        } else {
            this._wrapper.classList.remove(this._settings.lockedClass);
        }
    }
}