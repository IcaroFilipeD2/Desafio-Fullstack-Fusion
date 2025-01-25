export interface Hero {
    id: number;
    name: string;
    abilities: string[];
    origin: string;
    imageUrl?: string;
    description?: string; // Opcional, caso seja necessário para Marvel API
    thumbnail?: {
        path: string;
        extension: string;
    };
}
