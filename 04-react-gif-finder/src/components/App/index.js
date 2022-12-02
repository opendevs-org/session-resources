import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { Gifs } from '../Gifs';
import { BallTriangle } from 'react-loader-spinner'

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(1);
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('random');

  const loadGifs = async (query, position = 1) => {
    const response = await fetch(`https://api.tenor.com/v1/search?q=${query}&key=${process.env.REACT_APP_API_KEY}&limit=20&pos=${position}`);
    const data = await response.json();

    return data.results;
  }

  const updateSearch = e => setSearch(e.target.value);

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const reload = () => setQuery('random')

  const loadMore = async (query) => {
    setPosition((position) => position + 21);
    const moreGifs = await loadGifs(query, position);
    setGifs([...gifs, ...moreGifs]);
    setIsLoading(false);
  }

  const handleContainerScrollEvent = () => {
    console.log('handleContainerScrollEvent');
    setIsLoading(true)
    loadMore(query)
  }

  const scrollRef = useBottomScrollListener(handleContainerScrollEvent, {
    offset: 100,
    debounce: 100,
  })

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const all = await loadGifs(query);
      setGifs(all);
      setIsLoading(false);
    })();
  }, [query])

  return (
    <div className="App" ref={scrollRef}>
      <header className="header">
        <h1 className="header__title" onClick={reload}>React GiF Finder</h1>
        <form onSubmit={getSearch} className="header__search_form">
          <input className="header__search_bar" type="text" value={search}
            onChange={updateSearch} placeholder="Search here..." />
          <button className="header__search_button" type="submit"><FaSearch /></button>
        </form>

        <p className="header__results">showing results for: {query}</p>
      </header>
      <div className='app__gifs'>
        {gifs.length
          ?
          <>
            {gifs.map(gif => (
              <Gifs
                img={gif.media[0].tinygif.url}
                key={gif.id}
              />
            ))}
            {
              isLoading &&
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="gifs-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              />
            }
          </>
          : isLoading ? <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="gifs-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          /> : <p className="header__results">No results found</p>
        }
      </div>
    </div>
  );
}

export { App };
