let relativeLines = {name: "relativeLines", value: null}
let editorSwing = {name:"editorSwing", value: null}
let cursorBlink = {name:"cursorBlink", value: null}
let editorTransparent = {name:"editorTransparent", value: null}
let behindCaret = {name: "behindCaret", value: null}

const allSetting = [relativeLines, editorSwing, cursorBlink, editorTransparent, behindCaret]

function loadAnims(){
	if(editorSwing.value == true) document.getElementById("codeEditor").classList.add("codeEditorAnim")
	else document.getElementById("codeEditor").classList.remove("codeEditorAnim")

	if(cursorBlink.value == true) document.getElementById("editorCursor").classList.add("editorCursorAnim") 
	else document.getElementById("editorCursor").classList.remove("editorCursorAnim")

	if(editorTransparent.value == true) document.getElementById("codeEditor").style.background = "none"
	else document.getElementById("codeEditor").style.background = "rgb(20, 20, 20)"
	

	if(behindCaret.value == true) document.getElementById("editorCursor").classList.add("editorCursorBlend")
	else document.getElementById("editorCursor").classList.remove("editorCursorBlend")
}

function changeSetting(y){ //change setting
	localStorage.setItem(y, document.getElementById(y).checked)
	eval(y).value = (localStorage.getItem(y) === "true")
	loadAnims()

	if(y == "relativeLines" && relativeLines.value == false){ //if relativeLines are closed, sets line numbers in a correct order
		for(var i = 0; i < document.getElementById("lineNumber").childElementCount; i++){
			document.querySelectorAll(".lineNumber")[i].innerText = i + 1
		}
	}
}

for(var i = 0; i < allSetting.length; i++){ //loads all settings
	allSetting[i].value = (localStorage.getItem(allSetting[i].name) === "true")
	document.getElementById(allSetting[i].name).checked = allSetting[i].value
}; loadAnims()
  //TODO ADD THIS ANIM AS SETTING FOR EDITOR TAB ANIM
  //animation: editorAnim 2s infinite ease-in-out;
  //TODO CURSOR ANIM
  //animation: 1s cursorBlink step-end infinite;
