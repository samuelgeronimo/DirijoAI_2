export function validateCPF(cpf: string): boolean {
    // Remove non-digits
    const cleanCPF = cpf.replace(/[^\d]/g, '');

    // Check length
    if (cleanCPF.length !== 11) return false;

    // Check for known invalid patterns (all repeated digits)
    if (/^(\d)\1+$/.test(cleanCPF)) return false;

    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
}

export function formatCPF(cpf: string): string {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    return cleanCPF
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

export function validateFullName(name: string): boolean {
    const words = name.trim().split(/\s+/);
    if (words.length < 2) return false;
    // Check if each word contains only letters (handling accents), but allow single letters
    return words.every(word => /^[a-zA-Z\u00C0-\u00FF]+$/.test(word));
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
    // Min 8 chars, 1 uppercase, 1 special char
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinLength && hasUpperCase && hasSpecialChar;
}

export function formatPhone(phone: string): string {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

export function formatCEP(cep: string): string {
    const cleanCEP = cep.replace(/[^\d]/g, '');
    return cleanCEP
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}
