import {useRef} from 'react';
import {Button} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const TagSearchBar = () => {
    const tagSearchInput = useRef();
    const navigate = useNavigate();

    // Navigate to the "TaggedArticlesResults.js" page using the keyword in the search bar
    const handleTagSearchSubmit = (e) => {
        e.preventDefault();
        const tagToSearch = tagSearchInput.current?.value;
        navigate(`/read/tags/${tagToSearch}`)
    }

  return (
    <form onSubmit={handleTagSearchSubmit}>
        <span >
            <label htmlFor='tagSearchInput'>Search by tag:</label>
            <input ref={tagSearchInput} className="form-control-sm mx-3" id='tagSearchInput' name='tagSearchInput' placeholder='Charity, police, etc'/>
            <Button color="primary" type='submit'>Submit</Button>
        </span>
    </form>
  )
}

export default TagSearchBar