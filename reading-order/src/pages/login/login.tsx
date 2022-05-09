import { useState, useEffect, useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { emailRegex } from '../../util/regex';
// Login page

// TODO handle success, maybe redirect to the page that was last visited or first time sign up to sync or something
// TODO write the css for the login page
// TODO deal with server answers

const Login = () => {

    const { setAuth } = useGlobalContext();

    const emailRef = useRef<any>();
    const errorRef = useRef<any>();

    const [email, setEmail] = useState<string>('');
    const [emailValidated, setEmailValidated] = useState<boolean>(false);
    
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        emailRef?.current?.focus();
    }, []);

    useEffect(() => {
        var emailValid = emailRegex.test(email);
        setEmailValidated(emailValid);
    }, [email]);

    useEffect(() => {
        setErrorMessage("");
    }, [email, password]);

    const handleSubmit = async (e: any) => {  // e is the event
        e.preventDefault();
        setErrorMessage("");

        // Double check if email and password pass regex validation.
        if ( !emailRegex.test(email) ) {
            setErrorMessage("Invalid email.");
            setEmailValidated(false);
            return;
        }

        try { // TODO fix login path
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials": "true",
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': `Basic ${btoa((email +":"+ password))}`
                },
                credentials: 'include'
            });

            const message = await response?.text();
            if (response.ok) {
                if (message === "Valid credentails.") {
                    await setAuth({ "email":email, "password":password });
                    // Clear input data since the user is now signed in
                    await setEmail('');
                    await setPassword('');
                    // Change the page after registration
                    await navigate('/');
                }
            } else {
                setErrorMessage(message);
                errorRef.current?.focus();
            }
        } catch (error) {     
            let errorText:string = "No Server Response. Check connection.";
            
            if (error instanceof TypeError) {
                errorText = error?.message;
            }
            setErrorMessage(errorText); 
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
                </label>
                <input className={`${ (emailValidated || email==="") ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} type="text" id="email" autoComplete="on" required aria-invalid={emailValidated?"false":"true"} ref={emailRef} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                
                <label htmlFor="password">
                    Password:
                </label>
                <input className='border-2 border-solid border-black' type="password" id="password" autoComplete="off" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                
                <button className="">Sign In</button>
            </form>
            <p>Don't have an account? <Link to="/register" className='underline'>Register.</Link></p>
        </div>
    );
}

export default Login;