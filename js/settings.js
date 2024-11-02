let relativeLines = {name: "relativeLines", value: false}
let fullscreen = {name: "fullscreen", value: false}
let smoothCaret = {name: "smoothCaret", value: false}

const allSetting = [relativeLines, fullscreen, smoothCaret]

function setCaretAnim(){
	//smooth caret animation
	if(smoothCaret.value == true) document.getElementById("editorCursor").style.transition = "all 0.1s"
	else document.getElementById("editorCursor").style.transition = "0s"
}

function changeSetting(y){ //change setting
	localStorage.setItem(y, document.getElementById(y).checked)
	eval(y).value = (localStorage.getItem(y) === "true")
	setCaretAnim()
}

for(var i = 0; i < allSetting.length; i++){ //loads all settings
	allSetting[i].value = (localStorage.getItem(allSetting[i].name) === "true")
	document.getElementById(allSetting[i].name).checked = allSetting[i].value
}; setCaretAnim()