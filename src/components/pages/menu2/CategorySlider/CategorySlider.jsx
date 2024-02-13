import React from 'react';
import classes from './CategorySlider.module.css'
import Swiper from 'react-id-swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import CategorySliderItem from "./CategorySliderItem/CategorySliderItem";

const CategorySlider = () => {

    const params = {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30,
    }

    return (
        <div className={classes.container }>
            <CategorySliderItem title='Супы'/>

            {/*<Swiper {...params}>*/}
            {/*    <CategorySliderItem title='Супы'/>*/}
            {/*    <CategorySliderItem title='Супы'/>*/}
            {/*    /!*<CategorySliderItem title='Супы'/>*!/*/}
            {/*    /!*<CategorySliderItem title='Супы'/>*!/*/}
            {/*    /!*<CategorySliderItem title='Супы'/>*!/*/}
            {/*    /!*<CategorySliderItem title='Супы'/>*!/*/}
            {/*</Swiper>*/}
        </div>
    );
};

export default CategorySlider;