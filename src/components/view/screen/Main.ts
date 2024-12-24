import { Screen } from "../../base/screen";
import { IClickableEvent } from "../../../types/components/base/View";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { SETTINGS } from "../../../utils/constants";
import { 
    MainData, 
    MainSettings, 
    ProdutcItem
} from "../../../types/components/view/screen/Main";
import { ListView } from "../common/ListView";
import { CardData } from "../../../types/components/view/partial/Card";
import { PageView } from "../partial/PageView";
import { CardView } from "../partial/CardView";

export class MainScreen extends Screen<MainData, MainSettings> {
    protected declare gallery: ListView<CardData>;

    public declare page: PageView;
   
    protected init() {
        this.page = new PageView(ensureElement(SETTINGS.pageSelector), {
            ...SETTINGS.pageSettings,
            onClick: this.settings.onOpenBasket,
        });
        this.gallery = new ListView<CardData>(
            ensureElement(SETTINGS.gallerySelector), {
                ...SETTINGS.gallerySettings,
                item: new CardView(cloneTemplate(SETTINGS.cardTemplate), {
                    ...SETTINGS.cardSettings,
                    onClick: this.onSelectCardHandler.bind(this)
                })
            }
        );
        this.element = this.page.element;
    }

    protected onSelectCardHandler({item}: IClickableEvent<ProdutcItem>) {
        this.settings.onOpenCard(item.id);
    }

    set counter(value: number) {
        this.page.counter = value;
    }

    set items(value: CardData[]) {
        this.gallery.items = value;
    }
}