import { View } from "../../base/view";
import { CardData, CardSettings } from "../../../types/components/view/partial/Card";

export class CardView extends View<CardData, CardSettings> {
    id: string;

    init() {
        this.element.addEventListener('click', this.onClickHandler.bind(this));
    }
    
    onClickHandler(event: MouseEvent) {
        this.settings.onClick({event, item: this.id});
    }
    
    set category(value: string) {
        this.setValue(this.settings.category, value);
    }
    
    set title(value: string) {
        this.setValue(this.settings.title, value);
        this.setValue<HTMLImageElement>(this.settings.image, {alt: value});
    }
    
    set price(value: string) {
        this.setValue(this.settings.price, value);
    }
    
    set image(value: string) {
        this.setValue<HTMLImageElement>(this.settings.image, {src: value});
    }
}