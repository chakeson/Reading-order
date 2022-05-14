import { useState , useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { AiOutlineClose } from 'react-icons/ai';
// Close modal button and click outside to close
// Outside click be full screen modal
// On inside e.stopPropagation()<

/*
interface IProps {
    setShowDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
props:IProps
*/

function DeleteModal() {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const { auth , setAuth, setIsSignedIn } = useGlobalContext();

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = useRef<any>();

    const [password, setPassword] = useState<string>('');
    const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

    useEffect(() => {
        setIncorrectPassword(false);
    }, [password]);

    const closeModal = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>| React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setShowDeleteModal(false);
    }

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
                    'Authorization': `Basic ${btoa((auth.email +":"+ + password))}`
                },
                credentials: 'include'
            });

            const message = await response?.text();
            if (response.ok) {
                await setAuth({"email":"", "password":""});
                await setIsSignedIn(false);
                await localStorage.removeItem('Login');
                await localStorage.removeItem('ReadingProgress');
                // Go to the front after deleting account
                await navigate('/');

            } else {
                if (message === "Unauthorized") {
                    setErrorMessage("Unauthorized access. " + message);
                    setIncorrectPassword(true);
                }
                else if (response.redirected) {
                    setErrorMessage("Incorrect password.");
                    setIncorrectPassword(true);
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

    if (showDeleteModal){
    return (
            <div className='absolute flex flex-col justify-center items-center z-10 w-full height-offset' style={{top:"56px",backgroundColor:"rgba(0, 0, 0, 0.5)"}} onClick={(e)=>{closeModal(e);}}>  
                <div className='absolute flex flex-col justify-center items-center z-10 w-9/12 h-3/6 bg-white border-2 border-solid border-black' onClick={(e)=>{e.stopPropagation();}}>
                    
                    <button className='absolute text-2xl' style={{top:"20px",right:"20px"}} onClick={(e)=>{closeModal(e);}}><AiOutlineClose/></button>

                    <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `text-2xl text-red-800 bg-white` : `hidden`}`}>{errorMessage}</p>
                    <form onSubmit={handleDelete}>
                        <label htmlFor="deletePassword" className='block'>
                            Password:
                        </label>
                        <input className={`${ (!incorrectPassword) ? `border-2 border-solid border-black` : `border-2 border-solid border-orange1`}`} id="deletePassword" type="password" required value={password} aria-invalid={incorrectPassword?"false":"true"} aria-describedby="password-confirm" onChange={(e) => {setPassword(e.target.value)}} />
                        <p id="password-confirm">Please enter password to confirm deletion.</p>

                        <button className='border-2 border-solid border-black p-2'>Delete account</button>
                    </form>
                </div>
            </div>
        );
    }

    else {
        return (
        <button onClick={(e) => {setShowDeleteModal(true)}}>Delete Account</button>
        );
    }
}

export default DeleteModal;