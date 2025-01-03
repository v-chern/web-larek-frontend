//Modal.ts

export interface IModalData {
    content: HTMLElement;
}

export interface IModalSettings {
    onClose: () => void;
}

/*
export interface ModalData<C> {
    content: C;
    isActive: boolean;
    message?: string;
    isError?: boolean;
}

export interface ModalSettings<C> {
    close: string;
    content: string;
    message: string;
    contentView?: IView<C>;
    actions?: HTMLElement[];
    activeClass: string;
    errorMessageClass: string;
    onOpen?: () => void;
    onClose?: () => void;
}
*/