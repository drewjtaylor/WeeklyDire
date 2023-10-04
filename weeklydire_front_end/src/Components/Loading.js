import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {Col} from 'reactstrap';

const Loading = () => {
  return (
    <Col className='text-center'>
        <FontAwesomeIcon className='' icon={faSpinner} size='5x' pulse/>
    </Col>
  )
}

export default Loading