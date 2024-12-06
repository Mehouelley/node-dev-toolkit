export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validateur {
  static email(email: string): ValidationResult {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: regex.test(email),
      errors: regex.test(email) ? [] : ["L'adresse email n'est pas valide"]
    };
  }

  static telephone(numero: string): ValidationResult {
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return {
      isValid: regex.test(numero),
      errors: regex.test(numero) ? [] : ["Le numéro de téléphone n'est pas valide"]
    };
  }

  static codePostal(code: string): ValidationResult {
    const regex = /^(?:[0-8]\d|9[0-8])\d{3}$/;
    return {
      isValid: regex.test(code),
      errors: regex.test(code) ? [] : ["Le code postal n'est pas valide"]
    };
  }
}