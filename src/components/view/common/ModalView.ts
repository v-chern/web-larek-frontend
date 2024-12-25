import { View } from "../../base/view";

import { ModalData, ModalSettings } from "../../../types/components/view/common/Modal";

export class ModalView<C> extends View<ModalData<C>, ModalSettings<C>> {
    protected static _openedModal: ModalView<unknown> | null;

    protected init() {
        this.ensure(this.settings.close).addEventListener(
            'click',
            this.onCloseHandler.bind(this)
        );
        this.element.addEventListener('click', this.onCloseHandler.bind(this));
    }

    protected onCloseHandler(event?: MouseEvent) {
        if (
            event && 
            ![this.ensure(this.settings.close), this.element].includes(
                event.target as HTMLElement
            )
        )
            return;
        this.element.remove();
        this.element.classList.remove(this.settings.activeClass);

        if (event) {
            this.settings.onClose?.();
        }
        if (ModalView._openedModal == this) {
            ModalView._openedModal = null;
        }
    }

    protected onOpenHandler() {
        if (ModalView._openedModal) {
            ModalView._openedModal.isActive = false;
        }
        ModalView._openedModal = this;
        this.element.classList.add(this.settings.activeClass);
        document.body.append(this.element);
        this.settings.onOpen?.();
    }

    set content(data: C) {
        this.setValue(
            this.settings.content,
            this.settings.contentView.render(data)
        );
    }

    set message(value: string | undefined) {
        if (value) {
            this.setValue(this.settings.message, value);
            this.setVisibility(this.settings.message, true);
        } else {
            this.setVisibility(this.settings.message, false);
        }
    }

    set isError(state: boolean) {
        this.ensure(this.settings.message).classList.toggle(
            this.settings.errorMessageClass,
            !!state
        );
    }

    set isActive(state: boolean) {
        if (state) {
            this.element.classList.add(this.settings.activeClass);
            this.onOpenHandler();
        } else {
            this.element.classList.remove(this.settings.activeClass);
            this.onCloseHandler();
        }
    }
}
