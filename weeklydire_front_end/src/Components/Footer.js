import {Container, Row, Col} from 'reactstrap'
const Footer = () => {
  return (
    <div style={footerStyle} className='navbar-static-bottom'>
        <Container>
            <h1>This is the footer</h1>
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
            <p>Trademark</p>
        </Container>
    </div>
  )
}

const footerStyle = {
    backgroundColor: '#272727',
    color: 'white'
}

export default Footer