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
let characters: Characters[] = []

export async function loadCharacterImage(index: number): Promise<string> {
    try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br")
        const data = await response.json();

        characters = (data.data as Characters[]).filter(
            (charcter) => charcter.type.value === "outfit"
        );

        if (index < 0 || index >= characters.length) {
            throw new Error("Ongeldig characted index")
        }

        const character = characters[index];

        return character.images.icon
    } catch (error) {
        console.error("Error bij laden van afbeelding:", error);
        return "Error bij laden van afbeelding";
    }
    
}