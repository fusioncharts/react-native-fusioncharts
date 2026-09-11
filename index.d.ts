import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ChartConfig {
  type?: string;
  width?: string | number;
  height?: string | number;
  dataFormat?: string;
  dataSource?: any;
  dataJson?: any;
  schemaJson?: any;
  [key: string]: any;
}

/** Chart event name -> handler. Handlers receive the FusionCharts event payload. */
export interface ChartEvents {
  [eventName: string]: (eventObj: any, dataObj: any) => void;
}

export interface ReactNativeFusionChartsProps {
  chartConfig: ChartConfig;
  /** Extra FusionCharts modules to inject, e.g. ['timeseries', 'maps']. */
  modules?: string[];
  events?: ChartEvents;
  style?: StyleProp<ViewStyle>;
  /** Receives a callback for invoking FusionCharts APIs inside the WebView. */
  onInitialized?: (runFcApiInWebView: (...args: any[]) => void) => void;
  onDataTableInitialized?: (dataTableOperation: (...args: any[]) => void) => void;
  onDataStoreInitialized?: (dataStoreOperation: (...args: any[]) => void) => void;
  [key: string]: any;
}

declare const ReactNativeFusionCharts: React.ComponentType<ReactNativeFusionChartsProps>;

export default ReactNativeFusionCharts;
