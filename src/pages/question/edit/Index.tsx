import React from 'react'
import { useParams } from 'react-router-dom'

const Edit = () => {
    const { id } = useParams()
    return <>
        Edit {id}
    </>
}

export default Edit