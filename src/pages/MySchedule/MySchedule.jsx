import { useEffect, useState } from "react"
import { fetchIt } from "../../helpers/fetchIt"
import style from './MySchedule.module.scss'
import './bg-color.css'

export function MySchedule() {

    const [events, setEvents] = useState([])
    const [myEvents, setMyEvents] = useState([])

    useEffect(() => {
        const getEvents = async () => {
            let eventsUrl = 'https://api.mediehuset.net/mediesuset/events'
            let res = await fetchIt(eventsUrl)
            setEvents(res)
        }

        getEvents()
        if (sessionStorage.getItem('token')) {
            getMyEvents()
        }
    }, [])

    const getDayName = (date) => {
        let day;
        switch (new Date(date).getDay()) {
            case 0:
              day = "Søndag";
              break;
            case 1:
              day = "Mandag";
              break;
            case 2:
               day = "Tirsdag";
              break;
            case 3:
              day = "Onsdag";
              break;
            case 4:
              day = "Torsdag";
              break;
            case 5:
              day = "Fredag";
              break;
            case 6:
              day = "Lørdag";
              break;
            default:
              day = 'Der gik noget galt.'
          }
        return day;
    }

    const addEvent = async (id) => {
        let addEventUrl = 'https://api.mediehuset.net/mediesuset/programme'
        let token = JSON.parse(sessionStorage.getItem('token')).access_token
        let userId = JSON.parse(sessionStorage.getItem('token')).user_id
        let eventId = id
        let data = new URLSearchParams()
        data.append("user_id", userId);
        data.append("event_id", eventId);

        await fetchIt(addEventUrl, 'POST', data, token)

        getMyEvents()
    }

    const getMyEvents = async () => {

        let getMyEventsUrl = `https://api.mediehuset.net/mediesuset/programme/${JSON.parse(sessionStorage.getItem('token')).user_id}`
        let token = JSON.parse(sessionStorage.getItem('token')).access_token

        let res = await fetchIt(getMyEventsUrl, 'GET', null, token);

        setMyEvents(res)
    }

    const removeEvent = async (id) => {
        let removeEventUrl = `https://api.mediehuset.net/mediesuset/programme/${id}`
        let token = JSON.parse(sessionStorage.getItem('token')).access_token

        await fetchIt(removeEventUrl, 'DELETE', null, token)

        getMyEvents()
    }

    const getTime = (datetime) => {
        let date = new Date(datetime)
        let time = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`

        return time
    }

    const getClassName = (string) => {
        return string.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-')
    }

    const getEventHtml = (eventInfo, i) => {
        if (eventInfo.local_time) { // Kun tilgængelige events har .local_time
            return (
                <div key={i}>
                    <p className={getClassName(eventInfo.stage_name)}>{eventInfo.stage_name} kl. {getTime(eventInfo.local_time)}</p>
                    <p>{eventInfo.title}</p>
                    <p id={eventInfo.id} onClick={(e) => {addEvent(e.target.id)}}>Tilføj</p>
                </div>
            )
        } else { // Events tilføjet til mit program har ikke .local_time og fanges her
            return (
                <div key={i}>
                    <p className={getClassName(eventInfo.stage_name)}>{eventInfo.stage_name} kl. {getTime(eventInfo.datetime)}</p>
                    <p>{eventInfo.event_title}</p>
                    <p id={eventInfo.id} onClick={(e) => {removeEvent(e.target.id)}}>Fjern</p>
                </div>
            )
        } 
    }

    return (
        <div id={style.container}>
            {sessionStorage.getItem('token') ?
                <div>
                    <h1>Mit program</h1>
                    <div className={style.card}>
                        <h3>Onsdag</h3>
                        {myEvents.items ? myEvents.items.filter(d => getDayName(d.datetime) === 'Onsdag').map((myEvent, i) => {
                            return getEventHtml(myEvent, i)
                        }) : null}
                    </div>
                    <div className={style.card}>
                        <h3>Torsdag</h3>
                        {myEvents.items ? myEvents.items.filter(d => getDayName(d.datetime) === 'Torsdag').map((myEvent, i) => {
                            return getEventHtml(myEvent, i)
                        }) : null}
                    </div>
                    <div className={style.card}>
                        <h3>Fredag</h3>
                        {myEvents.items ? myEvents.items.filter(d => getDayName(d.datetime) === 'Fredag').map((myEvent, i) => {
                            return getEventHtml(myEvent, i)
                        }) : null}
                    </div>
                    <div className={style.card}>
                        <h3>Lørdag</h3>
                        {myEvents.items ? myEvents.items.filter(d => getDayName(d.datetime) === 'Lørdag').map((myEvent, i) => {
                            return getEventHtml(myEvent, i)
                        }) : null}
                    </div>


                    <h2>Tilgængelige koncerter</h2>
                    <div className={style.card}>
                        <h3>Onsdag</h3>
                        {events.items ? events.items.filter(d => getDayName(d.local_time) === 'Onsdag').map((theEvent, i) => {
                            return getEventHtml(theEvent, i)
                        }) : null}
                    </div>
                    <div className={style.card}>
                        <h3>Torsdag</h3>
                        {events.items ? events.items.filter(d => getDayName(d.local_time) === 'Torsdag').map((theEvent, i) => {
                            return getEventHtml(theEvent, i)
                        }) : null}
                    </div>
                    <div className={style.card}>
                        <h3>Fredag</h3>
                        {events.items ? events.items.filter(d => getDayName(d.local_time) === 'Fredag').map((theEvent, i) => {
                            return getEventHtml(theEvent, i)
                        }) : null}
                    </div>
                    <div className={style.card}>
                        <h3>Lørdag</h3>
                        {events.items ? events.items.filter(d => getDayName(d.local_time) === 'Lørdag').map((theEvent, i) => {
                            return getEventHtml(theEvent, i)
                        }) : null}
                    </div>
                </div> : <div><p>Du skal være logget ind for at se dit program.</p></div>
            }
        </div>
    )
}