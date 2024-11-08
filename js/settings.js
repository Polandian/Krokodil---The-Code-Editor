let relativeLines = {name: "relativeLines", value: null}
let editorSwing = {name:"editorSwing", value: null}
let cursorBlink = {name:"cursorBlink", value: null}

const allSetting = [relativeLines, editorSwing, cursorBlink]

function loadAnims(){
	if(editorSwing.value == true) document.getElementById("codeEditor").classList.add("codeEditorAnim")
	else document.getElementById("codeEditor").classList.remove("codeEditorAnim")

	if(cursorBlink.value == true) document.getElementById("editorCursor").classList.add("editorCursorAnim") 
	else document.getElementById("editorCursor").classList.remove("editorCursorAnim")
}

function changeSetting(y){ //change setting
	localStorage.setItem(y, document.getElementById(y).checked)
	eval(y).value = (localStorage.getItem(y) === "true")
	loadAnims()
}

for(var i = 0; i < allSetting.length; i++){ //loads all settings
	allSetting[i].value = (localStorage.getItem(allSetting[i].name) === "true")
	document.getElementById(allSetting[i].name).checked = allSetting[i].value
}; loadAnims()
  //TODO ADD THIS ANIM AS SETTING FOR EDITOR TAB ANIM
  //animation: editorAnim 2s infinite ease-in-out;
  //TODO CURSOR ANIM
  //animation: 1s cursorBlink step-end infinite;
