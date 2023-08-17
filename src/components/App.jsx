import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Button from 'components/Button';

const API_KEY = '37654239-10094e2a01db37edd26da2ebf';

const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchData = query => {
      return fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(data => data.hits)
        .catch(error => {
          throw error;
        });
    };

    if (!query) {
      return;
    }

    if (page === 1) {
      setStatus('loading');

      fetchData(query)
        .then(data => {
          setData(data);
          setStatus('ready');
        })
        .catch(error => {
          setError(error);
          setStatus('error');
        });
      return;
    }

    if (page !== 1) {
      setStatus('load-more');

      fetchData(query)
        .then(data => {
          setData(prevState => [...prevState, ...data]);
          setStatus('ready');
        })
        .catch(error => {
          setError(error);
          setStatus('error');
        });
      return;
    }
  }, [page, query]);

  // // FETCH QUERY
  // useEffect(() => {
  //   if (!query) {
  //     return;
  //   }

  //   setStatus('loading');

  //   fetchData(query)
  //     .then(data => {
  //       setData(data);
  //       setStatus('ready');
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setStatus('error');
  //     });
  // }, [query]);

  // // LOAD MORE
  // useEffect(() => {
  //   if (page === 1) {
  //     return;
  //   }
  //   setStatus('load-more');

  //   fetchData(query)
  //     .then(data => {
  //       setData(prevState => [...prevState, ...data]);
  //       setStatus('ready');
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setStatus('error');
  //     });
  // }, [page]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  const getModalImg = modalImg => {
    setModalImg(modalImg);
  };

  const resetModalImg = () => {
    setModalImg('');
  };

  const toggleBodyScroll = () => {
    if (modalImg) {
      document.body.classList.add('fixed');
    } else {
      document.body.classList.remove('fixed');
    }
  };

  // RENDER
  const renderSearchbar = () => {
    return <Searchbar onSubmit={handleSearch} />;
  };

  const renderImageGallery = () => {
    return (
      <ImageGallery>
        <ImageGalleryItem data={data} onClick={getModalImg} />
      </ImageGallery>
    );
  };

  const renderModal = () => {
    if (modalImg) {
      return (
        <Modal
          modalImg={modalImg}
          resetImg={resetModalImg}
          toggleScroll={toggleBodyScroll}
        />
      );
    }
    return null;
  };

  const renderButton = () => {
    return <Button onClick={handleButtonClick} />;
  };

  const renderLoader = () => {
    return <Loader />;
  };

  const renderError = () => {
    return (
      <div className="App">
        {renderSearchbar()}
        <h1>{error}</h1>
      </div>
    );
  };

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return renderSearchbar();

      case 'loading':
        return (
          <div className="App">
            {renderSearchbar()}
            {renderLoader()}
          </div>
        );

      case 'load-more':
        return (
          <div className="App">
            {renderSearchbar()}
            {renderImageGallery()}
            {renderModal()}
            {renderButton()}
            {renderLoader()}
          </div>
        );

      case 'ready':
        return (
          <div className="App">
            {renderSearchbar()}
            {renderImageGallery()}
            {renderModal()}
            {renderButton()}
          </div>
        );

      case 'error':
        return renderError();

      default:
        return null;
    }
  };

  return renderContent();
};

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
