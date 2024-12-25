//А надо ли?

import { Screen } from "../../base/screen";
import { cloneTemplate } from "../../../utils/utils";
import { SETTINGS } from "../../../utils/constants";
import { ElementCreator } from "../../../types/html";

import { ModalView } from "../common/ModalView";
import { ButtonView } from "../common/ButtonView";
import { IView } from "../../../types/components/base/View";
import { ModalScreenSettings } from "../../../types/components/view/screen/Modal";


/*
export abstract class ModalScreen<
    H, // header data
    M, // modal content data
    C, // screen data
    S extends ModalScreenSettings
> extends Screen<C, S> {
    protected declare modal: ModalView<M>;
    protected declare nextButton: HTMLButtonElement;

    abstract initHeader(): IView<H>;
    abstract initContent(): IView<M>;

    protected init() {
        
        ///
        ///
        this.element = this.modal.element;
    }

    protected getNextButton(
        settings: { nextLabel: string; nextSettings: ElementCreator },
        onClick: () => void
    ) {
        return ButtonView.make<HTMLButtonElement>(
            settings.nextLabel,
            settings.nextSettings,
            onClick
        );
    }

    protected getModalView(
        //?? headerView: IView<H>
        settings: { contentView: IView<M> },
        onClose: () => void
    ) {
        return new ModalView<M>(cloneTemplate(SETTINGS.modalTempalte), {
            ...SETTINGS.modalSettings,
            ...settings,
            actions: [this.nextButton],
            onClose
        });
    }
}

*/