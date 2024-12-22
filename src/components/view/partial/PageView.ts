import { View } from "../../base/view";
import { PageData, PageSettings } from "../../../types/components/view/partial/Page";

export class PageView extends View<PageData, PageSettings> {
    init() {
        this.ensure(this.settings.basket).addEventListener(
            'click',
            this.onClickHandler.bind(this)
        );
    }

    onClickHandler(event: MouseEvent) {
        this.settings.onClick({ event });
    }

    set counter(value: number) {
        this.setValue(this.settings.counter, String(value));
    }

    set isLocked(value: boolean) {
        this.ensure(this.settings.wrapper).classList.toggle(
            this.settings.lockedClass,
            value
        );
    }
} 