import React from 'react';
import TrackerItem from './TrackerItem';
import { FormattedMessage } from 'react-intl';
import VirtualList from 'react-virtual-list';

const List = ({ virtual, currency }) => (
  <div style={virtual.style}>
    {
      virtual.items.map(item => (
        <TrackerItem
          key={item.short}
          item={item}
          currency={currency}
        />
      ))
    }
  </div>
);

const TrackerVirtualList = VirtualList()(List);

const mobileView = () => window.innerWidth < 768;

const TrackerList = (props) => {
  const { list, currency } = props;
  const itemHeight = mobileView() ? 360 : 50;
  return (
    list && list.length ?
      <div className="mb-3">
        <TrackerVirtualList
          items={list}
          itemHeight={itemHeight}
          currency={currency}
        />
      </div>
      :
      <div className="px-2 py-3">
        <FormattedMessage
          id="app.list-empty"
          defaultMessage="No results" />
      </div>
  )
}

export default TrackerList;
