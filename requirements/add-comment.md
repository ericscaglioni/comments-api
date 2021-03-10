# Add comment

> ## Success case

1. ✅ Receives a **POST** request on route **api/posts/:id/comments**
2. ✅ Validate if **id** is a valid post id
3. ✅ Validate required field: **content**
4. ✅ **Save** post comment with the given field
5. ✅ Returns **201**, with all post's comments

> ## Exceptions

1. ✅ Returns error **404** if API doesn't exist
2. ✅ Returns error **400** if **id** is not a valid post id
3. ✅ Returns error **400** if **content** is not provided
4. ✅ Returns error **500** if any error happens trying to save the post comment