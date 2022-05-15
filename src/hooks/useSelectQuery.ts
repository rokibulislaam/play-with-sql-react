import { useQuery } from 'react-query';
import axios from 'axios';
import { API_ENDPOINT } from 'config';

export type UseSelectQueryProps = {
  table: string;
  where?: { [col: string]: string };
  limit?: number;
  extraKey?: string;
};

const getTable = async (props?: UseSelectQueryProps) => {
  let endpoint = API_ENDPOINT;
  endpoint = endpoint + props?.table;
  if (props?.limit) {
    endpoint = endpoint + '?_limit=' + props.limit;
  }

  if (props?.where && Object.keys(props?.where || {}).length) {
    Object.keys(props.where).forEach((col) => {
      endpoint = endpoint + '&' + col + '=' + props?.where?.[col] || '';
    });
  }

  return axios.get(endpoint);
};

const useSelectQuery = (props?: UseSelectQueryProps) => {

  return useQuery(
    'select' + props?.table + props?.limit + props?.extraKey,
    () => getTable(props),
    {
      enabled: !!props?.table,
    }
  );
};
export default useSelectQuery;
