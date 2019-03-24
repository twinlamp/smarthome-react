import React, { Fragment, Component } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Slider, Rail, Ticks, Tracks, Handles } from 'react-compound-slider'
import {
  getSortByVal,
} from 'react-compound-slider/Slider/utils'

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined'


const noop = () => {}

class CustomSliderComponent extends Slider {

  onMouseUp = () => {
    const {
      state: { handles, activeHandleID },
      props: { onChange, onSlideEnd },
    } = this

    onChange(handles.sort((a,b) => parseInt(a.key.match(/\d/)[0]) - parseInt(b.key.match(/\d/)[0])).map(d => d.val))
    onSlideEnd(handles.map(d => d.val), { activeHandleID })

    this.setState({ activeHandleID: null })

    if (isBrowser) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  render() {
    const {
      state: { handles, valueToPerc, activeHandleID, reversed },
      props: {
        className,
        rootStyle,
        rootProps,
        component: Comp,
        disabled,
        flatten,
      },
    } = this

    const mappedHandles = handles.sort(getSortByVal(reversed)).map(({ key, val }) => {
      return { id: key, value: val, percent: valueToPerc.getValue(val) }
    })

    const children = React.Children.map(this.props.children, child => {
      if (
        child &&
        (child.type.name === Rail.name ||
          child.type.name === Ticks.name ||
          child.type.name === Tracks.name ||
          child.type.name === Handles.name)
      ) {
        return React.cloneElement(child, {
          scale: valueToPerc,
          handles: mappedHandles,
          activeHandleID,
          getEventData: this.getEventData,
          emitKeyboard: disabled ? noop : this.onKeyDown,
          emitMouse: disabled ? noop : this.onMouseDown,
          emitTouch: disabled ? noop : this.onTouchStart,
        })
      }

      return child
    })

    return flatten ? (
      <Fragment>
        <Comp
          {...rootProps}
          style={rootStyle}
          className={className}
          ref={this.slider}
        />
        {children}
      </Fragment>
    ) : (
      <Comp
        {...rootProps}
        style={rootStyle}
        className={className}
        ref={this.slider}
      >
        {children}
      </Comp>
    )
  }
}

export const CustomSlider = CustomSliderComponent

// *******************************************************
// RAIL COMPONENT
// *******************************************************
const railStyle = () => ({
  common: {
    position: 'absolute',
    width: '100%',
    transform: 'translate(0%, -50%)',
  },
  outer: {
    height: 42,
    cursor: 'pointer',
  },
  inner: {
    height: 4,
    borderRadius: 2,
    pointerEvents: 'none',
    backgroundColor: 'rgb(155,155,155)',
  },
})

function RailComponent({ classes, getRailProps }) {
  return (
    <Fragment>
      <div
        className={clsx(classes.common, classes.outer)}
        {...getRailProps()}
      />
      <div className={clsx(classes.common, classes.inner)} />
    </Fragment>
  )
}

RailComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  getRailProps: PropTypes.func.isRequired,
}

export const SliderRail = withStyles(railStyle)(RailComponent)

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
const handleStyle = theme => {
  const colors = {
    primary: theme.palette.primary.main,
  }

  return {
    common: {
      position: 'absolute',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    outer: {
      zIndex: 5,
      width: 20,
      height: 40,
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      backgroundColor: 'none',
    },
    inner: {
      zIndex: 2,
      width: 12,
      height: 12,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: colors.primary,
    }
  }
}

class HandleComponent extends Component {
  state = {
    mouseOver: false,
  }

  onMouseEnter = () => {
    this.setState({ mouseOver: true })
  }

  onMouseLeave = () => {
    this.setState({ mouseOver: false })
  }



  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      title,
      classes,
      isActive,
      disabled,
      getHandleProps,
    } = this.props
    const { mouseOver } = this.state

    return (
      <Fragment>
        {(mouseOver || isActive) && !disabled ? (
          <div
            style={{
              left: `${percent}%`,
              position: 'absolute',
              marginLeft: '-11px',
              marginTop: '-35px',
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">{`${title}: ${value}`}</span>
            </div>
          </div>
        ) : null}
        <div
          className={clsx(classes.common, classes.outer)}
          style={{ left: `${percent}%` }}
          {...getHandleProps(id)}
        />
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className={clsx(
            classes.common,
            classes.inner,
            isActive && classes.active,
          )}
          style={{ left: `${percent}%` }}
        />
      </Fragment>
    )
  }
}

HandleComponent.propTypes = {
  activeHandleID: PropTypes.string,
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  getHandleProps: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
}

export const Handle = withStyles(handleStyle)(HandleComponent)

// *******************************************************
// TRACK COMPONENT
// *******************************************************
const trackStyle = theme => ({
  root: {
    position: 'absolute',
    transform: 'translate(0%, -50%)',
    height: 4,
    zIndex: 1,
    borderRadius: 2,
    cursor: 'pointer',
  },
  enabled: {
    backgroundColor: theme.palette.primary.main,
  },
  disabled: {
    backgroundColor: theme.palette.secondary.main,
  }
})

function TrackComponent({ classes, source, target, getTrackProps, enabled }) {
  return (
    <div
      className={clsx(classes.root, (enabled ? classes.enabled : classes.disabled))}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  )
}

TrackComponent.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  getTrackProps: PropTypes.func.isRequired,
}

export const Track = withStyles(trackStyle)(TrackComponent)

// *******************************************************
// TICK COMPONENT
// *******************************************************
const tickStyle = theme => ({
  tick: {
    position: 'absolute',
    marginTop: 10,
    width: 1,
    height: 5,
    backgroundColor: theme.palette.text.primary,
  },
  label: {
    position: 'absolute',
    marginTop: 16,
    textAlign: 'center',
  },
})

export function TickComponent({ classes, tick, count, format }) {
  return (
    <div>
      <div className={classes.tick} style={{ left: `${tick.percent}%` }} />
      <Typography
        className={classes.label}
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </Typography>
    </div>
  )
}

TickComponent.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
}

TickComponent.defaultProps = {
  format: d => d,
}

export const Tick = withStyles(tickStyle)(TickComponent)