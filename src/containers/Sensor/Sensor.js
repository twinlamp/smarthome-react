import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Label, Brush } from 'recharts';
import moment from 'moment-timezone';
import sensorTypes from '../../shared/sensorTypes';
import { withTheme } from '@material-ui/core/styles';
import { getLoadingStatus } from '../../store/selectors';
import classes from './Sensor.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, payload
    } = this.props;

    let dateTime = moment(payload.value)

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">{dateTime.format('HH:mm')}</text>
        <text x={0} y={16} dy={16} textAnchor="middle" fill="#666">{dateTime.format('DD MMM')}</text>
      </g>
    );
  }
}

class Sensor extends Component {
  state = {
    initialData: [],
    timerId: 0,
    startIndex: 0,
    endIndex: -1,
    brushWidth: window.innerWidth - 200
  }

  componentDidMount() {
    const { id } = this.props.match.params

    this.props.onSetNavTitle('Sensor: ', true)
    this.props.onGetCurrentSensor(this.props.token, id)
    this.props.onGetSensorData(this.props.token, id, '', '')
    window.addEventListener('resize', this.updateBrushWidth.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateBrushWidth.bind(this))
  }

  componentDidUpdate() {
    if (this.state.initialData && this.state.initialData.length === 0 && this.props.data && this.props.data.length > 0 ) {
      let formattedData = this.props.data.map(el => { return {...el, ...{ label: new Date(el.registered_at).toLocaleString() }} })
      this.setState({ initialData: formattedData, startIndex: 0, endIndex: formattedData.length - 1 });
    }
    this.setNavigation(this.props.currentSensor)
  }

  updateBrushWidth() {
    console.log('update')
    this.setState({ brushWidth: window.innerWidth - 200 })
  }

  setNavigation(currentSensor) {
    let actions = {}
    if (currentSensor) {
      actions[navActions.BACK] = {url: `/devices/${currentSensor.device_id}`}
    }
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavActions(actions)
  }

  handleChange(e) {
    let timerId = e.startIndex + e.endIndex
    this.setState({ timerId: timerId, startIndex: e.startIndex, endIndex: e.endIndex })
    setTimeout(()=>{
      if (this.state.timerId === timerId) {
        this.props.onGetSensorData(
          this.props.token,
          this.props.match.params.id,
          this.state.initialData[e.startIndex].registered_at,
          this.state.initialData[e.endIndex].registered_at
        )
      }
    }, 1000)
  }

  render() {
    const { currentSensor, theme, data, loading } = this.props;
    const { initialData, startIndex, endIndex, brushWidth } = this.state;
    let graph = null

    if (currentSensor) {
      let sensorType = sensorTypes.find(st => st.name === currentSensor.icon)
      graph = <div className={classes.Graph}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="registered_at"
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              domain={[currentSensor.min, currentSensor.max]}
            >
              <Label angle={-90} value={`${sensorType.name}, ${sensorType.measurement}`} position='insideLeft' style={{textAnchor: 'middle'}} />
            </YAxis>
            <Tooltip
              itemStyle={{color: theme.palette.secondary.main}}
              labelFormatter={ timeStr => moment.tz(timeStr, currentSensor.timezone).format('HH:mm DD.MM.YY') }
              formatter={ value => [`${value} ${sensorType.measurement}`] }
            />
            <Line type="monotone" dataKey="value" stroke={theme.palette.primary.main} />
          </LineChart>
        </ResponsiveContainer>
        {loading &&
          <div className={classes.Overlay}>
            <CircularProgress size={48} className={classes.ButtonProgress} />
          </div>
        }
        <svg className="recharts-surface" width="100%">
          <Brush
            startIndex={startIndex}
            endIndex={endIndex}
            data={initialData}
            onChange={ e => this.handleChange(e)}
            x={100}
            y={50}
            width={brushWidth}
            height={40}
            dataKey="label"
          />
        </svg>
      </div>
    }
    return graph
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentSensor: state.sensors.currentSensor,
    data: state.sensors.data,
    loading: getLoadingStatus(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onGetCurrentSensor: (token, id) => dispatch(actions.getCurrentSensor(token, id)),
    onGetSensorData: (token, id, from, to) => dispatch(actions.getSensorData(token, id, from, to)),
    onSetNavTitle: (currentAction, showCurrentItem) => dispatch(actions.setNavTitle(currentAction, showCurrentItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(Sensor));