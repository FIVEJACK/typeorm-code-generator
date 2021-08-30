export function isInteger(sqlType: string): boolean {
    return /int/.test(sqlType);
}

export function isVarchar(sqlType: string): boolean {
    return /varchar/.test(sqlType);
}

export function isDateTime(sqlType: string): boolean {
    return /datetime/.test(sqlType);
}
