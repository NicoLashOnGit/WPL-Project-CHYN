export interface Type {
    value: string;
    displayValue: string;
    backendValue: string;
}

export interface Rarity {
    value: string;
    displayValue: string;
    backendValue: string;
}

export interface Series {
    value: string;
    colors: string[];
    backendValue: string;
}

export interface Set {
    value: string;
    text: string;
    backendValue: string;
}

export interface Introduction {
    chapter: string;
    season: string;
    text: string;
    backendValue: number;
}

export interface Images {
    smallIcon: string;
    icon: string;
}

export interface MetaTags {
    [index: number]: string;
}

export interface Characters {
    id: string;
    name: string;
    description: string;
    type: Type;
    rarity: Rarity;
    series: Series;
    set: Set;
    introduction: Introduction;
    images: Images;
    metaTags: MetaTags;
    added: string;
}