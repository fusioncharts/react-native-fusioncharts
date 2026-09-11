// Runs inside the WebView. FusionCharts' client export finishes as a browser
// download, which a native WebView cannot save by itself. Capture that payload
// and feed the wrapper's existing native file/share pipeline.
const exportBridge = `
(function installFusionChartsExportBridge() {
  if (window.__fusionChartsExportBridgeInstalled) { return; }
  window.__fusionChartsExportBridgeInstalled = true;

  var blobUrls = {};
  var pendingBlob = null;
  var capturedBlobs = typeof WeakSet === 'function' ? new WeakSet() : null;
  var supportedMimeTypes = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'text/csv': 'csv',
    'application/vnd.ms-excel': 'xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
  };

  function cleanMime(mime) {
    return String(mime || '').split(';')[0].toLowerCase();
  }

  function fileName(name, mime) {
    var value = String(name || 'FusionCharts').split(/[\\\\/]/).pop();
    if (/\\.(jpg|jpeg|png|svg|pdf|csv|xlsx)$/i.test(value)) { return value; }
    return value + '.' + (supportedMimeTypes[cleanMime(mime)] || 'bin');
  }

  function postDownload(name, dataUrl) {
    if (!window.webViewBridge || typeof window.webViewBridge.send !== 'function') {
      return false;
    }
    window.webViewBridge.send(null, {
      eventName: 'download',
      name: fileName(name, dataUrl.slice(5, dataUrl.indexOf(','))),
      edata: dataUrl
    });
    return true;
  }

  function captureDataUrl(url, name) {
    if (typeof url !== 'string' || url.indexOf('data:') !== 0) { return false; }
    var comma = url.indexOf(',');
    if (comma < 0) { return false; }
    var metadata = url.slice(5, comma);
    var mime = cleanMime(metadata);
    if (!supportedMimeTypes[mime]) { return false; }
    var dataUrl = url;
    if (!/(^|;)base64(?:;|$)/i.test(metadata)) {
      try {
        var decoded = decodeURIComponent(url.slice(comma + 1));
        dataUrl = 'data:' + mime + ';base64,' +
          btoa(unescape(encodeURIComponent(decoded)));
      } catch (error) {
        return false;
      }
    }
    return postDownload(name, dataUrl);
  }

  function captureBlob(blob, name) {
    if (!blob || typeof FileReader === 'undefined') { return false; }
    var mime = cleanMime(blob.type);
    if (!supportedMimeTypes[mime]) { return false; }
    if (capturedBlobs && capturedBlobs.has(blob)) { return true; }
    if (capturedBlobs) { capturedBlobs.add(blob); }
    var reader = new FileReader();
    reader.onloadend = function () {
      if (typeof reader.result === 'string') {
        var comma = reader.result.indexOf(',');
        if (comma >= 0) {
          postDownload(
            fileName(name, mime),
            'data:' + mime + ';base64,' + reader.result.slice(comma + 1)
          );
        }
      }
    };
    reader.readAsDataURL(blob);
    return true;
  }

  var NativeBlob = window.Blob;
  if (typeof NativeBlob === 'function') {
    window.Blob = function (parts, options) {
      var blob = new NativeBlob(parts || [], options || {});
      if (supportedMimeTypes[cleanMime(blob.type)]) { pendingBlob = blob; }
      return blob;
    };
    window.Blob.prototype = NativeBlob.prototype;
  }

  if (window.URL && typeof window.URL.createObjectURL === 'function') {
    var nativeCreateObjectURL = window.URL.createObjectURL;
    window.URL.createObjectURL = function (blob) {
      var url = nativeCreateObjectURL.apply(window.URL, arguments);
      if (blob && supportedMimeTypes[cleanMime(blob.type)]) {
        blobUrls[url] = blob;
        pendingBlob = blob;
      }
      return url;
    };
  }

  var nativeAnchorClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    var href = this.href || this.getAttribute('href') || '';
    var name = this.getAttribute('download');
    if (captureDataUrl(href, name)) { return; }
    if (blobUrls[href] && captureBlob(blobUrls[href], name)) {
      delete blobUrls[href];
      pendingBlob = null;
      return;
    }
    if (pendingBlob && name && captureBlob(pendingBlob, name)) {
      pendingBlob = null;
      return;
    }
    return nativeAnchorClick.apply(this, arguments);
  };

  var nativeFormSubmit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = function () {
    var action = String(this.getAttribute('action') || '');
    if (action.indexOf('export.api3.fusioncharts.com') >= 0 ||
        action.indexOf('//export.') >= 0) {
      var nameInput = this.querySelector(
        '[name="exportfilename"], [name="exportFileName"], [name="fileName"]'
      );
      captureBlob(pendingBlob, nameInput && nameInput.value);
      pendingBlob = null;
      return;
    }
    return nativeFormSubmit.apply(this, arguments);
  };
})();
`;

export default exportBridge;
