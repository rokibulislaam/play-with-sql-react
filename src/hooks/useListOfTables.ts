import { useQuery } from 'react-query';
import axios from 'axios';
import { API_ENDPOINT } from 'config';

const fetchListOfTables = async () => {
  return axios.get(API_ENDPOINT + 'listOfTables');
};

const useListOfTables = () => {
  return useQuery('listOfTables', fetchListOfTables);
};

export default useListOfTables;
