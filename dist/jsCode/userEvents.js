
// left events
function userAddComp(templateId){
    //console.log('welcome to userAddComp()...')
    //console.log('templateId=', templateId);
    mainAddCompByTemplateId(templateId)
}

// right events
function userCompInEmailClick(e){
    e.stopPropagation()
    //console.log('welcome to userCompInEmailClick()...');
    //console.log('e:',e);
    //console.log('e.target:', e.target);
    // console.log('e.target.dataset.guid:', e.target.dataset.guid)
    // console.log('template:', utilGetTemplateId(main.comps, e.target.dataset.guid))
    let clickedGuid = e.target.dataset.guid

    // update the main.selectedComp to be this newly clicked one
    let previousCompBeingEdited = null
    if (main.selectedComp != null){ // it's not null because we were editing another one
        previousCompBeingEdited = main.selectedComp
    }
    main.selectedComp = utilGetArrayItemByGuid(main.comps, e.target.dataset.guid)

    // console.log('main.selectedComp:',main.selectedComp);
    // console.log('main.selectedComp.guid:',main.selectedComp.guid);
    // console.log('clickedGuid:',clickedGuid);
    // console.log('previousCompBeingEdited:',previousCompBeingEdited);
    

    // now let's check to see which mode this click should put us into

    // check to see if we should enter 'edit' mode...
    // conditions: 1) we are currently in 'add' mode
    if (main.mode == 'add'){
        main.mode = 'edit'
        userPrivateGoEditMode()
    }
    // check to see if we should enter 'add' mode...
    // conditions: 1) we are currently in 'edit' mode AND
    //             2) we clicked on the SAME comp that is already open for editing

    if (main.mode == 'edit'){
        if (previousCompBeingEdited != null){ 
            if (previousCompBeingEdited.guid == clickedGuid){ // clicked on the same one
                //console.log('switch from EDIT mode to ADD mode...');
                main.mode = 'add'
                main.selectedComp = null
                userPrivateGoAddMode()
            }
            else{
                //console.log('stay in EDIT mode...but swap which one is being edited');
                userPrivateGoEditMode()
            }
        }
    }
    
    tempUpdateMainVariableDisplay()
}

function tempUpdateMainVariableDisplay(){
    document.getElementById('displayMainMode').innerHTML = main.mode
    if (main.selectedComp != null){
        document.getElementById('displayMainEditCompId').innerHTML = main.selectedComp.guid
        document.getElementById('displayMainEditTemplateId').innerHTML = main.selectedComp.template
    }
    else{
        document.getElementById('displayMainEditCompId').innerHTML = 'null'
        document.getElementById('displayMainEditTemplateId').innerHTML = 'null'
    }
    
}


function userPrivateGoEditMode(){
    // console.log('welcome to userPrivateGoEditMode()...');
    // hide all editSections (in case any were already open)
    let allEditSections = utilNodeListToArray(document.querySelectorAll('.editSection'))
    allEditSections.map( item => item.classList.add('hideme') )
    // show edit view
    document.querySelector('#leftComponentView').classList.add('hideme')
    document.querySelector('#leftEditView').classList.remove('hideme')
    // show editSection for clicked comp
    document.querySelector(`#edit_${main.selectedComp.template}`).classList.remove('hideme')
    // remove any active selected class in the email comps
    let allDraggable = utilNodeListToArray(document.querySelectorAll('.draggable'))
    allDraggable.map( item => item.classList.remove('draggableSelected') )
    // add the active selected class where it needs to go
    document.getElementById('draggable'+main.selectedComp.guid).classList.add('draggableSelected')
    userPrivateLoadDataIntoFields()
}

function userPrivateGoAddMode(){
    // console.log('welcome to userPrivateGoAddMode()...');
    // show ad view
    document.querySelector('#leftComponentView').classList.remove('hideme')
    document.querySelector('#leftEditView').classList.add('hideme')
    // remove any selected class...
    let allDraggable = utilNodeListToArray(document.querySelectorAll('.draggable'))
    allDraggable.map( item => item.classList.remove('draggableSelected') )
}
function userEmptyRightClicked() {
    //console.log('userEmptyRightClicked happened!');
    //privateUserSwitchToComponentView()
    main.mode = 'add'
    main.selectedComp = null
    userPrivateGoAddMode()
    tempUpdateMainVariableDisplay()
}
function userPrivateLoadDataIntoFields(){
    //console.log('welcome to userPrivateLoadDataIntoFields()...');
    
    let dataMatch = utilGetArrayItemByGuid(main.comps, main.selectedComp.guid)
    //console.log('dataMatch:',dataMatch)


    ourDataObj = dataMatch.dataObj
    //console.log('ourDataObj:', ourDataObj);
    

    // loop through it and if there is a matching input field...load the data
    const ourDataArray = Object.entries(ourDataObj)  // make array from object
    for (const [fieldName, fieldData] of ourDataArray) { // loop & destructure array entries into names
        //console.log('ourSelector string:',`#${main.selectedComp.template}_${fieldName}`)
        let ourSelector = document.querySelector(`#${main.selectedComp.template}_${fieldName}`)
        //console.log('ourSelector:',ourSelector);
        
        if (ourSelector){
            ourSelector.value = fieldData
            if (ourSelector.id.includes('Color')){
                // give the cpTooltip button in this field the matching background color
                document.querySelector(`#${ourSelector.id}CP`).style.backgroundColor = fieldData
            }
        }
    }

    // let's try to load subcomponents!
    // reset subcomp area subCompRenderLocation_c154s

    //console.log(`subCompRenderLocation_${main.selectedComp.template}`, `subCompRenderLocation_${main.selectedComp.template}`);
    
    // problem if component doesn't have a subcomponent array!!!
    const renderToEl = document.getElementById(`subCompRenderLocation_${main.selectedComp.template}`)
    if (renderToEl){ // not all comps will have a subcomponent element to write to
        renderToEl.innerHTML = ''

        // continue here!!!  build the subcomponents if needed
        // re-render form looping through  subcomponentArray to concat all the subcomps
        let allSubsHtml = ''
        main.selectedComp.subcomponentArray.map( (item, i) => {
            allSubsHtml += generateSubFormFields(item.name, main.selectedComp.guid, i)
        })

        // render subcomp html to location
        renderToEl.innerHTML = allSubsHtml

        // load all data into form fields

        // loop through each subcomp
        main.selectedComp.subcomponentArray.map( (item, i) => {
            const subDataArray = Object.entries(item.dataObj) // make an array of arrays from the obj
            subDataArray.map( (thing, j) => {
                const [label, value] = thing // deconstruct thing array  
                
                // load value into field...
                //console.log(`form_${label}_${item.name}_compid${options[selectedIndex].value}_subcount${i}`);
                const candidateFieldEl = document.getElementById(`form_${label}_${item.name}_compid${main.selectedComp.guid}_subcount${i}`) // form_pcolor_sub1_compid0_subcount0

                if (candidateFieldEl){ // ...if it exists
                    candidateFieldEl.value = value
                }
            })
        })
    }
    
    
}
function userEditSave(){
    console.log('welcome to userEditSave()...');
    let activeComp = utilGetArrayItemByGuid(main.comps, main.selectedComp.guid)
    let compData = activeComp.dataObj

    const compDataArray = Object.entries(compData)  // make array from object
    for (const [fieldName, fieldData] of compDataArray) { // loop & destructure array entries into names
        let ourSelector = document.querySelector(`#${activeComp.template}_${fieldName}`)
        //console.log('___');
        //console.log('wanting to save from: ', `#${activeComp.template}_${fieldName}`);
        
        if (ourSelector){
            //console.log('ourSelector is valid...');
            activeComp.dataObj[fieldName] = ourSelector.value
        }
    }

    userPrivateRenderSubs(main.selectedComp.template)

    mainUpdateView()
}

function userPrivateRenderSubs(recCompName){
    console.log('welcome to userPrivateRenderSubs(recCompName)...');
    console.log('recCompName:',recCompName);
 
    let allMergedSubcomponentsCode = ''
    // loop through each subcomp
    main.selectedComp.subcomponentArray.map( (item, i) => {
        allMergedSubcomponentsCode += mainMergeDataIntoPlaceholders(item)

        const subDataArray = Object.entries(item.dataObj) // make an array of arrays from the obj
        subDataArray.map( (thing, j) => {
            const [label, value] = thing // deconstruct thing array  

            // load value into field...
            const candidateFieldEl = document.getElementById(`form_${label}_${item.name}_compid${main.selectedComp.guid}_subcount${i}`) // form_pcolor_sub1_compid0_subcount0
            if (candidateFieldEl){ // ...if it exists
                item.dataObj[label] = candidateFieldEl.value
            }
        })
    })
    document.getElementById(`${recCompName}_subComponentUI`).value = allMergedSubcomponentsCode

    //mainUpdateView()
    
}

function userSaveSub(targetSub){
    console.log('welcome to userSaveSub()...')
    console.log('targetSub:',targetSub);

    // #1. save input from fields into data
    // loop through each subcomp
    main.selectedComp.subcomponentArray.map( (item, i) => {
        const subDataArray = Object.entries(item.dataObj) // make an array of arrays from the obj
        subDataArray.map( (thing, j) => {
            const [label, value] = thing // deconstruct thing array  
            // load value into field...
            const candidateFieldEl = document.getElementById(`form_${label}_${item.name}_compid${main.selectedComp.guid}_subcount${i}`) // form_pcolor_sub1_compid0_subcount0
            if (candidateFieldEl){ // ...if it exists
                item.dataObj[label] = candidateFieldEl.value
            }
        })
    })

    // #2. use data to populate subComponentUI field.   c154s_subComponentUI
    let allMergedSubcomponentsCode = ''
    // loop through each subcomp
    main.selectedComp.subcomponentArray.map( (item, i) => {
        console.log('item:',item);
        
        allMergedSubcomponentsCode += mainMergeDataIntoPlaceholders(item)

        // const subDataArray = Object.entries(item.dataObj) // make an array of arrays from the obj
        // subDataArray.map( (thing, j) => {
        //     const [label, value] = thing // deconstruct thing array  

        //     // load value into field...
        //     const candidateFieldEl = document.getElementById(`form_${label}_${item.name}_compid${main.selectedComp.guid}_subcount${i}`) // form_pcolor_sub1_compid0_subcount0
        //     if (candidateFieldEl){ // ...if it exists
        //         item.dataObj[label] = candidateFieldEl.value
        //     }
        // })
    })

    //console.log('allMergedSubcomponentsCode:',allMergedSubcomponentsCode);
    // c154s_subComponentUI
    //console.log('my selector:',`${main.selectedComp.template}_subComponentUI`);
    
    document.getElementById(`${main.selectedComp.template}_subComponentUI`).value = allMergedSubcomponentsCode

    // save updated subComponentUI field to data
    main.selectedComp.dataObj['subComponentUI'] = allMergedSubcomponentsCode

    // update view
    userEditSave()
}

// function userRenderSubs(targetSub){
//     console.log('welcome to userRenderSubs()...')
//     console.log('targetSub:',targetSub);
//     userPrivateRenderSubs(main.selectedComp.template)
//     userPrivateRenderSubs(main.selectedComp.template)
//     //mainUpdateView()
// }
// function userRenderSubsAgain(targetSub){
//     console.log('welcome to userRenderSubsAgain()...')
//     console.log('targetSub:',targetSub);
//     userPrivateRenderSubs(main.selectedComp.template)
//     mainUpdateView()
// }

function userEditDelete(){
    //console.log('welcome to userEditDelete()...');
    let isDeleteConfirmed = confirm("Continue with delete?");
    if (isDeleteConfirmed){
        mainDeleteComp(main.selectedComp.guid)
        userEmptyRightClicked()
    }
}

function userPickColor(el){
    let selectedColor = el.value
    let targetInputEl = document.querySelector('#'+main.colorPickerInputId)
    targetInputEl.value = selectedColor
    document.querySelector('#'+main.colorPickerId).style.backgroundColor = selectedColor
    document.querySelector('body').click() // closes the tooltip popup

    // this is to auto-save without needing to click the save button
    if (targetInputEl.dataset.savetarget){ // not null, undefined, etc.
        userAutoSaveMe(targetInputEl.dataset.savetarget)
    }
}
function userAutoSaveMe(target){
    // target: 300dc  from a call like: userAutoSaveMe('300dc')
    // build: handlers.goSavet300dc()
    if (target){ // not undefined, null, etc...
        // eval(`handlers.goSavet${target}()`)
        // if (target == 'c100'){
        //     userHandlePreset(target)
        // }
        // template1_applyBtn
        document.querySelector(`#${target}_applyBtn`).click()
        //eval(`handlers.goSavet${target}()`)
    }
}
function userHandlePreset(target){
    console.log('welcome to userHandlePreset()...');
    console.log('target:',target);
    if (target == 'c100'){
        let presetValue = document.querySelector('#c100_presetDD').value
        if (presetValue == 'unum_logo-white_bg-color'){
            document.querySelector('#c100_backgroundColor').value = '#015294'
            document.querySelector('#c100_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/unum-logo-white-pad-right.png?raw=true'
            document.querySelector('#c100_logoAltText').value = "[Unum]"
            document.querySelector('#c100_logoAltTextColor').value = "white"
            document.querySelector('#c100_ctaTextColor').value = "white"
        }
        if (presetValue == 'colonial_logo-white_bg-color'){
            document.querySelector('#c100_backgroundColor').value = '#19557F'
            document.querySelector('#c100_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/colonial-logo-white-10r.png?raw=true'
            document.querySelector('#c100_logoAltText').value = "[Colonial Life]"
            document.querySelector('#c100_logoAltTextColor').value = "white"
            document.querySelector('#c100_ctaTextColor').value = "white"
        }
        if (presetValue == 'unum_logo-color_bg-white'){
            document.querySelector('#c100_backgroundColor').value = 'white'
            document.querySelector('#c100_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/unum-logo-pad-right.png?raw=true'
            document.querySelector('#c100_logoAltText').value = "[Unum]"
            document.querySelector('#c100_logoAltTextColor').value = "#015294"
            document.querySelector('#c100_ctaTextColor').value = "#015294"
        }
        if (presetValue == 'colonial_logo-color_bg-white'){
            document.querySelector('#c100_backgroundColor').value = 'white'
            document.querySelector('#c100_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/colonial-logo-10r.png?raw=true'
            document.querySelector('#c100_logoAltText').value = "[Colonial Life]"
            document.querySelector('#c100_logoAltTextColor').value = "#19557F"
            document.querySelector('#c100_ctaTextColor').value = "#19557F"
        }

        document.querySelector('#c100_backgroundColor').value = document.querySelector('#c100_backgroundColor').value
        document.querySelector('#c100_logoUrl').value = document.querySelector('#c100_logoUrl').value
        document.querySelector('#c100_logoSrc').value = document.querySelector('#c100_logoSrc').value
        document.querySelector('#c100_logoAltText').value = document.querySelector('#c100_logoAltText').value
        document.querySelector('#c100_logoAltTextColor').value = document.querySelector('#c100_logoAltTextColor').value
        document.querySelector('#c100_ctaTextColor').value = document.querySelector('#c100_ctaTextColor').value
        document.querySelector('#c100_ctaUrl').value = document.querySelector('#c100_ctaUrl').value
        document.querySelector('#c100_ctaText').value = document.querySelector('#c100_ctaText').value
    }
    if (target == 'c101'){
        let presetValue = document.querySelector('#c101_presetDD').value
        if (presetValue == 'unum_logo-white_bg-color'){
            document.querySelector('#c101_backgroundColor').value = '#015294'
            document.querySelector('#c101_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/unum-logo-white-pad-right.png?raw=true'
            document.querySelector('#c101_logoAltText').value = "[Unum]"
            document.querySelector('#c101_logoAltTextColor').value = "white"
            document.querySelector('#c101_headerbarColor').value = "white"
            document.querySelector('#c101_descTextColor').value = "white"
        }
        if (presetValue == 'colonial_logo-white_bg-color'){
            document.querySelector('#c101_backgroundColor').value = '#19557F'
            document.querySelector('#c101_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/colonial-logo-white-10r.png?raw=true'
            document.querySelector('#c101_logoAltText').value = "[Colonial Life]"
            document.querySelector('#c101_logoAltTextColor').value = "white"
            document.querySelector('#c101_headerbarColor').value = "white"
            document.querySelector('#c101_descTextColor').value = "white"
        }
        if (presetValue == 'unum_logo-color_bg-white'){
            document.querySelector('#c101_backgroundColor').value = 'white'
            document.querySelector('#c101_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/unum-logo-pad-right.png?raw=true'
            document.querySelector('#c101_logoAltText').value = "[Unum]"
            document.querySelector('#c101_logoAltTextColor').value = "#015294"
            document.querySelector('#c101_headerbarColor').value = "#015294"
            document.querySelector('#c101_descTextColor').value = "#015294"
        }
        if (presetValue == 'colonial_logo-color_bg-white'){
            document.querySelector('#c101_backgroundColor').value = 'white'
            document.querySelector('#c101_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/colonial-logo-10r.png?raw=true'
            document.querySelector('#c101_logoAltText').value = "[Colonial Life]"
            document.querySelector('#c101_logoAltTextColor').value = "#19557F"
            document.querySelector('#c101_headerbarColor').value = "#19557F"
            document.querySelector('#c101_descTextColor').value = "#19557F"
        }

        document.querySelector('#c101_backgroundColor').value = document.querySelector('#c101_backgroundColor').value
        document.querySelector('#c101_logoUrl').value = document.querySelector('#c101_logoUrl').value
        document.querySelector('#c101_logoSrc').value = document.querySelector('#c101_logoSrc').value
        document.querySelector('#c101_logoAltText').value = document.querySelector('#c101_logoAltText').value
        document.querySelector('#c101_logoAltTextColor').value = document.querySelector('#c101_logoAltTextColor').value
        document.querySelector('#c101_headerbarColor').value = document.querySelector('#c101_headerbarColor').value
        document.querySelector('#c101_descTextColor').value = document.querySelector('#c101_descTextColor').value
        document.querySelector('#c101_descText').value = document.querySelector('#c101_descText').value
    }
    if (target == 'c102'){
        let presetValue = document.querySelector('#c102_presetDD').value
        if (presetValue == 'unum_logo-white_bg-color'){
            document.querySelector('#c102_backgroundColor').value = '#015294'
            document.querySelector('#c102_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/unum-logo-white-pad-right.png?raw=true'
            document.querySelector('#c102_logoAltText').value = "[Unum]"
            document.querySelector('#c102_logoAltTextColor').value = "white"
            document.querySelector('#c102_headerbarColor').value = "white"
            document.querySelector('#c102_descTextColor').value = "white"
            document.querySelector('#c102_ctaTextColor').value = "white"
        }
        if (presetValue == 'colonial_logo-white_bg-color'){
            document.querySelector('#c102_backgroundColor').value = '#19557F'
            document.querySelector('#c102_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/colonial-logo-white-10r.png?raw=true'
            document.querySelector('#c102_logoAltText').value = "[Colonial Life]"
            document.querySelector('#c102_logoAltTextColor').value = "white"
            document.querySelector('#c102_headerbarColor').value = "white"
            document.querySelector('#c102_descTextColor').value = "white"
            document.querySelector('#c102_ctaTextColor').value = "white"
        }
        if (presetValue == 'unum_logo-color_bg-white'){
            document.querySelector('#c102_backgroundColor').value = 'white'
            document.querySelector('#c102_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/unum-logo-pad-right.png?raw=true'
            document.querySelector('#c102_logoAltText').value = "[Unum]"
            document.querySelector('#c102_logoAltTextColor').value = "#015294"
            document.querySelector('#c102_headerbarColor').value = "#015294"
            document.querySelector('#c102_descTextColor').value = "#015294"
            document.querySelector('#c102_ctaTextColor').value = "#015294"
        }
        if (presetValue == 'colonial_logo-color_bg-white'){
            document.querySelector('#c102_backgroundColor').value = 'white'
            document.querySelector('#c102_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/colonial-logo-10r.png?raw=true'
            document.querySelector('#c102_logoAltText').value = "[Colonial Life]"
            document.querySelector('#c102_logoAltTextColor').value = "#19557F"
            document.querySelector('#c102_headerbarColor').value = "#19557F"
            document.querySelector('#c102_descTextColor').value = "#19557F"
            document.querySelector('#c102_ctaTextColor').value = "#19557F"
        }

        document.querySelector('#c102_backgroundColor').value = document.querySelector('#c102_backgroundColor').value
        document.querySelector('#c102_logoUrl').value = document.querySelector('#c102_logoUrl').value
        document.querySelector('#c102_logoSrc').value = document.querySelector('#c102_logoSrc').value
        document.querySelector('#c102_logoAltText').value = document.querySelector('#c102_logoAltText').value
        document.querySelector('#c102_logoAltTextColor').value = document.querySelector('#c102_logoAltTextColor').value
        document.querySelector('#c102_headerbarColor').value = document.querySelector('#c102_headerbarColor').value
        document.querySelector('#c102_descTextColor').value = document.querySelector('#c102_descTextColor').value
        document.querySelector('#c102_descText').value = document.querySelector('#c102_descText').value
        document.querySelector('#c102_ctaTextColor').value = document.querySelector('#c102_ctaTextColor').value
        document.querySelector('#c102_ctaUrl').value = document.querySelector('#c102_ctaUrl').value
        document.querySelector('#c102_ctaText').value = document.querySelector('#c102_ctaText').value
    }
    if (target == 'c104'){
        let presetValue = document.querySelector('#c104_presetDD').value
        if (presetValue == 'paulrevere_logo-color_bg-white'){  
            document.querySelector('#c104_backgroundColor').value = 'white'
            document.querySelector('#c104_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/paul-revere-logo-color-10r.png?raw=true'
            document.querySelector('#c104_logoAltText').value = "[Colonial Voluntary Benefits]"
            document.querySelector('#c104_logoAltTextColor').value = "#19557F"
            document.querySelector('#c104_ctaTextColor').value = "#19557F"
        }
        if (presetValue == 'paulrevere_logo-white_bg-color'){ 
            document.querySelector('#c104_backgroundColor').value = '#19557F'
            document.querySelector('#c104_logoSrc').value = 'https://github.com/unumux/birch-builder-2/blob/master/images/components/paul-revere-logo-white-10r.png?raw=true'
            document.querySelector('#c104_logoAltText').value = "[Colonial Voluntary Benefits]"
            document.querySelector('#c104_logoAltTextColor').value = "white"
            document.querySelector('#c104_ctaTextColor').value = "white"
        }

        document.querySelector('#c104_backgroundColor').value = document.querySelector('#c104_backgroundColor').value
        document.querySelector('#c104_logoUrl').value = document.querySelector('#c104_logoUrl').value
        document.querySelector('#c104_logoSrc').value = document.querySelector('#c104_logoSrc').value
        document.querySelector('#c104_logoAltText').value = document.querySelector('#c104_logoAltText').value
        document.querySelector('#c104_logoAltTextColor').value = document.querySelector('#c104_logoAltTextColor').value
        document.querySelector('#c104_ctaTextColor').value = document.querySelector('#c104_ctaTextColor').value
        document.querySelector('#c104_ctaUrl').value = document.querySelector('#c104_ctaUrl').value
        document.querySelector('#c104_ctaText').value = document.querySelector('#c104_ctaText').value
    }
    userAutoSaveMe(target);
}
function userBlankTo0(guy){ // used for number only input fields
    if (guy.value === ''){
        guy.value = 0;
    }
}
function userSetRadio(guy){
    //console.log('welcome to userSetRadio()...')
    let targetEl = document.querySelector(`#${guy.dataset.target}`)
    targetEl.value = guy.value
    targetEl.onblur()
}
