var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var caption = document.getElementById('caption');
var submit = document.getElementById('commentSubmit');
var commentDisplay = document.getElementsByClassName('comment');
submit.addEventListener('click', comments)


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        const cap = caption.innerText;
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });

function comments() {
  let comment = document.querySelector('#comment').value;
  console.log(comment)

  fetch('comments', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      
      'comment':comment
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    // window.location.reload(true)
  })

  Array.from(commentDisplay).forEach((ele) => {
    ele.innerHTML = '<p>' + comment + '</p>'
  })

}

