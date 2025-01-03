export interface ISuccessData {
    message: string;
}

export interface ISuccessSettings {
    descripion: string;
    closeButton: string;
    formatMessage: (value: number) => string;
    onClose: () => void;
}