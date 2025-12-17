import React, { use, useEffect, useState } from 'react';
import './thingsBooks.css';
import '../../styles/storiesStyle.css'
import Level2 from './Components/OnBoarding/Level_02/Level2.tsx';

interface props {
}

export const ThingsBooks: React.FC<props> = ({...props}) => {
    const [docsElement, setDocsElement] = React.useState<boolean>(false);

    React.useEffect(() => {
        const docsElement = document.getElementById('storybook-docs');
        if (docsElement && docsElement.getAttribute('hidden') === 'true') {
        setDocsElement(true);
        } else {
        setDocsElement(false);
        }
    }, []);

    return (
        <>
            <div className="thingsBooks_main_div">
                <Level2 />
            </div>
        </>
    );
};