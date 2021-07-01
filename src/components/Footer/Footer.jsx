import { useState } from 'react';
import { fetchIt } from '../../helpers/fetchIt';
import style from './Footer.module.scss';

export function Footer () {

    const [mail, setMail] = useState()
    const [message, setMessage] = useState('Få seneste nyt sendt direkte til din indbakke')

    const sendMail = async (e) => {
        e.preventDefault()

        let url = 'https://api.mediehuset.net/mediesuset/newsletter'
        let formData = new URLSearchParams()
        formData.append('email', mail)
        let token = JSON.parse(sessionStorage.getItem('token'))

        if (!token) {
            setMessage('Du skal være logget ind for at tilmelde dig nyhedsbrev.')
        } else {
            let res = await fetchIt(url, 'POST', formData, token.access_token)
            console.log(res)
            if (res.error === '') {
                setMessage('Tak. Du er nu tilmeldt vores nyhedsbrev.')
            } else {
                setMessage('Mailen eksisterer allerede eller der er opstået en fejl.')
            }
        }
    }

    return (
        <footer id={style.footer}>
            <section>
                <article>
                    <h3>Følg os</h3>
                    <div class="social">
                    <a href="http://www.facebook.com">facebook</a>
                    <a href="http://www.twitter.com">twitter</a>
                    </div>
                </article>
            </section>

            <section>
                <article>
                    <h3>Tilmeld nyhedsbrev</h3>
                    <p>{message}</p>
                    <form onSubmit={(e) => {sendMail(e)}}>
                        <input value={mail} onChange={(e) => {setMail(e.target.value)}} placeholder="Indtast din email"></input>
                        <button>Tilmeld</button>
                    </form>
                    <img className ="hancock" src={require('../../content/img/Hancock-kvalitet-logo.png').default} alt="Hancock"/>
                    <p>smag forskellen</p>
                </article>
            </section>
        </footer>
    )
}