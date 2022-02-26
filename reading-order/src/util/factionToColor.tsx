/*
Utility function to take faction list and return colors.
*/

const factionToColor = (factionArray:string[]) =>{
    var colorList:string[] = [];
    for (let i:number = 0; i<factionArray.length; i++) {
        let text = factionArray[i];
        text = text.toLowerCase();
        switch (text) {
            case "dark angels":
                colorList.push("#00461f");
                break;
            case "expunged from imperial archives":
                colorList.push("#ffffff");
                break;
            case "emperor's children":
                    colorList.push("#e78ec7");
                    break;
            case "iron warriors":
                    colorList.push("#595959");
                    break;
            case "white scars":
                colorList.push("#cdcccc");
                break;
            case "space wolves":
                colorList.push("#3c4a5e");
                break;
            case "imperial fists":
                    colorList.push("#fed700");
                    break;
            case "night lords":
                    colorList.push("#a1aefe");
                    break;
            case "blood angels":
                colorList.push("#970400");
                break;
            case "iron hands":
                colorList.push("#e6dfd0");
                break;
            case "world eaters":
                    colorList.push("#6a0001");
                    break;
            case "ultramarines":
                    colorList.push("#0d407f");
                    break;
            case "death guard":
                colorList.push("#a9d028");
                break;
            case "thousand sons":
                colorList.push("#62b6d2");
                break;
            case "luna wolves":
                    colorList.push("#fffcec");
                    break;
            case "sons of horus":
                colorList.push("#fffcec");
                break;
            case "luna wolves and sons of horus":
                colorList.push("#fffcec");
                break;
            case "word bearers":
                    colorList.push("#e6a38f");
                    break;
            case "salamanders":
                colorList.push("#22cf0f");
                break;
            case "raven gaurd":
                colorList.push("#000000");
                break;
            case "alpha legion":
                    colorList.push("#97e5dc");
                    break;
            case "knight errant":
                colorList.push("#c8a4ee");
                break;
            case "custodies":
                    colorList.push("#f8a913");
                    break;
            case "custodies and sisters of silence":
                colorList.push("#f8a913");
                break;
            case "custodies & sisters of silence":
                colorList.push("#f8a913");
                break;
            case "sisters of silence":
                colorList.push("#f8a913");
                break;
            case "mechanicum":
                colorList.push("#852444");
                break;
            case "collegia titanica":
                    colorList.push("#852444");
                    break;
            case "mechanicum and collegia titanica":
                colorList.push("#852444");
                break;
            case "officio assassinorum":
                colorList.push("#ffa0a0");
                break;
            case "perpetuals":
                colorList.push("#62bc85");
                break;
            case "":
                colorList.push("#ffffff");
                break;
            default:
                break;
        }
    }
    return colorList;
}


export default factionToColor