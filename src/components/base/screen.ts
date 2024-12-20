import { View } from "./view";

export abstract class Screen<T, S extends object> extends View<T, S> {
    constructor(settings: S) {
        super(null, settings);
    }
}