import factionToColor from "./factionToColor";

const backgroudMakerTilted = (faction:string[]) => {
    var outputString:string = "";
    const factionNumber:number = faction.length;
    var colorList:string[] = factionToColor(faction);
    

    for (let i=0; i<faction.length;i++) {
        if ( i===0 ) {
            outputString = outputString+colorList[i]+" "+ "0%" + ",";
            outputString = outputString+colorList[i]+" "+ "70%" + ",";
        }
        else {
            outputString = outputString+colorList[i]+" "+ (70+((i-1)/factionNumber)*30).toString()+"%" + ",";
            outputString = outputString+colorList[i]+" "+ (70+((i+1)/factionNumber)*30).toString()+"%" + ",";
        }
    }   
    outputString = outputString.slice(0, -1); //Remove last comma.    
    return outputString
}


export default backgroudMakerTilted;