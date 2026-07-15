//Validate email
export function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
//Validate phone number (Chile format: +569xxxxxxxx)
export function validatePhone(phone: string): boolean {
    const regex = /^\+(569)\d{8}$/;
    return regex.test(phone);
}