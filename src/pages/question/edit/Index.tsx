import React from 'react'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'


const Edit = () => {
    const { loading, error, data } = useLoadQuestionData()
    return <>
        {loading ? <p>加载中</p> : <p>{JSON.stringify(data)}</p>}
    </>
}

export default Edit