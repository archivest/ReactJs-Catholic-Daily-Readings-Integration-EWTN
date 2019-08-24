import React,{Component} from 'react';
import '../App.css';
export default class DailyReadings extends Component {


    constructor(props)
    {
        super();

        this.state = {
            ReadingList:[],
            FirstReading:'',
            Psalm:'',
            SecondReading:'',
            Gospel:'',
            Date:'',
            Readings:[],
             FirstReadingText:[],
             PsalmReadingText:[],
             SecondReadingText:[],
             GospelReadingText:[],
             FirstReadingBody:'',
             PsalmReadingBody:'',
             SecondReadingBody:'',
             GospelReadingBody:''
          }

          this.handleOnChange=this.handleOnChange.bind(this);
    }

    handleOnChange(e)
    {
        
        this.setState({[e.target.name]:e.target.value})
        this.fetchTodayReadings(e.target.value)
        this.fetchReadingText();
    }

    async fetchReadingText(e)
    {
        
        var References=[];
        References=this.state.SecondReading!==''?[this.state.FirstReading,
            this.state.SecondReading,this.state.Psalm,
            this.state.Gospel]:
            [this.state.FirstReading,this.state.Psalm,
            this.state.Gospel]
        await fetch('https://www.ewtn.com/se/readings/readingsservice.svc/books',
        {
            method:'POST',
            headers:{'Content-Type':'application/json',
                     'Accept':'application/json'},
                     body:JSON.stringify({References:References})
        }).then(res=>(res.json()))
        .then((success)=>
        {
            this.setState({Readings:success})
        })
        .catch((error)=>{
            alert(error.message);
        })
          

        this.state.Readings.length===3?
            this.setState({
                FirstReadingText:this.state.Readings[0].Chapters[0].Verses,
                PsalmReadingText:this.state.Readings[1].Chapters[0].Verses,
                SecondReadingText:'',
                GospelReadingText:this.state.Readings[2].Chapters[0].Verses
               
            }):
            this.setState({
                FirstReadingText:this.state.Readings[0].Chapters[0].Verses,
                PsalmReadingText:this.state.Readings[2].Chapters[0].Verses,
                SecondReadingText:this.state.Readings[1].Chapters[0].Verses,
                GospelReadingText:this.state.Readings[3].Chapters[0].Verses
               
            })

                var FirstReading='';
                var Psalm='';
                var SecondReadingText='';
                var GospelReadingText='';
                this.state.FirstReadingText.map(e=>
                    {
                        FirstReading=FirstReading+e.Text;
                    });
                
                
                     this.state.PsalmReadingText.map(e=>
                    {
                        Psalm=Psalm+"\n"+e.Text;
                    });  
                    this.state.SecondReadingText.length>0?
                    this.state.SecondReadingText.map(e=>
                    {
                        SecondReadingText=SecondReadingText+e.Text;
                    }):SecondReadingText=''
                    this.state.GospelReadingText.map(e=>
                    {
                         GospelReadingText=GospelReadingText+e.Text
                    })
                   // console.log(GospelReadingText);
                    this.setState({FirstReadingBody:FirstReading})
                    this.setState({PsalmReadingBody:Psalm})
                    this.setState({SecondReadingBody:SecondReadingText})
                    this.setState({GospelReadingBody:GospelReadingText})

    }

    async fetchTodayReadings(e)
    {
        
        await fetch('https://www.ewtn.com/se/readings/readingsservice.svc/day/'+e+'/en')
        .then((response)=>response.json())
        .then((success)=>this.setState({ReadingList:success}));

        this.state.ReadingList.ReadingGroups[0].Readings.length===4?

             this.setState({FirstReading:this.state.ReadingList.ReadingGroups[0].Readings[0].Citations[0].Reference,
                         Psalm:this.state.ReadingList.ReadingGroups[0].Readings[1].Citations[0].Reference,
                     SecondReading:  this.state.ReadingList.ReadingGroups[0].Readings[2].Type==='Reading 2'?
            this.state.ReadingList.ReadingGroups[0].Readings[2].Citations[0].Reference:'',
                    Gospel:this.state.ReadingList.ReadingGroups[0].Readings[3].Citations[0].Reference})
                    :  this.setState({FirstReading:this.state.ReadingList.ReadingGroups[0].Readings[0].Citations[0].Reference,
                                Psalm:this.state.ReadingList.ReadingGroups[0].Readings[1].Citations[0].Reference,
                                Gospel:this.state.ReadingList.ReadingGroups[0].Readings[2].Citations[0].Reference,
                            SecondReading:''})

                            this.fetchReadingText(e);
    }

    async componentWillMount()
    {

        document.title='Daily Catholic Enounter';
       
        //Get Reading for the day
        
        var date=new Date().getFullYear()+'-'+ parseInt(new Date().getMonth()+1)+'-'+new Date().getDate().toString();
       this.setState({Date:date})
        this.fetchTodayReadings(date)
        
    }
    render() { 
        return ( 
            <div style={{marginLeft:'50px'}}>
                <p>Date: {this.state.Date} <span style={{marginLeft:'50px'}}>
                    <br/> 
                  Change Date: <input type="Date" className="form-control" name="Date" style={{width:'15%'}} onChange={this.handleOnChange}/></span></p>
                <p>Title:{this.state.ReadingList.Title}</p>
                <p>Vestment: {this.state.ReadingList.Color}</p>
                <p>First Reading: {this.state.FirstReading}</p>
                <p>Responsorial Psalm: {this.state.Psalm}</p>
                <p>{this.state.SecondReading!==''?
                'Second Reading: '+ this.state.SecondReading:''} </p>
                <p>Gospel : {this.state.Gospel}</p>
                <hr/>
                <p>First Reading:{this.state.FirstReading}</p>
                <p>{this.state.FirstReadingBody}</p>
                <hr/>
                <p>Responsorial Psalm</p>
               
                {this.state.PsalmReadingBody}
                <hr/>
                <p>{this.state.SecondReading!==''?
                'Second Reading:':''} </p>
                <p>{this.state.SecondReading!==''?this.state.SecondReadingBody:''}</p>
                <p>Gospel :</p>
                 {this.state.GospelReadingBody}
            </div>
         );
    }
}
 
