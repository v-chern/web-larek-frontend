import { IAppState, AppStateModals } from "../../types/components/model/AppState";
import { Controller } from "../base/controller";

export class MainController extends Controller<IAppState> {
    onOpenBasket = () => {
        this.model.openModal(AppStateModals.basket);
    }

    onOpenCard = (id: string) => {
        this.model.selectProduct(id);
        this.model.openModal(AppStateModals.product);
    }
}