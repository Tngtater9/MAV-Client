import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './Details.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { EventContext } from '../../Context/EventContext'
import ApptApiService from '../../services/ApptApiService'

function Confirmation () {
  const history = useHistory()
  const { apptId } = useParams()
  const { setSelectedEvents } = useContext(EventContext)

  const acceptDelete = () => {

    ApptApiService.deleteAppt(apptId).then(() => {
      setSelectedEvents(PrevState => PrevState.filter(e => e.id !== apptId))
      history.push('/map')
    })
  }

  const declineDelete = () => {
    history.goBack()
  }

  return (
    <article>
      <p>Are you sure?</p>
      <div>
        <button className="btn" onClick={() => acceptDelete()}><FontAwesomeIcon icon={faCheck} /></button>
        <button className="btn" onClick={() => declineDelete()}><FontAwesomeIcon icon={faTimes} /></button>
      </div>
    </article>
  )
}

export default Confirmation
