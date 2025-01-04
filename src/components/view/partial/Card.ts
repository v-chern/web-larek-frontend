import { ICardData, ICardSettings } from "../../../types/components/view/partial/Card";
import { ensureElement, cloneTemplate} from "../../../utils/utils";
import { Component } from "../../base/Component";

export class Card extends Component<ICardData> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _basketIndex?: HTMLElement;

    constructor(template: string, settings: ICardSettings) {
        const container: HTMLElement = cloneTemplate<HTMLElement>(ensureElement<HTMLTemplateElement>(template));
        super(container);

        this._title = ensureElement<HTMLElement>(settings.title, container);
        this._image = container.querySelector(settings.image);
        this._button = container.querySelector(settings.button);
        this._description = container.querySelector(settings.desciption);
        this._category = container.querySelector(settings.category);
        this._price = container.querySelector(settings.price);
        this._basketIndex = container.querySelector(settings.basketIndex);

        if (this._button) {
            this._button.addEventListener('click', settings.onClick);
        } else {
            container.addEventListener('click', settings.onClick);
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set basketIndex(value: string) {
        this.setText(this._basketIndex, value);
    }
    
    set category(value: string) {
        this.setText(this._category, value);
    }

    set price(value: string) {
        this.setText(this._price, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string | string[]) {
        if (Array.isArray(value)) {
            this._description.replaceWith(...value.map(str => {
                const descTemplate = this._description.cloneNode() as HTMLElement;
                this.setText(descTemplate, str);
                return descTemplate;
            }));
        } else {
            this.setText(this._description, value);
        }
    }
}
