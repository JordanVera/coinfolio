import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import isEqual from 'lodash/isEqual';
import AnimateRow from './AnimateRow';
import Exchange from '../Exchange';
import { pickSvgUrl } from '../../icons';
import { CHANGELLY_REF_ID } from '../../constans';

const pickCap24hrChangeColor = (val) => {
  if (val > 0) {
    return (
      <div className="d-inline-block text-success">
        <span className="d-inline-block font-xs app-arrow">&#9650;</span>
        <FormattedNumber value={val / 100} style="percent" />
      </div>
    )
  } else if (val < 0) {
    return (
      <div className="text-danger">
        <span className="font-xs app-arrow">&#9660;</span>
        <FormattedNumber value={val / 100} style="percent" />
      </div>
    )
  }
  return <FormattedNumber value={val / 100} style="percent" />;
}

class TrackerItem extends Component {

  shouldComponentUpdate(nextProps) {
    const { item, currency } = this.props;
    return item.short !== nextProps.item.short ||
      item.cap24hrChange !== nextProps.item.cap24hrChange ||
      currency.coef !== nextProps.currency.coef ||
      item.price !== nextProps.item.price ||
      !isEqual(item, nextProps.item);
  }

  sell = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://changelly.com/?ref_id=${CHANGELLY_REF_ID}`, '_blank');
  }

  buy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://changelly.com/?ref_id=${CHANGELLY_REF_ID}`, '_blank');
  }

  render() {
    const { item, currency } = this.props;
    const cap24hrChange = pickCap24hrChangeColor(item.cap24hrChange);
    return (
      <Link className="app-table-row" to={{
        pathname: `/currency/${item.short}`,
        state: { modal: true }
      }}>
        <AnimateRow value={item.price} key={`anim-${item.short}`} />
        <div className="app-table-col app-table-col-size-name">
          <img src={pickSvgUrl(item.short)} alt={`Logo ${item.long}`} width={32} height={32} />
          &nbsp;<Badge color="secondary" className="mx-1">{item.short}</Badge>&nbsp;
                    {item.long}
        </div>
        <div className="app-table-col text-right app-table-col-size-mktcap">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.market-cap"
              defaultMessage="Market Cap" />:</span>
          <FormattedNumber
            value={item.mktcap * currency.coef}
            currency={currency.key}
            style='currency'
            currencyDisplay='symbol' />
        </div>
        <div className="app-table-col text-right">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.price"
              defaultMessage="Price" />:</span>
          <FormattedNumber value={item.price * currency.coef} currency={currency.key}
            style='currency'
            currencyDisplay='symbol' />
        </div>
        <div className="app-table-col text-right">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.volume24"
              defaultMessage="Volume (24hr)" />:</span>
          <FormattedNumber value={item.usdVolume} />
        </div>
        <div className="app-table-col text-right">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.circulating-supply"
              defaultMessage=" Circulating Supply" />:</span>
          <FormattedNumber value={item.supply} />
        </div>
        <div className="app-table-col text-right app-table-col-size-cap24hrChange">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.change24"
              defaultMessage="Change (24hr)" />:</span>
          {cap24hrChange}
        </div>
        <div className="app-table-col text-right">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.trade"
              defaultMessage="Trade" />:</span>
          <Exchange currency={item.short} type="link" />
        </div>
      </Link>
    )
  }
}

export default TrackerItem;
