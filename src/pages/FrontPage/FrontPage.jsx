import { useEffect, useState } from 'react';
import { fetchIt } from '../../helpers/fetchIt'
import style from './FrontPage.module.scss';

export function FrontPage() {

    const [news, setNews] = useState([])

    const url ='https://api.mediehuset.net/mediesuset/news';

    const getNews = async () => {
        let res = await fetchIt(url);
        setNews(res);
    }
    
    useEffect(() => {
        getNews();
    }, [])

    return (
        <section id={style.container}>
             <img id="banner" src={require('../../content/img/46-110856178.jpg').default} alt="Banner"/>
            <div>
                <h1>Nyheder</h1>
                <article>
                    {news.items && news.items.map((item, i) => {
                        if (i < 6) {
                            console.log(item)

                            return (
                                <div key={item.id}>
                                    <div>
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <div>
                                        <h3>{item.title.substring(0, 30)}</h3>
                                        <div><p>{item.teaser}</p></div>
                                        <a href="/">Læs mere</a>
                                    </div>
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </article>
            </div>
        </section>
    )
}