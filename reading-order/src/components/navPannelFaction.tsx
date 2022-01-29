import React from 'react';
import '../index.css';


function NavPannelFaction() {
  return (
    <div className='grid grid-cols-3 gap-2'>
        {factionText.map(( data, index ) => {
            return(
            <button key={"factionNavpannel"+index} className='w-28 inline-flex flex-col items-center justify-center border-2 rounded font-bold text-sm' style={{ background:data.color, color:data.text, borderColor:"#000000"}}>
                <p>{data.nr}</p>
                {data.Name}
            </button>     
            )
        })}
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
        Name:"NightLords",
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
