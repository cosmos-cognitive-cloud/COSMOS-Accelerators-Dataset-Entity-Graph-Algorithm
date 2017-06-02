export interface ISentiment {
    documents: Array<{ score: number, id: string}>,
    errors: Array<any>
}
