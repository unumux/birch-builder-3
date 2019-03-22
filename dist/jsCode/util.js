function utilNodeListToArray(nl){
    return Array.prototype.slice.call(nl)
}

// utilGetArrayItemByGuid(main.comps, 0)
function utilGetArrayItemByGuid(ar, targetGuid){
    // using a for loop so we can exit as soon as we find it
    for (let i=0; i<ar.length; i++){
        if (ar[i].guid == targetGuid){
            return ar[i]
        }
    }
}
// function getGuidByOrder(ar, orderNumber){
//     // using a for loop so we can exit as soon as we find it
//     for (let i=0; i<ar.length; i++){
//         if (ar[i].order*1 == orderNumber*1){
//             return ar[i].guid
//         }
//     }
// }

function utilGetTemplateId(ar, ReceivedGuid){
    // using a for loop so we can exit as soon as we find it
    for (let i=0; i<ar.length; i++){
        if (ar[i].guid == ReceivedGuid){
            return ar[i].template
        }
    }
}

function utilHasTagYN(tagToFind, comp){
    //console.log('welcome to utilHasTagYN(tagToFind, comp)...');
    //console.log('tagToFind:',tagToFind);
    //console.log('comp:',comp);
    if (!comp.tags){
        console.log('this comp does not have a tags property!  returning false...');
        return false
    }
    for (let j=0; j<comp.tags.length; j++){
        if (comp.tags[j] === tagToFind){
            return true
        }
    }
    return false
}
function utilGetAllComponentsWithTag(theTagToFind){
    const arrayOfCompsThatHaveTheTag = []
    const megaComponentArray = Object.entries(megaComponentObject)
    for (const [fieldName, fieldData] of megaComponentArray) { // loop & destructure array entries into names
        //console.log('fieldName:',fieldName);
        //console.log('fieldData:',fieldData);
        if (fieldData.tags){
            if (utilHasTagYN(theTagToFind, fieldData)){
                arrayOfCompsThatHaveTheTag.push(fieldData)
            }
        }
    }
    // console.log(arrayOfCompsThatHaveTheTag);
    return arrayOfCompsThatHaveTheTag
}