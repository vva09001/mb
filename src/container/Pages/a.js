let vanh = `
<div class="post_wapper">
  <div class="post_image">
    <img src={image} alt="icon" />
  </div>
  <h4>{name}</h4>
  <p>{description}</p>
  <a href="news/{url}">Xem chi tiết</p>
</div>`;

let contentData = [
  { id: 1, image: '', name: '123', description: '13312312', url: 'null', image: '123' },
  { id: 2, image: '', name: 'vanh', description: 'vanh', url: 'vanh', image: 'vanh' }
];
let html = '';

for (let i = 0; i < contentData.length; i++) {
  let key = Object.keys(contentData[i]);
  console.log(contentData[i])
  let regexp = '';
  let replaceHTML = '';
  key.forEach(items => {
    regexp += items + '|';
  });
  let regex = new RegExp(regexp.substring(0, regexp.length - 1), 'g');
  replaceHTML = vanh.replace(regex, function(match) {
    console.log(contentData[i])
    return contentData[i][match];
  });
  let contentHtml = replaceHTML.replace(/[{}]/g, '');
  html = html + contentHtml;
}

// console.log(html);

// let content = a.replace(/[{}]/g, '');
// console.log(content);
