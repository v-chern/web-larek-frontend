import { IAppState, AppStateModals } from "../../types/components/model/AppState";
import { Controller } from "../base/controller";

export class BasketController extends Controller<IAppState> {
    onRemove = (id: string) => {
        this.model.removeFromBasket(id);
    }

    onClose = () => {
        this.model.openModal(AppStateModals.none);
    }

    onNext = () => {
        this.model.openModal(AppStateModals.order);
    }
}