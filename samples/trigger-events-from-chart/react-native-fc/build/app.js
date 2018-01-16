
window.loadApp = function (data) {
  Vue.use(VueFusionCharts);

  const app = new Vue({
    el: '#app',
    data: {
      type: 'column2d',
      width: '100%',
      height: '90%',
      dataFormat: 'json',
      dataSource: data,
      events: {
        dataplotRollOver: function dataplotRollOver(eventObj, dataObj) {
          app.actualValue = dataObj.dataValue;
        }
      },
      actualValue: ''
    }
  });
};
