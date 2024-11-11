let lastAction = null


function setCaretPos(x, y){ //x = cursorX
	//Sets caret position   //y = cursorY
	document.getElementById("editorCursor").style.marginLeft = x + "px"
	document.getElementById("editorCursor").style.marginTop = y + "px"
	x = undefined
	y = undefined
}

function relativeLine(x, y){
	//x = currentLine
	//y = lineAmount
	//text inside that line is 1 more than our current line variable
	document.querySelectorAll(".lineNumber")[x].innerText = x + 1
	
	console.log(document.querySelectorAll(".lineNumber")[x])

	var j = 0
	var k = 0
	for(var i = x + 1; i < y + 1; i++){
		j++
		document.querySelectorAll(".lineNumber")[i].innerText = j 
	}

	for(var l = x - 1; l > -1; l--){
		k++
		document.querySelectorAll(".lineNumber")[l].innerText = k
	}
}

function removeLine(x, y){
	document.querySelectorAll(".textEditorLine")[x].remove() //x=currentLine
    //y=lineAmount
	y--
	if(relativeLines.value == false){
		document.getElementById("lineNumber").lastChild.remove()
	}
	else{ 
		//##########################
		//#  VERY IMPORTANT        #
		//#IF YOU ARE GOING TO USE #
		//#THIS FUNCTION LATER ON  #
		//#MAKE SURE YOU USE IT    #
		//#BEFORE YOU LOWER THE    #
		//#CURRENTLINE VALUE       #
		//#BECAUSE ITS LOWERED HERE#
		//##########################
		relativeLine(x - 1, y)
	}
}

function createNewLine(x, y, z, w){
	var cursorX = x
	var cursorY = y
	if(cursorX == document.querySelectorAll(".textEditorLine")[z].innerText.length * 9){
		w++
		z++
		cursorX = 9
		cursorY += 31
		var selectedLine = document.querySelectorAll(".textEditorLine")[z]
		var newText = document.createElement("div")
		newText.classList.add("textEditorLine")
		newText.innerText = ":"
		if(relativeLines.value == false){
			var lastLine = document.createElement("div")
			lastLine.classList.add("lineNumber")
			lastLine.innerText = w + 1
			document.getElementById("lineNumber").appendChild(lastLine)
		}
		else{
			relativeLine(z, w)
		}
		document.getElementById("textEditor").appendChild(newText)
		document.getElementById("textEditor").insertBefore(newText, selectedLine)
	}
	else if(cursorX < document.querySelectorAll(".textEditorLine")[z].innerText.length * 9 && cursorX > 0){
		//TODO DO THIS
	}
	else if(cursorX == 0){
		w++
		cursorY += 31
		var selectedLine = document.querySelectorAll(".textEditorLine")[z]
		var newText = document.createElement("div")
		newText.classList.add("textEditorLine")
		newText.innerText = ":"
		document.getElementById("textEditor").appendChild(newText)
		document.getElementById("textEditor").insertBefore(newText, selectedLine)
		z++
		if(relativeLines.value == false){
			var lastLine = document.createElement("div")
			lastLine.classList.add("lineNumber")
			lastLine.innerText = w + 1
			document.getElementById("lineNumber").appendChild(lastLine)
		}
		else{
			relativeLine(z, w)
		}
	}
	setCaretPos(cursorX, cursorY)
	cursorX = undefined
	cursorY = undefined
}

document.addEventListener('keydown', function(event){
	var cursorX = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginLeft)
	var cursorY = parseInt(window.getComputedStyle(document.getElementById("editorCursor")).marginTop)
	var lineAmount = document.getElementById("lineNumber").childElementCount - 1
	var currentLine = cursorY / 31

	//TODO MAKE REMOVE
	//BACKSPACE and DEL BUTTON
	//IMO YOU CAN GET THE CURRENT LINE
	//THEN GET THE CURRENT LETTER
	//BY DIVIDING cursorX
	//AND REMOVING 1 TO GET THE LETTER BEFORE THE CURSOR
	//THIS IS EXACTLY WHAT I DID

	//TODO DO OWN SCROLLBAR FOR OVERFLOWS
	//TODO MAKE SELECT ENTIRE LINE WITH CTRL A + CHANGE BACKGROUND OF THAT LINE
	//ALSO YOU MIGHT NEED TO DO YOUR OWN KEYHOLD SYSTEM
	//BUT UR PROBABLY TOO LAZY FOR THAT AS EVEN CREATORS OF THE COMPUTERS DIDN'T IMPLEMENT IT
	//TODO ALSO DO LAST ACTION
	//TODO ALSO DO IT SO THAT IF YOU PRESS ENTER IN THE MIDDLE (OR ANYWHERE THAT ISN'T THE CORNER) OF THE LINE, BREAK THE LINE 
	//                                                                                          BUT DONT REMOVE IT OR ANYTHING
	//                                                                                              JUST GET EVERYTHING IN THE 
	//															  								       RIGHT OF THE CURSOR AND 
	//																					  CREATE NEW LINE, THEN PASTE IT THERE
	//ALSO EDITOR WRAPPER HAS THE HEIGHT OF 361
	//BTW JAVASCRIPT DOESN'T SEE THE SPANS AS OTHER ELEMENTS, SO ITS GONNA BE PRETTY EZZ!!! IM SO HAPPY OMG
	//JUST NOTICED IT WONT BE THAT EASY

	//char before cursor
	var charToRemoveBackspace = (document.querySelectorAll(".textEditorLine")[currentLine].innerText).charAt((cursorX/9) - 1)
	var charToRemoveDel = (document.querySelectorAll(".textEditorLine")[currentLine].innerText).charAt((cursorX/9))
	//char after cursor

	switch(event.keyCode){
		case 13: //Enter
			//Creates new Line
			createNewLine(cursorX, cursorY, currentLine, lineAmount)
			break
		case 37: //Left Arrow Key
			if(cursorX > 0) cursorX-=9
			else if(cursorX == 0 && currentLine > 0){
				currentLine--
				cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
				cursorY -= 31
			}
			setCaretPos(cursorX, cursorY)
			break
		case 39: //Right Arrow Key
			if(cursorX < document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9) cursorX+=9
			else if(cursorX == document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9 && currentLine != lineAmount){
				currentLine++
				cursorX = 0
				cursorY += 31
			}
			setCaretPos(cursorX, cursorY)
			break
		case 38: //Up Arrow Key
			if(currentLine > 0){
				currentLine-= 1
				cursorY-= 31 //cursorY
				if(relativeLines.value == true){
					relativeLine(currentLine, lineAmount)
				}
				try{
					if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9){
						cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
					}
				}catch(error){
					console.log("Caught Error: "+error)
					cursorX = 0
				}
				setCaretPos(cursorX, cursorY)
			}
			break
		case 40: //Down Arrow Key
			if(currentLine < lineAmount){
				currentLine+= 1
				cursorY+= 31 //cursorY
				if(relativeLines.value == true){
					relativeLine(currentLine, lineAmount)
				}
				try{ //gets current line, compares it to the before line
					if(cursorX > document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9){
						cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
					}
				}catch(error){ //if new line has no text, set cursor left pos to 0
					console.log("Caught Error: "+error)
					cursorX = 0 
				}
				setCaretPos(cursorX, cursorY)
			}
			break
		case 8: //Backspace
			if(charToRemoveBackspace == ""){
				removeLine(currentLine, lineAmount)
				if(cursorY > 1)	(cursorY-= 31,  currentLine--) 
				setCaretPos(cursorX, cursorY)
			}
			break
		case 46: //Del
			if(charToRemoveDel == "" && currentLine != lineAmount){
				currentLine++
				document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText + document.querySelectorAll(".textEditorLine")[currentLine].innerText
				removeLine(currentLine, lineAmount)
				currentLine--
				cursorX = document.querySelectorAll(".textEditorLine")[currentLine].innerText.length * 9
				setCaretPos(cursorX, cursorY)
			}
			break
	}

	//CtrlShiftK
	if(event.ctrlKey && event.shiftKey && event.keyCode == 75){
		removeLine(currentLine, lineAmount)
		cursorX = 0
		if(cursorY > 1) (cursorY-= 31,  currentLine--, cursorX = document.querySelectorAll(".textEditorLine")[currentLine - 1].innerText.length * 9)
		setCaretPos(cursorX, cursorY)
	}

	cursorX = undefined
	cursorY = undefined
	lineAmount = undefined
	currentLine = undefined
	charToRemoveBackspace = undefined
	charToRemoveDel = undefined
}, false);
