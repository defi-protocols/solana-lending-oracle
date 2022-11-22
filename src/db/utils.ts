export class Utils {

    /**
     * Format JS date into YYYY-MM-DD HH:MM:SS string format
     * @param date  The date to be formatted
     * @returns     The formatted date
     */
    static dateFormat(date: Date): string {
        // Convert JS date int string YYYY-MM-DD HH:MM:SS
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * Wait some milliseconds
     * @param ms  The milliseconds to wait
     * @returns   A promise that resolves after the given milliseconds
     * 
    */
    static wait(ms: number): Promise<void> {
        // Wait some milliseconds
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}