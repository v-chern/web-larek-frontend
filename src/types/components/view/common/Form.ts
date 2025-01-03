//UserForm.ts

export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IFormSettings {
    onInputChange: (e: Event) => void;
    onSubmit: (e: Event) => void;
}