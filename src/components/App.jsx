import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { getImg } from 'services/getImg';

import css from './App.module.css';

export class App extends Component {
  state = {
    photo: [],
    page: 1,
    inputValue: '',
    error: '',
    isLoading: false,
    photoOnPage: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { page, inputValue } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        this.setState({ isLoading: true });
        const photo = await getImg(inputValue, page);

        // this.totalPhoto = response.totalHits;

        this.setState(state => ({
          photo: [...state.photo, ...photo],
          photoOnPage: photo.length,
       }));
      } catch (error) {
        this.setState({ error: error.massege });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  formSubmit = inputValue => {
    this.setState({ inputValue: inputValue, page: 1, photo: [] });
  };
  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  render() {
    const { photo, isLoading, photoOnPage } = this.state;
    return (
      <>
        <div className={css.app}>
          <Searchbar onSubmit={this.formSubmit} />
         
          { photo.length > 0 && <ImageGallery items={photo} />}
           {isLoading && <Loader />}
          {photoOnPage >=12 && <LoadMoreButton onClick={this.onLoadMoreClick} />}
        </div>
      </>
    );
  }
}
