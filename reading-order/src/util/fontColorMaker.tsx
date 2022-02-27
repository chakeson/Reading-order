import factionToTextColor from "./factionToTextColor";


const fontColorMaker = (faction:string[], id:number, isExpanded:boolean) => {
    var outputString:Array<string> = ["title","author","book","pages","audiobook length","rating","link"];
    const factionNumber:number = faction.length;
    
    
    var fontColorList:string[] = factionToTextColor(faction);
    if (id===51) {
        console.log(faction);            
        console.log(fontColorList);
        console.log(fontColorList[4]);
        
    }
    
    if (isExpanded===false) {
        switch (factionNumber) {
            case 1:
                outputString = [fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0]]
                break;
            case 2:
                outputString = [fontColorList[0],fontColorList[1],fontColorList[1],fontColorList[1],fontColorList[1],fontColorList[1],fontColorList[1]]
                break;
            case 3:
                outputString = [fontColorList[0],fontColorList[1],fontColorList[2],fontColorList[2],fontColorList[2],fontColorList[2],fontColorList[2]]
                break;
            case 4:
                outputString = [fontColorList[0],fontColorList[1],fontColorList[4],fontColorList[4],fontColorList[4],fontColorList[4],fontColorList[4]]
                break;       
            default:
                break;
        }
    }
    else if (isExpanded===true) {
        switch (factionNumber) {
            case 1:
                outputString = [fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[0]]
                break;
            case 2:
                outputString = [fontColorList[0],fontColorList[0],fontColorList[0],fontColorList[1],fontColorList[1],fontColorList[1],fontColorList[1]]
                break;
            case 3:
                outputString = [fontColorList[0],fontColorList[0],fontColorList[1],fontColorList[1],fontColorList[2],fontColorList[2],fontColorList[2]]
                break;
            case 4:
                outputString = [fontColorList[0],fontColorList[0],fontColorList[1],fontColorList[2],fontColorList[2],fontColorList[2],fontColorList[3]]
                break;         
            default:
                break;
        }
    }

    return outputString
}


export default fontColorMaker;