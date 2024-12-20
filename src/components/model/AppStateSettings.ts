import { AppStateChanges, IAppStateSettings } from "../../types/components/model/AppState";

export class AppStateSettings implements IAppStateSettings {
    formatCurrency(value: number): string {
        return `${value} туг`
    }

    onChange(changed: AppStateChanges): void {
        
    }
}