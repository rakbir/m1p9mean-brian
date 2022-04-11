export class Util{
    constructor(){}

     makeHumanReadableDate(date:any){
        return new Date(date).toLocaleString();
    }
}
