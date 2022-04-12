import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
// Login page

// TODO handle success, maybe redirect to the page that was last visited or first time sign up to sync or something
// TODO write the css for the login page

const Login = () => {

    const { setAuth } = useGlobalContext();

    const emailRef = useRef<any>();
    const errorRef = useRef<any>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef?.current?.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [email, password]);

    const handleSubmit = async (e: any) => {  // e is the event
        e.preventDefault();
        setErrorMessage("");
        try { // TODO fix login path
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: new URLSearchParams({
                    'email': email,
                    'password': password
                })
            });

            const message = await response?.text();
            console.log(message);
            console.log(await response.ok);

            if (response.ok) {
                setAuth({ "email":email, "password":password });
                setSuccess(true);
            } else {
                setErrorMessage(message);
            }
        } catch (error) {
            let errorText:string = "No Server Response. Check connection.";
            
            if (error instanceof TypeError) {
                errorText = error?.message;
            }
            setErrorMessage(errorText); 
            //setErrorMessage(error?.message);
            //console.log(errorText);
            errorRef.current?.focus();
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl'>Login</h1>
            <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `block text-2xl text-red-800 bg-white` : `hidden`}`}>{errorMessage}</p>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label htmlFor="email">
                    Email:
                    <input type="text" id="email" autoComplete="on" required ref={emailRef} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" id="password" autoComplete="on" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </label>
                <button className="">Sign In</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register.</Link></p>
        </div>
    );
}

export default Login;