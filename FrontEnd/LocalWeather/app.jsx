class Layout extends React.Component {

  state = { temperature: 'Loading...', location: 'Loading...', weatherState: 'Loading...' };

  getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve);
    });
  }

  componentDidMount = () => {
    const weatherServiceUrl = 'https://fcc-weather-api.glitch.me/api/current?';
    this.getCurrentPosition()
      .then(pos => pos.coords)
      .then(coords => fetch(`${weatherServiceUrl}lat=${coords.latitude}&lon=${coords.longitude}`))
      .then(response => response.json())
      .then(weatherInfo => this.setState({
          temperature: Math.round(weatherInfo.main.temp),
          weatherState: weatherInfo.weather[0].main,
          location: `${weatherInfo.name}, ${weatherInfo.sys.country}`
      }));
  }
  
  render () {
    return (
      <div className="app">
      <Title />
      <WeatherIcon state={this.state.weatherState} />
      <Temperature temp={this.state.temperature} />
      <WeatherState state={this.state.weatherState} />
      <Location location={this.state.location} />
      <Footer />
      </div>
    );
  }
}

class Title extends React.Component {

  state = {};
  
  render () {
    return (
      <div className="title">Local Weather</div>
    );
  }
}

class Location extends React.Component {

  state = {};
  
  render () {
    return (
      <div className="location">{this.props.location}</div>
    );
  }
}

class Temperature extends React.Component {

  state = { useCelsius: false };

  celsiusToFahrenheit = (x) => this.props.temp !== 'Loading...' ? Math.round((x * (9 / 5)) + 32) : x;

  handleClick = (e) => {
    e.preventDefault;
    const opposite = !this.state.useCelsius;
    this.setState({ useCelsius: opposite });
  }
  
  render () {
    return (
      <div className="temp">
        {this.state.useCelsius ? this.props.temp : this.celsiusToFahrenheit(this.props.temp)}
        <span className="change-metric" onClick={this.handleClick}>{this.state.useCelsius ? '°C' : '°F'}</span>
      </div>
    );
  }
}

class WeatherState extends React.Component {

  state = {};
  
  render () {
    return (
      <div className="state">{this.props.state}</div>
    );
  }
}

const ClearIcon = () => ( <div className="icon"><i className="wi wi-day-sunny"></i></div> );
const CloudyIcon = () => ( <div className="icon"><i className="wi wi-day-cloudy"></i></div> );
const RainIcon = () => ( <div className="icon"><i className="wi wi-day-rain"></i></div> );
const SnowIcon = () => ( <div className="icon"><i className="wi wi-day-snow"></i></div> );
const StormIcon = () => ( <div className="icon"><i className="wi wi-day-thunderstorm"></i></div> );

class WeatherIcon extends React.Component {

  state = {};

  renderWeatherIcon = (weatherState) => {
    if (weatherState.includes("clear")) {
      return <ClearIcon />;
    } else if (weatherState.includes("cloud")) {
      return <CloudyIcon />;
    } else if (weatherState.includes("rain")) {
      return <RainIcon />;         
    } else if (weatherState.includes("snow")) {
      return <SnowIcon />;
    } else if (weatherState.includes("storm")) {
      return <StormIcon />;
    } else {
      return <ClearIcon />;
    }
  } 
 
  render () {
    const weatherState = this.props.state;
    return (
      <div>
        {this.renderWeatherIcon(weatherState)}
      </div>
    );
  }
}

class Footer extends React.Component {

  state = {};
  
  render () {
    return (
      <div className="footer">Made with ♡ by - 
        <a className="link" href="https://williamgermany.com">
          Will Germany
        </a>
      </div>
    );
  }
}


ReactDOM.render(
  <React.Fragment>
    {
    <Layout />
    }
    </React.Fragment>,
  document.getElementById("app")
);