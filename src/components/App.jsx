import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import {Loader} from './Loader/Loader';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton'
import { getImg } from 'services/getImg';

import css from './App.module.css';

export class App extends Component {
  state = {
    photo: [],
    page: 1,
    inputValue: '',
    error: '',
    isLoading: false,
    btnLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, inputValue } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
         const photo = await getImg(inputValue, page);

      this.setState(state => ({
        photo: [...state.photo, ...photo],
        btnLoadMore: true,
       
        
      }))
      } catch (error) {
        this.setState({ error: error.massege })
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
    this.setState(prevState => ({page: prevState.page + 1}))
   
  }

  render() {
    const { photo, isLoading, btnLoadMore} = this.state;
    return (
      <>
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmit} />
        {isLoading && <Loader/>}

        <ImageGallery items={photo} />
       {btnLoadMore && <LoadMoreButton onClick={this.onLoadMoreClick}/>}
      </div>
      </>
      
    );
  }
}
