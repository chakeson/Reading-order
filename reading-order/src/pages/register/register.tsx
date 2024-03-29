import React, { useState, useEffect, useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { emailRegex , passwordRegex } from '../../util/regex';
import readCookie from '../../util/readCookie';
import fetchBookDataPost from '../../util/fetchBookDataPost';
import fetchBookDataGet from '../../util/fetchBookDataGet';
import fetchUserGet from '../../util/fetchUserGet';
import { syncObject, readingProgressType } from "../../context";

import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

// Registering page

const Register = () => {
    const { setAuth , setIsSignedIn , saveLogin, readingProgress, setReadingProgress,setSyncStatus} = useGlobalContext();

    const emailRef = useRef<any>();
    const errorRef = useRef<any>();

    const [email, setEmail] = useState<string>('');
    const [emailValidated, setEmailValidated] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);
    
    const [password, setPassword] = useState<string>('');
    const [passwordValidated, setPasswordValidated] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

    const [matchPassword, setMatchPassword] = useState<string>('');
    const [validPasswordMatch, setValidPasswordMatch] = useState<boolean>(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    // Set focus on the email input when the page loads
    useEffect(() => {
        emailRef?.current?.focus();
    }, []);

    // Validate email on change
    useEffect(() => {
        var emailValid = emailRegex.test(email);
        setEmailValidated(emailValid);
    }, [email]);

    // Validate password on change
    useEffect(() => {
        var passwordValid = passwordRegex.test(password);
        setPasswordValidated(passwordValid);
        setValidPasswordMatch(password === matchPassword);
    }, [password, matchPassword]);

    // Clear error message on change of input
    useEffect(() => {
        setErrorMessage("");
    }, [email, password, matchPassword]);

    const handleSubmit = async (e: any) => {  // e is the event
        e.preventDefault();
        setErrorMessage("");

        // Double check if email and password pass regex validation.
        if ( !emailRegex.test(email) ) {
            setErrorMessage("Invalid email.");
            setEmailValidated(false);
            return;
        }
        if ( !passwordRegex.test(password) ) {
            setErrorMessage("Invalid password.");
            setPasswordValidated(false);
            return;
        }


        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials": "true",
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: new URLSearchParams({
                    'email': email,
                    'password': password
                })
            });

            const message = await response?.text();
            if (response.ok) {
                // Log in with those credentials and get your JWT token
                const jwtResponse = await fetchUserGet(email, password, saveLogin, setAuth, setIsSignedIn);

                // Check so response is not undefined because request failed due to network error
                // Then check if it was successful
                if (jwtResponse !== undefined && jwtResponse.ok===true) {
                    const JWTMessage = await jwtResponse?.text();
                    // Update global state for login and then call to sava it to local storage
                    await setAuth({ "jwt":JWTMessage});
                    await saveLogin(JWTMessage);
                    await setIsSignedIn(true);
                    await fetchBookDataPost( JWTMessage , readingProgress );
                }

                // Clear input data since the user is now registered
                await setEmail('');
                await setPassword('');
                await setMatchPassword('');
                // Change the page after registration
                await navigate('/');

            } else {
                if (message === '{"success":false,"message":"Password must be 6 to 70 characters long. It must contain at least one lowercase letter, one uppercase letter, one number and one special character."}') {
                    setPasswordValidated(false);
                    setErrorMessage(message);
                }
                else if (message === '{"success":false,"message":"Password must be 6 to 70 characters long!"}') {
                    setPasswordValidated(false);
                    setErrorMessage(message);
                }
                else {
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

    // Stores the pop up login window
    const [ extPopup, setExtPopup ] = useState< Window | null >(null);
    
    const connectOAuth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> , site:string ) => {
        let widthWin = 500;
        let heightWin = 600;
        const left = window.screenX + (window.outerWidth - widthWin) / 2;
        const top = window.screenY + (window.outerHeight - heightWin) / 2.5;
        const title = `${site} Authentication`;
        const url = `${process.env.REACT_APP_SERVER_URL}api/${site}`;
        const popup = window.open( url, title, `width=${widthWin}, height=${heightWin}, left=${left}, top=${top}` );
        setExtPopup(popup);
    }




    useEffect(() => {
        // If there is no popup return.
        if ( extPopup === null ) {
            return
        }
        
        // Handles data saving.
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

                // Start registration process
                setAuth({ "jwt":JWTToken});
                saveLogin(JWTToken);
                setIsSignedIn(true);
                setEmail('');
                setPassword('');
                setMatchPassword('');
                
                // Handle book data saving
                loginPOSTGETSave(JWTToken, readingProgress, setReadingProgress, setSyncStatus);
                // Change the page after registration
                navigate('/');
            }
        }, 500)

    }, [extPopup]);


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold pt-6 sm:pt-10'>Register</h1>
            
            <div className='flex flex-col md:flex-row justify-center w-5/6 sm:w-3/4 md:w-3/4 lg:4/6 xl:w-1/2 pt-4 md:pt-0'>
                <div className="w-full md:w-1/2 flex flex-col p-0 md:p-7">
                        <button onClick={(e)=>{connectOAuth(e,"google")}} className="flex flex-row items-center rounded-md shadow-sm shadow-black mb-4" style={{backgroundColor:"#4286f5"}}>
                            <FcGoogle size="2.5em" className='bg-white m-1 rounded'/>
                            <div className='text-white text-xl font-semibold mx-auto'>Google</div>
                        </button>
                        <button onClick={(e)=>{connectOAuth(e,"facebook")}} className="flex flex-row items-center rounded-md shadow-sm shadow-black" style={{backgroundColor:"#4064ac"}}>
                            <AiFillFacebook size="2.5em" style={{color:"#fff"}} className="m-1"/>
                            <div className='text-white text-xl font-semibold mx-auto'>Facebook</div>
                        </button>
                </div>
                
                <div className="w-full md:w-1/2">
                    <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `block text-2xl font-medium bg-white` : `hidden`}`}>{errorMessage}</p>
                    
                    <form onSubmit={handleSubmit} className='flex flex-col mb-1'>
                        <label htmlFor="email" className='block text-lg opacity-90'>
                            Email:
                        </label>
                        <input className={`bg-white z-10 h-10 rounded mb-2 pl-2 border-2 border-solid ${(emailValidated || email==="") ? `border-black` : `border-orange1`}`} ref={emailRef} id="email" type="email" autoComplete="on" required aria-invalid={emailValidated?"false":"true"} aria-describedby="emailID" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
                        <p id="emailID" className={`pl-2 transform transition duration-300 ${email && emailFocus && !emailValidated ? `text-1xl bg-white opacity-100` : `h-0 opacity-0`}`}>Please enter a valid email address.</p>
                        
                        <label htmlFor="password" className='block text-lg opacity-90 bg-white z-10'>
                            Password:
                        </label>
                        <input className={`bg-white z-10 h-10 rounded mb-2 pl-2 border-2 border-solid ${(passwordValidated || password==="") ? `border-black` : `border-orange1`}`} id="password" type="password" required value={password} aria-invalid={passwordValidated?"false":"true"} aria-describedby="passwordID" onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
                        <p id="passwordID" className={`pl-2 transform transition duration-300 ${ !passwordValidated&&passwordFocus ? `text-1xl bg-white opacity-100` : `h-0 opacity-0`}`}>Passwords must contain one uppercase and lowercase letter. One number and one special character. Atleast 6 characters long and max 70.</p>
                        
                        <label htmlFor="matchPassword" className='block text-lg opacity-90 bg-white z-10'>
                            Confirm Password:
                        </label>
                        <input className={`bg-white z-10 h-10 rounded mb-2 pl-2 border-2 border-solid ${(validPasswordMatch || matchPassword==="") ? `border-black` : `border-orange1`}`} id="matchPassword" type="password" required aria-invalid={validPasswordMatch?"false":"true"} aria-describedby="matchPasswordID" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} onFocus={() => setMatchPasswordFocus(true)} onBlur={() => setMatchPasswordFocus(false)} />
                        
                        <p id="matchPasswordID" className={`pl-2 transform transition duration-300 ${ (password!=="" && matchPassword!=="") &&!validPasswordMatch ? `text-1xl bg-white opacity-100 mb-2` : `h-0 opacity-0`}`}>Passwords must match.</p>
                        
                        <button className={`h-10 mb-2 text-lg font-medium rounded-xl shadow-sm shadow-black bg-black hover:bg-grey-900 ${!emailValidated || !passwordValidated || !validPasswordMatch ? "text-grey-200": "text-white"}`} disabled={!emailValidated || !passwordValidated || !validPasswordMatch}>Register</button>

                    </form>

                    <div className="flex flex-row items-start p"> 
                        <input type="checkbox" className='m-1 sm:m-2'></input>
                        <p>By clicking the Register button below, you accept the sites Terms of Use and Privacy Policy. </p>
                    </div>

                    <p className='text-center'>Already have an account? <Link to='/login' className='underline text-blue3'>Login page</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;