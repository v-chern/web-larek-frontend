import {
    createElement,
    ensureElement,
    isSelector,
    isEmpty,
    SelectorElement,
    isPlainObject,
    setElementData,
    setElementProps,
    isChildElement,
    setElementChildren,

} from "../../utils/utils"

import { IView } from "../../types/components/base/View";
import { ElementValue, ElementProps, ElementChild } from "../../types/html";

export abstract class View<T, S extends object> implements IView<T, S> {
    ['constructor']!: new (root: HTMLElement, settings: S) => this;

    protected cache: Record<string, HTMLElement> = {};

    constructor(public element: HTMLElement, protected readonly settings: S) {
        this.init();
        if (!this.element) {
            throw new Error('Elenent is not defined');
        }
    }

    protected init() {}

    copy(settings?: S): IView<T, object> {
        return new this.constructor(
            this.element.cloneNode(true) as HTMLElement,
            Object.assign({}, this.settings, settings ?? {})
        )
    }

    render(data: Partial<T>): HTMLElement {
        if (typeof data === 'object') {
            Object.assign(this, data);
        }
        return this.element;
    }

    setVisibility<T extends HTMLElement> (
        query: SelectorElement<T>,
        isVisible: boolean
    ) {
        const el = this.ensure(query);
        if (isVisible) {
            el.style.removeProperty('display');
        } else {
            el.style.setProperty('display', 'none');
        }
    }

    protected ensure<T extends HTMLElement>(
        query?: SelectorElement<T>,
        root: HTMLElement = this.element
    ): T {
        if (!isSelector(query)) {
            return ensureElement(query);
        } else {
            if (!this.cache[query]) {
                this.cache[query] = ensureElement(query, root);
            }
            return this.cache[query] as T;
        }
    }

    protected setElement<T extends HTMLElement>(
        query: SelectorElement<T>,
        value: HTMLElement
    ) {
        const el = this.ensure(query);
        el.replaceWith(value);
    }

    protected ensureTemplate(query: string) {
        const el = this.ensure(query);
        el.remove();
        return el.cloneNode(true) as HTMLElement;
    }

	protected create<T extends HTMLElement>(
		settings:
			| [keyof HTMLElementTagNameMap, ElementProps<T>]
			| keyof HTMLElementTagNameMap,
		props?: ElementProps<T>, 
		children?: ElementChild
	): T {
		if (typeof settings === 'string')
			return createElement<T>(settings, props, children);
		else if (Array.isArray(settings)) {
			return createElement<T>(
				settings[0],
				{
					...settings[1],
					...(props ?? {}),
				},
				children
			);
		} else throw new Error('Unknown create settings');
	}

    protected setValue<T extends HTMLElement>(
        query: SelectorElement<T>,
        value: ElementValue<T>
    ) {
        const el = query instanceof HTMLElement ? query : this.ensure(query);
        if (typeof value === 'string') {
            el.textContent = value;
        } else if (isChildElement(value)) {
            setElementChildren(el, value);
        } else if (isPlainObject(value) ){
            setElementProps<T>(el, value as ElementProps<T>);
        } else {
            throw new Error(`Unknown value type ${value}`);
        }
    }
}