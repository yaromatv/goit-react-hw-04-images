import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Button from 'components/Button';

const API_KEY = '37654239-10094e2a01db37edd26da2ebf';

class App extends Component {
  state = {
    query: '',
    data: [],
    error: null,
    page: 1,
    modalImg: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ page: 1, status: 'loading' }, () =>
        this.fetchData(this.state.query)
          .then(data => {
            this.setState({ data, status: 'ready' });
          })
          .catch(error => this.setState({ error, status: 'error' }))
      );
    }
  }

  handleSearch = query => {
    this.setState({ query });
  };

  async fetchData(query) {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();
    // this.setState({ data: data.hits });
    return data.hits;
  }

  getModalImg = modalImg => {
    this.setState({ modalImg });
  };

  resetModalImg = () => {
    this.setState({ modalImg: '' });
  };

  toggleBodyScroll = () => {
    const { modalImg } = this.state;
    if (modalImg) {
      document.body.classList.add('fixed');
    } else {
      document.body.classList.remove('fixed');
    }
  };

  handleButtonClick = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        status: 'load-more',
      }),
      () => {
        this.fetchData(this.state.query)
          .then(data =>
            this.setState(prevState => ({
              data: [...prevState.data, ...data],
              status: 'ready',
            }))
          )
          .catch(error => this.setState({ error, status: 'error' }));
      }
    );
  };

  renderSearchbar() {
    return <Searchbar onSubmit={this.handleSearch} />;
  }

  renderImageGallery() {
    return (
      <ImageGallery>
        <ImageGalleryItem data={this.state.data} onClick={this.getModalImg} />
      </ImageGallery>
    );
  }

  renderModal() {
    if (this.state.modalImg) {
      return (
        <Modal
          modalImg={this.state.modalImg}
          resetImg={this.resetModalImg}
          toggleScroll={this.toggleBodyScroll}
        />
      );
    }
    return null;
  }

  renderButton() {
    return <Button onClick={this.handleButtonClick} />;
  }

  renderLoader() {
    return <Loader />;
  }

  renderError() {
    return (
      <div className="App">
        {this.renderSearchbar()}
        <h1>{this.state.error}</h1>
      </div>
    );
  }

  renderContent() {
    switch (this.state.status) {
      case 'idle':
        return this.renderSearchbar();

      case 'loading':
        return (
          <div className="App">
            {this.renderSearchbar()}
            {this.renderLoader()}
          </div>
        );

      case 'load-more':
        return (
          <div className="App">
            {this.renderSearchbar()}
            {this.renderImageGallery()}
            {this.renderModal()}
            {this.renderButton()}
            {this.renderLoader()}
          </div>
        );

      case 'ready':
        return (
          <div className="App">
            {this.renderSearchbar()}
            {this.renderImageGallery()}
            {this.renderModal()}
            {this.renderButton()}
          </div>
        );

      case 'error':
        return this.renderError();

      default:
        return null;
    }
  }

  render() {
    return this.renderContent();
  }
}

// STATE MACHINE
// render() {
//   if (this.state.status === 'idle') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearch} />
//       </div>
//     );
//   }

//   if (this.state.status === 'loading') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearch} />
//         <Loader />
//       </div>
//     );
//   }

//   if (this.state.status === 'load-more') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearch} />
//         <ImageGallery>
//           <ImageGalleryItem
//             data={this.state.data}
//             onClick={this.getModalImg}
//           />
//         </ImageGallery>
//         {this.state.modalImg && (
//           <Modal
//             modalImg={this.state.modalImg}
//             resetImg={this.resetModalImg}
//             toggleScroll={this.toggleBodyScroll}
//           />
//         )}
//         <Button onClick={this.handleButtonClick} />
//         <Loader />
//       </div>
//     );
//   }

//   if (this.state.status === 'ready') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearch} />
//         <ImageGallery>
//           <ImageGalleryItem
//             data={this.state.data}
//             onClick={this.getModalImg}
//           />
//         </ImageGallery>
//         {this.state.modalImg && (
//           <Modal
//             modalImg={this.state.modalImg}
//             resetImg={this.resetModalImg}
//             toggleScroll={this.toggleBodyScroll}
//           />
//         )}
//         <Button onClick={this.handleButtonClick} />
//       </div>
//     );
//   }

//   if (this.state.status === 'error') {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearch} />
//         <h1>{this.state.error}</h1>
//       </div>
//     );
//   }

//CLASSIC
// return (
//   <div className="App">
//     <Searchbar onSubmit={this.handleSearch} />
//     <ImageGallery>
//       <ImageGalleryItem data={this.state.data} onClick={this.getModalImg} />
//     </ImageGallery>
//     {this.state.modalImg && (
//       <Modal modalImg={this.state.modalImg} resetImg={this.resetModalImg} />
//     )}
//   </div>
// );
//   }
// }

export default App;
