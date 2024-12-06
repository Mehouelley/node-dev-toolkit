export class FormateurNombre {
  static formaterDevise(montant: number, devise: 'EUR' | 'USD' = 'EUR'): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: devise
    }).format(montant);
  }

  static formaterNombre(nombre: number, decimales: number = 2): string {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    }).format(nombre);
  }
}