import React from 'react';
import imp from '../../../../../../assets/img/icons/import.svg'

const ImportButton = () => {
    return (
        <button>
            <object type="image/svg+xml" data={imp}/>
            <span>Импортировать меню</span>
        </button>
    );
};

export default ImportButton;