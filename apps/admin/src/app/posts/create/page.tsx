/* 
ADMIN CREATE and UPDATE screen
Both create and update screens display the same UI, but the update screen preloads the data into fields.

Page is only accessible to logged in user
There must be the following fields which must be validated for errors:
Title (input, string)
Description (textarea, string, max 200 characters)
Content (textarea, markdown string)
Tag List (input, string) shows a comma-separated list of tags.
Image URL (input, URL)
Under the Description is a "Preview" button that replaces the text area with a rendered markdown string and changes the title to "Close Preview".
When the preview is closed, the cursor must be in the same position as before opening the preview.
Under the image input is an image preview.
User can click on the "Save" button that displays an error ui if one of the fields is not specified or valid.
 
*/

import { Login } from "../../../components/Login";
import { PostForm } from "../../../components/PostForm";
import { isLoggedIn } from "../../../utils/auth";

export default async function Page() {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) {
        return <div><Login /></div>;
    } else
        return <div>
            <PostForm />
        </div>
}
