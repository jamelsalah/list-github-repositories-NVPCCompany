

import styles from './styles.css';

export default function SearchInput({placeHolder, onChange}) {
    function handleChange(evt) {
        onChange(evt.target.value);
    }

    return (
        <div>
            <input 
                type="search" 
                placeholder = {placeHolder} 
                className="input"
                onChange = {handleChange}
            ></input>
        </div>
    )
}