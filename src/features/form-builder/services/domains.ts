import axios from 'axios'

export const listDomainDefaultFrom = async (domainId:string) => {
    const response = await axios.get(`/api/domains/defaults/${domainId}`)
    return response.data

}