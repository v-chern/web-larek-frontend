import { View } from "../../base/view";

import { 
    ElementsMap,
    ItemData,
    ListData,
    ListSettings
 } from "../../../types/components/view/common/List";

 export class ListView<T extends ItemData> extends View<
        ListData<T>, 
        ListSettings<T>
    > {
    protected _elements: ElementsMap;

    setActiveElement(element: HTMLElement) {
        const elements = Object.values(this._elements);
        if (elements.includes(element)) {
            elements.map((element) => 
                element.classList.remove(this.settings.activeItemClass)
            );
            element.classList.add(this.settings.activeItemClass);
        }
    }

    setActiveItem(id: string) {
        if (this._elements[id]) {
            this.setActiveElement(this._elements[id]);
        }
    }

    set items(items: T[]) {
        this._elements = items.reduce<ElementsMap>((result, item) => {
            const el = this.settings.item.copy();
            el.element.classList.add(this.settings.itemClass);
            result[item.id] = el.render(item);
            return result;
        }, {});
        this.setValue(this.element, Object.values(this._elements));
    }
 }