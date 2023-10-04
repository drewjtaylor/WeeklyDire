import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {Col} from 'reactstrap';

const Loading = () => {
  return (
    <Col className='text-center'>
        <FontAwesomeIcon className='' icon={faSpinner} spin size='2x' />
    </Col>
  )
}

export default Loading