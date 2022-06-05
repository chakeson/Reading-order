import React from 'react';
import '../index.css';


function NavPannelFaction({factionFilter=[], setFactionFilter}:{factionFilter?:string[], setFactionFilter?:React.Dispatch<React.SetStateAction<string[]>>}) {

    // Toggles the presence of the faction passed in the factionFilter state.
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, factionName:string) => {
        e.stopPropagation();

        // Exludes expunged factions from the filter. And values are undefined.
        if (factionName==="Expunged" || factionFilter===undefined || setFactionFilter===undefined) {
            return;
        }
        if (factionFilter.includes(factionName)) {
            setFactionFilter(factionFilter.filter(faction => faction !== factionName)||[]);
        } else {
            setFactionFilter([...factionFilter, factionName]);
        }
        return;

    }

    const clearFactionFilter = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (setFactionFilter===undefined) {
            return;
        }
        setFactionFilter([]);
        return;
    }

    return (
    <div className='grid grid-cols-3 gap-2'>
        {factionText.map(( data, index ) => {
            return(
            <button onClick={(e)=>{handleClick( e , data.Name )}} key={"factionNavpannel"+index} 
            className='transition duration-300 inline-flex flex-col items-center justify-center border-2 rounded font-bold text-xs lg:text-sm 3xl:text-2xl break-all lg:break-normal' 
            style={{ background:((!factionFilter.includes(data.Name) && factionFilter.length>0) ?"#4b5563":data.color), color:((factionFilter.length>0 &&!factionFilter.includes(data.Name))?"#000":data.text), borderColor:(factionFilter.includes(data.Name)?"#4b5563":"#000000")}}>
                {data.nr !== "" && <p>{data.nr}</p>}
                {data.Name}
            </button>     
            )
        })}
        <button onClick={(e)=>{clearFactionFilter(e)}} className={`inline-flex flex-col items-center justify-center border-2 rounded font-bold text-xs lg:text-sm 3xl:text-2xl transform transition duration-500 ${factionFilter.length>0?"opacity-100":"opacity-0 cursor-default"}`}>Clear</button>

    </div>
  );
}

export default NavPannelFaction;
// Expunged from Imperial Archives II & XI

const factionText = [
    {
        nr:"I",
        Name:"Dark Angels",
        color:"#00461f",
        text:"#ffffff",
    },
    {
        nr:"II",
        Name:"Expunged",
        color:"#ffffff",
        text:"#000000",
    },
    {
        nr:"III",
        Name:"Emperor's Children",
        color:"#e78ec7",
        text:"#000000",
    },
    {
        nr:"IV",
        Name:"Iron Warriors",
        color:"#595959",
        text:"#FFFFFF",
    },
    {
        nr:"V",
        Name:"White Scars",
        color:"#cdcccc",
        text:"#000000",
    },
    {
        nr:"VI",
        Name:"Space Wolves",
        color:"#3c4a5e",
        text:"#FFFFFF",
    },
    {
        nr:"VII",
        Name:"Imperial Fists",
        color:"#fed700",
        text:"#000000",
    },
    {
        nr:"VIII",
        Name:"Night Lords",
        color:"#a1aefe",
        text:"#000000",
    },
    {
        nr:"IX",
        Name:"Blood Angels",
        color:"#970400",
        text:"#FFFFFF",
    },
    {
        nr:"X",
        Name:"Iron Hands",
        color:"#e6dfd0",
        text:"#000000",
    },
    {
        nr:"XI",
        Name:"Expunged",
        color:"#ffffff",
        text:"#000000",
    },
    {
        nr:"XII",
        Name:"World Eaters",
        color:"#6a0001",
        text:"#FFFFFF",
    },
    {
        nr:"XIII",
        Name:"Ultramarines",
        color:"#0d407f",
        text:"#FFFFFF",
    },
    {
        nr:"XIV",
        Name:"Death Guard",
        color:"#a9d028",
        text:"#000000",
    },
    {
        nr:"XV",
        Name:"Thousand Sons",
        color:"#62b6d2",
        text:"#000000",
    },
    {
        nr:"XVI",
        Name:"Luna Wolves / Sons of Horus",
        color:"#fffcec",
        text:"#000000",
    },
    {
        nr:"XVII",
        Name:"Word Bearers",
        color:"#e6a38f",
        text:"#000000",
    },
    {
        nr:"XVIII",
        Name:"Salamanders",
        color:"#22cf0f",
        text:"#000000",
    },
    {
        nr:"XIX",
        Name:"Raven Gaurd",
        color:"#000000",
        text:"#FFFFFF",
    },
    {
        nr:"XX",
        Name:"Alpha Legion",
        color:"#97e5dc",
        text:"#000000",
    },
    {
        nr:"",
        Name:"Knight Errant",
        color:"#c8a4ee",
        text:"#000000",
    },
    {
        nr:"",
        Name:"Custodies & Sisters of Silence",
        color:"#f8a913",
        text:"#000000",
    },
    {
        nr:"",
        Name:"Mechanicum and Collegia Titanica",
        color:"#852444",
        text:"#FFFFFF",
    },
    {
        nr:"",
        Name:"Officio Assassinorum",
        color:"#ffa0a0",
        text:"#000000",
    },
    {
        nr:"",
        Name:"Perpetuals",
        color:"#62bc85",
        text:"#000000",
    },
]
