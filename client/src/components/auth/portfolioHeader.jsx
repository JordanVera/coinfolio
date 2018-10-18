import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';

const PortfolioHeader = (props) => {
  return (
    <Row>
    <Col sm={8}>
      <p>Coin Name</p>
    </Col>
    <Col sm={2}>
      <p>Shares</p>
    </Col>
    <Col sm={2}>
      <p>Buy Price</p>
    </Col>
  </Row>
  )
}

export default PortfolioHeader;
