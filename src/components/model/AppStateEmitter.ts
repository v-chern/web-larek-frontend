import { 
    AppStateChanges, 
    AppStateModals,
    IAppState,
    IAppStateConstructor,
    IAppStateSettings 
} from "../../types/components/model/AppState";

import { EventEmitter } from "../base/events";

export class AppStateEmitter extends EventEmitter {
    public model: IAppState;

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

    protected onModelChange(changed: AppStateChanges, modal?: AppStateModals) {
        if (changed === AppStateChanges.modal) {
            this.emit(changed, {current: modal});
            this.emit(modal, {});
        } else {
            this.emit(changed, {});
        }
    }
}