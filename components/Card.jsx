import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Optional: Add styles for the card

const Card = ({ title, description, imageUrl, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    onClick: PropTypes.func,
};

Card.defaultProps = {
    imageUrl: null,
    onClick: () => {},
};

export default Card;