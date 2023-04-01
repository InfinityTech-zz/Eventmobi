import axios from "axios";
import moment from 'moment';
import { NUM_GISTS_PER_PAGE } from '../constants';
import { ForkData, GisListtResponseDetails } from "../interfaces/GistApiDetails";

const gistApi = axios.create({
    headers: {
        Authorization : `Bearer ${process.env.REACT_APP_GIT_API_KEY}`,
        Accept: 'application/vnd.github+json'
    },
    baseURL: process.env.REACT_APP_BASE_URL
})

export const getTotalNumPublicGists = async (username: string): Promise<number | Error> => {
    try {
        const response = await gistApi.get(process.env.REACT_APP_GET_USER_URL + username as string);
        return response.data.public_gists;
    } catch(e){
        console.error(e);
        return e as Error;
    }
}

export const getAllPublicGistsByUser = async (username: string, page?: number): Promise<Array<GisListtResponseDetails>> => {
    const pageFound = page === undefined ? 1: page
    try{
        const response = await gistApi.get(process.env.REACT_APP_GET_USER_URL + username + `/gists?page=${pageFound}&per_page=${NUM_GISTS_PER_PAGE}` as string);
    const responseData = response.data;
    const modifiedArr: Array<GisListtResponseDetails> = [];
    for(let i= 0; i <= responseData.length; i++) {
        if(responseData[i] !== undefined) {
            modifiedArr.push({
                date: responseData[i].updated_at,
                forks: await getRecentForkDetailsByGistId(responseData[i]?.id),
                type: (responseData[i].files[Object.keys(responseData[i].files)[0]]),
                file: Object.keys(responseData[i].files)[0],
            })
        }
    }
    return modifiedArr;
    } catch(e) {
      console.error(e);
      return [];
    }
}

export const getRecentForkDetailsByGistId = async (gistId: string): Promise<Array<ForkData>> => {
    try {
        const response = await gistApi.get(process.env.REACT_APP_GISTS_URL + gistId as string);
        const responseData = response.data.forks;
        responseData.sort((a: any,b: any) => moment.utc(a.updated_at).diff(moment.utc(b.updated_at)));
        const responseDataUpdated = responseData.reverse().splice(0,3);
        const modifiedData = responseDataUpdated.map((item: any) => ({forkUrl: item.url, avatarUrl: item.user.avatar_url}));
        return modifiedData;
    } catch(e){
       console.error(e)
       return [];
    }
}