import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import {  passwordRegex } from '../../util/regex';
// Account management page

// TODO
// Login prompt if signed out
// Button with password check, to delete your account. Modal design
// TODO message that shows if it was succesfully changed or deleted.


const Account = () => {
    const { auth , setAuth } = useGlobalContext();
    const [ isSignedIn , setIsSignedIn ] = useState<boolean>((setAuth.email !== ""));


    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = useRef<any>();
    
    const [password, setPassword] = useState<string>('');
    const [passwordValidated, setPasswordValidated] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

    const [matchPassword, setMatchPassword] = useState<string>('');
    const [validPasswordMatch, setValidPasswordMatch] = useState<boolean>(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        var passwordValid = passwordRegex.test(password);
        setPasswordValidated(passwordValid);
        setValidPasswordMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage("");
    }, [password, matchPassword]);


    const handleSubmit = async (e: any) => {  // e is the event
        e.preventDefault();
        setErrorMessage("");

        if ( !passwordRegex.test(password) ) {
            setErrorMessage("Invalid password.");
            setPasswordValidated(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials": "true",
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': `Basic ${btoa((auth.email +":"+ auth.password))}`
                },
                credentials: 'include',
                body: new URLSearchParams({
                    'password': password
                })
            });

            const message = await response?.text();
            if (response.ok) {
                //setAuth({ "email":email, "password":password });

                // Clear input data since the user is now registered
                setPassword('');
                setMatchPassword('');
                // Message confirming password change was successful TODO

            } else {
                if (message === "Email already taken.") {
                    setErrorMessage(message);
                }
                else if (message === '{"success":false,"message":"Invalid email."}') {
                    setErrorMessage("Invalid email.");
                }
                else if (message === '{"success":false,"message":"Password must be 6 to 70 characters long. It must contain at least one lowercase letter, one uppercase letter, one number and one special character."}') {
                    setErrorMessage(message);
                }
                else if (message === '{"success":false,"message":"Password must be 6 to 70 characters long!"}') {
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

    const handleDelete = async (e: any) => {  // e is the event
        e.preventDefault();
        setErrorMessage("");
        console.log("delete");
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials": "true",
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',            
                    'Authorization': `Basic ${btoa((auth.email +":"+ auth.password))}`
                },
                credentials: 'include'
            });

            const message = await response?.text();
            if (response.ok) {

                // Clear input data since the user is now deleted
                await setPassword('');
                await setMatchPassword('');
                // Go to the front after deleting account
                await navigate('/');

            } else {
                if (message === "Unauthorized") {
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
        
    }

    return (
        <div>
        {isSignedIn ? 
        
        <div className='flex flex-col justify-center items-center'>
            <p>Don't have an account? <Link to="/register" className='underline'>Register.</Link></p>
            <p className='text-center'>Already have an account? <Link to='/login' className='underline'>Login page</Link></p>
        </div> 
        
        : 
        
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl'>Account</h1>
            <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `text-2xl text-red-800 bg-white` : `hidden`}`}>{errorMessage}</p>
            
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <p>Change your password:</p>
                
                <label htmlFor="password" className='block'>
                    Password:
                </label>
                <input className={`${ (passwordValidated || password==="") ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} id="password" type="password" required value={password} aria-invalid={passwordValidated?"false":"true"} aria-describedby="passwordID" onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
                <p id="passwordID" className={`${ !passwordValidated&&passwordFocus ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Passwords must contain one uppercase and lowercase letter. One number and one special character. Atleast 6 characters long and max 70.</p>
                
                <label htmlFor="matchPassword" className='block'>
                    Confirm Password:
                </label>
                <input className={`${ (validPasswordMatch || matchPassword==="") ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} id="matchPassword" type="password" required aria-invalid={validPasswordMatch?"false":"true"} aria-describedby="matchPasswordID" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} onFocus={() => setMatchPasswordFocus(true)} onBlur={() => setMatchPasswordFocus(false)} />
                <p id="matchPasswordID" className={`${ (password!=="" && matchPassword!=="") &&!validPasswordMatch ? `text-1xl text-red-800 bg-white` : `hidden`}`}>Passwords must match.</p>
                
                <button className="" disabled={!passwordValidated || !validPasswordMatch}>Register</button>

            </form>
            <br/>
            <button onClick={(e) => {handleDelete(e)}}>Delete Account</button>
        </div>}
        </div>
    );
}

export default Account;