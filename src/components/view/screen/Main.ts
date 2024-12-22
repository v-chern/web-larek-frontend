import { Screen } from "../../base/screen";
import { IClickableEvent } from "../../../types/components/base/View";
import { cloneTemplate, ensureElement } from "../../../utils/utils";
import { SETTINGS } from "../../../utils/constants";
import { 
    MainData, 
    MainSettings 
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
            ensureElement(SETTINGS.gallerySettings),
            item: new CardView(cloneTemplate(SETTINGS.cardTemplate), {
                ...SETTINGS.cardSettings,
                onClick: this.onSelectCardHandler.bind(this)
            })
        )
    }

    protected onSelectCardHandler({item}: IClickableEvent<string>) {

    }
}