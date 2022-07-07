import { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context';
import {  passwordRegex } from '../../util/regex';
import { jwtTokenDecode } from '../../util/JWTDate';
import RequestData from './requestData';
import DeleteModal from './deleteModal';

// Account management page

const Account = () => {
    const { auth } = useGlobalContext();

    // Helps with conditional rendering that depends on the account type. Oauth for example shouldn't render password change.
    const accountType:string = jwtTokenDecode(auth.jwt).type;

    const [ successMessage , setSuccessMessage ] = useState('');
    const successRef = useRef<HTMLParagraphElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = useRef<HTMLParagraphElement>(null);
    
    const [oldPassword, setOldPassword] = useState<string>('');
    const [oldPasswordValidated, setOldPasswordValidated] = useState<boolean>(true);


    const [password, setPassword] = useState<string>('');
    const [passwordValidated, setPasswordValidated] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

    const [matchPassword, setMatchPassword] = useState<string>('');
    const [validPasswordMatch, setValidPasswordMatch] = useState<boolean>(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false);


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
        setOldPasswordValidated(true)

        if ( !passwordRegex.test(password) ) {
            setErrorMessage("Invalid password.");
            setPasswordValidated(false);
            return;
        }

        // Ensure you are changing it to something new.
        if (oldPassword === password) {
            setErrorMessage("New password must be different from old password");
            return;
        }
        
        // For authontication, we need the email.
        const decodedToken = jwtTokenDecode(auth.jwt);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/users`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials": "true",
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': `Basic ${btoa((decodedToken.email +":"+ oldPassword))}`
                },
                credentials: 'include',
                body: new URLSearchParams({
                    'password': password
                })
            });

            const message = await response?.text();            
            if (response.ok) {
                // Update the saved credentials.

                // Clear input data since the request succesfully went through.
                setOldPassword('');
                setPassword('');
                setMatchPassword('');
                // Message confirming password change was successful
                setSuccessMessage(message);
                successRef.current?.focus();

            } else {
                if (message === "Unauthorized") {
                    setErrorMessage("Incorrect password.");
                    setOldPasswordValidated(false)
                }
                if (response.redirected) {
                    setErrorMessage("Incorrect password.");
                    setOldPasswordValidated(false)
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

    return (      
        <div className='flex flex-col justify-center items-center'>
            <div className='w-8/12 sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center'>
            <h1 className='text-3xl font-bold pt-6 sm:pt-10 pb-4'>Account</h1>
            <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `text-2xl text-orange1 bg-white opacity-100` : `h-0 opacity-0`}`}>{errorMessage}</p>
            <p ref={successRef} aria-live="assertive" className={`${ successMessage ? `text-2xl text-black bg-white opacity-100` : `h-0 opacity-0`}`}>{successMessage}</p>
            
            {accountType==="normal" && <form onSubmit={handleSubmit} className='flex flex-col mb-4'>
                <p className='text-xl font-medium'>Change your password:</p>
                
                <label htmlFor="oldPassword" className='block text-lg opacity-90'>
                    Old Password:
                </label>
                <input className={`bg-white z-10 h-10 rounded mb-2 pl-2 border-2 border-solid ${ (oldPasswordValidated || oldPassword==="") ? `border-black` : `border-orange1`}`} id="oldPassword" type="password" required value={oldPassword} aria-invalid={passwordValidated?"false":"true"} aria-describedby="oldPasswordID" onChange={(e) => {setOldPassword(e.target.value); setOldPasswordValidated(true);}} />
                <p id="oldPasswordID" className={`pl-2 transform transition duration-300 ${ !setOldPasswordValidated ? `text-1xl bg-white opacity-100` : `h-0 opacity-0`}`}>Incorrect password.</p>
                
                <label htmlFor="password" className='block text-lg opacity-90'>
                    New Password:
                </label>
                <input className={`bg-white z-10 h-10 rounded mb-2 pl-2 border-2 border-solid ${ (passwordValidated || password==="") ? `border-black` : `border-orange1`}`} id="password" type="password" required value={password} aria-invalid={passwordValidated?"false":"true"} aria-describedby="passwordID" onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
                <p id="passwordID" className={`pl-2 transform transition duration-300 ${ !passwordValidated&&passwordFocus ? `text-1xl bg-white opacity-100` : `h-0 opacity-0`}`}>Passwords must contain one uppercase and lowercase letter. One number and one special character. Atleast 6 characters long and max 70.</p>
                
                <label htmlFor="matchPassword" className='block text-lg opacity-90'>
                    Confirm New Password:
                </label>
                <input className={`bg-white z-10 h-10 rounded mb-2 pl-2 border-2 border-solid ${ (validPasswordMatch || matchPassword==="") ? `border-black` : `border-orange1`}`} id="matchPassword" type="password" required aria-invalid={validPasswordMatch?"false":"true"} aria-describedby="matchPasswordID" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} onFocus={() => setMatchPasswordFocus(true)} onBlur={() => setMatchPasswordFocus(false)} />
                <p id="matchPasswordID" className={`pl-2 transform transition duration-300 ${ (password!=="" && matchPassword!=="") && !validPasswordMatch ? `text-1xl bg-white opacity-100` : `h-0 opacity-0`}`}>Passwords must match.</p>
                
                <button className={`h-10 text-lg font-medium rounded-xl shadow-sm shadow-black bg-black hover:bg-grey-900 ${!passwordValidated || !validPasswordMatch?"text-grey-200":"text-white"}`} disabled={!passwordValidated || !validPasswordMatch}>Change Password</button>
            </form>
            }

            <DeleteModal accountType={accountType} />
            <RequestData />
            </div>
        </div>
    );
}

export default Account;