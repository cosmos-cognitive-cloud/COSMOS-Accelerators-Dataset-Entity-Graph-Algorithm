export interface IEntityLink {
    entities: Array<{
        matches: Array<{
            text: string,
            entries: Array<{
                offset: number
            }>
        }>
        name: string,
        wikipediaId: string,
        score: number
    }>;
}

