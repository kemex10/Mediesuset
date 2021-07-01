import React from 'react'
import Slide1 from '../../Assets/slide1.jpg'
import Slide2 from '../../Assets/slide2.jpg'
import Slide3 from '../../Assets/slide3.jpg'
import Carousel from 'react-material-ui-carousel'
import Style from './slider.module.scss'


export function Slider(){


    const carouselItems = [
        {
            url: Slide1,
            description: "Vi elsker at lave brød",
            alt: "vi_elsker_brød"
        },
        {
            url: Slide2,
            description: "Brød er håndværk",
            alt: "Brød_er_håndværk"
        },
        {
            url: Slide3,
            description: "Brød bagt med sjæl",
            alt: "Brød_bagt_med_sjæl"
        },
    ]
    

    function Item(props){
        return (
            <div className={Style.slide} style={{Height:"65vh"}}>
                <h3>{props.item.description}</h3>
                <img alt={props.item.alt} width="100%" src={props.item.url} />
            </div>
        )
    }


    return(
        <>
            <Carousel animation="fade" interval="5000">
                {
                    carouselItems.map((item, index) => {
                    return( 
                            <Item key={index} item={item}/>
                    )
                })
                }
            </Carousel>
        </>
    )
}