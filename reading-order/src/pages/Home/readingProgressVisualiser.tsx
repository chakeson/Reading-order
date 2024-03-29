import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';


function ReadingProgressVisualiser() {
    const { readingProgress } = useGlobalContext();

    const bookNames = { "horusHeresy":"Horus Heresy","inquisitors":"Inquisitors","imperialGuard":"Imperial Guard"};
    const bookCount = { "horusHeresy":258,"inquisitors":26,"imperialGuard":40};

    return (  
        <>
        <h2 className='text-xl font-semibold pb-1'>Reading progress</h2>
        { Object.keys(bookNames).map(function(key, index) {
            var procentageProgress = (readingProgress[key as keyof typeof bookNames].reduce((a:number,b:number)=>a+b,0)/bookCount[key as keyof typeof bookNames]*100);
            procentageProgress = Math.round(procentageProgress);

            return <div key={index+"progress"} className="flex flex-col pb-2">
                        <div className='flex flex-row justify-between'>
                            <Link to={`/${key.toLowerCase()}`} className="underline font-medium">{bookNames[key as keyof typeof bookNames]}</Link>
                            <div className='text-black text-opacity-70'>{readingProgress[key as keyof typeof bookNames].reduce((a:number,b:number)=>a+b,0)}/{bookCount[key as keyof typeof bookNames]}</div>
                        </div>
                        <div className='rounded-md bg-map shadow-inner-sm shadow-black'>
                            <div className={`rounded-l-md ${procentageProgress >= 100 && "rounded-r-md"} bg-blue2 text-center shadow-bar transform transition duration-300 ${procentageProgress>0?"text-white":"text-black ml-3"}`} style={{width:(procentageProgress.toString()+"%")}} role="progressbar" aria-valuenow={procentageProgress} aria-valuemin={0} aria-valuemax={100}>{procentageProgress}%</div>
                        </div>
                    </div>
            })
        }
        </>
    );
}

export default ReadingProgressVisualiser;