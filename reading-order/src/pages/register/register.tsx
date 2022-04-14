import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { emailRegex , passwordRegex } from '../../util/regex';
// Registering page

// TODO handle success, maybe redirect to the page that was last visited or first time sign up to sync or something
// TODO write the css for the register page
// TODO when fields dont pass validation add red border to the field
// TODO deal with server answers


const Register = () => {

    const { auth, setAuth } = useGlobalContext();
    
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

        // Double check if email and password pass regex validation.
        if ( (!emailRegex.test(email)) || (!passwordRegex.test(password)) ) {
            setErrorMessage("Invalid email or password");
            return;
        }


        try {
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
                
                // Clear input data since the user is now registered
                setEmail('');
                setPassword('');
                setMatchPassword('');

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
            errorRef.current?.focus();
        }

    };



    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl'>Register</h1>
            <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `text-2xl text-red-800 bg-white` : `hidden`}`}>{errorMessage}</p>
            
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label htmlFor="email" className='block'>
                    Email:
                </label>
                <input className={`${ (emailValidated || email==="") ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} ref={emailRef} id="email" type="email" autoComplete="on" required aria-invalid={emailValidated?"false":"true"} arida-describedby="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
                <p className={`${ email && emailFocus && !emailValidated ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Please enter a valid email address.</p>
                
                <label htmlFor="password" className='block'>
                    Password:
                </label>
                <input className={`${ (passwordValidated || password==="") ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} id="password" type="password" required value={password} aria-invalid={passwordValidated?"false":"true"} arida-describedby="password" onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
                <p className={`${ !passwordValidated&&passwordFocus ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Passwords must contain one uppercase and lowercase letter. One number and one special character. Atleast 6 characters long and max 70.</p>
                
                <label htmlFor="matchPassword" className='block'>
                    Confirm Password:
                </label>
                <input className={`${ (validPasswordMatch || matchPassword==="") ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} id="matchPassword" type="password" required aria-invalid={validPasswordMatch?"false":"true"} arida-describedby="Password matching" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} onFocus={() => setMatchPasswordFocus(true)} onBlur={() => setMatchPasswordFocus(false)} />
                
                <p className={`${ (password!=="" && matchPassword!=="") &&!validPasswordMatch ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Passwords must match.</p>
                
                <button className="" disabled={!emailValidated || !passwordValidated || !validPasswordMatch}>Register</button>

            </form>

            <p className='text-center'>Already have an account? <Link to='/login' className='underline'>Login page</Link></p>
        </div>
    );
}

export default Register;