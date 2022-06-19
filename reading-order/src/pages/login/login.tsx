import { useState, useEffect, useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { emailRegex } from '../../util/regex';
import fetchBookDataGet from '../../util/fetchBookDataGet';
// Login page


const Login = () => {

    const { setAuth , setIsSignedIn , saveLogin , setReadingProgress , setSyncStatus} = useGlobalContext();

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

        try {
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
                // Update global state for login and then call to sava it to local storage
                await setAuth({ "jwt":message});
                await saveLogin(message);
                await setIsSignedIn(true);
                await fetchBookDataGet({ "jwt":message }, setReadingProgress, setSyncStatus ); // Evaluate decision to pass object instead of auth
                // Clear input data since the user is now signed in
                await setEmail('');
                await setPassword('');
                // Change the page after login
                await navigate('/');
            } else {
                if (message === "Unauthorized") {
                    setErrorMessage("Email or password is incorrect.");
                }
                else if (response.redirected){
                    setErrorMessage("Email or password is incorrect.");
                }
                else{
                    setErrorMessage(message);
                }
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
            <h1 className='text-3xl font-bold pt-6 sm:pt-10'>Login</h1>
            <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `block text-xl font-medium text-orange1 bg-white` : `hidden`}`}>{errorMessage}</p>
            <form onSubmit={handleSubmit} className='flex flex-col mb-1 w-8/12 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                <label htmlFor="email" className='text-lg opacity-90'>
                    Email:
                </label>
                <input className={`h-10 rounded mb-2 pl-2 border-2 border-solid ${ (emailValidated || email==="") ? ` border-black` : `border-orange1`}`} type="text" id="email" autoComplete="on" required aria-invalid={emailValidated?"false":"true"} ref={emailRef} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                
                <label htmlFor="password" className='text-lg opacity-90'>
                    Password:
                </label>
                <input className='h-10 rounded mb-4 pl-2 border-2 border-solid border-black' type="password" id="password" autoComplete="off" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                
                <button className={`h-10 mb-2 text-lg font-medium rounded-xl shadow-sm shadow-black bg-black hover:bg-grey-900 ${!emailValidated || email==="" || password===""?"text-grey-200":"text-white"}`} disabled={!emailValidated || password===""}>Sign In</button>
            </form>
            <p>Don't have an account? <Link to="/register" className='underline text-blue3'>Register.</Link></p>
        </div>
    );
}

export default Login;