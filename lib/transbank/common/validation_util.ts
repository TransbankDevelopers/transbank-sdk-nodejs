class ValidationUtil {
    static hasText(value: string, valueName: string){
        if (value == null || value == undefined || value.trim() == "")
            throw new Error("'" + valueName + "'" + " can't be null or white space");
    }

    public static hasTextWithMaxLength(value: string, length: number, valueName: string){
        ValidationUtil.hasText(value, valueName);
        if (value.length > length)
            throw new Error("'" + valueName + "'" + " is too long, the maximum length is " + length);
    }
    public static hasTextTrimWithMaxLength(value: string, length: number, valueName: string){
        ValidationUtil.hasText(value, valueName);
        if (value.length > value.trim().length)
            throw new Error("'" + valueName + "'" + " has spaces at the begining or the end");
        if (value.length > length)
            throw new Error("'" + valueName + "'" + " is too long, the maximum length is " + length);
    }
    public static hasElements(value: any[], valueName: any){
        if (value == null || value.length == 0)
            throw new Error("list '" + valueName + "'" + " can't be null or empty");
    }
}
  
export default ValidationUtil;