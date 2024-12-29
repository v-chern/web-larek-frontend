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

export class BasketScreen extends Screen<BasketData, BasketSettings> {
    protected declare basket: ListView<CardData>

    public declare modal: ModalView<ListData<CardData>>;

    protected init() {
        this.modal = new ModalView(ensureElement(SETTINGS.modalTemplate), {
           ...SETTINGS.modalSettings,
           contentView: this.basket,
           actions: []
        });

        this.basket = new ListView<CardData>(
            ensureElement(SETTINGS.basketTemplate), {
                ...SETTINGS.basketSettings,
                item: new CardView(cloneTemplate(SETTINGS.basketCardTemplate), {
                    ...SETTINGS.basketCardSettings,
                    onClick: () => {} //ToDo: Аккуратно проверить создание списка и селекторы
                })
            });
        this.element = this.modal.element;
    }
}

//    contentView: IView<C>;
//    actions: HTMLElement[];