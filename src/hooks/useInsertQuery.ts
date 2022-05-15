import { useMutation } from 'react-query';
import axios from 'axios';
import { API_ENDPOINT } from 'config';

type UseInsertQueryProps = {
  table: string;
  properties: { [key: string]: string };
};

const insertIntoTable = async (props?: UseInsertQueryProps) => {

  let endpoint = API_ENDPOINT;
  endpoint = endpoint + props?.table;
  return axios.post(endpoint, props?.properties);
};

const useInsertQuery = () => {
  return useMutation(insertIntoTable);
};
export default useInsertQuery;
