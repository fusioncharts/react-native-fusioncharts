import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..');

describe('offline WebView assets', () => {
  it('pins and verifies every bundled font and license', () => {
    const manifest = JSON.parse(
      fs.readFileSync(
        path.join(root, 'docs/provenance/fusioncharts-fonts-4.2.2.json'),
        'utf8'
      )
    );

    expect(manifest.fusioncharts_version).toBe('4.2.2');
    expect(manifest.font_urls_rewritten).toBe(7);
    expect(manifest.remote_font_urls_allowed).toBe(0);
    expect(manifest.files).toHaveLength(10);

    for (const record of manifest.files) {
      const bytes = fs.readFileSync(path.join(root, record.path));
      expect(crypto.createHash('sha256').update(bytes).digest('hex')).toBe(
        record.sha256
      );
    }
  });

  it('ships seven embedded font data URLs and no Google Fonts URL', () => {
    const bundles = ['scripts.js', 'modules.js']
      .map(file => fs.readFileSync(path.join(root, 'src/modules', file), 'utf8'))
      .join('\n');

    expect(bundles).not.toContain('fonts.gstatic.com');
    expect(bundles.match(/data:font\/woff2;base64/g)).toHaveLength(7);
  });

  it('blocks WebView network connections and export form submissions', () => {
    const layout = fs.readFileSync(path.join(root, 'src/modules/layout.js'), 'utf8');

    expect(layout).toContain("connect-src 'none'");
    expect(layout).toContain("form-action 'none'");
    expect(layout).toContain('font-src data:');
  });
});
