import React from 'react'



const Settings = () => {



  return (
    <div className="settings">
      <div className="settings__item">
        <button className='settings__button btn'
          onClick={() => {
            fetch('/api/events/update', { method: 'POST' })
          }}>
          Update events
        </button>
      </div>
      <div className="settings__item">
        <button className='settings__button btn'
          onClick={() => {
            fetch('/api/events/delete', { method: 'DELETE' })
          }}>
          Clear events
        </button>
      </div>
    </div>
  )
}

export default Settings