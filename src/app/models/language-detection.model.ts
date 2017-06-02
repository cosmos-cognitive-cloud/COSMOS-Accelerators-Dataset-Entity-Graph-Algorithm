export interface ILanguageDetect {
  documents: Array<{ 
      id: string, 
      detectedLanguages: Array<{
        name: string,
        iso6391Name: string
        score: 0.0
      }> 
    }>
  ,
    errors: Array<any>
}


export interface ILanguageDetect {
  documents: Array<{ 
      id: string, 
      detectedLanguages: Array<{
        name: string,
        iso6391Name: string
        score: 0.0
      }> 
    }>
  ,
    errors: Array<any>
}
