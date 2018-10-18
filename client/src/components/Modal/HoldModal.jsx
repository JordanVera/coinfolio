import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class HoldModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>hold</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form>
                <div className="container">
                    <label htmlFor="shares"><b>shares</b></label>
                    <input type="number" placeholder="Enter Amount of Coin Held" name="shares" required /> 

                    <hr style={{ marginTop: '10px', marginBottom: '10px' }} />

                    <label htmlFor="buyPrice"><b>buy price</b></label>
                    <input type="number" placeholder="Enter buy price" name="buyPrice" required  />

                    <input type="submit" value="submit" />
                </div>
            </form>
          </ModalBody>
          <ModalFooter>
            {/* insert copyright info */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HoldModal;