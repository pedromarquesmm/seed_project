import { Message } from "./message.model"
import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {Observable} from "rxjs";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    urlPost: string = 'http://localhost:3000';

    constructor(private http: Http) {}

    addMessage(message: Message){
        //push only on Http POST success
        this.messages.push(message);

        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});

        // import Response and Headers, else it throws an error without good solutions
        return this.http
            .post(this.urlPost+"/message", body, {headers: headers})
            .map((response: Response)=> response.json())
            .catch((error: Response) => Observable.throw(error.json()));

        //console.log(this.messages);
    }

    getMessages(){
        return this.messages;
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }

}