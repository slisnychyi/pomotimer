import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const red = '#f54e4e'
const green = '#4aec8c'

function Timer() {
  const [time, setTime] = useState(1500) // 1500 seconds = 25 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [showCongratulation, setShowCongratulation] = useState(false)

  useEffect(() => {
    let intervalId = null

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else {
      clearInterval(intervalId)
    }

    if (time === 0) {
      setIsRunning(false)
      setShowCongratulation(true)
    }

    return () => clearInterval(intervalId)
  }, [isRunning, time])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString()
      .padStart(2, '0')}:${seconds.toString()
      .padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTime(1500) // Reset time to 25 minutes
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setShowCongratulation(false)
    setTime(1500)
  }

  return (
    <div
      style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <CircularProgressbar
          value={(1500 - time) / 15}
          text={formatTime(time)}
          styles={buildStyles({
            textColor: '#000000',
            pathColor: time > 0 ? (isRunning ? red : green) : '#000000',
            tailColor: 'rgba(255,255,255,.2)',
          })}
        />
        <div className="buttons">
          <div style={{
            textAlign: 'center',
            marginTop: '20px'
          }}>
            {!isRunning && !showCongratulation && (

              <Button variant="success" onClick={handleStart}>
                Start
              </Button>

            )}
            {isRunning && !showCongratulation && (
              <>
                <Button variant="danger" onClick={handleStop}>
                  Stop
                </Button>
                <Button variant="primary" onClick={handlePause}>
                  Pause
                </Button>
              </>
            )}
          </div>
          {showCongratulation && (
            <div style={{
              textAlign: 'center',
              marginTop: '20px'
            }}>
              <h3>Congratulations!</h3>
              <Button variant="success" onClick={handleReset}>
                Start Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Timer
