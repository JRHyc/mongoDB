import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {
  
  getTasks(){
    let tempObservable = this._http.get("/tasks");
    tempObservable.subscribe(data => console.log("Got our tasks!", data));
  }
  getTaskById(id){
    let tempObservable = this._http.get("/tasks/${id}");
    tempObservable.subscribe(data => console.log("Got our task!", data));
  }

  constructor(private _http: HttpClient){
    this.getTasks();
    this.getTaskById("5ad56deff2d30c26f856d31b")
  }
}


