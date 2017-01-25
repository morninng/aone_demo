import { Component, OnInit, Input, AfterViewInit, ElementRef, Inject } from '@angular/core';
import {AoneMgrService} from './../service/aone-mgr.service';
import {FONE_URL_SEED_BEGIN, FONE_URL_SEED_CHANNEL, FONE_URL_SEED_DIMENSION,
        FONE_URL_SEED_WIDTH, FONE_URL_SEED_HEIGHT,FONE_URL_SEED_AONESEG, 
        FONE_URL_SEED_LAST, FONE_FRIENDLYIFRAME_SRC} from './../interface/fone'

import { Http } from '@angular/http';

declare var window: any;

@Component({
  selector: 'app-ad-area',
  templateUrl: './ad-area.component.html',
  styleUrls: ['./ad-area.component.css']
})
export class AdAreaComponent implements OnInit, AfterViewInit {

  @Input() wait_segment : boolean;
  @Input() width : number;
  @Input() height : number;
  @Input() channel : string;
  @Input() dimension : string;

  private _el: HTMLElement;
  is_stdBanner = false;
  stdBanner_src;
  stdBanner_width;
  stdBanner_height;
  stdBanner_clickURL;

  constructor(private aone_mgr : AoneMgrService,
              private http : Http,
              private el: ElementRef) { 
                this._el = this.el.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){

    if(this.aone_mgr.aone_segment_read || this.wait_segment){
      this.aone_mgr.aone_segment_subject.subscribe(
        (aone_seg : [string])=>{
          console.log(aone_seg);
          this.ad_request(aone_seg);
        }
      )
    }else{
      this.ad_request([""]);
    }
  }

  ad_request(aone_seg : [string]){
    
    const request_url = FONE_URL_SEED_BEGIN + 
                        FONE_URL_SEED_CHANNEL + this.channel + 
                        FONE_URL_SEED_DIMENSION + this.dimension +
                        FONE_URL_SEED_WIDTH + this.width +
                        FONE_URL_SEED_HEIGHT + this.height + 
                        FONE_URL_SEED_AONESEG + aone_seg.join(",")
                         + FONE_URL_SEED_LAST;
    this.http.get(request_url)
        .toPromise()
        .then((response : any)=>{
          const ad_data = response._body || "";
          const ad_obj = JSON.parse(ad_data) || {};
          console.log(ad_obj);
          const ad_content = ad_obj.adContent;
          this.show_ad(ad_content);
          const impression_url = ad_obj.trackingData.impressionUrl;
          this.send_impression(impression_url);
          return;
        })
        .catch((err)=>{
          console.log(err)
        })
  }

  send_impression(impression_url){
    this.http.get(impression_url)
      .toPromise()
      .then(
        ()=>{return;}
      ).catch(
        (err)=>{console.log(err)}
      );

/*
    this.http.get("http://aaa.bbb")
        .toPromise()
        .then(
          ()=>{return;}
        ).catch(
          (err)=>{
          console.log(err)
        });
*/

  }

  show_ad(ad_content){

    if(ad_content.html){
      this.show_html(ad_content.html);
    }else if(ad_content.stdBanner){
      this.show_stdBanner(ad_content.stdBanner)
    }

  }


  show_html(ad_html_obj){

    const ad_html =  ad_html_obj.html || {};
    const content_array = ad_html.split("document.write('");
    const content_fixed = content_array.join("");
    const content_array2 = content_fixed.split("\\n');");
    const content_fixed2 = content_array2.join("");


    const ad_root_element = this._el.querySelector(".ad_root");

    if(ad_root_element){
      const iframe : any = document.createElement("iframe");
      iframe.src = FONE_FRIENDLYIFRAME_SRC;
      iframe.style.width = this.width + "px";
      iframe.style.height = this.height + "px";
      iframe.style.margin = "0px";
      iframe.style.borderWidth = "0px";
      iframe.style.padding = "0px";
      iframe.scrolling = "no";
      iframe.frameBorder = "0";
      iframe.EAS_src = content_fixed2;
      ad_root_element.appendChild(iframe);
    }


  }
  show_stdBanner(stdBanner_obj){
    this.is_stdBanner = true;
    this.stdBanner_src = stdBanner_obj.src;
    this.stdBanner_width = stdBanner_obj.width;
    this.stdBanner_height = stdBanner_obj.height;
    this.stdBanner_clickURL = stdBanner_obj.clickUrl;


  }


}
