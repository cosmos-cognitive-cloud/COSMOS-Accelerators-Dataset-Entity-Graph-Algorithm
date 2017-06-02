export interface ISentenceStructure {
    analyzerId: string;
    result: Array<string> | Array<ISentenceResult>;
}

export interface ISentenceResult {
    Len: number;
    Offset: number;
    Tokens: Array<ISentenceToken>;
}

export interface ISentenceToken {
    Len: number;
    NormalizedToken: string;
    Offset: number;
    RawToken: string;
}
