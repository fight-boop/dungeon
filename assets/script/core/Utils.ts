export class Utils {

    static getSafeData<T>(data: T, defaultData: T): T {
        if (data == null || data == undefined) {
            return defaultData;
        }
        return data;
    }
}