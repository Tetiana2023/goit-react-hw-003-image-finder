import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import css from './App.module.css';
import { getImg } from 'services/getImg';

export class App extends Component {
  state = {
    photo: [],
    page: 1,
    inputValue: '',
    error: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, inputValue } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      const photo = await getImg(inputValue, page);

      this.setState(state => ({
        photo: [...state.photo, ...photo],
        // loadMoreButton: this.state.page < Math.ceil(response.totalHits / 12),
      }));
    }
  }

  formSubmit = inputValue => {
    this.setState({ inputValue: inputValue, page: 1, photo: [] });
  };

  render() {
    const { photo } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmit} />

        <ImageGallery items={photo} />
      </div>
    );
  }
}
