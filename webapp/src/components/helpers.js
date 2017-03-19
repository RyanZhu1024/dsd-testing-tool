/**
 * Created by shuxuan on 13/03/2017.
 */
import Axios from "axios";

export const axios = Axios.create({
	baseURL: '/api/v1/'
});

export const updateAction = (form) => {
	console.log("update form ", form.values);
	return axios.put(`actions/${form.values.id}`, form.values);
};