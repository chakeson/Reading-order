import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
// Registering page

// TODO handle success, maybe redirect to the page that was last visited or first time sign up to sync or something
// TODO write the css for the register page

const emailRegex = /.+@.+\..+/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[}]\^_`{|}~]).{6,70}$/;

const Register = () => {

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

    const [success, setSuccess] = useState(false);

    // Set focus on the email input when the page loads
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
        var passwordValid = passwordRegex.test(password);
        console.log(password);
        console.log(passwordValid);
        setPasswordValidated(passwordValid);
        setValidPasswordMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [email, password, matchPassword]);

    const handleSubmit = async (e: any) => {  // e is the event
        e.preventDefault();
        setErrorMessage("");
    };



    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl'>Register</h1>
            <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `block text-2xl text-red-800 bg-white` : `hidden`}`}>{errorMessage}</p>
            
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label htmlFor="email" className='block'>
                    Email:
                </label>
                <input className={`${ emailValidated ? `border-solid border-red-800` : ``}`} ref={emailRef} id="email" type="email" autoComplete="on" required aria-invalid={emailValidated?"false":"true"} arida-describedby="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
                <p className={`${ email && emailFocus && !emailValidated ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Please enter a valid email address.</p>
                
                <label htmlFor="password" className='block'>
                    Password:
                </label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
                <p className={`${ !passwordValidated&&passwordFocus ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Passwords must contain one uppercase and lowercase letter. One number and one special character. Atleast 6 characters long and max 70.</p>
                
                <label htmlFor="matchPassword" className='block'>
                    Confirm Password:
                </label>
                <input id="matchPassword" type="password" required value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} onFocus={() => setMatchPasswordFocus(true)} onBlur={() => setMatchPasswordFocus(false)} />
                
                <p className={`${ (password!=="" && matchPassword!=="") &&!validPasswordMatch ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Passwords must match.</p>
                
                <button className="">Register</button>

                <p className='text-center'>Already have an account? <Link to='/login'>Login page</Link></p>
            </form>

        </div>
    );
}

export default Register;