import { IBasketData, IBasketSettings } from "../../../types/components/view/screen/Basket";
import { cloneTemplate, createElement, ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export class Basket extends Component<IBasketData> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(template: string, settings: IBasketSettings) {
        const container: HTMLElement = cloneTemplate<HTMLElement>(ensureElement<HTMLTemplateElement>(template));
        super(container);

        this._list = ensureElement<HTMLElement>(settings.list, this.container);
        this._total = ensureElement<HTMLElement>(settings.total, this.container);
        this._button = ensureElement<HTMLElement>(settings.button, this.container);

        if (this._button) {
            this._button.addEventListener('click', settings.onNext);
        }
        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this.setDisabled(this._button, false);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this.setDisabled(this._button, true);
        }
    }

    set total(total: string) {
        this.setText(this._total, total);
    }
}