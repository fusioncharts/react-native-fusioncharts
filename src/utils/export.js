const SUPPORTED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'svg',
  'pdf',
  'csv',
  'xlsx',
]);

const MIME_TYPES_BY_EXTENSION = {
  jpg: new Set(['image/jpeg']),
  jpeg: new Set(['image/jpeg']),
  png: new Set(['image/png']),
  svg: new Set(['image/svg+xml']),
  pdf: new Set(['application/pdf']),
  csv: new Set(['text/csv']),
  xlsx: new Set([
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]),
};

export function normalizeExportPayload(data) {
  if (!data || typeof data.name !== 'string' || typeof data.edata !== 'string') {
    throw new Error('Invalid FusionCharts export payload');
  }

  const fileName = data.name
    .split(/[\\/]/)
    .pop()
    .replace(/[^a-zA-Z0-9._ -]/g, '_');
  const dot = fileName.lastIndexOf('.');
  const extension = dot >= 0 ? fileName.slice(dot + 1).toLowerCase() : '';
  if (!fileName || !SUPPORTED_EXTENSIONS.has(extension)) {
    throw new Error(`Unsupported FusionCharts export filename: ${data.name}`);
  }

  const comma = data.edata.indexOf(',');
  const metadata = comma >= 0 ? data.edata.slice(0, comma) : '';
  if (comma < 0 || !/(^|;)base64(?:;|,|$)/i.test(metadata)) {
    throw new Error('FusionCharts export payload must be a base64 data URL');
  }
  const mimeType = metadata.slice(5).split(';')[0].toLowerCase();
  if (!MIME_TYPES_BY_EXTENSION[extension].has(mimeType)) {
    throw new Error(`FusionCharts export MIME type does not match .${extension}`);
  }

  const base64 = data.edata.slice(comma + 1).replace(/\s/g, '');
  if (!base64) {
    throw new Error('FusionCharts export payload is empty');
  }
  if (!/^[a-zA-Z0-9+/]*={0,2}$/.test(base64) || base64.length % 4 !== 0) {
    throw new Error('FusionCharts export payload contains invalid base64');
  }

  return {
    base64,
    extension: extension === 'jpeg' ? 'jpg' : extension,
    fileName,
  };
}
