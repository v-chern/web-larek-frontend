export interface IPageData {
    counter: number;
    gallery: HTMLElement[];
    locked: boolean;
}

export interface IPageSettings {
    wrapper: string;
    counter: string;
    basket: string;
    gallery: string;
    lockedClass: string;
    onClick: (event: MouseEvent) => void;
}