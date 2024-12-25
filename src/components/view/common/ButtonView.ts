import { View } from "../../base/view";
import { IClickable, IClickableEvent } from "../../../types/components/base/View";
import { ElementCreator } from "../../../types/html";
import { createElement } from "../../../utils/utils";

import { ButtonData, ButtonSettings } from "../../../types/components/view/common/Button";

export class ButtonView<T> extends View<ButtonData, ButtonSettings<T>> {
    init() {
        this.element.addEventListener('click', this.onClickHandler.bind(this));
    }

    onClickHandler(event: MouseEvent) {
        this.settings.onClick({ event });
    }

    set label(value: string) {
        this.setValue(this.element, value);
    }

    static make<T extends HTMLElement>(
        label: string,
        settings: ElementCreator,
        onClick: (args: IClickableEvent<never>) => void
    ): T {
        const el = new ButtonView(createElement(...settings), { onClick });
        return el.render({ label }) as T;
    }
}