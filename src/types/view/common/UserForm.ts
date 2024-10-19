export interface UserFormData<T> {
    data: T;
    isActive: boolean;
    isDisabled: boolean;
    message: string;
    isError: boolean;
}

export interface UserFormSettings<T> {
    onChange: (data: T) => void;
    onClose: () => void;
    onNext: () => void;
}