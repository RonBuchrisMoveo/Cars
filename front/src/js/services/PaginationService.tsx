import React from 'react'
import { setData } from 'js/store';
import { useDispatch } from 'react-redux';

export const PaginationService = (props: { carsCount: number }) => {
    const carsPerPage = 10
    const {carsCount } = props
    const dispatch = useDispatch()
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(carsCount / carsPerPage); i++) {
        pageNumbers.push(i);
    }

    const clickPage = (number: number) => {
        const pagination= {
            page:number,
            size:carsPerPage
        }
        dispatch(setData(pagination))

    }
    return (
        <div className='pagination-container'>
            <div className="backward">&laquo;</div>
            {pageNumbers.map(number => (
                <a key={number} onClick={() => clickPage(number)} className='page-link btn'>
                        {number}
                    </a>
            ))}
            <div className="forward">&raquo;</div>

        </div>
    )
}
