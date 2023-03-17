import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <li
        className={css.imageGalleryItemimage}
        key={this.props.id}
        onClick={this.toggleModal}
      >
        <img lassName={css.imageGalleryItem} src={this.props.webformatURL} alt={this.props.tags} />
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            id={this.props.id}
            tags={this.props.tags}
            largeImageURL={this.props.largeImageURL}
          />
        )}
      </li>
    );
  }
}
// {this.state.showModal && (
//     <Modal  onClose={this.toggleModal}
//     id={this.props.id}
//     tag={this.props.tag}
//     modalPhoto={this.props.largeImageURL}/>
// )}
