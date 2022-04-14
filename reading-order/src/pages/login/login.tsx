import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { emailRegex } from '../../util/regex';
// Login page

// TODO handle success, maybe redirect to the page that was last visited or first time sign up to sync or something
// TODO write the css for the login page

const Login = () => {

    const { setAuth } = useGlobalContext();

    const emailRef = useRef<any>();
    const errorRef = useRef<any>();

    const [email, setEmail] = useState<string>('');
    const [emailValidated, setEmailValidated] = useState<boolean>(false);
    
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        emailRef?.current?.focus();
    }, []);

    useEffect(() => {
        var emailValid = emailRegex.test(email);
        console.log(email);
        console.log(emailValid);
        setEmailValidated(emailValid);
    }, [email]);

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
                
                // Clear input data since the user is now signed in
                setEmail('');
                setPassword('');

                setSuccess(true);
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
                    <input className={`${ (emailValidated || email==="") ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} type="text" id="email" autoComplete="on" required aria-invalid={emailValidated?"false":"true"} ref={emailRef} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" id="password" autoComplete="off" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </label>
                <button className="">Sign In</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register.</Link></p>
        </div>
    );
}

export default Login;