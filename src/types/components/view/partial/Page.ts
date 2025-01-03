//page.ts

import { IClickable } from "../../base/View";

export interface IPageSettings {
    onClick: (event: MouseEvent) => void;
}

export interface IPageData {
    counter: number;
    gallery: HTMLElement[];
    locked: boolean;
}

/*
export interface PageData {
    counter: number;
    isLocked: boolean;
}

export interface PageSettings extends IClickable<never> {
    wrapper: string;
    counter: string;
    basket: string;
    lockedClass: string;
}*/