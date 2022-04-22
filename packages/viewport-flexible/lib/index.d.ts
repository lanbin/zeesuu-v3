declare interface ICreateViewportMeta {
    width?: number;
    debug?: boolean;
}
declare const setViewport: (createViewportMeta?: ICreateViewportMeta) => void;
export default setViewport;
