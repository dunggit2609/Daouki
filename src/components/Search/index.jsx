import React from 'react';
import { SearchOutlined } from  '@material-ui/icons';
import './styles.scss'
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
function Search(props) {
    const {value, onChange} = props;
    const searchRef = useRef(null);
    //data
    const { t } = useTranslation()
    //methods
    const onSearch = (event) => {
        if (!onChange) {
            return
        }

        onChange(event.target.value)
    }
    const handleClick = () => {
        searchRef.current.focus()
    }
    return (
        <div className="search-container d-flex" onClick={handleClick}>
            <span className=" d-flex align-items-center">
                <SearchIcon style={{ fontSize: 16 }} color='primary'/>
            </span>
            <span>
                <input value={value} ref={searchRef} className="search__input" placeholder={t("search.placeholder")} onChange={onSearch} />
            </span>
        </div>
    );
}

export default Search;