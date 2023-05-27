
function mod(n, m) {
  return ((n % m) + m) % m;
}
//object handling a singular note. Note that a single note
//can also be a chord
class Note
{
//pos must be an array of int, dur is a string, 
//acc is accidentals, force is anything like accents

  	constructor(pos=[0], dur="q", rest=false, first=false, acc=null)
    {
      this.first=first;
    	var collection=[]
      for(let i=0; i<pos.length; i++)
      {
        let n="";
      	switch(mod(pos[i],7))
        {
        	case 0:
          	n+="b"
            break;
        case 1:
          	n+="c"
            break;
		    case 2:
          	n+="d"
            break;
        case 3:
          	n+="e"
            break;
        case 4:
          	n+="f"
            break;
        case 5:
          	n+="g"
            break;
        case 6:
          	n+="a"
            break;
        }
        n+="/";
        let num=Math.floor(pos[i]/7)+5;
        if(n=="b/")
        	num-=1;
        n+=num.toString();
        collection.push(n);
      }
      var duration=0
      for(let i=0; i<dur.length; i++)
      {
      	if(dur[i]=="q")
        	duration=4;
         else if(dur[i]=="w")
         	duration=1;
         else if(duration==0&&dur[i]=="h")
         	duration=2;
         else if(dur[i]=="h")
         	duration*=2;
      }
      if(rest)
      	duration=duration.toString()+"r";
    	this.note=new Vex.Flow.StaveNote({ keys: collection, duration: duration });
      //if(acc)//Cannot find note.addAccidental function, works online however...
        //this.note.addAccidental(0, new Vex.Flow.Accidental(acc));
    }
    getNote()
    	{
        return this.note;
      }
}

class Marking
{
// dur is a string, 
    
  	constructor(dur="q",type)
    {
      this.mark;
      var duration=0
      for(let i=0; i<dur.length; i++)
      {
      	if(dur[i]=="q")
        	duration=4;
         else if(dur[i]=="w")
         	duration=1;
         else if(duration==0&&dur[i]=="h")
         	duration=2;
         else if(dur[i]=="h")
         	duration*=2;
      }
      if(type=="crescendo")
        {this.mark=new Vex.Flow.Crescendo({duration: duration});}
      else if(type=="decrescendo")
        {this.mark=new Vex.Flow.Crescendo({duration: duration}).setDecrescendo(true);}
      else
      {
        this.mark= new Vex.Flow.TextDynamics({text: type,duration: duration});
      }
    }
    getMarking()
    {
    	return this.mark;
    }
}

class Sheet 
{

	constructor(clefnum=1, font="Times New Roman")
  {
  	this.SHEET_WIDTH=1220;
    this.clefnum=clefnum;
  	const { Renderer } = Vex.Flow;
    this.canvas = document.querySelector('#my-canvas');
    this.renderer = new Vex.Flow.Renderer(this.canvas, Vex.Flow.Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
  	this.measures = [];
    this.noteset = [];
    var firstmeasure = new Vex.Flow.Stave(10, 3.14, 300);
    var firstnotes=[new Note([0],'q',false,true)];
    for(let i = 0; i < clefnum; i++) 
    {
      this.measures.push([firstmeasure]);
      this.noteset.push([firstnotes]);
    }
  }
  render(beams=null)
  {
    var beamcontain=[];
    //first beams num specifying clef, second specifying measure, beyond are notes to be connected
    if(beams)
    for(let i = 0; i < beams.length; i++) 
    {
      var barr=[];
      for(let j = 2; j < beams[i].length; j++) 
      {
        barr.push(this.noteset[beams[i][0]][beams[i][1]][beams[i][j]]);
      }
      const b = new Vex.Flow.Beam(barr);
      beamcontain.push(b);
      
    }
  	for(let i = 0; i < this.clefnum; i++) 
    {
    	for(let j=0; j<this.measures[i].length; j++)
      {
      	this.measures[i][j].setContext(this.ctx).draw();
      	Vex.Flow.Formatter.FormatAndDraw(this.ctx, this.measures[i][j],this.noteset[i][j]);
      } 
      if(i>0)
      {
        //brace is not working for an odd reason
        //var brace = new Vex.Flow.StaveConnector(this.measures[0], this.measures[1]).setType(3);
        //brace.setContext(this.ctx).draw();
        //new Vex.Flow.StaveConnector(this.measures[i-1], this.measures[i]).setType('brace').setContext(this.ctx).draw();
      }
    }
    
    for(let i=0; i<beamcontain.length;i++)
    {
      beamcontain[i].setContext(this.ctx).draw();
    }
  }
  //Detecting and determining the position of a new measure. If first measure, must include a clef.
  newMeasure(cleffnum=0,len=300,clef=null, keysig=null,timesig=null)
  {
  	var staveMeasure;
    var firstmeasure=false;
    if(this.measures[cleffnum][this.measures[cleffnum].length-1].x>this.SHEET_WIDTH-len)
    	staveMeasure = new Vex.Flow.Stave(10, this.measures[cleffnum][this.measures[cleffnum].length-1].y
        +100*Math.ceil(this.cleffnum/2), len);
    else if(this.measures[cleffnum][0].y==3.14)
      {staveMeasure=new Vex.Flow.Stave(10, Math.ceil(cleffnum/2)*100, len);firstmeasure=true;}
    else
    	{staveMeasure = new Vex.Flow.Stave(this.measures[cleffnum][this.measures[cleffnum].length-1].x+
        len, this.measures[cleffnum][this.measures[cleffnum].length-1].y, len);}
    
    if(keysig)
    {
      staveMeasure.addKeySignature(keysig);
    }
    if(clef)
      staveMeasure.addClef(clef);
    if(timesig)
      staveMeasure.addTimeSignature(timesig);
    if(firstmeasure)
    {
      this.measures[cleffnum][0]=staveMeasure;
      firstmeasure=false;
    }
    else
      {this.measures[cleffnum].push(staveMeasure);}
    
  }

  //takes in the cleffnum, and an array of Note objects
	newNoteSet(cleffnum=0,notes=null,markings=null)
  {
  	var notemeasure=[];
    if(notes)
  	for(let i=0; i<notes.length; i++)
    { 
    	notemeasure.push(notes[i].getNote())
    }
    if(markings)
    {
      for(let i=0; i<markings.length; i++)
      {
        notemeasure.push(markings[i].getMarking());
      }
    }
    if(this.noteset[cleffnum][0][0].first)
      {this.noteset[cleffnum][0]=notemeasure;}
    else 
      this.noteset[cleffnum].push(notemeasure);
  }
}
