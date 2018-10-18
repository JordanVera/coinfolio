import React, { PureComponent, Fragment } from 'react';
import { Container, Card, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';
import { pickSvgUrl } from '../../icons';
import ChartWrapper from '../chart/ChartWrapper';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { API_URL_COINCAP } from '../../constans';
import { ROUTE_HOME } from '../RootRoutes';
import Helmet from 'react-helmet';
import Loader from '../Loader/Loader';
import Exchange from '../Exchange';
import { ThemeConsumer } from '../theme/Theme';

class TrackerItemFull extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      item: null,
      loading: true
    }
  }

  componentDidMount() {
    const { id, history } = this.props;
    fetch(`${API_URL_COINCAP}/page/${id}`)
      .then(resp => resp.json())
      .then(data => {
        if (data && data.display_name) {
          return this.setState({ item: data, loading: false });
        } else {
          history.replace(ROUTE_HOME);
        }
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const { item, loading } = this.state;
    return (
      <Container className="full-item loader-wrapper py-sm-2">
        {!loading && item ?
          <Fragment>
            <Helmet
              title={item.display_name} />

            <Row>
              <Col className="mr-3" xs={12} sm={3}>
                <img className="mb-3 logo-img md" src={pickSvgUrl(item.id)} alt={`Logo ${item.display_name}`} />
              </Col>
              <Col className="py-2">
                <h1>{item.display_name}</h1>
                <h4>
                  <FormattedNumber value={item.supply} />
                  &nbsp;
                  <small>
                    <FormattedMessage id="app.сirculating-btc-supply"
                      defaultMessage="Circulating BTC Supply" />
                  </small>
                </h4>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col xs={12} sm={4} className="mb-2">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <FormattedMessage id="app.current-value"
                        defaultMessage="Current Value" />
                    </CardTitle>
                    <CardText>
                      <FormattedNumber value={item.price} />
                      ({item.cap24hrChange}%)
                            </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} sm={4} className="mb-2">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <FormattedMessage id="app.market-cap"
                        defaultMessage="Market Cap" />
                    </CardTitle>
                    <CardText>
                      <FormattedNumber value={item.market_cap} />
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} sm={4} className="mb-2">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <FormattedMessage id="app.24htVoume"
                        defaultMessage="24hr Volume" />
                    </CardTitle>
                    <CardText>
                      <FormattedNumber value={item.volume} />
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <ThemeConsumer>
              <ChartWrapper id={item.id} />
            </ThemeConsumer>

            <div className="text-right item-footer">
              <Exchange currency={item.id} type="primary" />
            </div>

          </Fragment>
          :
          <Loader />}
      </Container>
    )
  }
}

export default withRouter(TrackerItemFull);
