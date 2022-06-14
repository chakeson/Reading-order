import { useParams } from "react-router-dom";

const SuccesfulDelete:React.FC = () => {
    const { id } = useParams();
    const text = atob(id||"");
    return (
        <div className="flex justify-center items-center flex-row map-height">
            <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-4xl 3xl:text-7xl'>{text}</h1>
        </div>
    );
    }

export default SuccesfulDelete;