import { useState, useEffect, useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { emailRegex } from '../../util/regex';
import readCookie from '../../util/readCookie';
import fetchBookDataPost from '../../util/fetchBookDataPost';
import fetchBookDataGet from '../../util/fetchBookDataGet';
import { syncObject, readingProgressType } from "../../context";
// Login page


const Login = () => {

    const { setAuth , setIsSignedIn , saveLogin , readingProgress , setReadingProgress , setSyncStatus} = useGlobalContext();

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

    const [ extPopup, setExtPopup ] = useState< Window | null >(null);
    
    const connectGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        let widthWin = 500;
        let heightWin = 600;
        const left = window.screenX + (window.outerWidth - widthWin) / 2;
        const top = window.screenY + (window.outerHeight - heightWin) / 2.5;
        const title = `Google Authentication`;
        const url = `${process.env.REACT_APP_SERVER_URL}api/google`;
        const popup = window.open( url, title, `width=${widthWin}, height=${heightWin}, left=${left}, top=${top}` );
        setExtPopup(popup);
    }

    useEffect(() => {
        // If there is no popup return.
        if ( extPopup === null ) {
            return
        }

        const loginPOSTGETSave = async (JWTTokenStr:string, readingProgress:readingProgressType, setReadingProgress:React.Dispatch<React.SetStateAction<readingProgressType>>, setSyncStatus:React.Dispatch<React.SetStateAction<syncObject>>) => {
            // Tries to save book data. If it already exists, it will fail. Then the get fetch will be relevant.
            await fetchBookDataPost( JWTTokenStr , readingProgress );
            // Fetches the book data from the server.
            fetchBookDataGet({ "jwt":JWTTokenStr }, setReadingProgress, setSyncStatus );
        }
        
        const cookieCheckTimer = setInterval(() => {
            // Check if the popup window has been closed and remove the timer if it is.
            if ( extPopup === null ) {
              cookieCheckTimer && clearInterval(cookieCheckTimer);
              return;
            }

            var JWTToken = readCookie("jwt");
            if ( JWTToken !== "" && JWTToken !== undefined ) {
                // Token aquired.
                
                // Close the popup window and remove interval timer
                extPopup.close();
                setExtPopup(null);
                clearInterval(cookieCheckTimer);

                // Delete the cookie. Sets content to empty string and set a negative max age so the browser deletes it.
                document.cookie = "jwt"+"=; Max-Age=-9999999";

                // Start login process
                setAuth({ "jwt":JWTToken});
                saveLogin(JWTToken);
                setIsSignedIn(true);
                setEmail('');
                setPassword('');
                
                // Handle book data saving
                loginPOSTGETSave(JWTToken, readingProgress, setReadingProgress, setSyncStatus);
                // Change the page after registration
                navigate('/');
            }
        }, 500)

    }, [extPopup]);


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold pt-6 sm:pt-10'>Login</h1>
            
            <div className='flex flex-col md:flex-row justify-center w-5/6 sm:w-3/4 md:w-3/4 lg:4/6 xl:w-1/2'>
                <div className="w-full md:w-1/2 flex flex-col">test
                        <button onClick={(e)=>{connectGoogle(e)}}>Google</button>
                </div>
                
                <div className="w-full md:w-1/2">
                    <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `block text-xl font-medium text-orange1 bg-white` : `hidden`}`}>{errorMessage}</p>
                    <form onSubmit={handleSubmit} className='flex flex-col mb-1'>
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
            </div>
        </div>
    );
}

export default Login;