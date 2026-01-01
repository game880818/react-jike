import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

// 图表组件 ： 接收 title, xData, seriesData, style 四个 props
const Chart = ({ title, xData, seriesData, style = {} }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: seriesData,
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }, [xData, seriesData, title])

  return (
    <div className="chart" ref={chartRef} style={style}></div>
  )
}

export default Chart