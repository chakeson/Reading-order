import { Link } from 'react-router-dom'

function Home() {
    return (  
        <>
        <div>Home</div>
        <h1>Title</h1>
        <p>paragraph</p>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
    );
}

export default Home;