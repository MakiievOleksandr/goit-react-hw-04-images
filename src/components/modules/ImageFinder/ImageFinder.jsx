import { useState, useEffect } from 'react';
import { Bars } from 'react-loader-spinner';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/shared/Button/Button';
import ImageDetails from './ImageDetails/ImageDetails';

import Modal from 'components/shared/Modal/Modal';

import { searchImage } from 'components/shared/services/images-api';

const ImageFinder = () => {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(0);

  const handleSubmitBtn = query => {
    if (searchQuery === query) {
      return alert('Please try again with another word.');
    }
    setSearchQuery(query);
    setPage(1);
    setGallery([]);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data, perPage } = await searchImage(searchQuery, page);
        if (data.totalHits === 0) {
          return (
            setLoading(false),
            alert('Wrong query! Please, try with another word')
          );
        }
        setPerPage(perPage);
        setGallery(prevState => [...prevState, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, searchQuery]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showImage = img => {
    setDetails(img);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDetails(null);
  };

  return (
    <div>
      <div>
        <Searchbar searchQuery={searchQuery} onSubmit={handleSubmitBtn} />
      </div>
      <div className="gallery">
        <ImageGallery
          items={gallery}
          showImage={showImage}
          query={searchQuery}
        />
        {loading && (
          <Bars
            height="80"
            width="180"
            color="#3f51b5"
            ariaLabel="bars-loading"
            wrapperStyle={{
              marginLeft: '50vw',
            }}
            wrapperClass=""
            visible={true}
          />
        )}
        {error && loading ? loading && <p>{error}</p> : <p>{error}</p>}
      </div>
      {!loading && gallery.length % perPage === 0 && gallery.length > 0 && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {showModal && (
        <Modal close={closeModal}>
          <ImageDetails details={details} />
        </Modal>
      )}
    </div>
  );
};

export default ImageFinder;
