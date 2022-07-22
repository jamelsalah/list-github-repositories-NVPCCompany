

import styles from './styles.css';

export default function CheckBox({label, onChange, value, type = "checkbox", checked}) {


    return (
        <div className="checkbox">
            <label>
                <input type={type} className="check-box" onChange={onChange} checked={checked} value={value}/>
                {label}
            </label>  
        </div>

    )
}