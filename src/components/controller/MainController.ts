import { IAppState, AppStateModals } from "../../types/components/model/AppState";
import { Controller } from "../base/controller";

export class MainController extends Controller<IAppState> {
    onOpenBasket() {
        this.model.openModal(AppStateModals.basket);
    }

    onOpenCard() {
        this.model.openModal(AppStateModals.product);
    }
}