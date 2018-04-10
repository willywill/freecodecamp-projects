const getWikiArticle = async (query, limit = 9) => {
  const WIKI_API_URL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=${limit}&namespace=0&origin=*&format=json`;
  if (typeof query !== 'string') return;
  try {
    const wikiResponseData = await fetch(WIKI_API_URL);
    const wikiData = await wikiResponseData.json();
    return wikiData;
  } catch (ex) {
    console.log(ex);
  }
}

const truncateText = async (text, limit = 100) => 
    text.length > limit ? text.substr(0, limit) + '...' : text;

const createObject = async (x, y, z) => {
  const skipBy = x.length;
  const finalArray = x.concat(y).concat(z);
  const result = [];
  for(let i = 0; i < finalArray.length / 3; i++) {
    let currentObj = {
      title: await truncateText(finalArray[i], 35),
      description: await truncateText(finalArray[i + skipBy]),
      link: finalArray[i + (skipBy * 2)]
    };
    
    result.push(currentObj);
  }
  
  return result;
}

//TODO: https://medium.com/@denny.headrick/pagination-in-vue-js-4bfce47e573b

const vue = new Vue({
  el: '.app',
  data: {
    title: 'Wikipedia Viewer',
    search: '',
    hasSearched: false,
    count: 0,
    results: []
  },
  methods: {
    searchWikipedia: async function () {
      const query = this.search;
      const response = await getWikiArticle(query, 25);
      this.hasSearched = true;
      this.results = await createObject(response[1], response[2], response[3])
      console.log(this.results);
    }
  }
});