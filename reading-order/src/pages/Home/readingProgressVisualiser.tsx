import { useGlobalContext } from '../../context';

// TODO set procentage progess on progress bars text color based on progress so it maintains contrast.

function ReadingProgressVisualiser() {
    const { readingProgress } = useGlobalContext();

    const bookNames = { "horusHeresy":"Horus Heresy","inquisitors":"Inquisitors","imperialGuard":"Imperial Guard"};
    const bookCount = { "horusHeresy":257,"inquisitors":27,"imperialGuard":40};

    return (  
        <>
        <h2>Reading progress</h2>
        { Object.keys(bookNames).map(function(key, index) {
            var procentageProgress = (readingProgress[key as keyof typeof bookNames].reduce((a:number,b:number)=>a+b,0)/bookCount[key as keyof typeof bookNames]*100);
            procentageProgress = Math.round(procentageProgress);

            return <div key={index+"progress"} className="flex flex-col">
                        <div className='flex flex-row'>
                            <div>{bookNames[key as keyof typeof bookNames]}</div>
                            <div>{readingProgress[key as keyof typeof bookNames].reduce((a:number,b:number)=>a+b,0)}/{bookCount[key as keyof typeof bookNames]}</div>
                        </div>
                        <div className='border'>
                            <div className='bg-blue2' style={{width:(procentageProgress.toString()+"%")}} role="progressbar" aria-valuenow={procentageProgress} aria-valuemin={0} aria-valuemax={100}>{procentageProgress}%</div>
                        </div>
                    </div>
            })
        }
        </>
    );
}

export default ReadingProgressVisualiser;