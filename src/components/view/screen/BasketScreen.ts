import { Screen } from "../../base/screen";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { SETTINGS } from "../../../utils/constants";
import { 
    BasketData,
    BasketSettings
 } from "../../../types/components/view/screen/Basket";

import { ListView } from "../common/ListView";
import { CardData } from "../../../types/components/view/partial/Card";
import { ModalView } from "../common/ModalView";
import { ListData } from "../../../types/components/view/common/List";
import { CardView } from "../partial/CardView";
import { ModalData } from "../../../types/components/view/common/Modal";


/*
export class BasketScreen extends Screen<BasketData, BasketSettings> {
    protected declare _products: ListView<CardData>;
    
    public declare modal: ModalView<HTMLElement>;

    protected init() {
        this.modal = new ModalView(ensureElement(SETTINGS.modalContainer), {
            ...SETTINGS.modalSettings,

        })
        this.modal.content = cloneTemplate(SETTINGS.basketTemplate);
        console.log(this.modal);

        this.element = this.modal.element;
    }

    set items(value: CardData[]) {
        this._products.items = value;
    }
}
*/