import React, { useState , useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import LoginRegisterCard from '../components/login_register_card'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#root')
 
// Modal holding Login/Registration Card
class LoginRegisterModal extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false
    }

    this.closeModal = this.closeModal.bind(this)
  }
  
  // This function be accessed from parent component
  // using const modal_ref = useRef() and <LoginRegisterModal ref = modal_ref />
  // You can then call modal-ref.current.openModal() to close the modal
  openModal() {
    this.setState({modalIsOpen: true})
  }

  // This function be accessed from parent component
  // using const modal_ref = useRef() and <LoginRegisterModal ref = modal_ref />
  // You can then call modal-ref.current.closeModal() to close the modal
  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.setState({modalIsOpen: false})}
          style={customStyles}
        >
          <LoginRegisterCard onSuccess={this.closeModal}/>
        </Modal>
      </div>
    );
  }
}

export default LoginRegisterModal