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
                <div className='absolute flex flex-col justify-center items-center z-10 w-10/12 h-80 sm:h-1/3 sm:w-3/4 md:w-3/5 lg:w-2/5 bg-white border-2 border-solid border-black rounded' style={{minHeight:"360px"}} onClick={(e)=>{e.stopPropagation();}}>
                    
                    <button className='absolute text-2xl lg:text-3xl' style={{top:"20px",right:"20px"}} onClick={(e)=>{closeModal(e);}}><AiOutlineClose/></button>

                    <p ref={errorRef} aria-live="assertive" className={`${ errorMessage ? `text-2xl text-orange1 bg-white` : `hidden`}`}>{errorMessage}</p>
                    <form className='w-5/6 sm:w-80'  onSubmit={handleDelete}>
                        <label htmlFor="deletePassword" className='block'>
                            Password:
                        </label>
                        <input className={`w-full h-10 rounded mb-2 pl-2 border-2 border-solid ${ (!incorrectPassword) ? `border-black` : `border-orange1`}`} id="deletePassword" type="password" required value={password} aria-invalid={incorrectPassword?"false":"true"} aria-describedby="password-confirm" onChange={(e) => {setPassword(e.target.value)}} />
                        <p id="password-confirm" className='mb-2'>Please enter password to confirm deletion.</p>

                        <button className='w-full p-2 h-10 text-lg font-medium rounded-xl text-white shadow-sm shadow-black bg-black hover:bg-grey-900 '>Delete account</button>
                    </form>
                </div>
            </div>
        );
    }

    else {
        return (
        <button className='mb-4 w-full h-10 text-lg font-medium rounded-xl shadow-sm shadow-black text-white bg-red-600 hover:bg-red-700' onClick={(e) => {setShowDeleteModal(true)}}>Delete Account</button>
        );
    }
}

export default DeleteModal;