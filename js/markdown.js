// Reload CSS //
// (function() {
// 	var h, a, f;
// 	a = document.getElementsByTagName('link');
// 	for (h = 0; h < a.length; h++) {
// 		f = a[h];
// 		if (f.rel.toLowerCase().match(/stylesheet/) && f.href) {
// 			var g = f.href.replace(/(&|\?)rnd=\d+/, '');
// 			f.href = g + (g.match(/\?/) ? '&' : '?');
// 			f.href += 'rnd=' + (new Date().valueOf());
// 		}
// 	}
// })()

////////////////////
//      INIT      //
////////////////////
const BASE_URL="https://jar-backend-8a826bb5171f.herokuapp.com"
// const BASE_URL="https://backend.justanotherripple.com"
// const BASE_URL="http://localhost:3000"

const converter = new showdown.Converter();
converter.setOption('noHeaderId', true);

////////////////////
//   PLACEHOLDER  //
////////////////////
var text = "# Loading...";
var error_text = "# Error, Reload Page!";
setBody(text)

////////////////////
//     ROUTER     //
////////////////////
const pathname = window.location.pathname.split(/\/blog(.+)/)[1]
// const pathname = window.location.pathname

switch(pathname){

	case "/": 	populateBody("home");
				break;

	case "/views/about": 	populateBody("about");
							break;

	case "/views/blog":		fetchBlog();
							break;

	default: console.log("Incorrect pathname: " + pathname);
}


/////////////////////////////
//    MARKDOWN FUNCTIONS   //
/////////////////////////////
async function fetchBlogData(data = {}) {

	const url = `${BASE_URL}/blog/fetch`

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.json();
}

function populateBody(name){
	// Name exists, fetch the document //
	fetchBlogData({ name: name })
	.then((res) => {
		if(res && res.markdown)
			setBody(res.markdown)
	})
	.catch(() => setBody(error_text))
}

function setBody(body){
	document.getElementById('inner-markdown').innerHTML = converter.makeHtml(body)
}

async function fetchBlog(){

	// Fetch the blog name //
	const url_string = window.location.href;
	const url = new URL(url_string);
	const name = url.searchParams.get("name");

	if(name && name.length > 0){
		// Hide the LIST DIV Element //
		document.getElementById("outer-list").style.display = "none"

		populateBody(name)
	}
	else{
		// Hide the Markdown DIV Element //
		document.getElementById("outer-markdown").style.display = "none"

		// Fetch all blogs //
		createListItems()
	}
}

/////////////////////////////
//   LIST BLOG FUNCTIONS   //
/////////////////////////////

async function fetchAllBlogs(data = {}) {

	const url = `${BASE_URL}/blog/fetchAll`

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return response.json();
}

function createListItems(){

	fetchAllBlogs()
	.then((items) => {
		var list = document.getElementById("outer-list");
		for(var i = 0; i < items.length; i++) {

			// A Tag //
			var link = document.createElement("a");
			link.href = `?name=${items[i].name}`;

			// List item //
			var listItem = document.createElement("div");
			listItem.id = "list-item";

			// Title //
			var title = document.createElement("p");
			title.id = "list-item-title";
			title.innerHTML = items[i].title;
			listItem.appendChild(title);

			// Time //
			// var time = document.createElement("p");
			// time.id = "list-item-time";
			// time.innerHTML = new Date(items[i].createdAt).toDateString();
			// listItem.appendChild(time);

			// Seperator //
			// var box = document.createElement("p");
			// box.id = "list-item-box";
			// box.innerHTML = "-"
			// listItem.appendChild(box);

			// Category //
			var time = document.createElement("p");
			time.id = "list-item-category";
			time.innerHTML = items[i].categoryName;
			listItem.appendChild(time);

			link.appendChild(listItem);
			list.appendChild(link);
		}
	})
	.catch(() => setBody(error_text))
}
