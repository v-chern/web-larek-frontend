//page.ts

import { IClickable } from "../../base/View";

export interface PageData {
    counter: number;
}

export interface PageSettings extends IClickable<never> {
    wrapper: string;
    counter: string;
    basket: string;
}