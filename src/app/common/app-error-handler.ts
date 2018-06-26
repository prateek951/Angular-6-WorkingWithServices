import { ErrorHandler } from "@angular/core";

export class AppErrorHandler extends ErrorHandler{
    handleError(error: any):void{
        alert('An unexpected error occured');
        console.log(error);
    }
}