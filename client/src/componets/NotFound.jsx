import React from 'react';
import { Button } from 'react-bootstrap';

const NotFound = ({ handleModalClose }) => {
    return (
        <div className="text-center">
            <h1>404</h1>
            <p>Page Not Found</p>
            <Button variant="secondary" onClick={handleModalClose}>
                Close
            </Button>
        </div>
    );
};

export default NotFound;
