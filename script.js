async function getMovies() {
  try{
    const res = await fetch('https://swapi.info/api/films/');
    const movies = await res.json();

    printMoviesLine(movies)
  }catch(error){
    console.error(`There was an error: ${error}`);
  }
}

function printMoviesLine(movies) {
  let titles = []
  let years = []
  movies.forEach(movie => {
    titles = [...titles, movie.title]
    years = [...years, movie.release_date]
  });
  let year = []
  years.forEach(date => {
    year = [...year, date.slice(0, 4)]
  });
  
  const data = {
  labels: titles,
  series: [year]
}

  new Chartist.Line('.release-graph', data, {
  fullWidth: true,
  chartPadding: {
    left: 100
  },
  axisY: {
    onlyInteger: true,
    low: Math.min(...year) - 1,
    high: Math.max(...year) + 1,
    scaleMinSpace: 20
  },
  axisX: {
    labelOffset: {
      x: -50,
      y: -5
    },
  },
  height: 250,
  width: '70%'
});
  
}

getMovies()

async function getCharacters() {
  try {
    const res = await fetch('https://swapi.info/api/people/')
    const characters = await res.json()

    printCharacters(characters)
  }catch(error){
    console.error(`There was an error: ${error}`);
  }
}

function printCharacters(characters) {
  let names = []
  let movies = []

  characters.forEach(character => {
    names = [...names, character.name]
    movies = [...movies, character.films.length]
  });
  
  const data = {
    labels: names,
    series: [movies]
  }

  const options = {
    high: 6,
    low: 0,
    horizontalBars: true,
    axisX: {
      onlyInteger: true,
    },
    height: 2800
  };

  
  new Chartist.Bar('.character-graph', data, options);

}

getCharacters()