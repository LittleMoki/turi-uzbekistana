import axios from 'axios'
import https from 'https';

export const api = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	}),
// baseURL: 'http://localhost:4000/',
	baseURL: 'https://api.turi-uzbekistana.ru/',
})
