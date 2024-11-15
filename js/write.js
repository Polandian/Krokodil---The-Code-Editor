document.addEventListener('keydown', function(event){
	var cursorX = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginLeft)
	var cursorY = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginTop)
	var lineAmount = document.getElementById("lineNumber").childElementCount - 1
	var currentLine = cursorY / 31
	var key = event.key
	var decrepatedKeys = ["Control", "Alt", "AltGraph", "CapsLock", "Tab", "Escape", 
		"F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", 
		"ScrollLock", "Pause", "Insert", "Delete", "Backspace", "PageUp", "PageDown",
		"NumLock", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter",
		"Insert", "End", "Clear", "Meta", "ContextMenu", " ", "Shift"]

	//TODO DO HELPFUL KEYS (such as doubling the key (like brackets or ""))

	if(!decrepatedKeys.includes(key)){
		if(event.ctrlKey && event.shiftKey && event.keyCode == 75) return false

		cursorX += 9
		setCaretPos(cursorX, cursorY)
		if(!event.shiftKey){
			var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText
			var src = temp.slice(0, cursorX / 9 - 1) + key.toLowerCase() + temp.slice(cursorX / 9 - 1) 
			document.querySelectorAll(".textEditorLine")[currentLine].innerText = src
		}
		//if shift is being holded
		else if(event.shiftKey){
			var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText
			var src = temp.slice(0, cursorX / 9 - 1) + key + temp.slice(cursorX / 9 - 1) 
			document.querySelectorAll(".textEditorLine")[currentLine].innerText = src
		}		
	}
	else{
		if(key == " "){
			cursorX += 9
			setCaretPos(cursorX, cursorY)
			var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText
			var src = temp.slice(0, cursorX / 9 - 1) + "&nbsp" + temp.slice(cursorX / 9 - 1) 
			document.querySelectorAll(".textEditorLine")[currentLine].innerHTML = src
		}
		else if(key == "Tab"){
			cursorX += 36
			setCaretPos(cursorX, cursorY)
			var temp = document.querySelectorAll(".textEditorLine")[currentLine].innerText
			var src = temp.slice(0, cursorX / 9 - 4) + "&nbsp&nbsp&nbsp&nbsp" + temp.slice(cursorX / 9 - 4) 
			document.querySelectorAll(".textEditorLine")[currentLine].innerHTML = src
		}
	} 
	cursorX = undefined
	cursorY = undefined
	currentLine = undefined
	lineAmount = undefined
	key = undefined
	decrepatedKeys = undefined
}, false)
