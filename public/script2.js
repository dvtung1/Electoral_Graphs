// TODO
const DOMAIN = ""

function shade(color, percent){
    if (color.length > 7 ) return shadeRGBColor(color,percent);
    else return shadeHexColor(color,percent);
}
		
function shadeHexColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function normalize(val, max, min) { return (val - min) / (max - min); }

$.get(`${DOMAIN}/api/map/power`, res => {
    let tempArr = [];
    let stateInfoObj = {};
    let tempArr2 = [];
    for(let state in res.result) {
        stateInfoObj[state] = res.result[state];   
        tempArr.push(res.result[state]);
        tempArr2.push(res.otherInfo[state][2]);
    }
    let stateColorObj = {};
    //let's normalize our value from 0 to 1
    const minVal = Math.min(...tempArr);
    const maxVal = Math.max(...tempArr);
    for(let state in stateInfoObj) {
        const normalizedValue = Math.round( (1 - normalize(stateInfoObj[state], maxVal, minVal)) * 10) / 10;
        stateColorObj[state] = shade("#008000", normalizedValue);
    }

    let stateColorObj2 = {};
    const minVal2 = Math.min(...tempArr2);
    const maxVal2 = Math.max(...tempArr2);
    for (let state in res.otherInfo){
        const normalizedValue = Math.round((1 - normalize(res.otherInfo[state][2], maxVal2, minVal2)) * 10) / 10;
        stateColorObj2[state] = shade("#FF0000", normalizedValue);
    }

    for (let state in stateColorObj2) {
        simplemaps_usmap_mapdata["state_specific"][state]["color"] = stateColorObj2[state];
        const description = `White percentage: ${res.otherInfo[state][2]}`
        simplemaps_usmap_mapdata["state_specific"][state]["description"] = description;
    }
})