import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { injectIntl } from 'react-intl';
import ChartTooltip from './ChartTooltip';
import './Chart.css';

const caseGridColor = (theme) => theme === 'dark' ? '#333333' : '#ebebeb';

const prepareData = (data, formater) => {
  let array = [];
  if (data && data.price) {
    data.price.forEach((element, index) => {
      array.push({
        price: element[1],
        date: formater(element[0])
      })
    });
  }
  return array
}

const Chart = (props) => {
  const {
    data,
    intl: { formatDate, formatTime, formatNumber },
    selected,
    context: {
      theme
    }
  } = props;

  let formater;

  if (selected === '1day') {
    formater = (val) => formatTime(val, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false
    });
  } else {
    formater = (val) => formatDate(val, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const chartData = prepareData(data, formater);
  const gridStrokeColor = caseGridColor(theme);
  return (
    chartData ?
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} >
          <Line strokeWidth="2" dot={false} type="linear" dataKey="price" name="Price" stroke={'#0098ff'} />
          <CartesianGrid stroke={gridStrokeColor} strokeDasharray="10 1" />
          <XAxis type="category" dataKey="date" name="Date" />
          <YAxis tickFormatter={formatNumber} type="number" dataKey="price" name="Price" />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      :
      null
  )
};

export default injectIntl(Chart);
