export interface AoneSeg {
    expiration: number;
    segments_arr: [string];
}

export const AONE_SEGMENTS_EXPIRATION_DURATION = 24*60*60*1000;


export const AONE_URL_COMBO = "http://penta.a.one.impact-ad.jp/combo?oid=b25b43b24a9e171b&dd_rft=j&dd_jsonp=aonetag&src=http%3a%2f%2fwww%2edac%2eco%2ejp%2f%3fsample%3dsmcc";

export const AONE_URL_DD = "http://penta.a.one.impact-ad.jp/dd?oid=b25b43b24a9e171b&rft=j"

export const AONE_SEG_LOCALSTORAGE_KEY = "aone_seg";