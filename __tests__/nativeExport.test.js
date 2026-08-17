import ReactNativeFusionCharts from '../src/FusionCharts';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const mockWriteFile = jest.fn(() => Promise.resolve());
const mockShareOpen = jest.fn(() => Promise.resolve());

jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

jest.mock('@dr.pogodin/react-native-fs', () => ({
  __esModule: true,
  default: {
    DocumentDirectoryPath: '/documents',
    writeFile: (...args) => mockWriteFile(...args),
  },
}));

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  AndroidImportance: { HIGH: 4 },
  default: {
    createChannel: jest.fn(),
    displayNotification: jest.fn(),
    requestPermission: jest.fn(),
  },
}));

jest.mock('react-native-share', () => ({
  __esModule: true,
  default: {
    open: (...args) => mockShareOpen(...args),
  },
}));

jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: { saveAsset: jest.fn() },
}));

describe('native export pipeline', () => {
  beforeEach(() => {
    mockWriteFile.mockClear();
    mockShareOpen.mockClear();
  });

  it('writes, shares, saves an image, and sends the completion notification', async () => {
    const wrapper = new ReactNativeFusionCharts({});
    wrapper.savePicture = jest.fn(() => Promise.resolve());
    wrapper.requestUserPermission = jest.fn(() => Promise.resolve());
    wrapper.scheduleNotification = jest.fn(() => Promise.resolve());

    await wrapper.exportData({
      name: '../quarterly.png',
      edata: 'data:image/png;base64,cG5n',
    });

    expect(mockWriteFile).toHaveBeenCalledWith('/documents/quarterly.png', 'cG5n', 'base64');
    expect(mockShareOpen).toHaveBeenCalledWith({
      url: 'file:///documents/quarterly.png',
      name: 'quarterly.png',
      failOnCancel: false,
    });
    expect(wrapper.savePicture).toHaveBeenCalledWith('file:///documents/quarterly.png');
    expect(wrapper.requestUserPermission).toHaveBeenCalledTimes(1);
    expect(wrapper.scheduleNotification).toHaveBeenCalledWith(
      { name: 'quarterly.png' },
      'file:///documents/quarterly.png'
    );
  });

  it('does not send document exports to the photo library', async () => {
    const wrapper = new ReactNativeFusionCharts({});
    wrapper.savePicture = jest.fn(() => Promise.resolve());
    wrapper.requestUserPermission = jest.fn(() => Promise.resolve());
    wrapper.scheduleNotification = jest.fn(() => Promise.resolve());

    await wrapper.exportData({
      name: 'values.csv',
      edata: 'data:text/csv;base64,YSxi',
    });

    expect(wrapper.savePicture).not.toHaveBeenCalled();
    expect(mockWriteFile).toHaveBeenCalledWith('/documents/values.csv', 'YSxi', 'base64');
  });

  it('waits for the photo-library save to finish', async () => {
    let finishSave;
    CameraRoll.saveAsset.mockReturnValueOnce(
      new Promise(resolve => {
        finishSave = resolve;
      })
    );
    const wrapper = new ReactNativeFusionCharts({});
    let completed = false;
    const save = wrapper.savePicture('file:///documents/chart.png').then(() => {
      completed = true;
    });

    await Promise.resolve();
    expect(completed).toBe(false);
    finishSave();
    await save;
    expect(completed).toBe(true);
  });

  it('ignores malformed WebView messages without invoking arbitrary methods', async () => {
    const wrapper = new ReactNativeFusionCharts({});
    wrapper.exportData = jest.fn();

    await wrapper.onWebViewMessage({ nativeEvent: { data: '{"targetFunc":"constructor"}' } });
    await wrapper.onWebViewMessage({ nativeEvent: { data: 'not-json' } });

    expect(wrapper.exportData).not.toHaveBeenCalled();
  });
});
