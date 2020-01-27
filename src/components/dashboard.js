import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/dashboard.css';
import moment from 'moment';



class Dashboard extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            timeNow : moment().format('LTS'),
            weather: '',
            city: '',
            main : '',
            description : '',
            humidity: '',
            location : 'Cebu',
            background : '',
            country: ''

        }

    }
    

    getWeather = async () => {
        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&APPID=6027245dd9e3ed7e59452ca7123984c2`

        )

 
        

        if(response.status === 200){
        
        const data = await response.json()
        let temp = data.main.temp
        let humidity = data.main.humidity;
        let celtemp = temp - 273.15;

        let country = data.sys.country;
        
        celtemp = Math.round(celtemp * 10) /10
        console.log(data);
        let main = data.weather[0].main;
        let description = data.weather[0].description;
        let condition =  data.weather[0].id;
        let timezone = data.timezone;
        
        let city = data.name
        // Parse condition
        let code = condition.toString().charAt(0);
        if(code === '2'){
            this.setState({
                background: 'thundestorm'
            })
        }else if(code === '3'){
            this.setState({
                background: 'drizzle'
            })
        }else if(code === '5'){
            this.setState({
                background: 'rain'
            })
        }else if(code === '6'){
            this.setState({
                background: 'snow'
            })
        }else if(code === '7'){
            this.setState({
                background: 'atmosphere'
            })
        }else if(code === '8'){
            this.setState({
                background: 'clear'
            })
        }
        
        this.setState({
            weather : celtemp ,
            city : city,
            main : main,
            description : description,
            humidity : humidity,
            message : '',
            country : country,
            timezone : timezone
           
        })
    }else{
        this.setState({
            message : 'Cannot find location'
        })
    }
    }

    componentDidMount(){
        setInterval(() => {
            this.setState({
                timeNow : moment().format('LLLL')
            })
        }, 1000);

        this.getWeather();

        
    }

    onChangeLocation = (e) =>{
        this.setState({
            location : e.target.value
        })
    }

    onSearch = () =>{
        
        if(this.state.location === ''){

        }else{
            this.getWeather();
          
        }
        
    }



    render() { 
        return (
            <div>
            <div className={this.state.background}></div> 
            <div className= "container dashboard text-center">
                <div>
                <h4 className="text-center">{this.state.message}</h4>
                <div className="input-group mb-3 input-location"> 
                    <input  onChange={this.onChangeLocation} placeholder='Input name of City' value={this.state.location}  type="text" className="form-control"  aria-describedby="basic-addon2"></input>
                    <div className="input-group-append">
                    <button className="input-group-text" onClick={this.onSearch}>Search</button>
                    </div>
                </div>
                <h4 className="text-center">{this.state.city}, {this.state.country}</h4>
                <h5 className="text-center">{(this.state.description).toUpperCase()}</h5>
                <h5 className="text-center">Humidity: {(this.state.humidity)}%</h5>
                    <h1 className="text-center">{this.state.weather}&deg;</h1>
                </div>
                <div>
                <h3 className="text-center daytime">{this.state.timeNow}</h3>
                <h4>Developed by: Alvin Neri</h4>
                </div>

            </div>
            </div>
         );
    }
}
 
export default Dashboard;