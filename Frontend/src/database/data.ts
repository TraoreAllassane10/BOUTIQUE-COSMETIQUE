interface Client {
  id: number;
  nom: string;
  email: string;
  telephone: number;
  montant: number;
}

export interface Commande {
  id: string;
  date: string;
  client: string;
  paiement: "Payé" | "En attente" | "Échoué";
  total: number;
  livraison: "Livré" | "En cours" | "Annulé";
  modePaiement: "Mobile Money" | "Carte bancaire" | "Espèces" | "Virement";
}

export const Listeclient: Client[] = [
  { id: 1, nom: "Allassane Traore", email: "allassane@gmail.com", telephone: 2250564639933, montant: 200000 },
  { id: 2, nom: "Nabo Clément", email: "nabo@gmail.com", telephone: 225070725642, montant: 300000 },
  { id: 3, nom: "Johnny SDT", email: "john@gmail.com", telephone: 2250564639933, montant: 500000 },
  { id: 4, nom: "Koffi Ulrich", email: "koffi@gmail.com", telephone: 2250784521234, montant: 350000 },
  { id: 5, nom: "Ahoua Mireille", email: "mireille@gmail.com", telephone: 2250701334521, montant: 150000 },
  { id: 6, nom: "Ouattara Ibrahim", email: "ibrahim@gmail.com", telephone: 2250587412233, montant: 450000 },
  { id: 7, nom: "Konan Ange", email: "konanange@gmail.com", telephone: 2250500123456, montant: 280000 },
  { id: 8, nom: "Toure Mariam", email: "mariam@gmail.com", telephone: 2250754123567, montant: 180000 },
  { id: 9, nom: "Bamba Ismael", email: "ismael@gmail.com", telephone: 2250554897632, montant: 400000 },
  { id: 10, nom: "Coulibaly Aïcha", email: "aicha@gmail.com", telephone: 2250709638521, montant: 320000 },
  { id: 11, nom: "Kouadio Roland", email: "roland@gmail.com", telephone: 2250774125896, montant: 250000 },
  { id: 12, nom: "Niamké Brigitte", email: "brigitte@gmail.com", telephone: 2250704785963, montant: 120000 },
  { id: 13, nom: "Tra Bi Jean", email: "trabi@gmail.com", telephone: 2250574567890, montant: 500000 },
  { id: 14, nom: "Yao Prisca", email: "prisca@gmail.com", telephone: 2250765124789, montant: 220000 },
  { id: 15, nom: "Soro Abdoul", email: "abdoul@gmail.com", telephone: 2250745123654, montant: 470000 },
  { id: 16, nom: "Bakayoko Fanta", email: "fanta@gmail.com", telephone: 2250567891234, montant: 260000 },
  { id: 17, nom: "Zoumana Karim", email: "karim@gmail.com", telephone: 2250711223344, montant: 340000 },
  { id: 18, nom: "Aka Noëlla", email: "noella@gmail.com", telephone: 2250500112233, montant: 190000 },
  { id: 19, nom: "Kouassi Junior", email: "junior@gmail.com", telephone: 2250789456123, montant: 410000 },
  { id: 20, nom: "Diallo Fatou", email: "fatou@gmail.com", telephone: 2250578963214, montant: 280000 },
  { id: 21, nom: "Koné Idriss", email: "idriss@gmail.com", telephone: 2250700025874, montant: 330000 },
  { id: 22, nom: "Gnagne Hortense", email: "hortense@gmail.com", telephone: 2250599987412, montant: 310000 },
  { id: 23, nom: "N'Dri Serge", email: "serge@gmail.com", telephone: 2250711458796, montant: 440000 },
  { id: 24, nom: "Tahi Alice", email: "alice@gmail.com", telephone: 2250500456789, montant: 150000 },
  { id: 25, nom: "Doumbia Moussa", email: "moussa@gmail.com", telephone: 2250796321458, montant: 490000 },
  { id: 26, nom: "Sangaré Aminata", email: "aminata@gmail.com", telephone: 2250569874512, montant: 300000 },
  { id: 27, nom: "Kra Rodrigue", email: "rodrigue@gmail.com", telephone: 2250736985214, montant: 350000 },
  { id: 28, nom: "Tahi Flora", email: "flora@gmail.com", telephone: 2250558963214, montant: 200000 },
  { id: 29, nom: "Kouamé Hervé", email: "herve@gmail.com", telephone: 2250789456321, montant: 360000 },
  { id: 30, nom: "Ouédraogo Awa", email: "awa@gmail.com", telephone: 2250745896321, montant: 280000 },
  { id: 31, nom: "Ahoua Mireille", email: "mireille@gmail.com", telephone: 2250701334521, montant: 150000 },
  { id: 32, nom: "Ouattara Ibrahim", email: "ibrahim@gmail.com", telephone: 2250587412233, montant: 450000 },
  { id: 33, nom: "Konan Ange", email: "konanange@gmail.com", telephone: 2250500123456, montant: 280000 },
  { id: 34, nom: "Toure Mariam", email: "mariam@gmail.com", telephone: 2250754123567, montant: 180000 },
];


export const ListeCommandes: Commande[] = [
  { id: "CM001", date: "2025-01-03", client: "Allassane Traore", paiement: "Payé", total: 200000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM002", date: "2025-01-04", client: "Nabo Clément", paiement: "Payé", total: 150000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM003", date: "2025-01-06", client: "Johnny SDT", paiement: "En attente", total: 80000, livraison: "En cours", modePaiement: "Mobile Money" },
  { id: "CM004", date: "2025-01-07", client: "Koffi Ulrich", paiement: "Payé", total: 95000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM005", date: "2025-01-09", client: "Ahoua Denise", paiement: "Échoué", total: 120000, livraison: "Annulé", modePaiement: "Carte bancaire" },
  { id: "CM006", date: "2025-01-10", client: "Yao Michel", paiement: "Payé", total: 45000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM007", date: "2025-01-11", client: "Allassane Traore", paiement: "En attente", total: 300000, livraison: "En cours", modePaiement: "Mobile Money" },
  { id: "CM008", date: "2025-01-13", client: "Koné Mariam", paiement: "Payé", total: 60000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM009", date: "2025-01-14", client: "Coulibaly Ibrahim", paiement: "Payé", total: 90000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM010", date: "2025-01-15", client: "Yao Michel", paiement: "Échoué", total: 40000, livraison: "Annulé", modePaiement: "Mobile Money" },
  { id: "CM011", date: "2025-01-17", client: "Nabo Clément", paiement: "Payé", total: 180000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM012", date: "2025-01-18", client: "Allassane Traore", paiement: "Payé", total: 220000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM013", date: "2025-01-19", client: "Johnny SDT", paiement: "Payé", total: 170000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM014", date: "2025-01-20", client: "Koné Mariam", paiement: "En attente", total: 130000, livraison: "En cours", modePaiement: "Espèces" },
  { id: "CM015", date: "2025-01-22", client: "Ahoua Denise", paiement: "Payé", total: 210000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM016", date: "2025-01-23", client: "Koffi Ulrich", paiement: "Payé", total: 155000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM017", date: "2025-01-24", client: "Yao Michel", paiement: "Échoué", total: 95000, livraison: "Annulé", modePaiement: "Espèces" },
  { id: "CM018", date: "2025-01-25", client: "Coulibaly Ibrahim", paiement: "Payé", total: 140000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM019", date: "2025-01-26", client: "Nabo Clément", paiement: "Payé", total: 160000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM020", date: "2025-01-27", client: "Allassane Traore", paiement: "Payé", total: 200000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM021", date: "2025-01-28", client: "Johnny SDT", paiement: "Payé", total: 240000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM022", date: "2025-01-29", client: "Ahoua Denise", paiement: "En attente", total: 85000, livraison: "En cours", modePaiement: "Mobile Money" },
  { id: "CM023", date: "2025-01-30", client: "Koffi Ulrich", paiement: "Payé", total: 110000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM024", date: "2025-02-01", client: "Nabo Clément", paiement: "Échoué", total: 75000, livraison: "Annulé", modePaiement: "Espèces" },
  { id: "CM025", date: "2025-02-02", client: "Allassane Traore", paiement: "Payé", total: 300000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM026", date: "2025-02-03", client: "Yao Michel", paiement: "Payé", total: 210000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM027", date: "2025-02-04", client: "Koné Mariam", paiement: "Payé", total: 98000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM028", date: "2025-02-05", client: "Coulibaly Ibrahim", paiement: "Payé", total: 135000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM029", date: "2025-02-06", client: "Ahoua Denise", paiement: "En attente", total: 120000, livraison: "En cours", modePaiement: "Mobile Money" },
  { id: "CM030", date: "2025-02-07", client: "Koffi Ulrich", paiement: "Payé", total: 155000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM031", date: "2025-02-08", client: "Allassane Traore", paiement: "Payé", total: 180000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM032", date: "2025-02-09", client: "Nabo Clément", paiement: "Payé", total: 230000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM033", date: "2025-02-10", client: "Johnny SDT", paiement: "Échoué", total: 95000, livraison: "Annulé", modePaiement: "Espèces" },
  { id: "CM034", date: "2025-02-11", client: "Koné Mariam", paiement: "Payé", total: 130000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM035", date: "2025-02-12", client: "Ahoua Denise", paiement: "Payé", total: 150000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM036", date: "2025-02-13", client: "Yao Michel", paiement: "Payé", total: 175000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM037", date: "2025-02-14", client: "Coulibaly Ibrahim", paiement: "Payé", total: 190000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM038", date: "2025-02-15", client: "Koffi Ulrich", paiement: "Payé", total: 210000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM039", date: "2025-02-16", client: "Allassane Traore", paiement: "En attente", total: 85000, livraison: "En cours", modePaiement: "Mobile Money" },
  { id: "CM040", date: "2025-02-17", client: "Nabo Clément", paiement: "Payé", total: 195000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM041", date: "2025-02-18", client: "Johnny SDT", paiement: "Payé", total: 225000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM042", date: "2025-02-19", client: "Ahoua Denise", paiement: "Échoué", total: 70000, livraison: "Annulé", modePaiement: "Carte bancaire" },
  { id: "CM043", date: "2025-02-20", client: "Koffi Ulrich", paiement: "Payé", total: 160000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM044", date: "2025-02-21", client: "Koné Mariam", paiement: "Payé", total: 185000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM045", date: "2025-02-22", client: "Yao Michel", paiement: "En attente", total: 130000, livraison: "En cours", modePaiement: "Virement" },
  { id: "CM046", date: "2025-02-23", client: "Allassane Traore", paiement: "Payé", total: 210000, livraison: "Livré", modePaiement: "Carte bancaire" },
  { id: "CM047", date: "2025-02-24", client: "Nabo Clément", paiement: "Payé", total: 240000, livraison: "Livré", modePaiement: "Mobile Money" },
  { id: "CM048", date: "2025-02-25", client: "Johnny SDT", paiement: "Payé", total: 200000, livraison: "Livré", modePaiement: "Espèces" },
  { id: "CM049", date: "2025-02-26", client: "Ahoua Denise", paiement: "Payé", total: 175000, livraison: "Livré", modePaiement: "Virement" },
  { id: "CM050", date: "2025-02-27", client: "Coulibaly Ibrahim", paiement: "Payé", total: 190000, livraison: "Livré", modePaiement: "Carte bancaire" },
];
