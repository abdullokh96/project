import React, {useEffect} from 'react'
import CardItem from '../card-item/card-item'
import { postServices } from '../../http/post-services'
import { useSelector, useDispatch } from 'react-redux'
import {getPostAction} from '../../redux/actions/post-action'
import styles from "./product.module.css"

const Product = () => {

    const {user} = useSelector((state) => state.authReducer)
    const {post} = useSelector((state) => state.postReducer)
    const userId = user._id
    const dispatch = useDispatch()

    useEffect(() => {
        const getPostData = async () => {
            const data = await postServices.getPost(userId)
            dispatch(getPostAction(data.data))
        };
        getPostData()
    })

  return (
    <div className={styles.card}>
      {
        post.map((elem, index) => {
            return <CardItem {...elem} />
        })
      }
    </div>
  )
}

export default Product
