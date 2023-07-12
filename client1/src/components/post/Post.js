import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import styles from "./post.module.css";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { postServices } from "../../http/post-services";
import Product from "../product/product";

const Post = () => {
  const { user } = useSelector((state) => state.authReducer);
  const userId = user._id;
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("owner", userId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("image", data.image[0]);

    try {
      const response = await postServices.createPost(formData);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <TextField
            className={styles.field}
            type="text"
            label="Title"
            variant="standard"
            fullWidth
            {...register("title", { required: true })}
          />
          <TextField
            className={styles.field}
            type="text"
            label="Brand"
            variant="standard"
            fullWidth
            {...register("brand", { required: true })}
          />
          <TextField
            className={styles.field}
            type="text"
            label="Category"
            variant="standard"
            fullWidth
            {...register("category", { required: true })}
          />
          <TextField
            className={styles.field}
            type="number"
            label="Price"
            variant="standard"
            fullWidth
            {...register("price", { required: true })}
          />
          <TextField
            className={styles.field}
            type="file"
            variant="standard"
            name="image"
            fullWidth
            {...register("image", { required: true })}
          />
          <TextField
            className={styles.field}
            label="Description"
            multiline
            rows={5}
            fullWidth
            {...register("description", { required: true })}
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Создать пост
          </Button>
        </form>
      </Paper>
      <div>
        <Product/>
      </div>
    </div>
  );
};

export default Post;