export interface ICardData {
    id: string;
    title: string;
    category: string;
    price: number;
    isActive?: boolean;
    image?: string;
    description?: string;
    basketIndex?: string;
}

export interface ICardSettings {
    title: string;
    price: string;
    image?: string;
    category?: string;
    desciption?: string;
    button?: string;
    buttonText?: {
        active: string;
        inactive: string;
    },
    basketIndex?: string;
    categoryClasses?: Map<string, string>;
    formatCurrency: (value: number) => string; 
    onClick: (event: MouseEvent) => void;
}
