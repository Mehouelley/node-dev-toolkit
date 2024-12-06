export class FormateurDate {
  static formater(date: Date, format: 'court' | 'long' = 'court'): string {
    const options: Intl.DateTimeFormatOptions = format === 'court' 
      ? { day: '2-digit', month: '2-digit', year: 'numeric' }
      : { day: '2-digit', month: 'long', year: 'numeric' };

    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }

  static ajouterJours(date: Date, jours: number): Date {
    const nouvelle = new Date(date);
    nouvelle.setDate(nouvelle.getDate() + jours);
    return nouvelle;
  }

  static estJourOuvre(date: Date): boolean {
    const jour = date.getDay();
    return jour !== 0 && jour !== 6;
  }
}