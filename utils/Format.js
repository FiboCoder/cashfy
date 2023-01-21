export class Format{

    constructor(){


    }

    static getDayOfTimestamp(timestamp){

        return new Date(timestamp).getDay();
    }

    static timeStampToDate(timestamp){

        let date = new Date(timestamp);


        let formated = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate())  
                        + "/" 
                        + (date.getMonth()+1) 
                        + "/" 
                        + date.getFullYear() 
                        + " às " 
                        + (date.getHours() < 10 ? "0"+date.getHours() : date.getHours()) 
                        + ":" 
                        + (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()) ;

        return formated;
    }

    static intToReal(value){

        let fValue = value.replace(/\D/g, "");
        fValue = fValue.replace(/(\d)(\d{2})$/, "$1,$2");
        fValue = fValue.replace(/(?=(\d{3})+(\D))\B/g, ".");

        return fValue;
    }

    static intToCurrency(value){

        let fValue = value.replace(/\D/g, "");
        fValue = fValue.replace(/(\d)(\d{2})$/, "$1.$2");

        return fValue;
    }
}