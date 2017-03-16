/**
 * Created by shuxuan on 13/03/2017.
 */
import Axios from "axios";

export const axios = Axios.create({
	baseURL: '/api/v1/'
});