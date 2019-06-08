import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-2f5de.firebaseio.com/'
});

export default instance;