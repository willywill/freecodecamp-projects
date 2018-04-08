const app = new Vue({
  el: '.app',
  data: {
    source: 'Hi',
    quote: '',
    tweetURI: '',
    quoteData: [
      { quote: 'Elementary my dear Watson.', source: 'Sherlock Holmes'},
      { quote: 'I cannot tell a lie.', source: 'George Washington'},
      { quote: 'Winning isn’t everything, it’s the only thing.', source: 'Vince Lombardi'},
      { quote: 'Well-behaved women rarely make history.', source: 'Marilyn Monroe'},
      { quote: 'The ends justify the means.', source: 'Niccolo Machiavelli'},
      { quote: 'Insanity is doing the same thing over and over again and expecting different results.', source: 'Albert Einstein'},
      { quote: 'Be yourself; everyone else is already taken.', source: 'Oscar Wilde'},
      { quote: 'And in the end, it’s not the years in your life that count. It’s the life in your years.', source: 'Abraham Lincoln'},
      { quote: 'Glory is fleeting, but obscurity is forever.', source: 'Napoleon Bonaparte'},
      { quote: 'However difficult life may seem, there is always something you can do and succeed at.', source: 'Stephen Hawking'},
    ]
  },
  methods: {
    getRandomQuote: function () {
      const rand = Math.floor(Math.random() * 10) + 1;
      const { quote, source } = this.quoteData[rand];
      this.quote = quote;
      this.source = source;
    },
    onTwitterClick: function () {
      window.open(this.tweetURI, 'Share', 'width=800, height=600, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
    }
  },
  created: function () {
    this.getRandomQuote();
    const tweetable = encodeURIComponent(this.quote + "' - " + this.source);
    this.tweetURI = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='${tweetable}`;
  }
});