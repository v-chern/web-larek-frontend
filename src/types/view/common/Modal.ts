import { IView } from "../../base/View";

export interface ModalData<C> {
    content: C;
    isActive: boolean;
    message?: string;
    isError?: boolean;
}

export interface ModalSettings<C> {
    close: string;
    content: string;
    contentView: IView<C>;
    actions: HTMLElement[];
    activeClass: string;
    errorMessageClass: string;
    onOpen?: () => void;
    onClose?: () => void;
}