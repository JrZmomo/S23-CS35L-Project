//translate.js do the translate part

// Use the fileName value as the currentFileName


//Set EventListenr : 
//textarea : input txt box
//btn : translate button , will call translateText()
const textarea = document.getElementById("InputText");

const btn = document.getElementById('translateBtn');
//const btn = document.getElementsByTagName('input')[0];
btn.addEventListener('click', translateText);


//get filename as query parameter
const url = new URL(window.location.href);
const fileName = url.searchParams.get('fileName');
//when opened, get testarray from server based on filename
window.addEventListener('load', () => {

  
  if (fileName === null) {
   } else {
    fetch(`http://localhost:3000/files/${fileName}`)
    .then(response => response.json())
    .then(data => {
    textarea.value = data.context.join('\n');
    });
   }
});

let currentFileName = fileName;


function translateText() {

  //clear canvas
  var canvas = document.querySelector('#my-canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //get input and change to string array
  var textValue = textarea.value;
  var textarray = textValue.split("\n");
  if (!currentFileName) {
    // don't have a File 
    currentFileName = window.prompt('Enter a name for your score:');
    // send HTTP Post Request to create one
    fetch('http://localhost:3000/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filename: currentFileName,
      context: textarray
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
  } else {
    // have the Filename
    // send patch request to update the existing one
    console.log(currentFileName)
    fetch('http://localhost:3000/files/'+currentFileName, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: currentFileName,
        context: textarray
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }




  var hope;
  var beam_list = [];
  var measure_num = [];

  //check each line 
  for (let i = 0; i < textarray.length; i++) {
    var line = textarray[i];
    var key = getkey(line);
    if (line.includes("title")) {
      // console.log(" -> title + ", line);
      var userInput = line;

      var startIndex = userInput.indexOf("{") + 1;
      var endIndex = userInput.lastIndexOf("}");
      var extractedText = userInput.substring(startIndex, endIndex);

      var title = extractedText;

      ctx.font = '35px Times New Roman';
      var textWidth = ctx.measureText(title).width;
      ctx.fillText(title, (canvas.width - textWidth) / 2, 30);
    }
    if (line.includes("clefnum")) {
      hope = key_clefnum(line);
      for (let j = 0; j < hope.getclefnum(); j++) {
        measure_num.push(0);
      }
    }
    if (line.includes("measure")) {
      var temp = key_measure(line, hope);
      // console.log("---------here----------");
      // console.log(temp);
      // console.log("---temp^");
      if (temp.length > 1) {
        for (let j = 1; j < temp.length; j++) {
          temp[j][1] = measure_num[temp[0]];
          // console.log(i,temp[j]);
          beam_list.push(temp[j]);
        }
      }
      // console.log(beam_list);
      measure_num[temp[0]] = measure_num[temp[0]] + 1;
      // console.log("-----------------------");
    }
  }

  const generatePDF = document.getElementById('generatePDF');
  generatePDF.addEventListener('click', function () {
    hope.genPDF();
  });
  hope.render(beam_list);
}




//function Return : get all key in this line
function getkey(line) {
  // console.log(" -> getkey + ", line);
  var keys = [];
  var temp = "";
  var is_start = false;
  for (let i = 0; i < line.length; i++) {

    if (line.charAt(i) === '{') {
      is_start = false;
      keys.push(temp);
      temp = "";
    }

    if (is_start) {
      temp = temp + line.charAt(i);
    }
    if (line.charAt(i) === '\\') {
      is_start = true;
    }
  }
  return keys;
}

//function Input  : \text{"aaa"} or \crescendo{} or \decrescendo{}
//function Return : new Sheet object
function key_marking(line) {
  // console.log(" -> key_marking + ", line);
  var key = getkey(line);
  if (key[0] === "crescendo") {
    // console.log("Do - "+"new Marking("+"w"+","+"crescendo"+")");
    return new Marking("w", "crescendo");
  }
  if (key[0] === "decrescendo") {
    // console.log("Do - "+"new Marking("+"w"+","+"decrescendo"+")");
    return new Marking("w", "decrescendo");
  }
  if (key[0] === "text") {
    var startIndex = line.indexOf("{") + 1;
    var endIndex = line.lastIndexOf("}");
    var extractedText = line.substring(startIndex, endIndex);
    // console.log("Do - "+"new Marking("+"q"+","+extractedText+")");
    return new Marking("q", extractedText);
  }
}

//function Input  : \clefnum{clefnum}
//function Return : new Sheet object
function key_clefnum(line) {
  // console.log(" -> key_clefnum + ", line);
  var userInput = line;

  var startIndex = userInput.indexOf("{") + 1;
  var endIndex = userInput.lastIndexOf("}");
  var extractedText = userInput.substring(startIndex, endIndex);
  // console.log("Do - "+"new Sheet("+extractedText+")");
  return new Sheet(extractedText);
}

//function Input  : \note{[n1,n2,...],s,rest}
//function Rerurn: new Note object
function key_note(line) {
  // console.log(" -> key_note + ", line);
  var userInput = line;

  var startIndex = userInput.indexOf("{") + 1;
  var endIndex = userInput.lastIndexOf("}");
  var extractedText = userInput.substring(startIndex, endIndex);

  if (userInput.includes('[') && userInput.includes(']')) {
    var startIndex_num = userInput.indexOf("[") + 1;
    var endIndex_num = userInput.lastIndexOf("]");
    var extractedText_num = userInput.substring(startIndex_num, endIndex_num)
    var extractedArray_num = extractedText_num.split(",").map(item => {
      var parsedNumber = parseInt(item);
      if (!isNaN(parsedNumber)) {
        return parsedNumber;
      }
    });
    var extractedText_other = userInput.substring(endIndex_num + 1 + 1, endIndex);
    var extractedArray_other = extractedText_other.split(",").map(item => item.trim());
    var extractedArray = [extractedArray_num, ...extractedArray_other];
  } else {
    var extractedArray = extractedText.split(",").map(item => item.trim());
    var fir = [];
    fir.push(parseInt(extractedArray[0]));
    extractedArray[0] = fir;
  }

  switch (extractedArray.length) {
    case 0:
      console.log("Error : wrong input as Note");
      return;
    case 1:
      // console.log("Do - "+"new Note("+extractedArray[0]+")");
      return (new Note(extractedArray[0]));
    case 2:
      // console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+")");
      return (new Note(extractedArray[0], extractedArray[1]));
    case 3:
      // console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+","+JSON.parse(extractedArray[2])+")");
      return (new Note(extractedArray[0], extractedArray[1], JSON.parse(extractedArray[2])));
    case 4:
      // console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+","+JSON.parse(extractedArray[2])+","+JSON.parse(extractedArray[3])+")");
      return (new Note(extractedArray[0], extractedArray[1], JSON.parse(extractedArray[2]), JSON.parse(extractedArray[3])));
    case 5:
      // console.log("Do - "+"new Note("+extractedArray[0]+","+extractedArray[1]+","+JSON.parse(extractedArray[2])+","+JSON.parse(extractedArray[3])+","+extractedArray[4]+")");
      return (new Note(extractedArray[0], extractedArray[1], JSON.parse(extractedArray[2]), JSON.parse(extractedArray[3]), extractedArray[4]));
  }
}

//function Input  : \beam{\note{},\note{}}
//function Rerurn: new Note object array
function key_beams(line) {
  // console.log(" -> key_beams + ", line);
  var userInput = line;
  var startIndex = userInput.indexOf("{") + 1;
  var endIndex = userInput.lastIndexOf("}");
  var extractedText = userInput.substring(startIndex, endIndex);
  var extractedArray_note = extractedText.split(",\\");
  if (extractedArray_note.length > 1) {
    for (let i = 1; i < extractedArray_note.length; i++) {
      extractedArray_note[i] = '\\' + extractedArray_note[i];
    }
  }

  var note_array = [];
  for (let i = 0; i < extractedArray_note.length; i++) {
    if (getkey(extractedArray_note[i])[0] === "note") {
      note_array.push(key_note(extractedArray_note[i]));
    }
  }
  return note_array;
}

function key_measure(line, hope) {
  // console.log(" -> key_measure + ", line);
  var userInput = line;

  var startIndex = userInput.indexOf("{") + 1;
  var endIndex = userInput.lastIndexOf("}");
  var extractedText = userInput.substring(startIndex, endIndex);
  var extractedArray_new = [];
  var extractedArray_other = [];
  var beam_list_total = [];


  if (extractedText.includes('\\')) {
    var endIndex_new = extractedText.indexOf("\\") - 1;
    var extractedText_new = extractedText.substring(0, endIndex_new);
    extractedArray_new = extractedText_new.split(",");
    var extractedText_other = extractedText.substring(endIndex_new + 1, extractedText.length);

    var index = 0;
    while (index < extractedText_other.length) {
      if (extractedText_other.charAt(index) === '\\') {
        var key = getkey(extractedText_other.substring(index, extractedText_other.length));
        if (key[0] === "beam") {

          var endIndex = extractedText_other.substring(index, extractedText_other.length).indexOf("}}");
          endIndex = endIndex + index + 2;
          var extractedText = extractedText_other.substring(index, endIndex);
          extractedArray_other.push(extractedText);
          index = endIndex - 1;
        } else {
          var endIndex = extractedText_other.substring(index, extractedText_other.length).indexOf("}");
          endIndex = endIndex + index + 1;
          var extractedText = extractedText_other.substring(index, endIndex);
          extractedArray_other.push(extractedText);
        }
      }
      index = index + 1;
    }





  } else {
    extractedArray_new = extractedText.split(",");
  }
  var cleffnum = 0;
  var len = 270;
  var clef = null;
  var keysig = null;
  var timesig = null;

  for (let i = 0; i < extractedArray_new.length; i++) {
    if (extractedArray_new[i].includes("cleffnum=")) {
      var cleffnum_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=") + 1, extractedArray_new[i].length);
      cleffnum = parseInt(cleffnum_temp);
    }
    if (extractedArray_new[i].includes("clef=")) {
      var clef_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=") + 1, extractedArray_new[i].length);
      clef = clef_temp;
    }
    if (extractedArray_new[i].includes("keysig=")) {
      var keysig_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=") + 1, extractedArray_new[i].length);
      keysig = keysig_temp;
    }
    if (extractedArray_new[i].includes("timesig=")) {
      var timesig_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=") + 1, extractedArray_new[i].length);
      timesig = timesig_temp;
    }
    if (extractedArray_new[i].includes("len=")) {
      var len_temp = extractedArray_new[i].substring(extractedArray_new[i].indexOf("=") + 1, extractedArray_new[i].length);
      len = parseInt(len_temp);
    }
  }
  if (extractedArray_new.length !== 0) {
    // console.log("Do - "+"hope.newMeasure("+cleffnum+","+len+","+clef+","+keysig+","+timesig+")");
    hope.newMeasure(cleffnum, len, clef, keysig, timesig);
    beam_list_total.push(cleffnum);
  }
  if (extractedArray_other.length !== 0) {
    var note_array = [];
    var marking_array = [];
    for (let i = 0; i < extractedArray_other.length; i++) {
      if (getkey(extractedArray_other[i])[0] === "note") {
        note_array.push(key_note(extractedArray_other[i]));
      } else if (getkey(extractedArray_other[i])[0] === "text") {
        marking_array.push(key_marking(extractedArray_other[i]));
      } else if (getkey(extractedArray_other[i])[0] === "crescendo") {
        marking_array.push(key_marking(extractedArray_other[i]));
      } else if (getkey(extractedArray_other[i])[0] === "decrescendo") {
        marking_array.push(key_marking(extractedArray_other[i]));
      } else if (getkey(extractedArray_other[i])[0] === "beam") {
        var beam_list_s = [];
        beam_list_s.push(cleffnum);
        beam_list_s.push(-1);
        var note_num = note_array.length;
        var temp = key_beams(extractedArray_other[i]);
        for (let j = 0; j < temp.length; j++) {
          beam_list_s.push(note_num + j);
          note_array.push(temp[j]);
        }
        beam_list_total.push(beam_list_s)
      }
    }
    if (note_array.length === 0 && marking_array.length !== 0) {
      // console.log("Do - "+"hope.newNoteSet("+cleffnum+",null,"+marking_array+")");
      hope.newNoteSet(cleffnum, null, marking_array);
    } else if (note_array.length !== 0 && marking_array.length === 0) {
      // console.log("Do - "+"hope.newNoteSet("+cleffnum+","+note_array+")");
      hope.newNoteSet(cleffnum, note_array);
    } else if (note_array.length !== 0 && marking_array.length !== 0) {
      // console.log("Do - "+"hope.newNoteSet("+cleffnum+","+note_array+","+marking_array+")");
      hope.newNoteSet(cleffnum, note_array, marking_array);
    }
  }
  return beam_list_total;
}



