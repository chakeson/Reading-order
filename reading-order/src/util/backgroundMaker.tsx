import factionToColor from "./factionToColor";

const backgroudMaker = (faction:string[]) => {
    var outputString:string = "";
    const factionNumber:number = faction.length;
    var colorList:string[] = factionToColor(faction);
    colorList = colorList.reverse();

    for (let i=0; i<faction.length;i++) {
        outputString = outputString+colorList[i]+" "+ ((i/factionNumber)*100).toString()+"%" + ",";
        outputString = outputString+colorList[i]+" "+ (((i+1)/factionNumber)*100).toString()+"%" + ",";
    }   
    outputString = outputString.slice(0, -1); //Remove last comma.
    return outputString
}


export default backgroudMaker;