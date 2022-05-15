import { useMutation } from 'react-query';
import axios from 'axios';
import { API_ENDPOINT } from 'config';
import { UseSelectQueryProps } from './useSelectQuery';

type UseUpdateQueryProps = {
  table: string;
  properties: { [key: string]: string };
  where: UseSelectQueryProps['where'];
};

const insertIntoTable = async (props?: UseUpdateQueryProps) => {

  let endpoint = API_ENDPOINT;
  let idExtractionEndpoint = API_ENDPOINT;
  idExtractionEndpoint = idExtractionEndpoint + props?.table + '?_limit=10';

  if (props?.where && Object.keys(props?.where || {}).length) {
    Object.keys(props.where).forEach((col) => {
      idExtractionEndpoint =
        idExtractionEndpoint + '&' + col + '=' + props?.where?.[col] || '';
    });
  }
  const id = await axios
    .get(idExtractionEndpoint)
    .then((res) => res?.data?.[0]?.id as string | undefined);

  if (id) {
    return axios.patch(endpoint + props?.table + '/' + id, props?.properties);
  }
};

const useUpdateQuery = () => {
  return useMutation(insertIntoTable);
};
export default useUpdateQuery;
