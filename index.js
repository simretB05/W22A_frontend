//GET REquest
// used the successGet function to loop through
// the response data aray and display the result dynamically
function successGet( response )
{
    let main_section = document.querySelector( `.main_section` )
    let res_data = response[`data`]
    for ( let i = 0; i < res_data.length; i++ )
    {
        main_section.insertAdjacentHTML(
            `afterbegin`, `<div class="candy_card" ><h3 style="color:red;">
                ${ res_data[i][`name`] }
                </h3> <img style="width:200px;"
                src="${ res_data[i][`image_url`] }" alt="image">
                <p style="width:200px;">${ res_data[i][`description`] }</p>
                <button  delete_id="${ res_data[i][`id`] }" class="delete"
                 style="margin:30px;background-color:pink;border:none;padding:8px;">delete-candy</button></div>` )
    }
    // get all the delete button tag using querySelectorAll 
    // and add event listener to the buttons and call a function
    //  that deletes the candy when button is clicked
    let delete_button = document.querySelectorAll( `.delete` );
    for ( i = 0; i < delete_button.length; i++ )
    {
        delete_button[i].addEventListener( 'click', delete_candy )
    }
}
// failureGet function to display if the resturned data is not proper for many http request faliure resons
function failureGet( error )
{
    let main_section = document.querySelector( `.main_section` )
    main_section.insertAdjacentHTML(
        `beforeend`, `<h3 class="error_display">${ error[`message`] } Please try again later </h3>
        `)
}

// /  used axios to get a data using an
axios.request( {
    url: `http://127.0.0.1:5000/api/candy`,
} ).then( successGet ).catch( failureGet );

//function that deletes a candy
function delete_candy( details )
{
    // Get the target ID from the `delete_id` attribute of the target element in the details object
    let target_id = details[`target`].getAttribute( `delete_id` )
    axios.request( {
        // Send a DELETE request to the specified URL with the target id as the data
        url: `http://127.0.0.1:5000/api/candy`,
        method: `DELETE`,
        data: {

            "id": target_id,
        }
    } ).then( ( response ) =>
    {
        // Display success message when candy is deleted
        let main_section = document.querySelector( `.main_section` )
        main_section.insertAdjacentHTML(
            `beforeend`, `<h3 class="error_display">delete a candy' </h3>
            `)
    } ).catch( ( error ) =>
    {
        // Display error message when failed to delete candy
        // If there was no error, remove the candy card from the DOM
        if ( error )
        {
            main_section.insertAdjacentHTML(
                `beforeend`, `<h3 class="error_display"> ${ error[`message`] } faild to delete candy' </h3>
                `)
        }
    } )
    let candyCard = details.target.closest( `.candy_card` )
    candyCard.remove()

}
//function to post/add a candy to database
function post_candy()
{
    // Get the input values for name, image URL, and description
    let name_input = document.getElementById( 'name_input' )
    let name_value = name_input.value
    let image_input = document.getElementById( 'image_url_input' )
    let image_value = image_input.value
    let description_input = document.getElementById( 'description_input' )
    let description_value = description_input.value
    // Send a POST request to the specified URL with the input values as the data
    axios.request( {

        url: `http://127.0.0.1:5000/api/candy`,
        method: `POST`,
        data: {

            "name": name_value,
            "description": description_value,
            "image_url": image_value

        }
    } ).then( ( response ) =>
    {
        // display success message when the request is successful 
        main_section.insertAdjacentHTML(
            `beforeend`, `<h3 class="error_display"> successfully added candy </h3>
        `)
    } ).catch( ( error ) =>
    {
        // display error message when the request is  not successful 
        main_section.insertAdjacentHTML(
            `beforeend`, `<h3 class="error_display"> ${ error[`message`] } faild to add candy' </h3>
            `)
    } )
}
// Add a click event listener to the submit button
let get_submit = document.querySelector( '.submit' )
get_submit.addEventListener( 'click', post_candy )




