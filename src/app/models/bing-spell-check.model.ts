export interface IBingSpellCheckResult {
    _type: string;
    flaggedTokens: Array<{
        offset: number;
        token: string;
        type: string;
        suggestions: Array <{
            suggestion: string;
            score :number;
        }>
    }>;
}