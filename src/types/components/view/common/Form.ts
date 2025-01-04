export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IFormSettings {
    submit: string;
    errors: string;
    onInputChange: (e: Event) => void;
    onSubmit: (e: Event) => void;
}