/*
Utility function to take faction list and return its text color.
*/



const factionToTextColor = (factionArray:string[]) =>{
    var colorList:string[] = [];
    for (let i:number = 0; i<factionArray.length; i++) {
        let text = factionArray[i];
        text = text.toLowerCase();
        switch (text) {
            case "dark angels":
                colorList.push("#fff");
                break;
            case "iron warriors":
                colorList.push("#fff");
                break;
            case "space wolves":
                colorList.push("#fff");
                break;
            case "blood angels":
                colorList.push("#fff");
                break;
            case "world eaters":
                    colorList.push("#fff");
                    break;
            case "ultramarines":
                    colorList.push("#fff");
                    break;
            case "raven gaurd":
                colorList.push("#fff");
                break;
            case "mechanicum":
                colorList.push("#fff");
                break;
            case "collegia titanica":
                    colorList.push("#fff");
                    break;
            case "mechanicum and collegia titanica":
                colorList.push("#fff");
                break;
            case "":
                colorList.push("#000");
                break;
            default:
                colorList.push("#000");
                break;
        }
    }

    //colorList = colorList.reverse();
    return colorList;
}


export default factionToTextColor