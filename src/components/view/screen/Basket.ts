import { IBasketData, IBasketSettings } from "../../../types/components/view/screen/Basket";
import { createElement, ensureElement, formatNumber } from "../../../utils/utils";
import { Component } from "../../base/Component";

//TODO: refactor to user settings
export class Basket extends Component<IBasketData> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, settings?: IBasketSettings) {
        super(container);
        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

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