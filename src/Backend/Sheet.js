function mod(n, m) {
  return ((n % m) + m) % m;
}
//object handling a singular note. Note that a single note
//can also be a chord
class Note
{
//pos must be an array of int, dur is a string, 
//acc is accidentals, force is anything like accents

  	constructor(pos=[0], dur="q", acc=null, force=null,rest=false)
    {
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
    }
    getNote()
    {
    	return this.note;
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
    this.firstnote=true;
    
    var firstmeasure = new Vex.Flow.Stave(10, 3.14, 300);
    var firstnotes=[new Note()];
    for(let i = 0; i < clefnum; i++) 
    {
      this.measures.push([firstmeasure]);
      this.noteset.push([firstnotes]);
    }
    
  }
  render()
  {
  	for(let i = 0; i < this.clefnum; i++) 
    {
    	for(let j=0; j<this.measures[i].length; j++)
      {
      	this.measures[i][j].setContext(this.ctx).draw();
      	Vex.Flow.Formatter.FormatAndDraw(this.ctx, this.measures[i][j],this.noteset[i][j]);
      }
    }
  }
  
  //Detecting and determining the position of a new measure. If first measure, must include a clef.
  newMeasure(cleffnum=0,len=300,clef=null, b=null)
  {
  	var staveMeasure;
    
    if(this.measures[cleffnum][this.measures[cleffnum].length-1].x>this.SHEET_WIDTH-len)
    	staveMeasure = new Vex.Flow.Stave(10, this.measures[cleffnum][this.measures[cleffnum].length-1].y+100*cleffnum, len);
    else
    	staveMeasure = new Vex.Flow.Stave(this.measures[cleffnum][this.measures[cleffnum].length-1].x+len, this.measures[cleffnum][this.measures[cleffnum].length-1].y, len);
  	if(this.measures[cleffnum][0].y==3.14)
    {
      this.measures[cleffnum][0]=(new Vex.Flow.Stave(10, this.measures[cleffnum][this.measures[cleffnum].length-1].y, len)).addClef(clef);
    }
    else if(clef)
    	this.measures[cleffnum].push(staveMeasure.addClef(clef));
    else
      this.measures[cleffnum].push(staveMeasure);
  }

  //takes in the cleffnum, and an array of Note objects
	newNoteSet(cleffnum=0,notes=null)
  {
  	var notemeasure=[];
  	for(let i=0; i<notes.length; i++)
    { 
    	notemeasure.push(notes[i].getNote())
    }
    if(this.firstnote)
      {this.noteset[cleffnum][0]=notemeasure;this.firstnote=false}
    else 
      this.noteset[cleffnum].push(notemeasure);
  }
}
