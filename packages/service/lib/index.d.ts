export interface iZeesuuService {
    [key: string]: (data?: {
        [key: string]: any;
    }, option?: any) => any;
}
export interface iZeesuuUrl {
    [key: string]: string;
}
declare global {
    interface Window {
        ZeesuuService: iZeesuuService;
        ZeesuuUrl: iZeesuuUrl;
    }
}
declare const _default: any;
export default _default;
