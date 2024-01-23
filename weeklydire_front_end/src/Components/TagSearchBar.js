import {useState, useRef} from 'react';
import {Label, Button, Col, Row} from 'reactstrap';

const TagSearchBar = () => {
    const tagSearchInput = useRef();

    const handleTagSearchSubmit = (e) => {
        e.preventDefault();

        const tagToSearch = tagSearchInput.current?.value;

        console.log(tagToSearch)
    }

  return (
    <form action="" onSubmit={handleTagSearchSubmit}>
        <span>
            <Label htmlFor='tagSearchInput'>Search by tag:</Label>
            <input ref={tagSearchInput} className="form-control-sm mx-3" id='tagSearchInput' name='tagSearchInput' placeholder='Disaster, charity, etc'/>
            <Button color="primary" type='submit'>Submit</Button>
        </span>
    </form>
  )
}

export default TagSearchBar