export interface ILanguageKeyPhrase {
  documents: Array<{ 
      id: string, 
      keyPhrases: Array<{
        phrase: string
      }> 
    }>
  ,
    errors: Array<any>
}
