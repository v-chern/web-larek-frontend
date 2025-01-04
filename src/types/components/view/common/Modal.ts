export interface IModalData {
    content: HTMLElement;
}

export interface IModalSettings {
    close: string;
    content: string;
    activeClass: string;
    onClose: () => void;
}