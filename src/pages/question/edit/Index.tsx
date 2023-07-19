import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionDetail } from '../../../services/question'

const Edit = () => {
    const { id = '' } = useParams()
    useEffect(() => {
        const fn = async () => {
            const data = await getQuestionDetail(id)
            console.log('data',data)
        }
        fn()
    }, [])
    return <>
        Edit {id}
    </>
}

export default Edit