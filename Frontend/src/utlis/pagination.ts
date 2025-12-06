
export function DonneesParPage(data: any, currentPage: number) {
  // Nombre d'element à afficher
  const perPage = 5;

  // Calucule du premier et le dernier element de chaque page
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  // Partage des données entre pages
  const pageActuelle = data?.slice(firstIndex, lastIndex);

  // Caluclue du nombre totale de page
  const totalPage = Math.ceil(data?.length / perPage);

  return [pageActuelle, totalPage];
}
