// sub component wish list

// h1
// h2
// icon
// p
// link
// cta
// spacer
// email (202d)
// phone (202d)
// bullet (205)
// icon bullet (205e)

function generateSubFormFields(subname, guid, subcount){
    console.log('welcome to generateSubFormFields()...');
    // console.log('subname',subname);
    // console.log('guid',guid);
    
    const sub1form =    `<fieldset><legend>sub1 [up] [dn] <button onclick="addedSubCompDelete('${subname}', ${subcount})">delete</button></legend>
                            <div id="formTemplate_sub1_compid${guid}_subcount${subcount}">
                                <div class="inputGroup">
                                    <label>
                                        <div>sub1--color:</div>
                                        <input id="form_color_sub1_compid${guid}_subcount${subcount}" onblur="userSaveSub('sub1');">
                                    </label>
                                </div>
                                <div class="inputGroup">
                                    <label>
                                        <div>sub1--text:</div>
                                        <input id="form_text_sub1_compid${guid}_subcount${subcount}" onblur="userSaveSub('sub1');">
                                    </label>
                                </div>
                            </div>
                            <div class="inputGroup editApplyButtonContainer hideme">
                                <button class="editBtn" id="sub1_applyBtn" onclick="userEditSave()" type="button">Apply &rsaquo;</button>
                            </div>
                        </fieldset>`
    const sub2form =    `<fieldset><legend>sub2 [up] [dn] <button onclick="addedSubCompDelete('${subname}', ${subcount})">delete</button></legend>
                            <div id="formTemplate_sub2_compid${guid}_subcount${subcount}">
                                <div class="inputGroup">
                                    <label>
                                        <div>sub2--color:</div>
                                        <input id="form_color_sub2_compid${guid}_subcount${subcount}" onblur="userSaveSub('sub2');">
                                    </label>
                                </div>
                                <div class="inputGroup">
                                    <label>
                                        <div>sub2--text:</div>
                                        <input id="form_text_sub2_compid${guid}_subcount${subcount}" onblur="userSaveSub('sub2');">
                                    </label>
                                </div>
                            </div>
                            <div class="inputGroup editApplyButtonContainer hideme">
                                <button class="editBtn" id="sub2_applyBtn" onclick="userEditSave()" type="button">Apply &rsaquo;</button>
                            </div>
                        </fieldset>`
    const sub3form =    `<fieldset><legend>sub3 [up] [dn] <button onclick="addedSubCompDelete('${subname}', ${subcount})">delete</button></legend>
                            <div id="formTemplate_sub3_compid${guid}_subcount${subcount}">
                                <div class="inputGroup">
                                    <label>
                                        <div>sub3--color:</div>
                                        <input id="form_color_sub3_compid${guid}_subcount${subcount}" onblur="userSaveSub('sub3');">
                                    </label>
                                </div>
                                <div class="inputGroup">
                                    <label>
                                        <div>sub3--text:</div>
                                        <input id="form_text_sub3_compid${guid}_subcount${subcount}" onblur="userSaveSub('sub3');">
                                    </label>
                                </div>
                            </div>
                            <div class="inputGroup editApplyButtonContainer hideme">
                                <button class="editBtn" id="sub3_applyBtn" onclick="userEditSave()" type="button">Apply &rsaquo;</button>
                            </div>
                        </fieldset>`
    const subh1form =   `<fieldset><legend>subh1 [up] [dn] <button onclick="addedSubCompDelete('${subname}', ${subcount})">delete</button></legend>
                            <div id="formTemplate_subh1_compid${guid}_subcount${subcount}">

                                <div class="inputGroup">
                                    <label>color:
                                        <div class="colorboxFlex">
                                            <input class="editInput bgColorInput" id="form_color_subh1_compid${guid}_subcount${subcount}" onblur="userSaveSub('subh1');" data-savetarget="subh1" />
                                            <button type="button" id="form_color_subh1_compid${guid}_subcount${subcount}CP" class="cpTooltip tooltipstered" value="form_color_subh1_compid${guid}_subcount${subcount}" data-subTarget="subh1"></button>
                                        </div>
                                    </label>
                                </div>

                                
                                <div class="inputGroup">
                                    <label>
                                        <div>text:</div>
                                        <input id="form_text_subh1_compid${guid}_subcount${subcount}" onblur="userSaveSub('subh1');">
                                    </label>
                                </div>

                                <div class="inputGroup">
                                    <div class="label">h1Align:
                                        <div class="alignRadioFlex">
                                            <label><input type="radio" name="subh1_textAlignRadio" value="left" data-target="form_align_subh1_compid${guid}_subcount${subcount}" onclick="userSetRadio(this)">left</label>
                                            <label><input type="radio" name="subh1_textAlignRadio" value="center" data-target="form_align_subh1_compid${guid}_subcount${subcount}" onclick="userSetRadio(this)" checked="checked">center</label>
                                            <label><input type="radio" name="subh1_textAlignRadio" value="right" data-target="form_align_subh1_compid${guid}_subcount${subcount}" onclick="userSetRadio(this)">right</label>
                                        </div>
                                        <input class="editInput hideme" id="form_align_subh1_compid${guid}_subcount${subcount}" onblur="userSaveSub('subh1');" />
                                    </div>
                                </div>

                                
                            </div>
                            <div class="inputGroup editApplyButtonContainer hideme">
                                <button class="editBtn" id="subh1_applyBtn" onclick="userEditSave()" type="button">Apply &rsaquo;</button>
                            </div>
                        </fieldset>`
    
    return(eval(`${subname}form`))
    
}

function addSubCompBtnClick(recCompName){
    //console.log(`welcome to addSubCompBtnClick(recCompName=${recCompName})...`);
    const subCompSelectEl = document.getElementById(`addSubCompSelect_${recCompName}`) // addedSubCompsSelect_component1
    const renderToEl = document.getElementById(`subCompRenderLocation_${recCompName}`)
    const selectedComp = utilGetArrayItemByGuid(main.comps, main.selectedComp.guid)

    // add selected sub to the dataComp's subcomponentArray
    const megaComponentArray = Object.entries(megaComponentObject) // make an array of arrays from the obj
    megaComponentArray.map( (item, i) => {
        const [label, value] = item // deconstruct item array 
        //console.log('label:', label);
        //console.log('value:', value);
        
        if (value.name == subCompSelectEl.value){
            console.log('found a template that matches:', value);
            //main.selectedComp.subcomponentArray.push(JSON.parse(JSON.stringify(eval(value)))) // deep clone that only works if obj has no methods.)
            selectedComp.subcomponentArray.push(JSON.parse(JSON.stringify(eval(value)))) // deep clone that only works if obj has no methods.)
        }
    })

    // save??

    // re-render form looping through subcomponentArray to concat all the subcomps
    let allSubFieldsHtml = ''
    selectedComp.subcomponentArray.map( (item, i) => {
        allSubFieldsHtml += generateSubFormFields(item.name, selectedComp.guid, i)
    })

    // render subcomp input field(s) html to location
    renderToEl.innerHTML = allSubFieldsHtml

    // load all data into form fields

    let allMergedSubcomponentsCode = ''

    // loop through each subcomp
    selectedComp.subcomponentArray.map( (item, i) => {
        console.log('item.code:', item.code);
        // document.getElementById('c154s_subComponentUI').value = item.code
        
        allMergedSubcomponentsCode += mainMergeDataIntoPlaceholders(item)
        // now save to update the email with the merged code of the subcomp
        
        const subDataArray = Object.entries(item.dataObj) // make an array of arrays from the obj
        subDataArray.map( (thing, j) => {
            const [label, value] = thing // deconstruct thing array  
            
            // load value into field...
            //console.log(`form_${label}_${item.name}_compid${options[selectedIndex].value}_subcount${i}`);
            const candidateFieldEl = document.getElementById(`form_${label}_${item.name}_compid${selectedComp.guid}_subcount${i}`) // form_pcolor_sub1_compid0_subcount0

            if (candidateFieldEl){ // ...if it exists
                candidateFieldEl.value = value
            }
        })
    })

    document.getElementById(`${recCompName}_subComponentUI`).value = allMergedSubcomponentsCode
    userEditSave() // now save to update the email with the merged code of the subcomp

    // attach tooltipster to any newly created color buttons
    $('.cpTooltip').tooltipster({
        content: $('#tooltip_content_all'),
        theme: 'tooltipster-noir',
        contentCloning: true,
        interactive: true,
        triggerOpen: 0,
        trigger: 'click'
    });
    $('.cpTooltip').click(function () {
        console.log('cpTooltip...this:',this);
        
        main.colorPickerInputId = this.value
        main.colorPickerId = this.id
        main.subtarget = this.dataset.subtarget
    })
}

function addedSubCompDelete(recCompName, recSubToDeleteIndex){
    //console.log(`welcome to addedSubCompDelete(recCompName=${recCompName})`)
    main.selectedComp.subcomponentArray.splice(recSubToDeleteIndex,1)
    userPrivateGoEditMode()



    console.log('renderToEl will be:',`subCompRenderLocation_${main.selectedComp.template}`);
    
    const renderToEl = document.getElementById(`subCompRenderLocation_${main.selectedComp.template}`)

    // re-render form looping through subcomponentArray to concat all the subcomps
    let allSubFieldsHtml = ''
    main.selectedComp.subcomponentArray.map( (item, i) => {
        allSubFieldsHtml += generateSubFormFields(item.name, main.selectedComp.guid, i)
    })

    // render subcomp input field(s) html to location
    renderToEl.innerHTML = allSubFieldsHtml

    // load all data into form fields

    let allMergedSubcomponentsCode = ''

    // loop through each subcomp
    main.selectedComp.subcomponentArray.map( (item, i) => {
        console.log('item.code:', item.code);
        // document.getElementById('c154s_subComponentUI').value = item.code
        
        allMergedSubcomponentsCode += mainMergeDataIntoPlaceholders(item)
        // now save to update the email with the merged code of the subcomp
        
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

    document.getElementById(`${main.selectedComp.template}_subComponentUI`).value = allMergedSubcomponentsCode
    userEditSave() // now save to update the email with the merged code of the subcomp
}
