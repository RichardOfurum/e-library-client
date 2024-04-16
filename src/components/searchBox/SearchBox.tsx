import React, { useEffect, useRef } from 'react';
import styles from './SearchBox.module.css';
import { useRouter } from 'next/navigation';
import { BiCloset } from 'react-icons/bi';
import { FaClosedCaptioning } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';

type Props = {
    setShowSearchBox: (setShowSearchBox: boolean) => void
}
const SearchBox:React.FC<Props> = ({setShowSearchBox}) => {
    const searchRef = useRef<HTMLInputElement>(null); // Specify the HTMLInputElement type

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchTerm = searchRef.current?.value; // Access the value property of the input element
        console.log('Search Term:', searchTerm);
        // Add your search logic here

        const url = `/book/search/${searchTerm}`
        router.push(url);
        setShowSearchBox(false);
    };

    useEffect(() => {
        // Focus the input element when the component mounts
        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, []); 

    return (
        <div className={styles.search_box}>
            <div className={styles.search_box_container}>
                
            <p className={styles.close_search} onClick={() => setShowSearchBox(false)}>
                x
            </p>

                <h3>Search for title, author, category...</h3>
                <form onSubmit={handleSubmit}> {/* Attach handleSubmit to onSubmit */}
                    <div className={styles.input_container}>
                        {/* Add a name attribute to the input for better form submission */}
                        <input ref={searchRef} type="text" name="search" />
                        <button type='submit'>Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchBox;
