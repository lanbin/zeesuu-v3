declare interface ICreateViewportMeta {
  width?: number;
  debug?: boolean;
}

const setViewport = function (
  createViewportMeta: ICreateViewportMeta = { width: 0, debug: false },
) {
  if (!window || !document) {
    return;
  }

  if (createViewportMeta?.width && !document.querySelector('meta[name="viewport"]')) {
    const metaElement = document.createElement('meta');
    metaElement.name = 'viewport';
    metaElement.content = `width=${createViewportMeta.width}`;
    document.querySelector('head')?.appendChild(metaElement);
  }

  var metaEl = document.querySelector('meta[name="viewport"]') as HTMLMetaElement,
    metaCtt = metaEl ? metaEl.content : '',
    matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
    matchWidth = metaCtt.match(/width=([^,\s]+)/);

  if (metaEl && !matchScale && matchWidth && matchWidth[1] != 'device-width') {
    var width = parseInt(matchWidth[1]),
      iw = window.innerWidth || width,
      ih =
        window.innerHeight ||
        window.outerHeight ||
        window.screen.height ||
        window.screen.availHeight,
      ow = window.outerWidth || iw,
      sw = window.screen.width || iw,
      saw = window.screen.availWidth || iw,
      ish = window.screen.height || ih,
      sah = window.screen.availHeight || ih,
      w = Math.min(iw, ow, sw, saw, ish, sah),
      scale = w / width;

    if (scale < 1) {
      if (createViewportMeta?.debug) {
        console.info('@zeesuu-v3/viewport-flexible: setViewport: scale: ', scale);
      }

      metaEl.content +=
        ',initial-scale=' +
        scale +
        ',maximum-scale=' +
        scale +
        ',minimum-scale=' +
        scale +
        ',user-scalable=no';
    }
  }
};

export default setViewport;

