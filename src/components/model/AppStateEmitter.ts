import { 
    AppStateChanges, 
    AppStateModals,
    IAppState,
    IAppStateConstructor,
    IAppStateSettings 
} from "../../types/components/model/AppState";

import { ILarekAPI } from "../../types/components/model/LarekApi";
import { EventEmitter } from "../base/events";

export class AppStateEmitter extends EventEmitter {
    public model: IAppState;
    protected previousModal: AppStateModals = AppStateModals.none;

    constructor (
        Model: IAppStateConstructor,
        settings: Omit<IAppStateSettings, 'onChange'>
    ) {
        super();
        this.model = new Model({
            ...settings,
            onChange: this.onModelChange.bind(this)
        });
    }

    protected onModelChange(changed: AppStateChanges) {
        if (changed === AppStateChanges.modal) {
            this.emit(changed, {
                previous: this.previousModal,
                current: this.model.openedModal
            });
            this.emit(this.model.openedModal, {});
        } else {
            this.emit(changed, {});
        }
        this.previousModal = this.model.openedModal;
    }
}