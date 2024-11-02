let lineAmount = 2
let cursorX = 0
let cursorY = 1
let currentLine = 1
let lastAction = null

function relativeLine(){
	/*for(var i = currentLine; i < lineAmount; i++){
		document.querySelectorAll(".lineNumber")[i - 1].innerText = i
	}
	for(var i = currentLine; i > 0; i--){
		document.querySelectorAll(".lineNumber")[i - 1].innerText = i
	}*/
}

function removeLine(){
	document.querySelectorAll(".textEditorLine")[currentLine - 1].remove()
	document.querySelectorAll(".lineNumber")[currentLine - 1].remove()
	lineAmount--
	if(relativeLines.value == false){
		for(var i = 1; i < lineAmount + 1; i++){
			document.querySelectorAll(".lineNumber")[i - 1].innerText = i
		}
	}else{
		relativeLine()
	}
}

function createNewLine(){
	if(currentLine == lineAmount){
		lineAmount++
		currentLine++
		var newLine = document.createElement("div")
		var newText = document.createElement("div")
		newLine.classList.add("lineNumber")
		newText.classList.add("textEditorLine")
		if(relativeLines.value == false){
			newLine.innerHTML = lineAmount
		}
		else{
			//relativeLine()
		}
		newText.innerText = ":"
		document.getElementById("lineNumber").appendChild(newLine)
		document.getElementById("textEditor").appendChild(newText)
		cursorY+= 31
		cursorX = 9
	}
	else{
		lineAmount++
		cursorX = 9
		var selectedLine = document.querySelectorAll(".textEditorLine")[currentLine - 1]
		var newLine = document.createElement("div")
		var newText = document.createElement("div")
		newLine.classList.add("lineNumber")
		newText.classList.add("textEditorLine")
		newText.innerText = ":"
		document.getElementById("lineNumber").appendChild(newLine)
		if(relativeLines.value == false){
			for(var i = 1; i < lineAmount + 1; i++){
				document.querySelectorAll(".lineNumber")[i - 1].innerText = i
			}
		}
		else{
			relativeLine()
		}
		document.getElementById("textEditor").appendChild(newText)
		document.getElementById("textEditor").insertBefore(newText, selectedLine)
	}
}

document.addEventListener('keydown', function(event) {
	//Enter
	if(event.keyCode == 13){
		//Creates new line
		createNewLine()
	}
	
	//Left Arrow Key
	if(event.keyCode == 37 && cursorX > 0){
		cursorX-= 9 //cursorX
	}

	//Right Arrow Key
	if(event.keyCode == 39 && cursorX < document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9){
		cursorX+= 9 //cursorX
	}
	
	//Up Arrow Key
	if(event.keyCode == 38 && currentLine > 1){
		currentLine-= 1
		cursorY-= 31 //cursorY
		try{
			if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9){
				cursorX = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9
			}
		}catch(error){
			console.log("Caught Error: "+error)
			cursorX = 0
		}
		if(relativeLines.value == true){
			relativeLine()
		}
	}
	
	//Down Arrow Key
	if(event.keyCode == 40 && currentLine < lineAmount){
		currentLine+= 1
		cursorY+= 31 //cursorY
		try{ //gets current line, compares it to the before line
			if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9){
				cursorX = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9
			}
		}catch(error){ //if new line has no text, set cursor left pos to 0
			console.log("Caught Error: "+error)
			cursorX = 0 
		}
		if(relativeLines.value == true){
			relativeLine()
		}
	}

	//Backspace Key
	//TODO MAKE REMOVE
	//BACKSPACE and DEL BUTTON
	//IMO YOU CAN GET THE CURRENT LINE
	//THEN GET THE CURRENT LETTER
	//BY DIVIDING cursorX
	//AND REMOVING 1 TO GET THE LETTER BEFORE THE CURSOR
	//THIS IS EXACTLY WHAT I DID

	//TODO DO OWN SCROLLBAR FOR OVERFLOWS
	//TODO MAKE SELECT ENTIRE LINE WITH CTRL A + CHANGE BACKGROUND OF THAT LINE
	//I WISH WE DIDN'T HAVE EXAMS BRO IT TAKES SO LONG TO FINISH
	//TODO OH AND ALSO FIX relativeLine()
	//ITS GETTING CALLED YOU JUST NEED TO MAKE IT WORK
	//ALSO YOU MIGHT NEED TO DO YOUR OWN KEYHOLD SYSTEM
	//BUT UR PROBABLY TOO LAZY FOR THAT AS EVEN CREATORS OF THE COMPUTERS DIDN'T IMPLEMENT IT
	//TODO ALSO DO LAST ACTION
	
	var charToRemoveBackspace = (document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText).charAt((cursorX/9) - 1)
	var charToRemoveDel = (document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText).charAt((cursorX/9))
	
	//Backspace
	if(event.keyCode == 8){
		console.log(charToRemoveBackspace)
		if(charToRemoveBackspace == ""){
			removeLine()
			if(cursorY > 1)	(cursorY-= 31,  currentLine--)
		}
	}

	//Del
	if(event.keyCode == 46){
		console.log(charToRemoveDel)
		if(charToRemoveDel == "" && currentLine != lineAmount){
			currentLine++
			removeLine()
			currentLine--
		}
	}

	//CtrlShiftK
	if(event.ctrlKey && event.shiftKey && event.keyCode == 75){
		removeLine()
		cursorX = 0
		if(cursorY > 1)	(cursorY-= 31,  currentLine--, cursorX = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9)
	}

	//F11
	if(event.keyCode == 122){
		if(fullscreen.value == true) document.getElementById("codeEditor").requestFullscreen()
	}

	//Sets caret position
	document.getElementById("editorCursor").style.marginLeft = cursorX + "px"
	document.getElementById("editorCursor").style.marginTop = cursorY + "px"
}, false);