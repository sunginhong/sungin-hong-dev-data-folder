import React, { use, useEffect, useState } from 'react';
import './thingsBooks.css';
import '../../styles/storiesStyle.css'

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
            ThingsBooks Component
        </>
    );
};