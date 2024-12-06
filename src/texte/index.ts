export class ManipulateurTexte {
  static capitaliser(texte: string): string {
    return texte.charAt(0).toUpperCase() + texte.slice(1).toLowerCase();
  }

  static retirerAccents(texte: string): string {
    return texte.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  static genererSlug(texte: string): string {
    return this.retirerAccents(texte)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}