import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { CustomSlider, SliderRail, Handle, Track, Tick } from './SliderComponents/SliderComponents'

const style = () => ({
  root: {
    height: 120,
    width: '100%',
    marginTop: 30, 
  },
  slider: {
    position: 'relative',
    width: '100%',
  },
})

class Example extends Component {

  interactionMode(curr, next) {
    return next.sort((a, b) => a.key >= b.key ? 1 : -1 )
  }

  render() {
    const {
      props: { classes, values, domain, titles }
    } = this

    return (
      <div className={classes.root}>
        <CustomSlider
          mode={this.interactionMode}
          step={1}
          domain={domain}
          className={classes.slider}
          onUpdate={this.props.onUpdate}
          onChange={this.props.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ activeHandleID, handles, getHandleProps }) => (
              <div>
                {handles.map((handle, index) => {
                    let title = titles[parseInt(handle.id.match(/\d/)[0])]
                    return <Handle
                      key={handle.id}
                      handle={handle}
                      domain={domain}
                      title={title}
                      index={index}
                      isActive={handle.id === activeHandleID}
                      getHandleProps={getHandleProps}
                    />
                  }
                )}
              </div>
            )}
          </Handles>
          <Tracks left={true} right={true}>
            {({ tracks, getTrackProps }) => (
              <div>
                {[tracks[0], tracks[2]].map(({ id, source, target }, index) => (
                  <Track
                    key={id}
                    enabled={ target.id.match(/0/) || source.id.match(/0/) }
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div>
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </CustomSlider>
      </div>
    )
  }
}

Example.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(style)(Example)