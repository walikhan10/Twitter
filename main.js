
const TWEET_LIMIT = 50;

export async function handleReply() {
//     event.preventDefault();
//     let id = event.target.getAttribute('id');    
    
//     let body = $("#re").val()

//     let output = await axios({
//             method: 'post',
//             url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
//             withCredentials: true,
//             data: {
//               "type": "reply",
//               "parent": id,
//               "body": body
//             },
//         });
//     updateTweet();
//     return output;

// }


let body;
    event.preventDefault();
    let id = event.target.getAttribute('id');    
    
    
    let ret = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
    });
   
    if($("#re" + id).val().length == 0){
        body = ret.data.body;
    } else {
        body = $("#re" + id).val()
    }

    let output = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": id,
          "body": body
        },
    });


updateTweet();
return output;
}



export async function handleRetweet() {
    let body;
    event.preventDefault();
    let id = event.target.getAttribute('id');    
    
    
    let ret = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
    });
   
    if($("#re" + id).val().length == 0){
        body = ret.data.body;
    } else {
        body = $("#re" + id).val()
    }

    let output = await axios({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
              "type": "retweet",
              "parent": id,
              "body": body
            },
        });


    updateTweet();
    return output;
}

// Purpose:
// 	Unlikes a specific Tweet
// Endpoint:
// 	PUT  https://comp426-1fa20.cs.unc.edu/a09/tweets/:id/unlike
// 	Note: Replace ":id" in the above route with the id of the Tweet to unlike
// Request Params:
// 	This route does not accept request params, but the ID of the Tweet
// 	that should be unliked must be specified in the URL.
// Response:
// 	Upon successful unlike, this route responds with an empty response body

export async function handleLike() {
    event.preventDefault();
    let id = event.target.getAttribute('id');
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id + '/like',
        withCredentials: true,
    });
    updateTweet();
}




export async function handleUnlike() {
    event.preventDefault();
    let id = event.target.getAttribute('id');
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id + '/unlike',
        withCredentials: true,
    });
    updateTweet();
}



export async function editHandler() {
    event.preventDefault();
    let id = event.target.getAttribute('id');
    let $text_id = $("#text" + id);
    let text = $text_id.html();
    $text_id.remove();
    let box;
    if(text != undefined){
        box = $(`
        
        <div class="editForm">
        <p> <i> editting </i> </p>
        <textarea id = "box` + id + `" rows="3" cols="30">` + text + `</textarea>` 
    
        
        
        );
        
    } else {
        
        // <div class="editForm">
        // <p> <i> editting </i> </p>
        box = $(`<textarea id = "box` + id + `" rows="3" cols="30" placeholder="add to your retweet"></textarea>`);
    }
    $("#block" + id).append(box);
    $("#block" + id).append("<button type='button is-light' class='save' id='" + id + "'>Save</button>");
    $(this).remove();
}

export async function handleDelete() {
    let id = $(this).attr("id");
    const result = await axios({
        method: 'delete',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
      });
    updateTweet();
    return result;
}

export async function saveHandler() {
    let body;
    let id = $(this).attr("id");
    if($("#box" + id).val().length == 0){
        body = " ";
    } else {
        body = $("#box" + id).val();
    }
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
        data: {
          body: body
        },
    });
    updateTweet();
    return result;
}
// const result = await axios({
//     method: 'post',
//     url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
//     withCredentials: true,
//     data: {
//       body: "Great shot, kid, that was one in a million."
//     },
//   });
export async function createTweet() {
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: $("#newInput").val()
        },
    });
    updateTweet();
    const $newtweet = $('#newtweet');
    $newtweet.empty();
    let newTweetPost = $('<button class="button is-link is-rounded" id="post">Create a new Tweet!</button>');
    $newtweet.append(newTweetPost);
    return result;

    // body (string) - Required. The body text of the Tweet. Can be up to 280
	//                 characters in length.
	// type (string) - Optional. Defaults to "tweet". Specifies whether the Tweet
	//                 is a regular Tweet, a reply to another Tweet, or a retweet
	//                 of another Tweet. Must be one of the following values:
	//                 ["tweet", "retweet", "reply"].
	// parent (number) - Optional, but required if type is set to "retweet" or
	//                   "reply". Specifies the id of the associated Tweet.
}

export async function postHandler() {
    remove();
    let newTweetPost = $(`<textarea id = "newInput" rows="4" cols="50" placeholder=" What on your mind? "></textarea><br>
    <button id="create" type="button">Post</button>`);
    const $newtweet = $('#newtweet');
    $newtweet.append(newTweetPost);
}

export function remove() {
    $(this).remove();
}


export async function updateTweet() {
    let tweets = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true
    }).then(function (response) {
        $('#responses').empty();
        for (let i=0; i<response.data.length; i++) {
            // Author
            let tweet = $(`<div class = 'tweet' id='` + response.data[i].id + `'></div>`);
           
            // description for a tweet
            let description = $("<div id='block" + response.data[i].id + "'></div>");
            // if the tweet is undefined then it cannot be a retweet
            if (response.data[i].parent == undefined || response.data[i].type != "retweet"){ 
                description.append(`<div id = "text` + response.data[i].id + `" class='body'>` + response.data[i].body + `</div>`);
            } else if(response.data[i].parent.body != response.data[i].body && response.data[i].parent != undefined){
                description.append(`<div id = "text` + response.data[i].id + `" class='rebody'>` + response.data[i].body + `</div>`);
            }



            if(response.data[i].isMine){ 
                tweet.append("<button class='delete is-medium' id = '" + response.data[i].id + "' type='button'>Delete</button>")
                tweet.append("<button class='edit' id = '" + response.data[i].id + "' type='button'>Edit</button>");
            }

            
        
            tweet.append(`<div class='name'>` + response.data[i].author + `</div>`);
            if(response.data[i].type == "retweet"){ 
                tweet.append(`<div class='tag'>Retweeted!</div>`);
            }
       
            tweet.append(description);

            if(response.data[i].type == "retweet" && response.data[i].parent != undefined){
                tweet.append(`<div id = "retext` + response.data[i].id + `" class='retweetText'>` + `<div class='name'>` + response.data[i].parent.author + `</div>` + `<div class="body">` + response.data[i].parent.body + `</div></div>`);
            }

            
            



            tweet.append(`<textarea id = "re` + response.data[i].id + `" rows="1" cols="50" placeholder=" Reply "></textarea><div class='inline retweets'>` + response.data[i].retweetCount + `</div><button type='button' id = '` + response.data[i].id + `' class='fa button is-info retweetButton'>&#xf079;</button><div class='inline likes'>` + response.data[i].likeCount + `</div>`);

            if(response.data[i].isLiked){ 
                tweet.append(`<button type='button' id = '` + response.data[i].id + `' class='inlineButton unlikeButton'>&#9829</button>`);
            } else {
                tweet.append(`<button type='button' id = '` + response.data[i].id + `' class='inlineButton likeButton'>Like</button>`);
            }
            tweet.append(`<button type='button ' id = '` + response.data[i].id + `' class='replyButton'>Reply</button>`);
          


            if(response.data[i].type == "reply"){
                tweet.append(`<div id = "retext` + response.data[i].id + `" class='replyButton'>` + `<div class='name'>` + response.data[i].author + `</div>` + `<div class="body">` + response.data[i].body + `</div></div>`);
            }
           
            $('#responses').append(tweet);
        }
    });
    return tweets;

}

export async function initialize() {
  
    let responses = $("<div id='responses'></div>");
    $('#root').on('click', ".delete", handleDelete);
    $('#root').on('click', ".save", saveHandler);
    $('#root').on('click', "#create", createTweet); 
    $('#root').on('click', "#post", postHandler); 
    $('#root').on('click', ".retweetButton", handleRetweet);
    $('#root').on('click', ".replyButton", handleReply);
    $('#root').on('click', ".unlikeButton", handleUnlike);
    $('#root').on('click', ".likeButton", handleLike);
    $('#root').on('click', ".edit", editHandler);

    let post_tweet = $("<div id='newtweet'></div>");
    let newTweetPost = $('<button class="button is-info is-active" id="post">Post a new Tweet!</button>');
    post_tweet.append(newTweetPost);
    $('#root').append(post_tweet);
    $('#root').append(responses);

    $(window).scroll(() => {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            getTweets($tweets, page += TWEET_LIMIT);
        }
    });



    updateTweet();
}

$(document).ready(initialize());