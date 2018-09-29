import config from './config'

const apiKey = config.apiKey
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

export default function getArtists(country){
	const url = URL.replace(':country', country)
	return fetch(url)					//fetch devuelve un objeto con varios metodos
		.then(res => res.json())		//json devuelve otra promesa en la que carga los datos, resultados que vayan llegando, a través de un string
		.then(json => json.topartists.artist)
}
