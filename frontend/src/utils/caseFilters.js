// frontend/src/utils/caseFilters.js

export const getVisibleCases = (allCases) => {
  // Lista de casos confidenciais que não devem aparecer no painel principal do usuário
  const hiddenCaseTitles = ["Ouro e Cinzas"]; 
  
  return allCases.filter(
    investigation => !hiddenCaseTitles.includes(investigation.title)
  );
};