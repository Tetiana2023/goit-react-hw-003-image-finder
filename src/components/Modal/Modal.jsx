import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }
  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  hendleBackdropClick = event => {
    if ( event.currentTarget === event.target){
        this.props.onClose()
    }

  }

  render() {
    return createPortal(
      <div className={css.overlay} onClose={this.hendleBackdropClick}>
        <div className={css.modal} id={this.props.id}>
          <img src={this.props.largeImageURL} alt={this.props.tag} />
        </div>
      </div>,
      modalRoot
    );
  }
}
