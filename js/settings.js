let relativeLines = {name: "relativeLines", value: null}
let editorSwing = {name:"editorSwing", value: null}
let cursorBlink = {name:"cursorBlink", value: null}
let behindCaret = {name: "behindCaret", value: null}
let highlightLine = {name: "highlightLine", value: null}
let hackerMode = {name: "hackerMode", value: null}

const allSetting = [relativeLines, editorSwing, cursorBlink, behindCaret, highlightLine, hackerMode]

function loadAnims(){
	if(editorSwing.value == true) document.getElementById("codeEditor").classList.add("codeEditorAnim")
	else document.getElementById("codeEditor").classList.remove("codeEditorAnim")

	if(cursorBlink.value == true) document.getElementById("editorCursor").classList.add("editorCursorAnim") 
	else document.getElementById("editorCursor").classList.remove("editorCursorAnim")

	if(hackerMode.value == true){
		var newCss = document.createElement("link")
		newCss.setAttribute("rel", "stylesheet")
		newCss.setAttribute("href", "hacker.css")
		newCss.setAttribute("id", "hackerCss")
		document.getElementsByTagName('head')[0].appendChild(newCss)
		document.getElementById("codeEditor").style.background = "rgb(0, 0, 0)"
	}else if(hackerMode.value == false && document.getElementById("hackerCss") != null){
		document.getElementById("hackerCss").remove()
		document.getElementById("codeEditor").style.background = "rgb(20, 20, 20)"
	}
	
	if(behindCaret.value == true) document.getElementById("editorCursor").classList.add("editorCursorBlend")
	else document.getElementById("editorCursor").classList.remove("editorCursorBlend")

	if(highlightLine.value == false){
		document.querySelectorAll(".lineNumber")[parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginTop) / 31].style.background = "none"
		document.querySelectorAll(".textEditorLine")[parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginTop) / 31].style.background = "none"
	}
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
