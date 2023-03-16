import { Component } from 'react';
import css from './ImageGalleryItem.module.css';


export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () =>{
    this.setState(({ showModal})=>({
        showModal: !showModal,
    }))
  }

  render() {
    return (
      <li className={css.imageGalleryItem} onClick={this.toggleModal}>
        <img src="" alt="" />
        {showModal && (
            <img src="" alt=""  onClose={this.toggleModal}/>
        )}
      </li>
    );
  }
}
