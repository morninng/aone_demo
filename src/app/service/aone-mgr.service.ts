import { Injectable } from '@angular/core';
import {Http, Jsonp} from '@angular/http';

import {ReplaySubject} from 'rxjs';

import { AoneSeg, AONE_URL_DD, AONE_SEGMENTS_EXPIRATION_DURATION, AONE_SEG_LOCALSTORAGE_KEY } from './../interface/aone-seg'; 
import 'rxjs/add/operator/map';

@Injectable()
export class AoneMgrService {

  aone_segment : AoneSeg;
  aone_segment_subject = new ReplaySubject();
  aone_segment_read = false;



  constructor(private jsonp : Jsonp) {
    this.read_localstorage();

  }

  read_localstorage(){

    const aone_segment_localstorage = localStorage.getItem(AONE_SEG_LOCALSTORAGE_KEY);
    const aone_segment_obj : AoneSeg = JSON.parse(aone_segment_localstorage);
    if(aone_segment_obj && aone_segment_obj.expiration && Date.now() < Number(aone_segment_obj.expiration)){
      this.aone_segment_subject.next(aone_segment_obj.segments_arr);
      this.aone_segment_subject.complete();
      this.aone_segment_read = true;
    }else{
      this.call_aone();
    }


  }




  call_aone(){

    const aone_request_url = AONE_URL_DD + "&jsonp=JSONP_CALLBACK";

    this.jsonp.request(aone_request_url)
    .map((data: any)=>{return data._body})
    .subscribe(
      (segments_arr: [string])=>{

        this.store_segments(segments_arr);
        this.aone_segment_subject.next(segments_arr);
        this.aone_segment_subject.complete();
        this.aone_segment_read = true;
      },
      (err)=>{
        this.aone_segment_subject.next([]);
        this.aone_segment_subject.complete();
      }
    );

  }

  store_segments(segments_arr : [string]){

    const expiration_date = Date.now() + AONE_SEGMENTS_EXPIRATION_DURATION;

    const aone_segment_obj : AoneSeg = {
      expiration : expiration_date,
      segments_arr: segments_arr
    }
    const aone_segments_str = JSON.stringify(aone_segment_obj);
    localStorage.setItem(AONE_SEG_LOCALSTORAGE_KEY, aone_segments_str);
  }


}
