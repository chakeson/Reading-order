import { useState, useEffect, useRef } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { emailRegex , passwordRegex } from '../../util/regex';
import fetchBookDataPost from '../../util/fetchBookDataPost';
// Registering page

const Register = () => {
    const { auth, setAuth , setIsSignedIn , saveLogin, readingProgress } = useGlobalContext();

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
                // Update global state for login and then call to sava it to local storage
                await setAuth({ "email":email, "password":password });
                await saveLogin();
                await setIsSignedIn(true);
                await fetchBookDataPost( auth , readingProgress );
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

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold pt-6 sm:pt-10'>Register</h1>
            <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `text-2xl bg-white` : `hidden`}`}>{errorMessage}</p>
            
            <form onSubmit={handleSubmit} className='flex flex-col mb-1 w-8/12 sm:w-1/2 md:w-1/3 lg:w-1/4'>
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

            <p className='text-center'>Already have an account? <Link to='/login' className='underline text-blue3'>Login page</Link></p>
        </div>
    );
}

export default Register;