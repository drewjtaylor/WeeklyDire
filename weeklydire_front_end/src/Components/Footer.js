import {Container, Row, Col} from 'reactstrap'
const Footer = () => {
  return (
    <footer style={footerStyle}>
        <Container>
            <h1>This is the footer</h1>
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
            <p>Link</p>
            <p>Trademark</p>
        </Container>
    </footer>
  )
}

const footerStyle = {
    backgroundColor: '#272727',
    color: 'white',
    position: 'absolute',
    width: '100%'
}

export default Footer