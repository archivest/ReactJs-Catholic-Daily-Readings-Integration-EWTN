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
            Date:''
          }

          this.handleOnChange=this.handleOnChange.bind(this);
    }

    handleOnChange(e)
    {
        this.setState({[e.target.name]:e.target.value})
        this.fetchTodayReadings(e.target.value)
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
                                Gospel:this.state.ReadingList.ReadingGroups[0].Readings[2].Citations[0].Reference})
    }

    async componentWillMount()
    {

        //this.setState({Date:new Date().getFullYear()+'-'+ parseInt(new Date().getMonth()+1)+'-'+new Date().getDay().toString()})
        document.title='Daily Catholic Enounter';
       
        //Get Reading for the day
        
        var date=new Date().getFullYear()+'-'+ parseInt(new Date().getMonth()+1)+'-'+new Date().getDate().toString();
        this.setState({Date:date})
       this.fetchTodayReadings(date);
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
            </div>
         );
    }
}
 
