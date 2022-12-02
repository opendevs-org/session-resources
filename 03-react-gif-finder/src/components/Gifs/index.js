import './Gifs.css';

const Gifs = ({ img }) => (
    <div className="search__gifs">
        <img className="search__image" src={img} alt="tenorgif" />
    </div>
);

export { Gifs };
