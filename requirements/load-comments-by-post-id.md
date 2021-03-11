# Load comments by Post id

> ## Success case

1. ❌ Receives a **GET** request on route **api/posts/:id/comments**
2. ❌ Returns **200**, with all post's comments

> ## Exceptions

1. ❌ Returns error **404** if API doesn't exist
2. ❌ Returns error **500** if any error happens trying to save the post comment