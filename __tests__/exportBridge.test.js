import exportBridge from '../src/modules/exportBridge';
import { normalizeExportPayload } from '../src/utils/export';

function installBridge() {
  const messages = [];
  let nativeClicks = 0;
  let objectUrlId = 0;

  class NativeBlob {
    constructor(parts, options) {
      this.parts = parts || [];
      this.type = (options && options.type) || '';
      this.size = this.parts.join('').length;
    }
  }

  class Anchor {
    constructor(href, name) {
      this.href = href;
      this.attributes = { href, download: name };
    }

    getAttribute(name) {
      return this.attributes[name] || null;
    }

    click() {
      nativeClicks += 1;
    }
  }

  class Form {
    getAttribute() {
      return '';
    }

    querySelector() {
      return null;
    }

    submit() {}
  }

  class Reader {
    readAsDataURL(blob) {
      const bytes = Buffer.from(blob.parts.join('')).toString('base64');
      this.result = `data:${blob.type};base64,${bytes}`;
      this.onloadend();
    }
  }

  const windowObject = {
    Blob: NativeBlob,
    URL: {
      createObjectURL: () => `blob:test-${++objectUrlId}`,
    },
    webViewBridge: {
      send: (targetFunc, data) => messages.push({ targetFunc, data }),
    },
  };

  const evaluate = new Function(
    'window',
    'HTMLAnchorElement',
    'HTMLFormElement',
    'FileReader',
    'WeakSet',
    'btoa',
    'unescape',
    'encodeURIComponent',
    'decodeURIComponent',
    exportBridge
  );
  evaluate(
    windowObject,
    Anchor,
    Form,
    Reader,
    WeakSet,
    value => Buffer.from(value, 'binary').toString('base64'),
    global.unescape,
    encodeURIComponent,
    decodeURIComponent
  );

  return {
    Anchor,
    messages,
    nativeClicks: () => nativeClicks,
    windowObject,
  };
}

describe('FusionCharts WebView export bridge', () => {
  it('captures a data URL download and suppresses the browser click', () => {
    const bridge = installBridge();
    const anchor = new bridge.Anchor(
      'data:image/png;base64,cG5n',
      'revenue.png'
    );

    anchor.click();

    expect(bridge.nativeClicks()).toBe(0);
    expect(bridge.messages).toEqual([
      {
        targetFunc: null,
        data: {
          eventName: 'download',
          name: 'revenue.png',
          edata: 'data:image/png;base64,cG5n',
        },
      },
    ]);
  });

  it('captures Blob-based CSV downloads with the requested filename', () => {
    const bridge = installBridge();
    const blob = new bridge.windowObject.Blob(['a,b\n1,2'], {
      type: 'text/csv;base64;',
    });
    const url = bridge.windowObject.URL.createObjectURL(blob);
    const anchor = new bridge.Anchor(url, 'values.csv');

    anchor.click();

    expect(bridge.nativeClicks()).toBe(0);
    expect(bridge.messages[0].data).toEqual({
      eventName: 'download',
      name: 'values.csv',
      edata: `data:text/csv;base64,${Buffer.from('a,b\n1,2').toString('base64')}`,
    });
  });
});

describe('normalizeExportPayload', () => {
  it('removes path traversal and returns the base64 body', () => {
    expect(
      normalizeExportPayload({
        name: '../../report.csv',
        edata: 'data:text/csv;base64,YSxi',
      })
    ).toEqual({
      base64: 'YSxi',
      extension: 'csv',
      fileName: 'report.csv',
    });
  });

  it('rejects unsupported or non-base64 payloads', () => {
    expect(() =>
      normalizeExportPayload({ name: 'report.html', edata: 'data:text/html;base64,eA==' })
    ).toThrow('Unsupported FusionCharts export filename');
    expect(() =>
      normalizeExportPayload({ name: 'report.svg', edata: 'data:image/svg+xml,<svg />' })
    ).toThrow('must be a base64 data URL');
    expect(() =>
      normalizeExportPayload({ name: 'report.png', edata: 'data:text/html;base64,eA==' })
    ).toThrow('MIME type does not match .png');
    expect(() =>
      normalizeExportPayload({ name: 'report.pdf', edata: 'data:application/pdf;base64,***' })
    ).toThrow('contains invalid base64');
  });
});
