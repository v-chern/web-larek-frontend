import { ICardData, ICardSettings } from "../../../types/components/view/partial/Card";
import { ensureElement, cloneTemplate} from "../../../utils/utils";
import { Component } from "../../base/Component";

export class Card extends Component<ICardData> {
    protected _settings: ICardSettings; 
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
            this.setText(this._button, settings.buttonText.active);
        } else {
            container.addEventListener('click', settings.onClick);
        }

        this._settings = settings;
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
        const categoryClass = this._settings.categoryClasses.get(value);
        this.setText(this._category, value);
        this._settings.categoryClasses.forEach((value) => {
            this.toggleClass(this._category, value, false);
        })
        this.toggleClass(this._category, categoryClass, true);
    }

    set price(value: number) {
        if (!value) {
            this.setDisabled(this._button, true);
        }
        this.setText(this._price, this._settings.formatCurrency(value));
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

    set isActive(value: boolean) {
        if (!value) {
            this.setText(this._button, this._settings.buttonText.inactive);
            this.setDisabled(this._button, true);
        }
    }
}
